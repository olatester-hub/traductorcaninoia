import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, ArrowLeft, ShieldCheck, Sparkles, Lock } from "lucide-react";

const PAGO: Record<"mensual" | "anual", string> = {
  mensual: "https://pay.hotmart.com/L107111884K?off=pjr5hqql",
  anual: "https://pay.hotmart.com/L107111884K?off=axlr8y2x",
};

const title = "Resumen de tu plan — Traductor Canino IA";
const description =
  "Revisa lo que incluye tu Versión Básica o Versión Completa de Traductor Canino IA antes de completar el pago.";

type PlanId = "mensual" | "anual";

const planes: Record<
  PlanId,
  { nombre: string; precio: string; ciclo: string; nota: string; extra?: string }
> = {
  mensual: {
    nombre: "Versión Básica",
    precio: "USD 4,99",
    ciclo: "pago único",
    nota: "Cancela cuando quieras.",
  },
  anual: {
    nombre: "Versión Completa",
    precio: "USD 6,99",
    ciclo: "pago único",
    nota: "La experiencia completa, con bonos incluidos.",
    extra: "Incluye todo lo de la Versión Básica más los bonos exclusivos.",
  },
};

const incluye = [
  "Diagnósticos personalizados ilimitados.",
  "Planes de acción adaptados a tu perro.",
  "Traductor de conductas.",
  "Modo Cachorro.",
  "Modo Perro Adulto.",
  "Predictor Inteligente de Higiene.",
  "Asistente IA disponible las 24 horas.",
  "Biblioteca de soluciones en constante crecimiento.",
  "Seguimiento de progreso y recomendaciones personalizadas.",
  "Actualizaciones permanentes con nuevas funciones.",
];

const bonos = [
  "Bono 1 — Calendario Inteligente de Salud Canina.",
  "Bono 2 — Biblioteca de Juegos Inteligentes.",
];

export const Route = createFileRoute("/checkout")({
  validateSearch: (search: Record<string, unknown>): { plan: PlanId } => ({
    plan: search['plan'] === "mensual" ? "mensual" : "anual",
  }),
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const { plan } = Route.useSearch() as { plan: PlanId };
  
  const actual = planes[plan];
  const otro: PlanId = plan === "anual" ? "mensual" : "anual";

  return (
    <div className="min-h-screen bg-cream font-sans antialiased">
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 md:py-14">
        <Link
          to="/"
          className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-foreground/70 hover:text-foreground"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Volver a la página
        </Link>

        <div className="mt-4 flex justify-center">
          <span className="inline-flex rounded-full bg-primary/20 px-4 py-1.5 text-xs font-bold tracking-widest text-foreground/70 uppercase">
            Resumen de compra
          </span>
        </div>
        <h1 className="mt-3 text-center font-display text-3xl font-extrabold tracking-tight text-balance sm:text-4xl">
          Revisa tu plan antes de pagar
        </h1>

        <div className="mt-8 grid gap-5 md:grid-cols-[minmax(0,1fr)_320px]">
          <section className="rounded-3xl border border-border bg-card p-6 sm:p-8">
            <h2 className="text-center font-display text-2xl font-extrabold">
              Todo lo que incluye
            </h2>
            <ul className="mt-5 grid gap-2">
              {(plan === "anual" ? [...incluye, ...bonos] : incluye).map((item) => (
                <li
                  key={item}
                  className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-3 rounded-2xl bg-background px-3 py-2"
                >
                  <span
                    className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground"
                    aria-hidden="true"
                  >
                    <Check className="size-4" />
                  </span>
                  <span className="min-w-0 text-base">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <aside className="h-fit rounded-3xl bg-primary p-6 text-primary-foreground sm:p-8 md:sticky md:top-6">
            <h2 className="text-center font-display text-2xl font-extrabold">{actual.nombre}</h2>
            <p className="mt-3 text-center font-display text-4xl font-extrabold">{actual.precio}</p>
            <p className="text-center text-base font-bold">{actual.ciclo}</p>
            <p className="mt-2 text-center text-sm">{actual.nota}</p>
            {actual.extra ? (
              <p className="mt-3 rounded-2xl bg-primary-foreground/15 px-3 py-2 text-center text-sm font-semibold">
                {actual.extra}
              </p>
            ) : null}

            <div className="mt-5 space-y-2 text-sm">
              <p className="flex items-center gap-2">
                <ShieldCheck className="size-4 shrink-0" aria-hidden="true" />7 días para probar
                todas las funciones
              </p>
              <p className="flex items-center gap-2">
                <Sparkles className="size-4 shrink-0" aria-hidden="true" />
                Acceso inmediato tras el pago
              </p>
              <p className="flex items-center gap-2">
                <Lock className="size-4 shrink-0" aria-hidden="true" />
                Pago seguro
              </p>
            </div>

            <a
              href={PAGO[plan]}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-wine px-6 text-base font-extrabold text-wine-foreground transition-transform hover:scale-[1.02]"
            >
              Ir al pago
            </a>
            <p className="mt-3 text-center text-xs text-primary-foreground/80">
              Pagas de forma segura en Hotmart. Al aprobarse el pago, entra con el mismo correo de
              tu compra y se desbloquea la {actual.nombre}.
            </p>



            <Link
              to="/checkout"
              search={{ plan: otro }}
              className="mt-4 flex min-h-11 items-center justify-center rounded-full border border-primary-foreground/40 px-4 text-sm font-bold"
            >
              Cambiar a la {planes[otro].nombre}
            </Link>
          </aside>
        </div>
      </div>
    </div>
  );
}
