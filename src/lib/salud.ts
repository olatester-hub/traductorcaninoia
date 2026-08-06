export type TareaSalud = {
  id: string;
  titulo: string;
  detalle: string;
  cada: number; // días
  grupo: "Vacunas" | "Antiparasitarios" | "Higiene" | "Control veterinario";
  etapas: ("Cachorro (< 6 meses)" | "Cachorro joven (6-12 meses)" | "Adulto (1-6 años)" | "Senior (+7 años)")[];
};

const TODAS: TareaSalud["etapas"] = [
  "Cachorro (< 6 meses)",
  "Cachorro joven (6-12 meses)",
  "Adulto (1-6 años)",
  "Senior (+7 años)",
];

export const TAREAS_SALUD: TareaSalud[] = [
  {
    id: "polivalente",
    titulo: "Vacuna polivalente",
    detalle: "Refuerzo del cuadro base. En cachorros son varias dosis separadas por 3-4 semanas.",
    cada: 365,
    grupo: "Vacunas",
    etapas: TODAS,
  },
  {
    id: "rabia",
    titulo: "Vacuna antirrábica",
    detalle: "Obligatoria en la mayoría de países. Guarda el certificado para viajes.",
    cada: 365,
    grupo: "Vacunas",
    etapas: ["Cachorro joven (6-12 meses)", "Adulto (1-6 años)", "Senior (+7 años)"],
  },
  {
    id: "cachorro-serie",
    titulo: "Serie de vacunación de cachorro",
    detalle: "Dosis cada 21-28 días hasta completar el esquema. Evita parques hasta 10 días después de la última.",
    cada: 24,
    grupo: "Vacunas",
    etapas: ["Cachorro (< 6 meses)"],
  },
  {
    id: "interna",
    titulo: "Desparasitación interna",
    detalle: "Comprimido según peso. En cachorros y perros con acceso a tierra, más frecuente.",
    cada: 90,
    grupo: "Antiparasitarios",
    etapas: TODAS,
  },
  {
    id: "externa",
    titulo: "Antipulgas y garrapatas",
    detalle: "Pipeta, collar o comprimido. No mezcles productos sin indicación veterinaria.",
    cada: 30,
    grupo: "Antiparasitarios",
    etapas: TODAS,
  },
  {
    id: "bano",
    titulo: "Baño",
    detalle: "Champú específico para perros. Bañar de más reseca la piel y aumenta el picor.",
    cada: 30,
    grupo: "Higiene",
    etapas: TODAS,
  },
  {
    id: "unas",
    titulo: "Corte de uñas",
    detalle: "Si suenan al caminar en piso duro, están largas. Corta poco y a menudo.",
    cada: 21,
    grupo: "Higiene",
    etapas: TODAS,
  },
  {
    id: "dientes",
    titulo: "Cepillado dental",
    detalle: "Ideal 3 veces por semana; el sarro es una de las causas más frecuentes de dolor silencioso.",
    cada: 3,
    grupo: "Higiene",
    etapas: TODAS,
  },
  {
    id: "oidos",
    titulo: "Revisión de oídos",
    detalle: "Olor fuerte, cera oscura o cabeza ladeada requieren consulta veterinaria.",
    cada: 14,
    grupo: "Higiene",
    etapas: TODAS,
  },
  {
    id: "peso",
    titulo: "Control de peso y condición corporal",
    detalle: "Debes palpar las costillas sin presionar y ver cintura desde arriba.",
    cada: 30,
    grupo: "Control veterinario",
    etapas: TODAS,
  },
  {
    id: "chequeo",
    titulo: "Chequeo veterinario general",
    detalle: "Una vez al año en adultos.",
    cada: 365,
    grupo: "Control veterinario",
    etapas: ["Cachorro joven (6-12 meses)", "Adulto (1-6 años)"],
  },
  {
    id: "senior",
    titulo: "Control senior con análisis",
    detalle: "Cada 6 meses desde los 7 años: sangre, presión y revisión articular.",
    cada: 182,
    grupo: "Control veterinario",
    etapas: ["Senior (+7 años)"],
  },
];

export function proximaFecha(ultimaISO: string, cada: number) {
  const d = new Date(ultimaISO + "T00:00:00");
  d.setDate(d.getDate() + cada);
  return d.toISOString().slice(0, 10);
}

export function formatoFecha(iso: string) {
  return new Date(iso + "T00:00:00").toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
