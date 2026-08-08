import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Clock, Puzzle, Sparkles, Target } from "lucide-react";
import { JUEGOS, type Juego } from "@/lib/juegos";
import { K, PERFIL_INICIAL, type Perfil, useLocalState } from "@/lib/app-store";
import { useVersion } from "@/lib/version";
import { BonoBloqueado } from "@/components/app/BonoBloqueado";

const title = "Biblioteca de juegos inteligentes — Traductor Canino IA";
const description =
  "Juegos de olfato, calma y autocontrol filtrados por espacio, energía y foco, con instrucciones paso a paso.";

export const Route = createFileRoute("/app/juegos")({
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
  component: JuegosPage,
});

const ESPACIOS: Juego["espacio"][] = ["Interior", "Exterior", "Ambos"];
const ENERGIAS: Juego["energia"][] = ["Baja", "Media", "Alta"];
const FOCOS: Juego["foco"][] = ["Olfato", "Autocontrol", "Mente", "Confianza", "Vínculo"];

function JuegosPage() {
  const version = useVersion();
  const { value: perfil } = useLocalState<Perfil>(K.perfil, PERFIL_INICIAL);
  const [espacio, setEspacio] = useState<string>("Todos");
  const [energia, setEnergia] = useState<string>("Todas");
  const [foco, setFoco] = useState<string>("Todos");
  const [abierto, setAbierto] = useState<string | null>(null);

  const lista = useMemo(
    () =>
      JUEGOS.filter(
        (j) =>
          (espacio === "Todos" || j.espacio === espacio || j.espacio === "Ambos") &&
          (energia === "Todas" || j.energia === energia) &&
          (foco === "Todos" || j.foco === foco),
      ),
    [espacio, energia, foco],
  );

  const filtros = [
    { label: "Espacio", valor: espacio, set: setEspacio, todos: "Todos", opciones: ESPACIOS },
    { label: "Energía", valor: energia, set: setEnergia, todos: "Todas", opciones: ENERGIAS },
    { label: "Foco", valor: foco, set: setFoco, todos: "Todos", opciones: FOCOS },
  ] as const;

  if (version === "base") {
    return (
      <BonoBloqueado
        titulo="Biblioteca de juegos inteligentes"
        texto="Bono 2: juegos de olfato, calma y autocontrol filtrados por espacio, energía y foco, con instrucciones paso a paso."
      />
    );
  }

  return (
    <div className="space-y-6">
      <header className="rounded-4xl bg-accent p-6 text-accent-foreground sm:p-8">
        <span className="inline-flex items-center gap-2 rounded-full bg-accent-foreground/10 px-3 py-1 text-[11px] font-bold tracking-widest uppercase">
          <Puzzle className="size-3.5" aria-hidden="true" />
          Bono 2
        </span>
        <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-balance sm:text-4xl">
          Biblioteca de juegos inteligentes
        </h1>
        <p className="mt-2 max-w-2xl text-base">
          Diez minutos de trabajo mental cansan más que una hora de correr. Filtra según el espacio y
          la energía de {perfil.nombre || "tu perro"}.
        </p>
      </header>

      <section className="space-y-4 rounded-4xl border border-border bg-card p-5 sm:p-6">
        {filtros.map(({ label, valor, set, todos, opciones }) => (
          <div key={label}>
            <p className="text-sm font-bold">{label}</p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {[todos, ...opciones].map((o) => (
                <li key={o}>
                  <button
                    type="button"
                    onClick={() => set(o)}
                    className={`min-h-10 rounded-full px-4 text-sm font-bold ${
                      valor === o
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground"
                    }`}
                  >
                    {o}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <p className="text-sm font-bold text-muted-foreground">
        {lista.length} {lista.length === 1 ? "juego encontrado" : "juegos encontrados"}
      </p>

      <section className="grid gap-4 sm:grid-cols-2">
        {lista.map((j) => {
          const open = abierto === j.nombre;
          return (
            <article key={j.nombre} className="rounded-3xl border border-border bg-card p-5">
              <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/15 px-3 py-1 text-primary">
                  <Target className="size-3.5" aria-hidden="true" />
                  {j.foco}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1">
                  <Clock className="size-3.5" aria-hidden="true" />
                  {j.minutos} min
                </span>
              </div>
              <h2 className="mt-3 font-display text-lg font-bold text-balance">{j.nombre}</h2>
              <p className="mt-1.5 text-sm text-muted-foreground">{j.objetivo}</p>
              <p className="mt-3 text-xs text-muted-foreground">
                {j.espacio} · Energía {j.energia} · {j.etapa === "Todas" ? "Todas las etapas" : j.etapa}
              </p>
              <button
                type="button"
                onClick={() => setAbierto(open ? null : j.nombre)}
                aria-expanded={open}
                className="mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-secondary px-5 text-sm font-extrabold text-secondary-foreground"
              >
                <Sparkles className="size-4 text-primary" aria-hidden="true" />
                {open ? "Ocultar cómo se juega" : "Ver cómo se juega"}
              </button>
              {open ? (
                <p className="mt-4 rounded-2xl bg-background p-4 text-sm">{j.como}</p>
              ) : null}
            </article>
          );
        })}
      </section>
    </div>
  );
}
