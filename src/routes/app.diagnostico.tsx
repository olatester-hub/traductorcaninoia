import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  Brain,
  CheckCircle2,
  Eye,
  Heart,
  Layers,
  ListChecks,
  RotateCcw,
  Rocket,
  Repeat,
  Sparkles,
  Stethoscope,
  TrendingUp,
} from "lucide-react";
import {
  CONDUCTAS,
  ENTORNO_NOTA,
  ETAPA_NOTA,
  INTENSIDAD_NOTA,
  lecturaCombinada,
  type FichaConducta,
} from "@/lib/diagnostico";
import {
  K,
  type PlanGuardado,
  hoyISO,
  useDatosPerro,
  useHistorial,
  usePerros,
} from "@/lib/app-store";

const title = "Diagnóstico interactivo — Traductor Canino IA";
const description =
  "Diagnóstico completo del comportamiento de tu perro: interpretación, causa raíz emocional, errores comunes y plan de acción.";

export const Route = createFileRoute("/app/diagnostico")({
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
  component: DiagnosticoApp,
});

const CONDUCTAS_LISTA = Object.keys(CONDUCTAS);
const INTENSIDADES = ["Ocasional", "Frecuente", "Constante"];
const MAX_CONDUCTAS = 2;

function DiagnosticoApp() {
  const { perfil } = usePerros();
  const { setValue: setPlan } = useDatosPerro<PlanGuardado | null>(K.plan, null);
  const { registrar } = useHistorial();
  const navigate = useNavigate();

  const [conductas, setConductas] = useState<string[]>([]);
  const [intensidad, setIntensidad] = useState("");
  const [detalle, setDetalle] = useState("");
  const [listo, setListo] = useState(false);
  const [conductaPlan, setConductaPlan] = useState("");

  const fichas = conductas
    .map((c) => [c, CONDUCTAS[c]] as const)
    .filter((x): x is readonly [string, FichaConducta] => Boolean(x[1]));
  const completo = conductas.length > 0 && intensidad !== "";

  const toggleConducta = (c: string) => {
    setListo(false);
    setConductas((prev) => {
      if (prev.includes(c)) return prev.filter((x) => x !== c);
      if (prev.length >= MAX_CONDUCTAS) return [prev[1]!, c];
      return [...prev, c];
    });
  };

  const elegida = conductaPlan && conductas.includes(conductaPlan) ? conductaPlan : conductas[0] ?? "";

  const generar = () => {
    setListo(true);
    setConductaPlan(conductas[0] ?? "");
    registrar({
      tipo: "diagnostico",
      titulo: `Diagnóstico: ${conductas.join(" + ")}`,
      detalle: `Frecuencia ${intensidad.toLowerCase()}${detalle.trim() ? ` · ${detalle.trim()}` : ""}`,
    });
  };

  const activarPlan = () => {
    setPlan({ conducta: elegida, intensidad, creado: hoyISO(), hechos: {} });
    registrar({
      tipo: "plan",
      titulo: `Plan de 21 días activado: ${elegida}`,
      detalle: `Frecuencia ${intensidad.toLowerCase()}`,
    });
    navigate({ to: "/app/plan" });
  };

  return (
    <div className="space-y-6">
      <header>
        <span className="inline-flex items-center gap-2 rounded-full bg-wine px-3 py-1 text-[11px] font-bold tracking-widest text-wine-foreground uppercase">
          <Sparkles className="size-3.5 text-primary" aria-hidden="true" />
          Diagnóstico interactivo
        </span>
        <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-balance sm:text-4xl">
          ¿Qué está pasando con {perfil.nombre || "tu perro"}?
        </h1>
        <p className="mt-2 max-w-2xl text-base text-muted-foreground">
          Elige la conducta que más te preocupa. El análisis usa el perfil que guardaste:{" "}
          {perfil.raza || "raza sin definir"} · {perfil.etapa} · {perfil.entorno}.{" "}
          <Link to="/app" className="font-bold text-foreground underline underline-offset-4">
            Editar perfil
          </Link>
        </p>
      </header>

      <section className="rounded-4xl border border-border bg-card p-6 sm:p-8">
        <h2 className="font-display text-xl font-bold">
          1. Conducta observada{" "}
          <span className="text-sm font-bold text-muted-foreground">
            (puedes elegir hasta 2)
          </span>
        </h2>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {CONDUCTAS_LISTA.map((c) => {
            const sel = conductas.includes(c);
            return (
              <button
                key={c}
                type="button"
                aria-pressed={sel}
                onClick={() => toggleConducta(c)}
                className={`grid min-h-12 grid-cols-[auto_minmax(0,1fr)] items-center gap-2 rounded-2xl px-4 py-2 text-left text-sm font-bold transition-colors ${
                  sel
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-primary/15"
                }`}
              >
                <span
                  className={`grid size-4 shrink-0 place-items-center rounded-md border-2 ${
                    sel ? "border-primary-foreground" : "border-muted-foreground/40"
                  }`}
                  aria-hidden="true"
                >
                  {sel ? <CheckCircle2 className="size-3.5" /> : null}
                </span>
                <span className="min-w-0">{c}</span>
              </button>
            );
          })}
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          Seleccionadas: {conductas.length} de {MAX_CONDUCTAS}. Si eliges una tercera, se reemplaza la
          más antigua.
        </p>

        <h2 className="mt-7 font-display text-xl font-bold">2. Frecuencia</h2>
        <div className="mt-4 grid grid-cols-3 gap-2">
          {INTENSIDADES.map((i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                setIntensidad(i);
                setListo(false);
              }}
              className={`min-h-12 rounded-2xl px-3 text-sm font-bold transition-colors ${
                intensidad === i
                  ? "bg-wine text-wine-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-primary/15"
              }`}
            >
              {i}
            </button>
          ))}
        </div>

        <h2 className="mt-7 font-display text-xl font-bold">3. Contexto (opcional)</h2>
        <textarea
          value={detalle}
          onChange={(e) => setDetalle(e.target.value)}
          rows={3}
          placeholder="Ej: cuando suena el timbre, o cuando me voy a trabajar…"
          className="mt-3 w-full rounded-2xl border border-input bg-background p-4 text-base outline-none focus:border-primary focus:ring-2 focus:ring-ring/40"
        />

        <button
          type="button"
          disabled={!completo}
          onClick={generar}
          className="mt-6 inline-flex min-h-13 w-full items-center justify-center gap-2 rounded-full bg-primary px-7 text-base font-extrabold text-primary-foreground disabled:opacity-40"
        >
          Generar diagnóstico
          <ArrowRight className="size-4" aria-hidden="true" />
        </button>
      </section>

      {listo && fichas.length > 0 ? (
        <section className="space-y-8">
          {fichas.length === 2 ? (
            <div className="rounded-3xl border border-primary/30 bg-primary/10 p-5 sm:p-6">
              <p className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-2 text-sm font-extrabold">
                <Layers className="size-4 shrink-0 text-primary" aria-hidden="true" />
                <span className="min-w-0">Cómo se relacionan las dos conductas</span>
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                {lecturaCombinada(fichas[0]![0], fichas[1]![0])}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Ejes implicados: <span className="font-bold text-foreground">{fichas[0]![1].eje}</span> y{" "}
                <span className="font-bold text-foreground">{fichas[1]![1].eje}</span>.
              </p>
            </div>
          ) : null}

          {fichas.map(([nombre, ficha]) => (
            <div key={nombre} className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="font-display text-2xl font-extrabold">{nombre}</h2>
                <span className="rounded-full bg-secondary px-3 py-1 text-[11px] font-bold tracking-widest uppercase">
                  Eje: {ficha.eje}
                </span>
              </div>

              <div className="rounded-3xl bg-secondary/60 p-5 sm:p-6">
                <p className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-2 text-sm font-extrabold">
                  <Activity className="size-4 shrink-0 text-primary" aria-hidden="true" />
                  <span className="min-w-0">Interpretación: qué está ocurriendo</span>
                </p>
                <p className="mt-2 text-sm text-muted-foreground">{ficha.interpretacion}</p>
                {detalle.trim() ? (
                  <p className="mt-2 text-sm text-muted-foreground">
                    Contexto que indicaste ({detalle.trim()}): ese disparador es la puerta de entrada del
                    patrón y es donde primero debes trabajar.
                  </p>
                ) : null}
              </div>

              <div className="rounded-3xl border border-border bg-card p-5 sm:p-6">
                <p className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-2 text-sm font-extrabold">
                  <Repeat className="size-4 shrink-0 text-primary" aria-hidden="true" />
                  <span className="min-w-0">El ciclo que la mantiene viva</span>
                </p>
                <p className="mt-2 text-sm text-muted-foreground">{ficha.mecanismo}</p>
              </div>

              <div className="rounded-3xl bg-wine p-5 text-wine-foreground sm:p-6">
                <p className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-2 text-sm font-extrabold">
                  <Heart className="size-4 shrink-0 text-primary" aria-hidden="true" />
                  <span className="min-w-0">Causa raíz emocional</span>
                </p>
                <p className="mt-2 text-sm font-bold text-primary">{ficha.emocion}</p>
                <ul className="mt-3 space-y-2 text-sm text-wine-foreground/85">
                  {ficha.causaRaiz.map((t) => (
                    <li key={t} className="grid grid-cols-[auto_minmax(0,1fr)] gap-2">
                      <Brain className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                      <span className="min-w-0">{t}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-3 rounded-2xl bg-wine-foreground/10 p-3 text-sm">
                  {INTENSIDAD_NOTA[intensidad]}
                </p>
              </div>

              <div className="rounded-3xl border border-border bg-card p-5 sm:p-6">
                <p className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-2 text-sm font-extrabold">
                  <Eye className="size-4 shrink-0 text-primary" aria-hidden="true" />
                  <span className="min-w-0">Lectura corporal: cómo confirmarlo</span>
                </p>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  {ficha.lectura.map((t) => (
                    <li key={t} className="grid grid-cols-[auto_minmax(0,1fr)] gap-2">
                      <span
                        className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary"
                        aria-hidden="true"
                      />
                      <span className="min-w-0">{t}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-3xl border border-destructive/30 bg-destructive/5 p-5 sm:p-6">
                <p className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-2 text-sm font-extrabold">
                  <AlertTriangle className="size-4 shrink-0 text-destructive" aria-hidden="true" />
                  <span className="min-w-0">Errores comunes que refuerzan el problema</span>
                </p>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  {ficha.errores.map((t) => (
                    <li key={t} className="grid grid-cols-[auto_minmax(0,1fr)] gap-2">
                      <span
                        className="mt-1.5 size-1.5 shrink-0 rounded-full bg-destructive"
                        aria-hidden="true"
                      />
                      <span className="min-w-0">{t}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-3xl border border-border bg-card p-5 sm:p-6">
                <p className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-2 text-sm font-extrabold">
                  <ListChecks className="size-4 shrink-0 text-primary" aria-hidden="true" />
                  <span className="min-w-0">Plan de acción</span>
                </p>
                <ol className="mt-3 space-y-3">
                  {ficha.plan.map((p, i) => (
                    <li key={p.titulo} className="grid grid-cols-[auto_minmax(0,1fr)] gap-3">
                      <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-extrabold text-primary-foreground">
                        {i + 1}
                      </span>
                      <div className="min-w-0">
                        <p className="text-sm font-bold">{p.titulo}</p>
                        <p className="mt-0.5 text-sm text-muted-foreground">{p.detalle}</p>
                      </div>
                    </li>
                  ))}
                </ol>
                <div className="mt-4 space-y-2 rounded-2xl bg-secondary/60 p-3 text-sm text-muted-foreground">
                  <p>{ETAPA_NOTA[perfil.etapa]}</p>
                  <p>{ENTORNO_NOTA[perfil.entorno]}</p>
                </div>
              </div>

              <div className="rounded-3xl bg-primary/15 p-5 sm:p-6">
                <p className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-2 text-sm font-extrabold">
                  <Rocket className="size-4 shrink-0 text-primary" aria-hidden="true" />
                  <span className="min-w-0">Empieza por aquí (hoy, en menos de 5 minutos)</span>
                </p>
                <p className="mt-2 text-sm text-foreground/80">{ficha.primerPaso}</p>
              </div>

              <div className="rounded-3xl bg-blush/40 p-5 sm:p-6">
                <p className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-2 text-sm font-extrabold">
                  <TrendingUp className="size-4 shrink-0 text-primary" aria-hidden="true" />
                  <span className="min-w-0">Cómo saber que va bien</span>
                </p>
                <ul className="mt-3 space-y-2 text-sm text-foreground/80">
                  {ficha.senales.map((t) => (
                    <li key={t} className="grid grid-cols-[auto_minmax(0,1fr)] gap-2">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                      <span className="min-w-0">{t}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-3xl border border-border bg-card p-5 sm:p-6">
                <p className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-2 text-sm font-extrabold">
                  <Stethoscope className="size-4 shrink-0 text-destructive" aria-hidden="true" />
                  <span className="min-w-0">Cuándo consultar a un profesional</span>
                </p>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  {ficha.banderas.map((t) => (
                    <li key={t} className="grid grid-cols-[auto_minmax(0,1fr)] gap-2">
                      <span
                        className="mt-1.5 size-1.5 shrink-0 rounded-full bg-destructive"
                        aria-hidden="true"
                      />
                      <span className="min-w-0">{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}

          {fichas.length === 2 ? (
            <div className="rounded-3xl border border-border bg-card p-5 sm:p-6">
              <p className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-2 text-sm font-extrabold">
                <ListChecks className="size-4 shrink-0 text-primary" aria-hidden="true" />
                <span className="min-w-0">¿Cuál conducta quieres seguir 21 días?</span>
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Trabaja una a la vez: elige la que más te limita hoy. La otra suele mejorar por
                arrastre y podrás activarla después.
              </p>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {fichas.map(([nombre]) => {
                  const sel = elegida === nombre;
                  return (
                    <button
                      key={nombre}
                      type="button"
                      aria-pressed={sel}
                      onClick={() => setConductaPlan(nombre)}
                      className={`grid min-h-12 grid-cols-[auto_minmax(0,1fr)] items-center gap-2 rounded-2xl px-4 py-2 text-left text-sm font-bold transition-colors ${
                        sel
                          ? "bg-wine text-wine-foreground"
                          : "bg-secondary text-secondary-foreground hover:bg-primary/15"
                      }`}
                    >
                      <CheckCircle2
                        className={`size-4 shrink-0 ${sel ? "text-primary" : "text-muted-foreground/50"}`}
                        aria-hidden="true"
                      />
                      <span className="min-w-0">{nombre}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : null}

          <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto]">
            <button
              type="button"
              onClick={activarPlan}
              className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full bg-wine px-7 text-base font-extrabold text-wine-foreground"
            >
              Activar seguimiento de 21 días
              <ArrowRight className="size-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => {
                setListo(false);
                setConductas([]);
                setConductaPlan("");
                setIntensidad("");
                setDetalle("");
              }}
              className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full border border-border px-6 text-sm font-bold"
            >
              <RotateCcw className="size-4" aria-hidden="true" />
              Otro diagnóstico
            </button>
          </div>
          {fichas.length === 2 ? (
            <p className="text-center text-xs text-muted-foreground">
              El seguimiento de 21 días se activará sobre «{elegida}».
            </p>
          ) : null}
        </section>
      ) : null}
    </div>
  );
}
