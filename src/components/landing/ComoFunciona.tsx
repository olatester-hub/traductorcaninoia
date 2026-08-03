import { Check, Dot } from "lucide-react";
import videoAnalisis from "@/assets/video-analisis.jpg";

const analiza = [
  "Edad.",
  "Raza.",
  "Rutinas.",
  "Entorno familiar.",
  "Comportamientos observados.",
  "Lenguaje corporal (si envías un video).",
];

const recibes = [
  "Qué está ocurriendo.",
  "Por qué ocurre.",
  "Qué errores pueden estar reforzando el problema.",
  "Qué hacer paso a paso para comenzar a corregirlo.",
];

export function ComoFunciona() {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16">
        <h2 className="text-center font-display text-3xl font-extrabold tracking-tight text-balance sm:text-4xl md:text-5xl">
          ¿Cómo funciona?
        </h2>
        <p className="mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
          Solo responde unas preguntas o sube un video.
        </p>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <div className="rounded-3xl border border-border bg-card p-6 sm:p-8">
            <h3 className="text-center font-display text-xl font-bold sm:text-2xl">
              La inteligencia artificial analiza:
            </h3>
            <ul className="mt-5 space-y-3">
              {analiza.map((item) => (
                <li key={item} className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-3">
                  <Dot className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
                  <span className="min-w-0 text-base text-card-foreground/90">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl bg-accent p-6 text-accent-foreground sm:p-8">
            <h3 className="text-center font-display text-xl font-bold sm:text-2xl">
              En menos de tres minutos recibirás:
            </h3>
            <ul className="mt-5 space-y-3">
              {recibes.map((item) => (
                <li key={item} className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-3">
                  <Check className="mt-1 size-4 shrink-0" aria-hidden="true" />
                  <span className="min-w-0 text-base">{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 space-y-1 text-sm font-medium">
              <p>Sin adivinar.</p>
              <p>Sin consejos genéricos.</p>
              <p>Sin perder horas buscando información.</p>
            </div>
          </div>
        </div>

        <img
          src={videoAnalisis}
          alt="Persona grabando un video de su perro en casa para analizarlo con la app"
          loading="lazy"
          width={1200}
          height={900}
          className="mt-6 aspect-[16/10] w-full rounded-3xl object-cover md:aspect-[21/8]"
        />
      </div>
    </section>
  );
}
