import { Sparkles } from "lucide-react";
import heroPerro from "@/assets/hero-perro.jpg";

const stats = [
  { valor: "10,4 k", label: "perros analizados" },
  { valor: "< 3 min", label: "para tu informe" },
  { valor: "98 %", label: "recomiendan la app" },
];

export function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden bg-cream">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -left-24 size-72 rounded-full bg-blush/50 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 bottom-0 size-80 rounded-full bg-primary/20 blur-3xl"
      />
      <div className="relative mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-2 md:items-center md:gap-12 md:py-20">
        <div className="min-w-0">
          <p className="inline-flex items-center gap-2 rounded-full bg-wine px-3 py-1.5 text-xs font-bold tracking-widest text-wine-foreground uppercase">
            <Sparkles className="size-3.5 text-primary" aria-hidden="true" />
            Mini aplicativo de crianza canina
          </p>
          <h1 className="mt-4 text-center font-display text-4xl leading-[0.95] font-extrabold tracking-tight text-balance sm:text-5xl lg:text-6xl md:text-left">
            Tu Copiloto de Crianza Canina
          </h1>
          <p className="text-justify hyphens-auto mt-5 text-base text-muted-foreground sm:text-lg">
            La primera aplicación que interpreta el comportamiento de tu perro y te guía, paso a
            paso, para criar un compañero equilibrado desde el primer día.
          </p>
          <p className="text-justify hyphens-auto mt-4 text-base text-foreground/90 sm:text-lg">
            Descubre en menos de <strong className="font-bold">3 minutos</strong> por qué tu perro se
            comporta como lo hace y recibe un plan personalizado para educarlo con confianza.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="#diagnostico"
              className="inline-flex min-h-13 items-center justify-center rounded-full bg-primary px-7 text-base font-extrabold text-primary-foreground shadow-lg shadow-primary/25 transition-transform hover:scale-[1.02]"
            >
              Diagnóstico gratis en 3 min
            </a>
            <a
              href="#planes"
              className="inline-flex min-h-13 items-center justify-center rounded-full border border-foreground/20 px-7 text-base font-bold transition-colors hover:bg-secondary"
            >
              Ver planes
            </a>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            Sin tarjeta de crédito. Sin compromiso.
          </p>

          <dl className="mt-8 grid grid-cols-3 gap-3 border-t border-border pt-6">
            {stats.map((s) => (
              <div key={s.label} className="min-w-0">
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-display text-2xl font-extrabold sm:text-3xl">{s.valor}</dd>
                <p className="mt-1 text-xs text-muted-foreground sm:text-sm">{s.label}</p>
              </div>
            ))}
          </dl>
        </div>

        <div className="min-w-0">
          <img
            src={heroPerro}
            alt="Perro junto a su dueña mientras consulta la aplicación en el móvil"
            width={1200}
            height={1400}
            className="aspect-[4/5] w-full rounded-4xl object-cover shadow-2xl shadow-wine/20 md:aspect-[4/4.4]"
          />
        </div>
      </div>
    </section>
  );
}
