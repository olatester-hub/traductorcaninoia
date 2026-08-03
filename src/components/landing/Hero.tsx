import heroPerro from "@/assets/hero-perro.jpg";

export function Hero() {
  return (
    <section id="inicio" className="bg-cream">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-2 md:items-center md:gap-12 md:py-16">
        <div className="min-w-0">
          <p className="inline-flex rounded-full bg-accent px-3 py-1 text-xs font-bold tracking-widest text-accent-foreground uppercase">
            Traductor Canino IA
          </p>
          <h1 className="text-center mt-4 font-display text-4xl leading-[0.95] font-extrabold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            Tu Copiloto de Crianza Canina
          </h1>
          <p className="text-justify hyphens-auto mt-5 text-base text-muted-foreground sm:text-lg">
            La primera aplicación que interpreta el comportamiento de tu perro y te guía, paso a
            paso, para criar un compañero equilibrado desde el primer día.
          </p>
          <p className="text-justify hyphens-auto mt-4 text-base text-foreground/90 sm:text-lg">
            Descubre en menos de <strong className="font-bold">3 minutos</strong> por qué tu perro se
            comporta como lo hace y recibe un plan personalizado para educarlo con confianza,
            tranquilidad y resultados.
          </p>
          <div className="mt-7">
            <a
              href="#diagnostico"
              className="inline-flex min-h-13 w-full items-center justify-center rounded-full bg-primary px-7 text-base font-extrabold text-primary-foreground shadow-lg shadow-primary/25 transition-transform hover:scale-[1.02] sm:w-auto"
            >
              Haz tu primer diagnóstico completamente gratis
            </a>
            <p className="text-justify hyphens-auto mt-3 text-sm text-muted-foreground">
              Sin tarjeta de crédito. Sin compromiso.
            </p>
          </div>
        </div>

        <div className="min-w-0">
          <img
            src={heroPerro}
            alt="Perro junto a su dueña mientras consulta la aplicación en el móvil"
            width={1200}
            height={1400}
            className="aspect-[4/5] w-full rounded-3xl object-cover shadow-xl md:aspect-[4/4.4]"
          />
        </div>
      </div>
    </section>
  );
}
