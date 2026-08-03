export function Valor() {
  return (
    <section id="diagnostico" className="bg-background">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 md:py-16">
        <h2 className="text-center font-display text-3xl font-extrabold tracking-tight text-balance sm:text-4xl md:text-5xl">
          Lo que realmente estás comprando
        </h2>

        <div className="mt-8 space-y-2 font-display text-xl font-bold sm:text-2xl md:text-3xl">
          <p className="text-muted-foreground">No compras una aplicación.</p>
          <p>Compras tranquilidad.</p>
          <p>Compras claridad.</p>
          <p>Compras confianza.</p>
          <p>Compras una convivencia más armoniosa.</p>
          <p>Compras la seguridad de saber que estás haciendo lo correcto para tu perro.</p>
        </div>

        <p className="text-justify hyphens-auto mt-6 text-base text-muted-foreground sm:text-lg">
          Y eso cambia por completo la experiencia de tenerlo en casa.
        </p>

        <div className="mt-8 rounded-3xl bg-accent p-6 text-accent-foreground sm:p-8">
          <a
            href="#planes"
            className="inline-flex min-h-13 w-full items-center justify-center rounded-full bg-primary px-7 text-base font-extrabold text-primary-foreground transition-transform hover:scale-[1.02] sm:w-auto"
          >
            Analizar a mi perro gratis
          </a>
          <div className="mt-5 space-y-3 text-base">
            <p className="font-bold">Haz un diagnóstico inicial sin costo.</p>
            <p>
              La IA analizará la información que proporciones y te mostrará un informe con las
              principales causas del comportamiento detectado.
            </p>
            <p>
              Además, recibirás una vista previa del plan de mejora diseñado específicamente para tu
              perro.
            </p>
            <p>
              Si deseas acceder al plan completo, al seguimiento continuo, al análisis de videos y a
              todas las herramientas inteligentes, solo tendrás que activar tu suscripción.
            </p>
            <p>Así podrás comprobar primero el valor de la aplicación antes de tomar una decisión.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
