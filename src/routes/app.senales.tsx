import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Eye, Search } from "lucide-react";
import { NIVEL_COLOR, SENALES, ZONAS } from "@/lib/senales";

const title = "Traductor de señales corporales — Traductor Canino IA";
const description =
  "Interpreta cola, orejas, mirada, postura y voz de tu perro, y aprende qué hacer ante cada señal.";

export const Route = createFileRoute("/app/senales")({
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
  component: SenalesPage,
});

function SenalesPage() {
  const [zona, setZona] = useState<string>("Todas");
  const [q, setQ] = useState("");

  const lista = useMemo(() => {
    const t = q.trim().toLowerCase();
    return SENALES.filter(
      (s) =>
        (zona === "Todas" || s.zona === zona) &&
        (t === "" || (s.senal + s.significa + s.quehacer).toLowerCase().includes(t)),
    );
  }, [zona, q]);

  return (
    <div className="space-y-6">
      <header>
        <span className="inline-flex items-center gap-2 rounded-full bg-wine px-3 py-1 text-[11px] font-bold tracking-widest text-wine-foreground uppercase">
          <Eye className="size-3.5 text-primary" aria-hidden="true" />
          Lenguaje corporal
        </span>
        <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-balance sm:text-4xl">
          Traductor de señales corporales
        </h1>
        <p className="mt-2 max-w-2xl text-base text-muted-foreground">
          Tu perro avisa antes de reaccionar. Estas son las señales, en orden de intensidad, y la
          respuesta correcta para cada una.
        </p>
      </header>

      <section className="rounded-4xl border border-border bg-card p-5 sm:p-6">
        <label className="block">
          <span className="sr-only">Buscar señal</span>
          <span className="relative block">
            <Search
              className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Buscar: cola, gruñido, bostezo…"
              className="min-h-12 w-full rounded-2xl border border-input bg-background pr-4 pl-11 text-base outline-none focus:border-primary focus:ring-2 focus:ring-ring/40"
            />
          </span>
        </label>
        <ul className="mt-4 flex flex-wrap gap-2">
          {["Todas", ...ZONAS].map((z) => (
            <li key={z}>
              <button
                type="button"
                onClick={() => setZona(z)}
                className={`min-h-10 rounded-full px-4 text-sm font-bold ${
                  zona === z
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground"
                }`}
              >
                {z}
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        {lista.map((s) => (
          <article key={s.senal} className="rounded-3xl border border-border bg-card p-5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-secondary px-3 py-1 text-xs font-bold">{s.zona}</span>
              <span className={`rounded-full px-3 py-1 text-xs font-extrabold ${NIVEL_COLOR[s.nivel]}`}>
                {s.nivel}
              </span>
            </div>
            <h2 className="mt-3 font-display text-lg font-bold text-balance">{s.senal}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{s.significa}</p>
            <p className="mt-3 text-sm">
              <span className="font-bold">Dónde suele aparecer: </span>
              <span className="text-muted-foreground">{s.contexto}</span>
            </p>
            <p className="mt-3 rounded-2xl bg-primary/10 p-3 text-sm font-semibold">
              Qué hacer: {s.quehacer}
            </p>
            <p className="mt-2 rounded-2xl bg-wine/10 p-3 text-sm">
              <span className="font-bold">Error frecuente: </span>
              <span className="text-muted-foreground">{s.error}</span>
            </p>
            <p className="mt-2 text-xs text-muted-foreground">{NIVEL_GUIA[s.nivel]}</p>
          </article>
        ))}
        {lista.length === 0 ? (
          <p className="text-base text-muted-foreground">No hay señales para esa búsqueda.</p>
        ) : null}
      </section>

    </div>
  );
}
