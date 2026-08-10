import { useCallback, useEffect, useState } from "react";

export type Version = "base" | "premium";

export const VERSION_KEY = "tci.licencia";

export const VERSION_LABEL: Record<Version, string> = {
  base: "Versión BASE",
  premium: "Versión Completa",
};

export type Licencia = {
  version: Version;
  /** fecha ISO de activación (tras el pago) */
  activada: string;
};

function parse(raw: string | null): Licencia | null {
  if (!raw) return null;
  try {
    const data = JSON.parse(raw) as Partial<Licencia>;
    if (data.version === "base" || data.version === "premium") {
      return { version: data.version, activada: data.activada ?? new Date().toISOString() };
    }
  } catch {
    /* valor inválido */
  }
  return null;
}

/**
 * Licencia del dispositivo. Solo existe después de completar el pago:
 * sin licencia no hay acceso a ninguna versión de la app.
 */
export function useLicencia() {
  const [licencia, setLicencia] = useState<Licencia | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      setLicencia(parse(window.localStorage.getItem(VERSION_KEY)));
    } catch {
      /* almacenamiento no disponible */
    }
    setHydrated(true);
  }, []);

  const activar = useCallback((version: Version) => {
    const nueva: Licencia = { version, activada: new Date().toISOString() };
    setLicencia(nueva);
    try {
      window.localStorage.setItem(VERSION_KEY, JSON.stringify(nueva));
    } catch {
      /* almacenamiento no disponible */
    }
  }, []);

  const revocar = useCallback(() => {
    setLicencia(null);
    try {
      window.localStorage.removeItem(VERSION_KEY);
    } catch {
      /* almacenamiento no disponible */
    }
  }, []);

  return { licencia, version: licencia?.version ?? null, hydrated, activar, revocar } as const;
}

/** Versión activa según la licencia comprada, o `null` si aún no hay pago. */
export function useVersion(): Version | null {
  return useLicencia().version;
}

/** Activa la licencia fuera de React (por ejemplo al confirmar el pago). */
export function activarLicencia(version: Version) {
  const nueva: Licencia = { version, activada: new Date().toISOString() };
  try {
    window.localStorage.setItem(VERSION_KEY, JSON.stringify(nueva));
  } catch {
    /* almacenamiento no disponible */
  }
  return nueva;
}
