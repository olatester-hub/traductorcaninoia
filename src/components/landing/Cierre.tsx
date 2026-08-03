import logoAsset from "@/assets/logo.png.asset.json";

export function Cierre() {
  return (
    <section className="bg-wine text-wine-foreground">
      <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 md:py-20">
        <h2 className="text-center font-display text-4xl font-extrabold tracking-tight text-balance sm:text-5xl">
          Empieza hoy
        </h2>
        <div className="mt-6 space-y-3 text-justify hyphens-auto text-base text-wine-foreground/85 sm:text-lg">
          <p>Tu perro aprende todos los días.</p>
          <p>La pregunta es:</p>
          <p className="font-display text-2xl font-bold text-primary sm:text-3xl">
            ¿Está aprendiendo lo correcto?
          </p>
          <p>
            Cuanto antes entiendas lo que intenta decirte, más fácil será construir una convivencia
            tranquila, equilibrada y feliz.
          </p>
          <p>
            Haz tu primer diagnóstico gratuito y descubre por qué miles de pequeños problemas pueden
            evitarse cuando cuentas con el acompañamiento adecuado.
          </p>
        </div>
        <a
          href="#diagnostico"
          className="mt-8 inline-flex min-h-13 w-full items-center justify-center rounded-full bg-primary px-7 text-base font-extrabold text-primary-foreground transition-transform hover:scale-[1.02] sm:w-auto"
        >
          Analizar a mi perro gratis
        </a>
        <p className="text-justify hyphens-auto mt-3 text-sm text-wine-foreground/70">
          Sin tarjeta de crédito. Sin compromiso.
        </p>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="bg-background">
      <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-8 sm:px-6">
        <img
          src={logoAsset.url}
          alt="Traductor Canino IA — Tu copiloto de crianza canina"
          className="h-16 w-auto min-w-0 max-w-full object-contain sm:h-24"
        />
        <p className="text-justify hyphens-auto shrink-0 text-sm text-muted-foreground">
          © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
