import { useCallback, useEffect, useState } from "react";

/** Estado persistido en el dispositivo (sin cuenta, sin servidor). */
export function useLocalState<T>(key: string, initial: T) {
  const [state, setState] = useState<{ key: string; value: T; hydrated: boolean }>({
    key,
    value: initial,
    hydrated: false,
  });

  useEffect(() => {
    let next = initial;
    try {
      const raw = window.localStorage.getItem(key);
      if (raw) next = JSON.parse(raw) as T;
    } catch {
      /* ignora almacenamiento no disponible */
    }
    setState({ key, value: next, hydrated: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  useEffect(() => {
    if (!state.hydrated || state.key !== key) return;
    try {
      window.localStorage.setItem(key, JSON.stringify(state.value));
    } catch {
      /* ignora cuota llena o modo privado */
    }
  }, [key, state]);

  const setValue = useCallback((v: T | ((prev: T) => T)) => {
    setState((s) => ({
      ...s,
      value: typeof v === "function" ? (v as (prev: T) => T)(s.value) : v,
    }));
  }, []);

  const reset = useCallback(() => setValue(initial), [initial, setValue]);

  const value = state.key === key ? state.value : initial;

  return { value, setValue, hydrated: state.hydrated && state.key === key, reset } as const;
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
  historial: "tci.historial",
  recordatorios: "tci.recordatorios",
  rutina: "tci.rutina",
} as const;

export const MAX_PERROS = 3;

export type Perro = Perfil & { id: string };
export type EstadoPerros = { activo: string | null; lista: Perro[]; iniciado?: boolean };

const PERROS_INICIAL: EstadoPerros = { activo: null, lista: [], iniciado: false };
const EVENTO_PERROS = "tci:perros";

function nuevoId() {
  return `p_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`;
}

function leerPerros(): EstadoPerros | null {
  try {
    const raw = window.localStorage.getItem(K.perros);
    if (!raw) return null;
    const data = JSON.parse(raw) as EstadoPerros;
    if (!Array.isArray(data.lista)) return null;
    return data;
  } catch {
    return null;
  }
}

function escribirPerros(estado: EstadoPerros) {
  try {
    window.localStorage.setItem(K.perros, JSON.stringify(estado));
  } catch {
    /* almacenamiento no disponible */
  }
}

/** Clave de almacenamiento aislada por perro activo. */
export function clavePerro(base: string, id: string | null) {
  return id ? `${base}::${id}` : base;
}

/** Administración de hasta 3 perros, diferenciados por nombre y raza. */
export function usePerros() {
  const [estado, setEstado] = useState<EstadoPerros>(PERROS_INICIAL);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let actual = leerPerros();

    if (!actual || (!actual.iniciado && actual.lista.length === 0)) {
      // Migración del perfil único anterior (solo la primera vez).
      let previo: Perfil | null = null;
      try {
        const raw = window.localStorage.getItem(K.perfil);
        if (raw) previo = JSON.parse(raw) as Perfil;
      } catch {
        /* almacenamiento no disponible */
      }
      const base: Perro = { ...PERFIL_INICIAL, ...(previo ?? {}), id: nuevoId() };
      actual = { activo: base.id, lista: [base], iniciado: true };
      escribirPerros(actual);
    }

    setEstado(actual);
    setHydrated(true);

    const sincronizar = () => setEstado(leerPerros() ?? PERROS_INICIAL);
    window.addEventListener(EVENTO_PERROS, sincronizar);
    window.addEventListener("storage", sincronizar);
    return () => {
      window.removeEventListener(EVENTO_PERROS, sincronizar);
      window.removeEventListener("storage", sincronizar);
    };
  }, []);

  const aplicar = useCallback((fn: (prev: EstadoPerros) => EstadoPerros) => {
    setEstado((prev) => {
      const next = { ...fn(prev), iniciado: true };
      escribirPerros(next);
      return next;
    });
    queueMicrotask(() => window.dispatchEvent(new Event(EVENTO_PERROS)));
  }, []);

  const lista = estado.lista;
  const perro = lista.find((p) => p.id === estado.activo) ?? lista[0] ?? null;
  const perfil: Perfil = perro ?? PERFIL_INICIAL;

  const seleccionar = useCallback(
    (id: string) => aplicar((v) => ({ ...v, activo: id })),
    [aplicar],
  );

  const agregar = useCallback(() => {
    aplicar((v) => {
      if (v.lista.length >= MAX_PERROS) return v;
      const nuevo: Perro = { ...PERFIL_INICIAL, id: nuevoId() };
      return { ...v, activo: nuevo.id, lista: [...v.lista, nuevo] };
    });
  }, [aplicar]);

  const actualizar = useCallback(
    (id: string, patch: Partial<Perfil>) =>
      aplicar((v) => ({
        ...v,
        lista: v.lista.map((p) => (p.id === id ? { ...p, ...patch } : p)),
      })),
    [aplicar],
  );

  const borrarDatos = useCallback((id: string) => {
    for (const base of [K.plan, K.salud, K.juegos, K.historial, K.recordatorios]) {
      try {
        window.localStorage.removeItem(clavePerro(base, id));
      } catch {
        /* almacenamiento no disponible */
      }
    }
  }, []);

  const eliminar = useCallback(
    (id: string) => {
      borrarDatos(id);
      aplicar((v) => {
        const restante = v.lista.filter((p) => p.id !== id);
        return {
          ...v,
          lista: restante,
          activo: v.activo === id ? (restante[0]?.id ?? null) : v.activo,
        };
      });
    },
    [aplicar, borrarDatos],
  );

  const eliminarTodos = useCallback(() => {
    for (const p of lista) borrarDatos(p.id);
    aplicar(() => ({ activo: null, lista: [], iniciado: true }));
  }, [aplicar, borrarDatos, lista]);

  return {
    lista,
    perro,
    perfil,
    perroId: perro?.id ?? null,
    hydrated,
    puedeAgregar: lista.length < MAX_PERROS,
    seleccionar,
    agregar,
    actualizar,
    eliminar,
    eliminarTodos,
  } as const;
}

/** Estado guardado y aislado por perro activo. */
export function useDatosPerro<T>(base: string, initial: T) {
  const { perroId } = usePerros();
  return useLocalState<T>(clavePerro(base, perroId), initial);
}

export type Sesion = {
  id: string;
  fecha: string;
  tipo: "diagnostico" | "plan" | "rutina" | "pdf";
  titulo: string;
  detalle: string;
};

const MAX_SESIONES = 40;

/** Historial de sesiones del perro activo. */
export function useHistorial() {
  const { value, setValue, hydrated } = useDatosPerro<Sesion[]>(K.historial, []);

  const registrar = useCallback(
    (entrada: Omit<Sesion, "id" | "fecha">) => {
      setValue((prev) =>
        [
          {
            ...entrada,
            id: `s_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`,
            fecha: new Date().toISOString(),
          },
          ...prev,
        ].slice(0, MAX_SESIONES),
      );
    },
    [setValue],
  );

  const limpiar = useCallback(() => setValue([]), [setValue]);

  return { sesiones: value, registrar, limpiar, hydrated } as const;
}

export function hoyISO() {
  return new Date().toISOString().slice(0, 10);
}

export function diasDesde(iso: string) {
  const ms = Date.now() - new Date(iso + "T00:00:00").getTime();
  return Math.max(0, Math.floor(ms / 86400000));
}

export function formatoFechaHora(iso: string) {
  try {
    return new Date(iso).toLocaleString("es", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}
