import { Brain, Languages, Video, Baby, Dog, CalendarClock, MessageCircle } from "lucide-react";
import cachorro from "@/assets/cachorro.jpg";
import perroAdulto from "@/assets/perro-adulto.jpg";

export function Funciones() {
  return (
    <section id="funciones" className="bg-cream">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16">
        <div className="flex justify-center">
          <span className="inline-flex rounded-full bg-primary/20 px-4 py-1.5 text-xs font-bold tracking-widest text-foreground/70 uppercase">Funciones</span>
        </div>
        <h2 className="text-center mx-auto max-w-3xl font-display text-3xl font-extrabold tracking-tight text-balance sm:text-4xl md:text-5xl">
          Todo lo que puedes hacer con TRADUCTOR CANINO IA
        </h2>

        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <article className="rounded-3xl bg-primary p-6 text-primary-foreground sm:p-7">
            <Brain className="size-7" aria-hidden="true" />
            <h3 className="text-center mt-4 font-display text-xl font-bold">Diagnóstico Inteligente</h3>
            <p className="text-justify hyphens-auto mt-2 text-base">
              Descubre la verdadera causa del comportamiento antes de intentar corregirlo.
            </p>
          </article>

          <article className="rounded-3xl border border-border bg-card p-6 sm:p-7">
            <Languages className="size-7 text-primary" aria-hidden="true" />
            <h3 className="text-center mt-4 font-display text-xl font-bold">Traductor de Conductas</h3>
            <p className="text-justify hyphens-auto mt-2 text-base text-muted-foreground">
              Comprende qué significan realmente los ladridos, mordidas, ansiedad, miedo,
              destrucción, reactividad y otros comportamientos cotidianos.
            </p>
          </article>

          <article className="rounded-3xl bg-wine p-6 text-wine-foreground sm:p-7">
            <Video className="size-7 text-primary" aria-hidden="true" />
            <h3 className="text-center mt-4 font-display text-xl font-bold">Analizador de Video</h3>
            <p className="text-justify hyphens-auto mt-2 text-base text-wine-foreground/85">
              Sube un video y recibe un análisis del lenguaje corporal junto con recomendaciones
              inmediatas.
            </p>
          </article>

          <article className="overflow-hidden rounded-3xl bg-accent text-accent-foreground md:col-span-2">
            <div className="grid gap-0 sm:grid-cols-[minmax(0,1fr)_40%]">
              <div className="p-6 sm:p-7">
                <Baby className="size-7" aria-hidden="true" />
                <h3 className="text-center mt-4 font-display text-xl font-bold">Modo Cachorro</h3>
                <p className="text-justify hyphens-auto mt-2 text-base">
                  Aprende a prevenir problemas antes de que aparezcan.
                </p>
                <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-1 text-sm font-medium">
                  {[
                    "Higiene.",
                    "Mordidas.",
                    "Socialización.",
                    "Rutinas.",
                    "Límites.",
                    "Adaptación al hogar.",
                  ].map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
              </div>
              <img
                src={cachorro}
                alt="Cachorro mirando a cámara con la cabeza inclinada"
                loading="lazy"
                width={1000}
                height={1000}
                className="h-48 w-full object-cover sm:h-full"
              />
            </div>
          </article>

          <article className="overflow-hidden rounded-3xl border border-border bg-card">
            <img
              src={perroAdulto}
              alt="Perro adulto descansando tranquilo en casa"
              loading="lazy"
              width={1000}
              height={1000}
              className="h-40 w-full object-cover"
            />
            <div className="p-6 sm:p-7">
              <Dog className="size-7 text-primary" aria-hidden="true" />
              <h3 className="text-center mt-4 font-display text-xl font-bold">Modo Perro Adulto</h3>
              <p className="text-justify hyphens-auto mt-2 text-base text-muted-foreground">Corrige paso a paso:</p>
              <ul className="mt-3 space-y-1 text-sm font-medium">
                {[
                  "Ladridos excesivos.",
                  "Tirones de correa.",
                  "Ansiedad por separación.",
                  "Conductas destructivas.",
                  "Reactividad.",
                  "Miedos.",
                ].map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </div>
          </article>

          <article className="rounded-3xl border border-border bg-secondary p-6 text-secondary-foreground sm:p-7">
            <CalendarClock className="size-7 text-primary" aria-hidden="true" />
            <h3 className="text-center mt-4 font-display text-xl font-bold">Predictor de Higiene</h3>
            <p className="text-justify hyphens-auto mt-2 text-base">
              Recibe recordatorios inteligentes para reducir accidentes y acelerar el aprendizaje.
            </p>
          </article>

          <article className="rounded-3xl bg-primary p-6 text-primary-foreground sm:p-7">
            <MessageCircle className="size-7" aria-hidden="true" />
            <h3 className="text-center mt-4 font-display text-xl font-bold">Asistente IA 24/7</h3>
            <p className="text-justify hyphens-auto mt-2 text-base">
              Haz preguntas cuando quieras y obtén respuestas personalizadas basadas en el historial
              de tu perro.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
