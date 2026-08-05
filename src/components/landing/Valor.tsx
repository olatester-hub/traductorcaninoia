import { HeartHandshake, Lightbulb, ShieldCheck, Home, BadgeCheck } from "lucide-react";

const compras = [
  { label: "Tranquilidad", Icon: HeartHandshake },
  { label: "Claridad", Icon: Lightbulb },
  { label: "Confianza", Icon: ShieldCheck },
  { label: "Una convivencia más armoniosa", Icon: Home },
  { label: "La seguridad de saber que estás haciendo lo correcto para tu perro", Icon: BadgeCheck },
];

export function Valor() {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 md:py-16">
        <h2 className="text-center font-display text-3xl font-extrabold tracking-tight text-balance sm:text-4xl md:text-5xl">
          Lo que realmente estás comprando
        </h2>

        <p className="mt-4 text-center font-display text-xl font-bold text-muted-foreground sm:text-2xl">
          No compras una aplicación.
        </p>

        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {compras.map(({ label, Icon }, i) => (
            <li
              key={label}
              className={`grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3 rounded-2xl border border-border bg-card p-4 ${
                i === compras.length - 1 ? "sm:col-span-2" : ""
              }`}
            >
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary/15">
                <Icon className="size-5 text-primary" aria-hidden="true" />
              </span>
              <span className="min-w-0 font-display text-lg font-bold text-card-foreground">
                {label}
              </span>
            </li>
          ))}
        </ul>

        <p className="mt-6 text-center text-base text-muted-foreground sm:text-lg">
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
