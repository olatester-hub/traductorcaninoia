import { Check, CalendarHeart, Puzzle } from "lucide-react";

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
            <CalendarHeart className="size-7 text-primary" aria-hidden="true" />
            <h3 className="text-center mt-4 font-display text-xl font-bold sm:text-2xl">
              Bono 1 — Calendario Inteligente de Salud Canina
            </h3>
            <p className="text-justify hyphens-auto mt-3 text-base text-wine-foreground/85">Programa automáticamente:</p>
            <ul className="mt-3 space-y-1 text-base font-medium">
              {[
                "Vacunas.",
                "Desparasitación.",
                "Baños.",
                "Corte de uñas.",
                "Revisiones veterinarias.",
                "Recordatorios personalizados.",
              ].map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
            <p className="text-justify hyphens-auto mt-4 text-base text-wine-foreground/85">
              Todo sincronizado según la edad y las necesidades de tu perro.
            </p>
          </article>

          <article className="rounded-3xl bg-accent p-6 text-accent-foreground sm:p-8">
            <Puzzle className="size-7" aria-hidden="true" />
            <h3 className="text-center mt-4 font-display text-xl font-bold sm:text-2xl">
              Bono 2 — Biblioteca de Juegos Inteligentes
            </h3>
            <p className="text-justify hyphens-auto mt-3 text-base">
              Tendrás acceso a una colección de juegos y ejercicios prácticos para ayudar a tu perro
              a desarrollar:
            </p>
            <ul className="mt-3 space-y-1 text-base font-medium">
              {[
                "Autocontrol.",
                "Concentración.",
                "Estimulación mental.",
                "Confianza.",
                "Equilibrio emocional.",
              ].map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}
