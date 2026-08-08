import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  AlertTriangle,
  Beaker,
  CalendarClock,
  CheckCircle2,
  Eye,
  MinusCircle,
  Scale,
  ShieldAlert,
  Wrench,
} from "lucide-react";
import { METODOS, SOLUCIONES } from "@/lib/soluciones";

const title = "Soluciones y matriz de métodos — Traductor Canino IA";
const description =
  "Qué hacer cuando el plan no avanza y qué métodos de educación canina funcionan, cuáles usar con cautela y cuáles evitar.";

export const Route = createFileRoute("/app/soluciones")({
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
  component: SolucionesPage,
});

const VEREDICTO = {
  Recomendado: { cls: "bg-primary text-primary-foreground", Icon: CheckCircle2 },
  "Con cautela": { cls: "bg-blush text-blush-foreground", Icon: MinusCircle },
  Evitar: { cls: "bg-wine text-wine-foreground", Icon: AlertTriangle },
} as const;

function SolucionesPage() {
  const [abierto, setAbierto] = useState<string | null>(SOLUCIONES[0]?.titulo ?? null);

  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-display text-3xl font-extrabold tracking-tight text-balance sm:text-4xl">
          Cuando no avanza: soluciones reales
        </h1>
        <p className="mt-2 max-w-2xl text-base text-muted-foreground">
          Los diez atascos más frecuentes, cómo reconocerlos, por qué ocurren y el ajuste concreto,
          medible, que los desbloquea.
        </p>
      </header>

      <section className="space-y-3">
        {SOLUCIONES.map((s) => {
          const open = abierto === s.titulo;
          return (
            <article key={s.titulo} className="overflow-hidden rounded-3xl border border-border bg-card">
              <button
                type="button"
                onClick={() => setAbierto(open ? null : s.titulo)}
                aria-expanded={open}
                className="grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 p-5 text-left"
              >
                <span className="grid size-10 shrink-0 place-items-center rounded-2xl bg-primary/15">
                  <Wrench className="size-5 text-primary" aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="block font-display text-lg font-bold">{s.titulo}</span>
                  <span className="mt-0.5 block text-sm text-muted-foreground">{s.problema}</span>
                </span>
                <span className="shrink-0 text-sm font-bold text-muted-foreground">
                  {open ? "−" : "+"}
                </span>
              </button>
              {open ? (
                <div className="space-y-4 border-t border-border p-5">
                  <div>
                    <p className="flex items-center gap-2 text-xs font-bold tracking-widest text-muted-foreground uppercase">
                      <Eye className="size-4 shrink-0 text-secondary-foreground" aria-hidden="true" />
                      Señales de que es esto
                    </p>
                    <ul className="mt-2 space-y-2">
                      {s.senalDeQueEsEsto.map((se) => (
                        <li key={se} className="grid grid-cols-[auto_minmax(0,1fr)] gap-2 text-sm">
                          <span
                            className="mt-1.5 size-1.5 shrink-0 rounded-full bg-secondary-foreground/60"
                            aria-hidden="true"
                          />
                          <span className="min-w-0">{se}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <p className="rounded-2xl bg-secondary/60 p-4 text-sm text-muted-foreground">
                    <span className="font-bold text-foreground">Por qué pasa: </span>
                    {s.porque}
                  </p>

                  <p className="flex items-start gap-2 rounded-2xl border border-border p-4 text-sm text-muted-foreground">
                    <Beaker className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                    <span>
                      <span className="font-bold text-foreground">Mecanismo: </span>
                      {s.mecanismo}
                    </span>
                  </p>

                  <div>
                    <p className="text-xs font-bold tracking-widest text-muted-foreground uppercase">
                      Ajuste, paso a paso
                    </p>
                    <ul className="mt-2 space-y-2">
                      {s.ajuste.map((a) => (
                        <li key={a} className="grid grid-cols-[auto_minmax(0,1fr)] gap-2 text-sm">
                          <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                          <span className="min-w-0">{a}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <p className="flex items-start gap-2 rounded-2xl bg-wine/10 p-4 text-sm text-wine">
                    <ShieldAlert className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                    <span>
                      <span className="font-bold">Error fatal: </span>
                      {s.errorFatal}
                    </span>
                  </p>

                  <p className="flex items-start gap-2 rounded-2xl bg-primary/10 p-4 text-sm text-foreground">
                    <CalendarClock className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                    <span>
                      <span className="font-bold">Qué esperar: </span>
                      {s.plazo}
                    </span>
                  </p>
                </div>
              ) : null}
            </article>
          );
        })}
      </section>

      <section>
        <h2 className="flex items-center gap-2 font-display text-2xl font-extrabold">
          <Scale className="size-6 text-primary" aria-hidden="true" />
          Matriz de métodos
        </h2>
        <p className="mt-1 text-base text-muted-foreground">
          Lo que funciona a corto plazo no siempre funciona a largo plazo. Esta es la diferencia.
        </p>

        <div className="mt-5 space-y-3">
          {METODOS.map((m) => {
            const { cls, Icon } = VEREDICTO[m.veredicto];
            return (
              <article key={m.metodo} className="rounded-3xl border border-border bg-card p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <h3 className="min-w-0 font-display text-lg font-bold">{m.metodo}</h3>
                  <span
                    className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1 text-xs font-extrabold ${cls}`}
                  >
                    <Icon className="size-3.5" aria-hidden="true" />
                    {m.veredicto}
                  </span>
                </div>
                <dl className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl bg-secondary/60 p-3">
                    <dt className="text-xs font-bold tracking-widest text-muted-foreground uppercase">
                      Corto plazo
                    </dt>
                    <dd className="mt-1 text-sm">{m.efectoCorto}</dd>
                  </div>
                  <div className="rounded-2xl bg-secondary/60 p-3">
                    <dt className="text-xs font-bold tracking-widest text-muted-foreground uppercase">
                      Largo plazo
                    </dt>
                    <dd className="mt-1 text-sm">{m.efectoLargo}</dd>
                  </div>
                </dl>
                <p className="mt-3 text-sm text-muted-foreground">{m.razon}</p>
                <p className="mt-3 rounded-2xl bg-blush/15 p-3 text-sm text-foreground">
                  <span className="font-bold">Cuándo sí sirve: </span>
                  {m.cuandoSiSirve}
                </p>
                <p className="mt-3 flex items-start gap-2 text-sm text-muted-foreground">
                  <Beaker className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                  <span>
                    <span className="font-bold text-foreground">Evidencia: </span>
                    {m.evidencia}
                  </span>
                </p>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
