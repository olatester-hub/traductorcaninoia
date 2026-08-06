export type EntradaRutina = {
  etapa: string;
  energia: "Baja" | "Media" | "Alta";
  paseo: number; // minutos/día
  olfato: number; // minutos/día
  mental: number; // minutos/día de entrenamiento o juegos de cabeza
  descanso: number; // horas/día
  solo: number; // horas seguidas solo
};

export type Objetivo = {
  clave: string;
  etiqueta: string;
  actual: number;
  meta: number;
  unidad: string;
  /** true si el problema es exceder la meta, no quedarse corto */
  tope?: boolean;
  consejo: string;
};

const BASE: Record<string, { paseo: number; olfato: number; mental: number; descanso: number; solo: number }> = {
  "Cachorro (< 6 meses)": { paseo: 25, olfato: 15, mental: 15, descanso: 18, solo: 3 },
  "Cachorro joven (6-12 meses)": { paseo: 45, olfato: 20, mental: 20, descanso: 17, solo: 4 },
  "Adulto (1-6 años)": { paseo: 60, olfato: 20, mental: 15, descanso: 16, solo: 6 },
  "Senior (+7 años)": { paseo: 40, olfato: 20, mental: 10, descanso: 18, solo: 5 },
};

const FACTOR: Record<EntradaRutina["energia"], number> = { Baja: 0.8, Media: 1, Alta: 1.3 };

export function calcularRutina(e: EntradaRutina): { objetivos: Objetivo[]; lectura: string } {
  const base = BASE[e.etapa] ?? BASE["Adulto (1-6 años)"]!;
  const f = FACTOR[e.energia];
  const objetivos: Objetivo[] = [
    {
      clave: "paseo",
      etiqueta: "Paseo diario",
      actual: e.paseo,
      meta: Math.round(base.paseo * f),
      unidad: "min",
      consejo:
        "Reparte en dos salidas. En cachorros, sesiones cortas y sin exigir distancia ni ritmo.",
    },
    {
      clave: "olfato",
      etiqueta: "Olfateo libre",
      actual: e.olfato,
      meta: Math.round(base.olfato * f),
      unidad: "min",
      consejo:
        "El olfato es el mayor gasto energético por minuto: 15 minutos de rastreo equivalen a una hora de caminata rápida.",
    },
    {
      clave: "mental",
      etiqueta: "Trabajo mental",
      actual: e.mental,
      meta: Math.round(base.mental * f),
      unidad: "min",
      consejo: "Entrenamiento corto, juegos de resolución o masticación programada.",
    },
    {
      clave: "descanso",
      etiqueta: "Descanso real",
      actual: e.descanso,
      meta: base.descanso,
      unidad: "h",
      consejo:
        "El déficit de sueño es la causa silenciosa número uno de mordidas de juego, hiperactividad y reactividad.",
    },
    {
      clave: "solo",
      etiqueta: "Horas seguidas solo",
      actual: e.solo,
      meta: base.solo,
      unidad: "h",
      tope: true,
      consejo:
        "Por encima de este límite conviene una visita intermedia o un paseador; si no, la ansiedad se instala.",
    },
  ];

  const faltantes = objetivos.filter((o) =>
    o.tope ? o.actual > o.meta : o.actual < o.meta * 0.75,
  );

  const lectura =
    faltantes.length === 0
      ? "Tu rutina cubre las necesidades base. Si aún hay conductas problemáticas, el origen es más emocional o de manejo que de gasto energético."
      : `Detectamos ${faltantes.length} ${faltantes.length === 1 ? "déficit" : "déficits"}: ${faltantes
          .map((o) => o.etiqueta.toLowerCase())
          .join(", ")}. Corregirlos suele bajar la intensidad de la conducta antes de entrenar nada.`;

  return { objetivos, lectura };
}
