import { Link, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AlertTriangle, ArrowLeft, CheckCircle2, Eye, Siren, Stethoscope } from "lucide-react";
import { NODOS, RESULTADOS } from "@/lib/triaje";

const title = "Triaje de urgencia canina — Traductor Canino IA";
const description =
  "Responde 4 preguntas y descubre si lo que ocurre es un problema de conducta, un posible dolor o una urgencia veterinaria.";

export const Route = createFileRoute("/app/triaje")({
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
  component: TriajePage,
});

const ESTILO = {
  urgencia: "bg-destructive text-destructive-foreground",
  veterinario: "bg-accent text-accent-foreground",
  conducta: "bg-primary text-primary-foreground",
} as const;

function TriajePage() {
  const [historial, setHistorial] = useState<string[]>(["inicio"]);
  const actual = historial[historial.length - 1]!;
  const nodo = NODOS[actual];
  const resultado = RESULTADOS[actual];

  const responder = (siguiente: string) => setHistorial([...historial, siguiente]);
  const atras = () => setHistorial(historial.length > 1 ? historial.slice(0, -1) : historial);

  return (
    <div className="space-y-6">
      <header>
        <span className="inline-flex items-center gap-2 rounded-full bg-wine px-3 py-1 text-[11px] font-bold tracking-widest text-wine-foreground uppercase">
          <Siren className="size-3.5 text-primary" aria-hidden="true" />
          Triaje en 4 preguntas
        </span>
        <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-balance sm:text-4xl">
          ¿Es conducta, dolor o urgencia?
        </h1>
        <p className="mt-2 max-w-2xl text-base text-muted-foreground">
          Antes de entrenar cualquier cosa, hay que descartar que el cuerpo sea la causa.
        </p>
      </header>

      {nodo ? (
        <section className="rounded-4xl border border-border bg-card p-6 sm:p-8">
          <p className="text-xs font-bold tracking-widest text-muted-foreground uppercase">
            Pregunta {historial.length}
          </p>
          <h2 className="mt-2 font-display text-2xl font-extrabold text-balance">{nodo.pregunta}</h2>
          {nodo.ayuda ? (
            <p className="mt-3 rounded-2xl bg-secondary/60 p-4 text-sm text-muted-foreground">
              {nodo.ayuda}
            </p>
          ) : null}
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => responder(nodo.si)}
              className="min-h-13 rounded-full bg-primary px-6 text-base font-extrabold text-primary-foreground"
            >
              Sí
            </button>
            <button
              type="button"
              onClick={() => responder(nodo.no)}
              className="min-h-13 rounded-full border border-border bg-background px-6 text-base font-extrabold"
            >
              No
            </button>
          </div>
          {historial.length > 1 ? (
            <button
              type="button"
              onClick={atras}
              className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              Volver
            </button>
          ) : null}
        </section>
      ) : null}

      {resultado ? (
        <section className="space-y-4">
          <div className={`rounded-4xl p-6 sm:p-8 ${ESTILO[resultado.nivel]}`}>
            <p className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase">
              {resultado.nivel === "urgencia" ? (
                <AlertTriangle className="size-4" aria-hidden="true" />
              ) : resultado.nivel === "veterinario" ? (
                <Stethoscope className="size-4" aria-hidden="true" />
              ) : (
                <CheckCircle2 className="size-4" aria-hidden="true" />
              )}
              Resultado
            </p>
            <h2 className="mt-2 font-display text-2xl font-extrabold text-balance sm:text-3xl">
              {resultado.titulo}
            </h2>
            <p className="mt-3 text-base opacity-90">{resultado.texto}</p>
            <ul className="mt-5 space-y-2">
              {resultado.acciones.map((a) => (
                <li
                  key={a}
                  className="grid grid-cols-[auto_minmax(0,1fr)] gap-2 rounded-2xl bg-black/10 p-3 text-sm"
                >
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                  <span className="min-w-0">{a}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-4xl border border-border bg-card p-6 sm:p-8">
            <h3 className="font-display text-lg font-extrabold">Por qué llegamos aquí</h3>
            <p className="mt-2 text-sm text-muted-foreground">{resultado.porque}</p>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-wine/10 p-4">
                <h4 className="text-xs font-bold tracking-widest uppercase">Qué evitar</h4>
                <ul className="mt-2 space-y-2">
                  {resultado.evitar.map((e) => (
                    <li key={e} className="grid grid-cols-[auto_minmax(0,1fr)] gap-2 text-sm">
                      <AlertTriangle className="mt-0.5 size-4 shrink-0 text-wine" aria-hidden="true" />
                      <span className="min-w-0 text-muted-foreground">{e}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-3xl bg-primary/10 p-4">
                <h4 className="text-xs font-bold tracking-widest uppercase">Qué observar y registrar</h4>
                <ul className="mt-2 space-y-2">
                  {resultado.observar.map((o) => (
                    <li key={o} className="grid grid-cols-[auto_minmax(0,1fr)] gap-2 text-sm">
                      <Eye className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                      <span className="min-w-0 text-muted-foreground">{o}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>


          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setHistorial(["inicio"])}
              className="inline-flex min-h-12 items-center rounded-full border border-border px-6 text-sm font-bold"
            >
              Empezar de nuevo
            </button>
            {resultado.nivel === "conducta" ? (
              <Link
                to="/app/diagnostico"
                className="inline-flex min-h-12 items-center rounded-full bg-primary px-6 text-sm font-extrabold text-primary-foreground"
              >
                Ir al diagnóstico
              </Link>
            ) : null}
          </div>
        </section>
      ) : null}

      <p className="rounded-3xl bg-secondary/60 p-4 text-sm text-muted-foreground">
        Esta herramienta orienta, no diagnostica. Ante cualquier duda médica, contacta a tu
        veterinario.
      </p>
    </div>
  );
}
