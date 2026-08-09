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
  /** Fundamento: por qué esta meta y no otra. */
  porque: string;
  /** Qué aparece cuando este pilar está en déficit. */
  siFalta: string;
  /** Acciones concretas para cerrar la brecha. */
  como: string[];
  estado: "ok" | "justo" | "deficit";
};

const BASE: Record<string, { paseo: number; olfato: number; mental: number; descanso: number; solo: number }> = {
  "Cachorro (< 6 meses)": { paseo: 25, olfato: 15, mental: 15, descanso: 18, solo: 3 },
  "Cachorro joven (6-12 meses)": { paseo: 45, olfato: 20, mental: 20, descanso: 17, solo: 4 },
  "Adulto (1-6 años)": { paseo: 60, olfato: 20, mental: 15, descanso: 16, solo: 6 },
  "Senior (+7 años)": { paseo: 40, olfato: 20, mental: 10, descanso: 18, solo: 5 },
};

const FACTOR: Record<EntradaRutina["energia"], number> = { Baja: 0.8, Media: 1, Alta: 1.3 };

function estadoDe(actual: number, meta: number, tope?: boolean): Objetivo["estado"] {
  if (tope) return actual <= meta ? "ok" : actual <= meta * 1.25 ? "justo" : "deficit";
  if (actual >= meta) return "ok";
  return actual >= meta * 0.75 ? "justo" : "deficit";
}

export function calcularRutina(e: EntradaRutina): {
  objetivos: Objetivo[];
  lectura: string;
  prioridad: string;
} {
  const base = BASE[e.etapa] ?? BASE["Adulto (1-6 años)"]!;
  const f = FACTOR[e.energia];
  const crudos: Omit<Objetivo, "estado">[] = [
    {
      clave: "paseo",
      etiqueta: "Paseo diario",
      actual: e.paseo,
      meta: Math.round(base.paseo * f),
      unidad: "min",
      consejo:
        "Reparte en dos salidas. En cachorros, sesiones cortas y sin exigir distancia ni ritmo constante.",
      porque:
        "El paseo no es solo gasto físico: es la principal fuente de información del día. Se mide en calidad, no en kilómetros; un perro que camina rápido sin poder parar vuelve más activado que cuando salió.",
      siFalta:
        "Inquietud al atardecer, destrozos, ladrido por la ventana y dificultad para asentarse en casa.",
      como: [
        "Divide en dos salidas y deja que él elija el ritmo en al menos una.",
        "En cachorros, aplica cinco minutos por mes de edad y dos veces al día.",
        "En seniors, prioriza recorridos cortos y frecuentes sobre uno largo.",
      ],
    },
    {
      clave: "olfato",
      etiqueta: "Olfateo libre",
      actual: e.olfato,
      meta: Math.round(base.olfato * f),
      unidad: "min",
      consejo:
        "Quince minutos de rastreo cansan más que una hora de caminata rápida y además bajan la frecuencia cardiaca.",
      porque:
        "Olfatear activa el sistema parasimpático: el perro pasa de modo alerta a modo calma. Es la vía más rápida y barata para bajar activación sin entrenar nada.",
      siFalta:
        "Perro que tira, se frustra en la correa y llega a casa acelerado en lugar de satisfecho.",
      como: [
        "Correa larga de 3-5 m en zona segura y silencio por tu parte.",
        "Esparce parte de la ración en hierba o toalla enrollada.",
        "Deja que huela las marcas de otros perros sin apurarlo: eso es leer el periódico.",
      ],
    },
    {
      clave: "mental",
      etiqueta: "Trabajo mental",
      actual: e.mental,
      meta: Math.round(base.mental * f),
      unidad: "min",
      consejo:
        "Mejor tres sesiones de cinco minutos que una de quince: la atención cae en picado tras el quinto minuto.",
      porque:
        "Resolver problemas y masticar liberan dopamina y luego endorfinas; el resultado es un perro saciado, no excitado, al revés que la pelota repetitiva.",
      siFalta: "Búsqueda constante de atención, robo de objetos y conductas repetitivas por aburrimiento.",
      como: [
        "Kong, alfombra olfativa o comedero interactivo en la hora más caótica del día.",
        "Masticación larga y segura varias veces por semana.",
        "Dos minutos de entrenamiento con premios de alto valor antes de cada comida.",
      ],
    },
    {
      clave: "descanso",
      etiqueta: "Descanso real",
      actual: e.descanso,
      meta: base.descanso,
      unidad: "h",
      consejo:
        "Cuenta el sueño total en 24 horas, incluidas las siestas, y protégelo de interrupciones.",
      porque:
        "El aprendizaje se consolida durmiendo. Con déficit de sueño sube el cortisol basal y cae el control de impulsos: el mismo perro parece otro.",
      siFalta:
        "Mordidas de juego, hiperactividad al anochecer, reactividad y desobediencia aparente.",
      como: [
        "Zona de descanso fija, en penumbra, fuera del paso y sin visitas.",
        "Prohibido despertarlo para jugar o acariciarlo.",
        "Si hay niños, establece horas de siesta obligatoria con puerta o corralito.",
      ],
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
      porque:
        "La tolerancia a la soledad se entrena en tramos progresivos. Superar el límite de forma sostenida genera vocalización, destrozos en accesos y micción por estrés.",
      siFalta:
        "Ladrido o llanto al irte, destrozos junto a la puerta y saludos desmedidos al volver.",
      como: [
        "Añade una visita intermedia o guardería dos días por semana.",
        "Deja masticación al salir y practica salidas falsas de 1-5 minutos.",
        "Sal sin despedidas largas y vuelve sin fiesta: el contraste es lo que activa.",
      ],
    },
  ];

  const objetivos: Objetivo[] = crudos.map((o) => ({
    ...o,
    estado: estadoDe(o.actual, o.meta, o.tope),
  }));

  const criticos = objetivos.filter((o) => o.estado === "deficit");
  const justos = objetivos.filter((o) => o.estado === "justo");

  const orden = ["descanso", "olfato", "mental", "solo", "paseo"];
  const primero =
    [...criticos, ...justos].sort((a, b) => orden.indexOf(a.clave) - orden.indexOf(b.clave))[0] ??
    null;

  const lectura =
    criticos.length === 0 && justos.length === 0
      ? "Tu rutina cubre las necesidades base de su etapa y nivel de energía. Si aún hay conductas problemáticas, el origen es más emocional, médico o de manejo que de gasto energético: pasa por el triaje y el diagnóstico."
      : `Detectamos ${criticos.length} ${criticos.length === 1 ? "déficit claro" : "déficits claros"}${
          justos.length ? ` y ${justos.length} pilar${justos.length === 1 ? "" : "es"} al límite` : ""
        }. Corregir la rutina baja la intensidad de la conducta antes de entrenar nada; suele notarse entre el tercer y el séptimo día.`;

  const prioridad = primero
    ? `Empieza por ${primero.etiqueta.toLowerCase()}: ${primero.como[0]}`
    : "Mantén la rutina actual y dedica la energía sobrante a entrenar en calma.";

  return { objetivos, lectura, prioridad };
}
