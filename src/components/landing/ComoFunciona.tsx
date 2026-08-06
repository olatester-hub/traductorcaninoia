import {
  Activity,
  AlertTriangle,
  Brain,
  Cake,
  CalendarClock,
  Dog,
  Eye,
  Home,
  ScanEye,
  Target,
} from "lucide-react";

const analiza = [
  { icon: Cake, titulo: "Edad", texto: "Etapa biológica y nivel de energía natural." },
  { icon: Dog, titulo: "Raza / tipo", texto: "Instintos de trabajo, presa o pastoreo." },
  { icon: CalendarClock, titulo: "Rutinas", texto: "Horarios de paseo, descanso y alimentación." },
  { icon: Home, titulo: "Entorno familiar", texto: "Hogar, presencia de niños u otras mascotas." },
  { icon: ScanEye, titulo: "Comportamientos", texto: "Frecuencia e intensidad de las conductas." },
  { icon: Eye, titulo: "Señales corporales", texto: "Postura y gestos que tú mismo describes." },
];


const recibes = [
  { icon: Activity, titulo: "Qué está ocurriendo", texto: "Identificación clara de la emoción o estado actual." },
  { icon: Brain, titulo: "Por qué ocurre", texto: "Causa raíz biológica, mental o ambiental." },
  { icon: AlertTriangle, titulo: "Errores a evitar", texto: "Acciones que sin querer refuerzan la conducta." },
  { icon: Target, titulo: "Paso a paso exacto", texto: "Plan de acción directo para empezar hoy." },
];

export function ComoFunciona() {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16">
        <div className="flex justify-center">
          <span className="inline-flex rounded-full bg-primary/20 px-4 py-1.5 text-xs font-bold tracking-widest text-foreground/70 uppercase">
            Proceso inteligente en 3 pasos
          </span>
        </div>
        <h2 className="mt-4 text-center font-display text-3xl font-extrabold tracking-tight text-balance sm:text-4xl md:text-5xl">
          ¿Cómo funciona?
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-base text-muted-foreground sm:text-lg">
          Solo responde unas preguntas sobre tu perro.
        </p>

        <h3 className="mt-10 text-center font-display text-xl font-bold sm:text-2xl">
          La inteligencia artificial analiza:
        </h3>
        <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {analiza.map(({ icon: Icon, titulo, texto }) => (
            <li
              key={titulo}
              className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-3 rounded-3xl border border-border bg-card p-5"
            >
              <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-2xl bg-primary/20">
                <Icon className="size-5 text-primary" aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <p className="font-bold">{titulo}</p>
                <p className="mt-0.5 text-sm text-muted-foreground">{texto}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-8 rounded-4xl bg-accent p-6 text-accent-foreground sm:p-8">
          <h3 className="text-center font-display text-xl font-bold sm:text-2xl">
            En menos de tres minutos recibirás tu informe completo:
          </h3>
          <ol className="mt-6 grid gap-4 sm:grid-cols-2">
            {recibes.map(({ icon: Icon, titulo, texto }, i) => (
              <li
                key={titulo}
                className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-3 rounded-3xl bg-card/70 p-5"
              >
                <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-2xl bg-wine text-wine-foreground">
                  <Icon className="size-5 text-primary" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="font-bold">
                    {i + 1}. {titulo}
                  </p>
                  <p className="mt-0.5 text-sm opacity-80">{texto}</p>
                </div>
              </li>
            ))}
          </ol>
          <ul className="mt-6 flex flex-wrap justify-center gap-2 text-sm font-bold">
            {["Sin adivinar", "Sin consejos genéricos", "Sin perder horas buscando"].map((t) => (
              <li
                key={t}
                className="inline-flex items-center gap-1.5 rounded-full bg-card/70 px-3 py-1.5"
              >
                <AlertTriangle className="size-4 shrink-0 text-primary" aria-hidden="true" />
                <span className="min-w-0">{t}</span>
              </li>
            ))}
          </ul>
          <a
            href="#diagnostico"
            className="mx-auto mt-6 flex min-h-13 w-full max-w-md items-center justify-center gap-2 rounded-full bg-primary px-7 text-base font-extrabold text-primary-foreground"
          >
            Hacer mi diagnóstico gratis ahora
          </a>
        </div>
      </div>
    </section>
  );
}
