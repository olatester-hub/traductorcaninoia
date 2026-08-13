import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { obtenerMiLicencia } from "@/lib/licencia.functions";

export type Version = "base" | "premium";

export const VERSION_KEY = "tci.licencia";

export const VERSION_LABEL: Record<Version, string> = {
  base: "Versión BASE",
  premium: "Versión Completa",
};

export type Licencia = {
  version: Version;
  /** email de la compra validada en el servidor */
  email: string | null;
  /** fecha ISO de la última validación */
  validada: string;
};

function leerCache(): Licencia | null {
  try {
    const raw = window.localStorage.getItem(VERSION_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw) as Partial<Licencia>;
    if (data.version === "base" || data.version === "premium") {
      return {
        version: data.version,
        email: data.email ?? null,
        validada: data.validada ?? new Date().toISOString(),
      };
    }
  } catch {
    /* almacenamiento no disponible */
  }
  return null;
}

function guardarCache(licencia: Licencia | null) {
  try {
    if (licencia) window.localStorage.setItem(VERSION_KEY, JSON.stringify(licencia));
    else window.localStorage.removeItem(VERSION_KEY);
  } catch {
    /* almacenamiento no disponible */
  }
}

/**
 * Licencia del usuario. La verdad vive en el servidor: se valida contra la tabla
 * de licencias creada por el webhook de Hotmart tras la compra aprobada.
 */
export function useLicencia() {
  const [licencia, setLicencia] = useState<Licencia | null>(null);
  const [hydrated, setHydrated] = useState(false);

  const refrescar = useCallback(async () => {
    const { data } = await supabase.auth.getSession();
    if (!data.session) {
      setLicencia(null);
      guardarCache(null);
      setHydrated(true);
      return;
    }
    try {
      const res = await obtenerMiLicencia();
      const nueva: Licencia | null = res.version
        ? { version: res.version, email: res.email, validada: new Date().toISOString() }
        : null;
      setLicencia(nueva);
      guardarCache(nueva);
    } catch {
      // sin conexión: usamos la última validación conocida
      setLicencia(leerCache());
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    void refrescar();
    const { data } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN" || event === "SIGNED_OUT" || event === "USER_UPDATED") {
        void refrescar();
      }
    });
    return () => data.subscription.unsubscribe();
  }, [refrescar]);

  const cerrarSesion = useCallback(async () => {
    await supabase.auth.signOut();
    setLicencia(null);
    guardarCache(null);
  }, []);

  return {
    licencia,
    version: licencia?.version ?? null,
    email: licencia?.email ?? null,
    hydrated,
    refrescar,
    cerrarSesion,
  } as const;
}

/** Versión activa según la compra validada, o `null` si no hay licencia. */
export function useVersion(): Version | null {
  return useLicencia().version;
}
