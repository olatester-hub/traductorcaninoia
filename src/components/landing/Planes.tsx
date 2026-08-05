import { ShieldCheck } from "lucide-react";

export function Planes() {
  return (
    <section id="planes" className="bg-background">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16">
        <div className="flex justify-center">
          <span className="inline-flex rounded-full bg-primary/20 px-4 py-1.5 text-xs font-bold tracking-widest text-foreground/70 uppercase">Planes</span>
        </div>
        <h2 className="text-center font-display text-3xl font-extrabold tracking-tight text-balance sm:text-4xl md:text-5xl">
          Elige el plan que mejor se adapte a ti
        </h2>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <article className="relative flex flex-col rounded-3xl border-2 border-primary/40 bg-blush/30 p-6 shadow-lg shadow-primary/10 sm:p-8">
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
              <h3 className="min-w-0 text-center font-display text-2xl font-bold">Plan Mensual</h3>
              <span className="shrink-0 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
                Flexible
              </span>
            </div>
            <ul className="mt-5 space-y-2 text-base text-foreground/80">
              <li>Acceso completo a todas las funciones.</li>
              <li>Actualizaciones continuas.</li>
              <li>Diagnósticos ilimitados.</li>
              <li>Asistente IA.</li>
            </ul>
            <p className="mt-6 font-display text-3xl font-extrabold sm:text-4xl">USD 6,99 al mes.</p>
            <p className="mt-1 text-sm text-muted-foreground">Cancela cuando quieras.</p>
            <a
              href="#diagnostico"
              className="mt-6 inline-flex min-h-12 items-center justify-center rounded-full bg-primary px-6 text-center text-base font-extrabold text-primary-foreground transition-transform hover:scale-[1.02]"
            >
              Suscribirme por USD 6,99/mes
            </a>
          </article>

          <article className="flex flex-col rounded-3xl bg-primary p-6 text-primary-foreground sm:p-8">
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
              <h3 className="text-center min-w-0 truncate font-display text-2xl font-bold">Plan Anual</h3>
              <span className="shrink-0 rounded-full bg-wine px-3 py-1 text-xs font-bold text-wine-foreground">
                Ahorra 33 %
              </span>
            </div>
            <ul className="mt-5 space-y-2 text-base">
              <li>Todo lo incluido en el plan mensual.</li>
              <li>Ahorra aproximadamente un 33 % frente al pago mensual.</li>
            </ul>
            <p className="mt-6 font-display text-3xl font-extrabold sm:text-4xl">USD 55,99 al año</p>
            <p className="text-justify hyphens-auto mt-1 text-base font-bold">Equivale a solo USD 4,67 al mes.</p>
            <p className="text-justify hyphens-auto mt-3 text-base">
              La mejor opción para acompañar a tu perro durante todo su proceso de crecimiento y
              aprendizaje.
            </p>
            <a
              href="#diagnostico"
              className="mt-6 inline-flex min-h-12 items-center justify-center rounded-full bg-wine px-6 text-center text-base font-extrabold text-wine-foreground transition-transform hover:scale-[1.02]"
            >
              Suscribirme por USD 55,99/año
            </a>
          </article>

        </div>

        <div className="mt-8 rounded-3xl bg-secondary p-6 text-secondary-foreground sm:p-8">
          <div className="flex items-center gap-3">
            <ShieldCheck className="size-7 shrink-0 text-primary" aria-hidden="true" />
            <h2 className="text-center min-w-0 font-display text-2xl font-extrabold sm:text-3xl">Garantía</h2>
          </div>
          <div className="mt-4 space-y-3 text-base">
            <p>Toma esta decisión con total tranquilidad.</p>
            <p>
              Por eso comienzas con un <strong className="font-bold">Diagnóstico Gratuito</strong>,
              sin compromiso.
            </p>
            <p>
              Y si decides suscribirte, dispones de <strong className="font-bold">7 días</strong>{" "}
              para probar todas las funciones.
            </p>
            <p>
              Si durante ese período consideras que TRADUCTOR CANINO IA no aporta valor a la
              convivencia con tu perro, podrás cancelar y solicitar el reembolso conforme a las
              condiciones de la plataforma de pago.
            </p>
            <p className="font-bold">
              Queremos que permanezcas porque la aplicación te ayuda, no porque estés obligado.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
