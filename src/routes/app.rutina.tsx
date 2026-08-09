import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Activity, Info, Moon, Timer } from "lucide-react";
import { calcularRutina, type EntradaRutina } from "@/lib/rutina";
import { ETAPAS, K, PERFIL_INICIAL, type Perfil, useLocalState } from "@/lib/app-store";

const title = "Calculadora de rutina diaria — Traductor Canino IA";
const description =
  "Descubre si el paseo, el olfateo, el trabajo mental y el descanso de tu perro cubren lo que su etapa y energía necesitan.";

export const Route = createFileRoute("/app/rutina")({
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
  component: RutinaPage,
});

function RutinaPage() {
  const { value: perfil } = useLocalState<Perfil>(K.perfil, PERFIL_INICIAL);
  const [etapa, setEtapa] = useState(perfil.etapa);
  const [energia, setEnergia] = useState<EntradaRutina["energia"]>(perfil.energia);
  const [paseo, setPaseo] = useState(45);
  const [olfato, setOlfato] = useState(10);
  const [mental, setMental] = useState(5);
  const [descanso, setDescanso] = useState(14);
  const [solo, setSolo] = useState(5);

  const { objetivos, lectura } = useMemo(
    () => calcularRutina({ etapa, energia, paseo, olfato, mental, descanso, solo }),
    [etapa, energia, paseo, olfato, mental, descanso, solo],
  );

  const sliders = [
    { label: "Paseo (min/día)", value: paseo, set: setPaseo, max: 180, step: 5, icon: Activity },
    { label: "Olfateo libre (min/día)", value: olfato, set: setOlfato, max: 90, step: 5, icon: Timer },
    { label: "Trabajo mental (min/día)", value: mental, set: setMental, max: 90, step: 5, icon: Info },
    { label: "Descanso real (h/día)", value: descanso, set: setDescanso, max: 22, step: 1, icon: Moon },
    { label: "Horas seguidas solo", value: solo, set: setSolo, max: 12, step: 1, icon: Timer },
  ];

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-3xl font-extrabold tracking-tight text-balance sm:text-4xl">
          Calculadora de rutina diaria
        </h1>
        <p className="mt-2 max-w-2xl text-base text-muted-foreground">
          La mayoría de las conductas problemáticas tienen un déficit de rutina detrás. Ajusta los
          valores reales de un día normal.
        </p>
      </header>

      <section className="rounded-4xl border border-border bg-card p-6 sm:p-8">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="text-sm font-bold">Etapa</span>
            <select
              value={etapa}
              onChange={(e) => setEtapa(e.target.value)}
              className="mt-1.5 min-h-12 w-full rounded-2xl border border-input bg-background px-4 text-base outline-none focus:border-primary"
            >
              {ETAPAS.map((x) => (
                <option key={x}>{x}</option>
              ))}
            </select>
          </label>
          <div>
            <span className="text-sm font-bold">Energía</span>
            <div className="mt-1.5 grid grid-cols-3 gap-2">
              {(["Baja", "Media", "Alta"] as const).map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setEnergia(n)}
                  className={`min-h-12 rounded-2xl text-sm font-bold ${
                    energia === n
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground"
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 space-y-5">
          {sliders.map(({ label, value, set, max, step, icon: Icon }) => (
            <label key={label} className="block">
              <span className="flex items-center justify-between gap-3 text-sm font-bold">
                <span className="flex min-w-0 items-center gap-2">
                  <Icon className="size-4 shrink-0 text-primary" aria-hidden="true" />
                  <span className="min-w-0">{label}</span>
                </span>
                <span className="shrink-0 rounded-full bg-secondary px-3 py-1 text-sm">{value}</span>
              </span>
              <input
                type="range"
                min={0}
                max={max}
                step={step}
                value={value}
                onChange={(e) => set(Number(e.target.value))}
                className="mt-2 h-2 w-full cursor-pointer appearance-none rounded-full bg-secondary accent-primary"
              />
            </label>
          ))}
        </div>
      </section>

      <section className="rounded-4xl bg-wine p-6 text-wine-foreground sm:p-8">
        <h2 className="font-display text-xl font-bold">Lectura de la rutina</h2>
        <p className="mt-2 text-base text-wine-foreground/85">{lectura}</p>
        <p className="mt-4 rounded-3xl bg-primary p-4 text-sm font-extrabold text-primary-foreground">
          Prioridad de esta semana: {prioridad}
        </p>

        <ul className="mt-5 space-y-3">
          {objetivos.map((o) => {
            const ok = o.estado === "ok";
            const justo = o.estado === "justo";
            const pct = Math.min(100, Math.round((o.actual / Math.max(o.meta, 1)) * 100));
            return (
              <li key={o.clave} className="rounded-3xl bg-wine-foreground/10 p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="min-w-0 text-sm font-bold">{o.etiqueta}</p>
                  <p
                    className={`shrink-0 rounded-full px-3 py-1 text-xs font-extrabold ${
                      ok
                        ? "bg-primary text-primary-foreground"
                        : justo
                          ? "bg-accent text-accent-foreground"
                          : "bg-blush text-blush-foreground"
                    }`}
                  >
                    {o.actual} / {o.meta} {o.unidad}
                    {o.tope ? " máx." : ""}
                  </p>
                </div>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-wine-foreground/15">
                  <div
                    className={`h-full rounded-full ${ok ? "bg-primary" : justo ? "bg-accent" : "bg-blush"}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <p className="mt-2 text-sm text-wine-foreground/80">{o.consejo}</p>
                <p className="mt-2 text-sm text-wine-foreground/70">
                  <span className="font-bold text-wine-foreground">Por qué: </span>
                  {o.porque}
                </p>
                {!ok ? (
                  <>
                    <p className="mt-2 text-sm text-wine-foreground/70">
                      <span className="font-bold text-wine-foreground">Si falta: </span>
                      {o.siFalta}
                    </p>
                    <ul className="mt-2 space-y-1">
                      {o.como.map((c) => (
                        <li
                          key={c}
                          className="grid grid-cols-[auto_minmax(0,1fr)] gap-2 text-sm text-wine-foreground/85"
                        >
                          <span aria-hidden="true">•</span>
                          <span className="min-w-0">{c}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : null}
              </li>
            );
          })}
        </ul>
      </section>

    </div>
  );
}
