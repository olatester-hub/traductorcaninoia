import { useEffect, useState } from "react";

export type Version = "base" | "premium";

export const VERSION_KEY = "tci.version";

export const VERSION_LABEL: Record<Version, string> = {
  base: "Versión BASE",
  premium: "Área premium",
};

function parse(value: string | null): Version | null {
  return value === "base" || value === "premium" ? value : null;
}

/**
 * Versión activa de la aplicación. Se fija con ?v=base | ?v=premium
 * y queda recordada en el dispositivo. Por defecto: premium.
 */
export function useVersion(fromUrl?: string) {
  const [version, setVersion] = useState<Version>("premium");

  useEffect(() => {
    const desdeUrl = parse(fromUrl ?? null);
    if (desdeUrl) {
      setVersion(desdeUrl);
      try {
        window.localStorage.setItem(VERSION_KEY, desdeUrl);
      } catch {
        /* almacenamiento no disponible */
      }
      return;
    }
    try {
      const guardada = parse(window.localStorage.getItem(VERSION_KEY));
      if (guardada) setVersion(guardada);
    } catch {
      /* almacenamiento no disponible */
    }
  }, [fromUrl]);

  return version;
}
