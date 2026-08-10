import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import { BellRing, CalendarHeart, Check, RotateCcw } from "lucide-react";
import { TAREAS_SALUD, formatoFecha, proximaFecha } from "@/lib/salud";
import { K, hoyISO, useLocalState, usePerros } from "@/lib/app-store";
import { useVersion } from "@/lib/version";
import { BonoBloqueado } from "@/components/app/BonoBloqueado";

const title = "Calendario inteligente de salud — Traductor Canino IA";
const description =
  "Vacunas, desparasitación, higiene y controles veterinarios con próximas fechas calculadas para la etapa de tu perro.";

export const Route = createFileRoute("/app/calendario")({
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
  component: CalendarioPage,
});

type Registro = Record<string, string>; // id -> última fecha ISO

function CalendarioPage() {
  const version = useVersion();
  const { perfil } = usePerros();
  const { value: registro, setValue: setRegistro } = useLocalState<Registro>(K.salud, {});

  const tareas = useMemo(
    () => TAREAS_SALUD.filter((t) => (t.etapas as string[]).includes(perfil.etapa)),
    [perfil.etapa],
  );

  const hoy = hoyISO();

  const items = tareas
    .map((t) => {
      const ultima = registro[t.id];
      const proxima = ultima ? proximaFecha(ultima, t.cada) : hoy;
      const dias = Math.round(
        (new Date(proxima + "T00:00:00").getTime() - new Date(hoy + "T00:00:00").getTime()) /
          86400000,
      );
      return { ...t, ultima, proxima, dias };
    })
    .sort((a, b) => a.dias - b.dias);

  const pendientes = items.filter((i) => i.dias <= 0).length;

  if (version === "base") {
    return (
      <BonoBloqueado
        titulo="Calendario inteligente de salud"
        texto="Bono 1: vacunas, desparasitación, higiene y controles con próximas fechas calculadas para la etapa de tu perro."
      />
    );
  }

  return (
    <div className="space-y-6">
      <header className="rounded-4xl bg-wine p-6 text-wine-foreground sm:p-8">
        <span className="inline-flex items-center gap-2 rounded-full bg-primary/20 px-3 py-1 text-[11px] font-bold tracking-widest uppercase">
          <CalendarHeart className="size-3.5 text-primary" aria-hidden="true" />
          Bono 1
        </span>
        <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-balance sm:text-4xl">
          Calendario inteligente de salud
        </h1>
        <p className="mt-2 max-w-2xl text-base text-wine-foreground/85">
          Ajustado a la etapa de {perfil.nombre || "tu perro"} ({perfil.etapa}). Marca «Hecho hoy» y
          la próxima fecha se recalcula sola.
        </p>
        <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-wine-foreground/10 px-4 py-2 text-sm font-bold">
          <BellRing className="size-4 text-primary" aria-hidden="true" />
          {pendientes === 0
            ? "Todo al día"
            : `${pendientes} ${pendientes === 1 ? "tarea pendiente" : "tareas pendientes"}`}
        </p>
      </header>

      <section className="space-y-3">
        {items.map((t) => {
          const vencida = t.dias <= 0;
          return (
            <article
              key={t.id}
              className={`rounded-3xl border p-5 ${
                vencida ? "border-primary bg-primary/10" : "border-border bg-card"
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <span className="rounded-full bg-secondary px-3 py-1 text-xs font-bold">
                    {t.grupo}
                  </span>
                  <h2 className="mt-2 font-display text-lg font-bold">{t.titulo}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">{t.detalle}</p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-xs font-bold tracking-widest text-muted-foreground uppercase">
                    Próxima
                  </p>
                  <p className="font-display text-base font-bold">{formatoFecha(t.proxima)}</p>
                  <p className="text-xs text-muted-foreground">
                    {vencida ? "Pendiente" : `En ${t.dias} días`}
                  </p>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setRegistro({ ...registro, [t.id]: hoy })}
                  className="inline-flex min-h-11 items-center gap-2 rounded-full bg-primary px-5 text-sm font-extrabold text-primary-foreground"
                >
                  <Check className="size-4" aria-hidden="true" />
                  Hecho hoy
                </button>
                {t.ultima ? (
                  <>
                    <span className="text-sm text-muted-foreground">
                      Última vez: {formatoFecha(t.ultima)}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        const copia = { ...registro };
                        delete copia[t.id];
                        setRegistro(copia);
                      }}
                      className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-border px-4 text-sm font-bold"
                    >
                      <RotateCcw className="size-3.5" aria-hidden="true" />
                      Borrar
                    </button>
                  </>
                ) : (
                  <span className="text-sm text-muted-foreground">Sin registro previo</span>
                )}
              </div>
            </article>
          );
        })}
      </section>

      <p className="rounded-3xl bg-secondary/60 p-4 text-sm text-muted-foreground">
        Las frecuencias son orientativas. Tu veterinario puede ajustar el esquema según la zona
        geográfica, el estilo de vida y el estado de salud de tu perro.
      </p>
    </div>
  );
}
