import {
  Check,
  CalendarHeart,
  Puzzle,
  Syringe,
  Bug,
  Droplets,
  Scissors,
  Stethoscope,
  BellRing,
  Hand,
  Target,
  Brain,
  Smile,
  HeartHandshake,
} from "lucide-react";

const bono1 = [
  { label: "Vacunas", Icon: Syringe },
  { label: "Desparasitación", Icon: Bug },
  { label: "Baños", Icon: Droplets },
  { label: "Corte de uñas", Icon: Scissors },
  { label: "Revisiones veterinarias", Icon: Stethoscope },
  { label: "Recordatorios personalizados", Icon: BellRing },
];

const bono2 = [
  { label: "Autocontrol", Icon: Hand },
  { label: "Concentración", Icon: Target },
  { label: "Estimulación mental", Icon: Brain },
  { label: "Confianza", Icon: Smile },
  { label: "Equilibrio emocional", Icon: HeartHandshake },
];

const incluye = [
  "Diagnósticos personalizados ilimitados.",
  "Planes de acción adaptados a tu perro.",
  "Traductor de conductas.",
  "Analizador de video con IA.",
  "Modo Cachorro.",
  "Modo Perro Adulto.",
  "Predictor Inteligente de Higiene.",
  "Asistente IA disponible las 24 horas.",
  "Biblioteca de soluciones en constante crecimiento.",
  "Seguimiento de progreso y recomendaciones personalizadas.",
  "Actualizaciones permanentes con nuevas funciones.",
];

export function Suscripcion() {
  return (
    <section className="bg-cream">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16">
        <div className="flex justify-center">
          <span className="inline-flex rounded-full bg-primary/20 px-4 py-1.5 text-xs font-bold tracking-widest text-foreground/70 uppercase">Suscripción</span>
        </div>
        <h2 className="text-center font-display text-3xl font-extrabold tracking-tight text-balance sm:text-4xl md:text-5xl">
          Todo lo que incluye tu suscripción
        </h2>

        <ul className="mt-8 grid gap-3 sm:grid-cols-2">
          {incluye.map((item) => (
            <li
              key={item}
              className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-3 rounded-2xl border border-border bg-card p-4"
            >
              <span
                className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground"
                aria-hidden="true"
              >
                <Check className="size-4" />
              </span>
              <span className="min-w-0 text-base text-card-foreground">{item}</span>
            </li>
          ))}
        </ul>

        <h2 className="text-center mt-14 font-display text-3xl font-extrabold tracking-tight text-balance sm:text-4xl md:text-5xl">
          Además, recibirás estos bonos exclusivos
        </h2>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <article className="rounded-3xl bg-wine p-6 text-wine-foreground sm:p-8">
            <div className="flex justify-center">
              <span className="grid size-12 place-items-center rounded-2xl bg-primary/20">
                <CalendarHeart className="size-6 text-primary" aria-hidden="true" />
              </span>
            </div>
            <h3 className="text-center mt-3 font-display text-xl font-bold sm:text-2xl">
              Bono 1 — Calendario Inteligente de Salud Canina
            </h3>
            <p className="text-center mt-2 text-base text-wine-foreground/85">
              Programa automáticamente:
            </p>
            <ul className="mt-5 grid gap-2 sm:grid-cols-2">
              {bono1.map(({ label, Icon }) => (
                <li
                  key={label}
                  className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-2 rounded-full bg-wine-foreground/10 px-3 py-2 text-sm font-semibold"
                >
                  <Icon className="size-4 shrink-0 text-primary" aria-hidden="true" />
                  <span className="min-w-0">{label}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-center text-base text-wine-foreground/85">
              Todo sincronizado según la edad y las necesidades de tu perro.
            </p>
          </article>

          <article className="rounded-3xl bg-accent p-6 text-accent-foreground sm:p-8">
            <div className="flex justify-center">
              <span className="grid size-12 place-items-center rounded-2xl bg-accent-foreground/10">
                <Puzzle className="size-6" aria-hidden="true" />
              </span>
            </div>
            <h3 className="text-center mt-3 font-display text-xl font-bold sm:text-2xl">
              Bono 2 — Biblioteca de Juegos Inteligentes
            </h3>
            <p className="text-center mt-2 text-base">
              Colección de juegos y ejercicios prácticos para ayudar a tu perro a desarrollar:
            </p>
            <ul className="mt-5 grid gap-2 sm:grid-cols-2">
              {bono2.map(({ label, Icon }) => (
                <li
                  key={label}
                  className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-2 rounded-full bg-accent-foreground/10 px-3 py-2 text-sm font-semibold"
                >
                  <Icon className="size-4 shrink-0" aria-hidden="true" />
                  <span className="min-w-0">{label}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>

      </div>
    </section>
  );
}
