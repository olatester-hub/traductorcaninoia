import { useCallback, useEffect, useState } from "react";

/** Estado persistido en el dispositivo (sin cuenta, sin servidor). */
export function useLocalState<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(initial);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(key);
      if (raw) setValue(JSON.parse(raw) as T);
    } catch {
      /* ignora almacenamiento no disponible */
    }
    setHydrated(true);
  }, [key]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* ignora cuota llena o modo privado */
    }
  }, [key, value, hydrated]);

  const reset = useCallback(() => setValue(initial), [initial]);

  return { value, setValue, hydrated, reset } as const;
}

export type Perfil = {
  nombre: string;
  raza: string;
  etapa: string;
  entorno: string;
  energia: "Baja" | "Media" | "Alta";
};

export const PERFIL_INICIAL: Perfil = {
  nombre: "",
  raza: "",
  etapa: "Adulto (1-6 años)",
  entorno: "Casa con patio",
  energia: "Media",
};

export const ETAPAS = [
  "Cachorro (< 6 meses)",
  "Cachorro joven (6-12 meses)",
  "Adulto (1-6 años)",
  "Senior (+7 años)",
];

export const ENTORNOS = [
  "Casa con patio",
  "Departamento / piso sin patio",
  "Hogar con niños pequeños",
  "Hogar con otras mascotas",
];

export type PlanGuardado = {
  conducta: string;
  intensidad: string;
  creado: string;
  /** claves "dia-paso" marcadas */
  hechos: Record<string, boolean>;
};

export const K = {
  perfil: "tci.perfil",
  plan: "tci.plan",
  salud: "tci.salud",
  juegos: "tci.juegos.favoritos",
} as const;

export function hoyISO() {
  return new Date().toISOString().slice(0, 10);
}

export function diasDesde(iso: string) {
  const ms = Date.now() - new Date(iso + "T00:00:00").getTime();
  return Math.max(0, Math.floor(ms / 86400000));
}
