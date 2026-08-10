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
  perros: "tci.perros",
  plan: "tci.plan",
  salud: "tci.salud",
  juegos: "tci.juegos.favoritos",
} as const;

export const MAX_PERROS = 3;

export type Perro = Perfil & { id: string };
export type EstadoPerros = { activo: string | null; lista: Perro[] };

const PERROS_INICIAL: EstadoPerros = { activo: null, lista: [] };

function nuevoId() {
  return `p_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`;
}

/** Administración de hasta 3 perros, diferenciados por nombre y raza. */
export function usePerros() {
  const { value, setValue, hydrated } = useLocalState<EstadoPerros>(K.perros, PERROS_INICIAL);

  // Migración del perfil único anterior.
  useEffect(() => {
    if (!hydrated || value.lista.length > 0) return;
    let previo: Perfil | null = null;
    try {
      const raw = window.localStorage.getItem(K.perfil);
      if (raw) previo = JSON.parse(raw) as Perfil;
    } catch {
      /* almacenamiento no disponible */
    }
    const base: Perro = { ...PERFIL_INICIAL, ...(previo ?? {}), id: nuevoId() };
    setValue({ activo: base.id, lista: [base] });
  }, [hydrated, value.lista.length, setValue]);

  const lista = value.lista;
  const perro = lista.find((p) => p.id === value.activo) ?? lista[0] ?? null;
  const perfil: Perfil = perro ?? PERFIL_INICIAL;

  const seleccionar = useCallback(
    (id: string) => setValue((v) => ({ ...v, activo: id })),
    [setValue],
  );

  const agregar = useCallback(() => {
    setValue((v) => {
      if (v.lista.length >= MAX_PERROS) return v;
      const nuevo: Perro = { ...PERFIL_INICIAL, id: nuevoId() };
      return { activo: nuevo.id, lista: [...v.lista, nuevo] };
    });
  }, [setValue]);

  const actualizar = useCallback(
    (id: string, patch: Partial<Perfil>) =>
      setValue((v) => ({
        ...v,
        lista: v.lista.map((p) => (p.id === id ? { ...p, ...patch } : p)),
      })),
    [setValue],
  );

  const eliminar = useCallback(
    (id: string) =>
      setValue((v) => {
        const lista = v.lista.filter((p) => p.id !== id);
        return { lista, activo: v.activo === id ? (lista[0]?.id ?? null) : v.activo };
      }),
    [setValue],
  );

  return {
    lista,
    perro,
    perfil,
    hydrated,
    puedeAgregar: lista.length < MAX_PERROS,
    seleccionar,
    agregar,
    actualizar,
    eliminar,
  } as const;
}


export function hoyISO() {
  return new Date().toISOString().slice(0, 10);
}

export function diasDesde(iso: string) {
  const ms = Date.now() - new Date(iso + "T00:00:00").getTime();
  return Math.max(0, Math.floor(ms / 86400000));
}
