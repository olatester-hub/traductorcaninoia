import { Link, createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import { CalendarCheck, Check, FileDown, Flame, RotateCcw, Target, TrendingUp } from "lucide-react";
import { CONDUCTAS } from "@/lib/diagnostico";
import {
  K,
  type PlanGuardado,
  diasDesde,
  useDatosPerro,
  useHistorial,
  usePerros,
} from "@/lib/app-store";
import { descargarPlanPdf } from "@/lib/pdf";

const title = "Plan de 21 días — Traductor Canino IA";
const description =
  "Seguimiento diario del plan de conducta de tu perro: tareas por día, racha y progreso a 21 días.";

export const Route = createFileRoute("/app/plan")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: PlanPage,
});

const FASES = [
  {
    rango: "Días 1-7",
    nombre: "Gestión y base",
    foco: "Cortar el ensayo del error y cubrir necesidades. Todavía no exijas resultados.",
  },
  {
    rango: "Días 8-14",
    nombre: "Entrenamiento activo",
    foco: "Instalar la conducta alternativa en contextos fáciles, 3 sesiones cortas al día.",
  },
  {
    rango: "Días 15-21",
    nombre: "Generalización",
    foco: "Subir dificultad de una variable por vez: distancia, distracción o duración.",
  },
];

function PlanPage() {
  const { perfil } = usePerros();
  const { value: plan, setValue: setPlan } = useDatosPerro<PlanGuardado | null>(K.plan, null);
  const { registrar } = useHistorial();

  const ficha = plan ? CONDUCTAS[plan.conducta] : undefined;
  const diaActual = plan ? Math.min(21, diasDesde(plan.creado) + 1) : 0;

  const { total, hechos, racha } = useMemo(() => {
    if (!plan || !ficha) return { total: 0, hechos: 0, racha: 0 };
    const pasos = ficha.plan.length;
    const marcados = Object.values(plan.hechos).filter(Boolean).length;
    let r = 0;
    for (let d = diaActual; d >= 1; d--) {
      const completoDia = ficha.plan.every((_, i) => plan.hechos[`${d}-${i}`]);
      if (completoDia) r++;
      else if (d !== diaActual) break;
      else continue;
    }
    return { total: pasos * 21, hechos: marcados, racha: r };
  }, [plan, ficha, diaActual]);

  if (!plan || !ficha) {
    return (
      <div className="rounded-4xl border border-border bg-card p-8 text-center">
        <Target className="mx-auto size-8 text-primary" aria-hidden="true" />
        <h1 className="mt-3 font-display text-2xl font-extrabold">Aún no tienes un plan activo</h1>
        <p className="mt-2 text-base text-muted-foreground">
          Haz el diagnóstico y activa el seguimiento de 21 días para empezar a medir el progreso.
        </p>
        <Link
          to="/app/diagnostico"
          className="mt-6 inline-flex min-h-12 items-center justify-center rounded-full bg-primary px-7 text-base font-extrabold text-primary-foreground"
        >
          Hacer diagnóstico
        </Link>
      </div>
    );
  }

  const descargarPdf = () => {
    descargarPlanPdf({ perfil, plan, ficha, diaActual, hechos, total, fases: FASES });
    registrar({
      tipo: "pdf",
      titulo: `PDF del plan «${plan.conducta}»`,
      detalle: `Día ${diaActual} de 21 · ${hechos}/${total} tareas completadas`,
    });
  };

  const toggle = (dia: number, paso: number) => {
    const key = `${dia}-${paso}`;
    setPlan({ ...plan, hechos: { ...plan.hechos, [key]: !plan.hechos[key] } });
  };

  const pct = total ? Math.round((hechos / total) * 100) : 0;
  const fase = diaActual <= 7 ? FASES[0]! : diaActual <= 14 ? FASES[1]! : FASES[2]!;

  return (
    <div className="space-y-6">
      <header className="rounded-4xl bg-wine p-6 text-wine-foreground sm:p-8">
        <span className="inline-flex items-center gap-2 rounded-full bg-primary/20 px-3 py-1 text-[11px] font-bold tracking-widest uppercase">
          <CalendarCheck className="size-3.5 text-primary" aria-hidden="true" />
          Día {diaActual} de 21
        </span>
        <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-balance sm:text-4xl">
          {plan.conducta}
        </h1>
        <p className="mt-1 text-sm text-wine-foreground/80">
          {perfil.nombre || "Tu perro"} · Intensidad {plan.intensidad.toLowerCase()} ·{" "}
          {fase.rango}: {fase.nombre}
        </p>

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl bg-wine-foreground/10 p-4">
            <p className="flex items-center gap-2 text-xs font-bold uppercase opacity-80">
              <TrendingUp className="size-4 text-primary" aria-hidden="true" /> Progreso
            </p>
            <p className="mt-1 font-display text-2xl font-extrabold">{pct}%</p>
          </div>
          <div className="rounded-2xl bg-wine-foreground/10 p-4">
            <p className="flex items-center gap-2 text-xs font-bold uppercase opacity-80">
              <Flame className="size-4 text-primary" aria-hidden="true" /> Racha
            </p>
            <p className="mt-1 font-display text-2xl font-extrabold">{racha} días</p>
          </div>
          <div className="rounded-2xl bg-wine-foreground/10 p-4">
            <p className="flex items-center gap-2 text-xs font-bold uppercase opacity-80">
              <Check className="size-4 text-primary" aria-hidden="true" /> Tareas
            </p>
            <p className="mt-1 font-display text-2xl font-extrabold">
              {hechos}/{total}
            </p>
          </div>
        </div>

        <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-wine-foreground/15">
          <div className="h-full rounded-full bg-primary" style={{ width: `${pct}%` }} />
        </div>
        <p className="mt-3 text-sm text-wine-foreground/85">{fase.foco}</p>

        <button
          type="button"
          onClick={descargarPdf}
          className="mt-5 inline-flex min-h-12 items-center gap-2 rounded-full bg-primary px-6 text-sm font-extrabold text-primary-foreground"
        >
          <FileDown className="size-4" aria-hidden="true" />
          Descargar plan en PDF
        </button>
      </header>

      <section className="rounded-4xl border border-border bg-card p-6 sm:p-8">
        <h2 className="font-display text-xl font-bold">Hoy — día {diaActual}</h2>
        <ul className="mt-4 space-y-3">
          {ficha.plan.map((p, i) => {
            const marcado = Boolean(plan.hechos[`${diaActual}-${i}`]);
            return (
              <li key={p.titulo}>
                <button
                  type="button"
                  onClick={() => toggle(diaActual, i)}
                  aria-pressed={marcado}
                  className={`grid w-full grid-cols-[auto_minmax(0,1fr)] items-start gap-3 rounded-3xl border p-4 text-left transition-colors ${
                    marcado ? "border-primary bg-primary/10" : "border-border bg-background"
                  }`}
                >
                  <span
                    className={`mt-0.5 grid size-7 shrink-0 place-items-center rounded-full ${
                      marcado ? "bg-primary text-primary-foreground" : "bg-secondary"
                    }`}
                  >
                    <Check className="size-4" aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-bold">{p.titulo}</span>
                    <span className="mt-0.5 block text-sm text-muted-foreground">{p.detalle}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="rounded-4xl border border-border bg-card p-6 sm:p-8">
        <h2 className="font-display text-xl font-bold">Mapa de 21 días</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Puedes marcar días anteriores si los completaste sin registrar.
        </p>
        <div className="mt-4 grid grid-cols-7 gap-2">
          {Array.from({ length: 21 }, (_, idx) => idx + 1).map((d) => {
            const completo = ficha.plan.every((_, i) => plan.hechos[`${d}-${i}`]);
            const parcial = ficha.plan.some((_, i) => plan.hechos[`${d}-${i}`]);
            return (
              <div
                key={d}
                title={`Día ${d}`}
                className={`grid aspect-square place-items-center rounded-2xl text-sm font-extrabold ${
                  completo
                    ? "bg-primary text-primary-foreground"
                    : parcial
                      ? "bg-blush/50"
                      : d === diaActual
                        ? "border-2 border-primary bg-background"
                        : "bg-secondary text-muted-foreground"
                }`}
              >
                {d}
              </div>
            );
          })}
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {FASES.map((f) => (
            <div key={f.rango} className="rounded-2xl bg-secondary/60 p-4">
              <p className="text-xs font-bold tracking-widest text-muted-foreground uppercase">
                {f.rango}
              </p>
              <p className="mt-1 font-display text-base font-bold">{f.nombre}</p>
              <p className="mt-1 text-sm text-muted-foreground">{f.foco}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-4xl bg-accent p-6 text-accent-foreground sm:p-8">
        <h2 className="font-display text-xl font-bold">Señales de que va bien</h2>
        <ul className="mt-3 space-y-2 text-sm">
          {ficha.senales.map((s) => (
            <li key={s} className="grid grid-cols-[auto_minmax(0,1fr)] gap-2">
              <TrendingUp className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
              <span className="min-w-0">{s}</span>
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={() => {
            registrar({
              tipo: "plan",
              titulo: `Plan reiniciado: ${plan.conducta}`,
              detalle: `Se cerró en el día ${diaActual} con ${hechos}/${total} tareas`,
            });
            setPlan(null);
          }}
          className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full bg-accent-foreground/10 px-5 text-sm font-bold"
        >
          <RotateCcw className="size-4" aria-hidden="true" />
          Reiniciar plan
        </button>
      </section>
    </div>
  );
}
