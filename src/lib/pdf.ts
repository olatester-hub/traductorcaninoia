import { jsPDF } from "jspdf";
import type { Perfil, PlanGuardado } from "@/lib/app-store";
import type { FichaConducta } from "@/lib/diagnostico";

const MARGEN = 16;
const ANCHO = 210;
const UTIL = ANCHO - MARGEN * 2;

type Ctx = { doc: jsPDF; y: number };

function salto(ctx: Ctx, alto: number) {
  if (ctx.y + alto > 280) {
    ctx.doc.addPage();
    ctx.y = MARGEN;
  }
}

function titulo(ctx: Ctx, texto: string, tam = 14) {
  // Espacio superior y "keep with next" para no dejar títulos huérfanos.
  if (ctx.y > MARGEN + 2) ctx.y += 6;
  salto(ctx, 26);
  ctx.doc.setFont("helvetica", "bold");
  ctx.doc.setFontSize(tam);
  ctx.doc.setTextColor(60, 20, 30);
  ctx.doc.text(texto, MARGEN, ctx.y);
  ctx.y += tam * 0.55 + 4;
}

function parrafo(ctx: Ctx, texto: string, opciones?: { bold?: boolean; sangria?: number }) {
  const sangria = opciones?.sangria ?? 0;
  ctx.doc.setFont("helvetica", opciones?.bold ? "bold" : "normal");
  ctx.doc.setFontSize(10.5);
  ctx.doc.setTextColor(40, 40, 40);
  const lineas = ctx.doc.splitTextToSize(texto, UTIL - sangria) as string[];
  for (const linea of lineas) {
    salto(ctx, 6);
    ctx.doc.text(linea, MARGEN + sangria, ctx.y);
    ctx.y += 5.2;
  }
}

function separador(ctx: Ctx) {
  salto(ctx, 8);
  ctx.doc.setDrawColor(220, 210, 200);
  ctx.doc.line(MARGEN, ctx.y, ANCHO - MARGEN, ctx.y);
  ctx.y += 6;
}

export type DatosPdfPlan = {
  perfil: Perfil;
  plan: PlanGuardado;
  ficha: FichaConducta;
  diaActual: number;
  hechos: number;
  total: number;
  fases: { rango: string; nombre: string; foco: string }[];
};

/** Genera y descarga el PDF del plan de 21 días del perro activo. */
export function descargarPlanPdf({
  perfil,
  plan,
  ficha,
  diaActual,
  hechos,
  total,
  fases,
}: DatosPdfPlan) {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const ctx: Ctx = { doc, y: MARGEN };

  doc.setFillColor(60, 20, 30);
  doc.rect(0, 0, ANCHO, 26, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("Plan de 21 días", MARGEN, 16);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("Traductor Canino IA", ANCHO - MARGEN, 16, { align: "right" });
  ctx.y = 36;

  titulo(ctx, plan.conducta, 16);
  parrafo(
    ctx,
    `${perfil.nombre || "Tu perro"} · ${perfil.raza || "raza sin definir"} · ${perfil.etapa} · ${perfil.entorno} · energía ${perfil.energia.toLowerCase()}`,
  );
  parrafo(
    ctx,
    `Intensidad: ${plan.intensidad || "sin definir"} · Inicio: ${plan.creado} · Día ${diaActual} de 21 · Tareas completadas: ${hechos}/${total}`,
  );
  separador(ctx);

  titulo(ctx, "Interpretación");
  parrafo(ctx, ficha.interpretacion);

  titulo(ctx, "Causa raíz emocional");
  parrafo(ctx, ficha.emocion, { bold: true });
  for (const t of ficha.causaRaiz) parrafo(ctx, `• ${t}`, { sangria: 3 });

  titulo(ctx, "Plan de acción diario");
  ficha.plan.forEach((p, i) => {
    parrafo(ctx, `${i + 1}. ${p.titulo}`, { bold: true });
    parrafo(ctx, p.detalle, { sangria: 5 });
  });

  titulo(ctx, "Fases del programa");
  for (const f of fases) {
    parrafo(ctx, `${f.rango} — ${f.nombre}`, { bold: true });
    parrafo(ctx, f.foco, { sangria: 5 });
  }

  titulo(ctx, "Errores que refuerzan el problema");
  for (const t of ficha.errores) parrafo(ctx, `• ${t}`, { sangria: 3 });

  titulo(ctx, "Señales de que va bien");
  for (const t of ficha.senales) parrafo(ctx, `• ${t}`, { sangria: 3 });

  titulo(ctx, "Cuándo consultar a un profesional");
  for (const t of ficha.banderas) parrafo(ctx, `• ${t}`, { sangria: 3 });

  titulo(ctx, "Registro de 21 días");
  ctx.doc.setFontSize(9);
  for (let bloque = 0; bloque < 3; bloque++) {
    salto(ctx, 12);
    const dias = Array.from({ length: 7 }, (_, i) => bloque * 7 + i + 1);
    const linea = dias
      .map((d) => {
        const completo = ficha.plan.every((_, i) => plan.hechos[`${d}-${i}`]);
        return `Día ${d} ${completo ? "[X]" : "[ ]"}`;
      })
      .join("   ");
    ctx.doc.setFont("helvetica", "normal");
    ctx.doc.setTextColor(40, 40, 40);
    ctx.doc.text(linea, MARGEN, ctx.y);
    ctx.y += 7;
  }

  salto(ctx, 14);
  ctx.doc.setFontSize(8.5);
  ctx.doc.setTextColor(120, 120, 120);
  const nota = ctx.doc.splitTextToSize(
    "Herramienta de apoyo educativo. No sustituye la valoración de un veterinario ni de un profesional de conducta presencial.",
    UTIL,
  ) as string[];
  ctx.doc.text(nota, MARGEN, ctx.y);

  const slug = `${perfil.nombre || "perro"}-${plan.conducta}`
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  doc.save(`plan-21-dias-${slug || "traductor-canino"}.pdf`);
}
