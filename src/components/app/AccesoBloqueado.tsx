import { Link } from "@tanstack/react-router";
import { Crown, Lock, ShieldCheck } from "lucide-react";
import logoUrl from "@/assets/logo.png";

/** Muro de acceso: sin licencia comprada no se muestra ninguna versión de la app. */
export function AccesoBloqueado() {
  return (
    <div className="min-h-screen bg-cream font-sans antialiased">
      <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-12 text-center sm:px-6">
        <Link to="/" className="inline-flex">
          <img
            src={logoUrl}
            alt="Traductor Canino IA"
            className="h-14 w-auto object-contain sm:h-20"
          />
        </Link>

        <span className="mt-8 grid size-14 place-items-center rounded-full bg-secondary">
          <Lock className="size-6 text-muted-foreground" aria-hidden="true" />
        </span>
        <h1 className="mt-4 font-display text-3xl font-extrabold text-balance sm:text-4xl">
          Acceso reservado a quienes ya compraron
        </h1>
        <p className="mt-3 max-w-md text-base text-muted-foreground">
          El panel, el diagnóstico y todas las herramientas se activan al completar el pago. Elige
          tu versión y entra al instante.
        </p>

        <div className="mt-8 grid w-full gap-4 sm:grid-cols-2">
          <article className="rounded-3xl border border-border bg-card p-6 text-left">
            <p className="text-[11px] font-bold tracking-widest text-muted-foreground uppercase">
              Base
            </p>
            <h2 className="mt-1 font-display text-xl font-extrabold">Versión Básica</h2>
            <p className="mt-1 font-display text-2xl font-extrabold">USD 4,99</p>
            <p className="text-sm text-muted-foreground">Pago único, sin bonos.</p>
            <a
              href="https://pay.hotmart.com/L107111884K?off=pjr5hqql"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex min-h-11 items-center justify-center rounded-full bg-secondary px-5 text-sm font-extrabold text-secondary-foreground"
            >
              Comprar la Versión Básica
            </a>
          </article>

          <article className="rounded-3xl bg-wine p-6 text-left text-wine-foreground">
            <p className="text-[11px] font-bold tracking-widest uppercase opacity-80">Premium</p>
            <h2 className="mt-1 font-display text-xl font-extrabold">Versión Completa</h2>
            <p className="mt-1 font-display text-2xl font-extrabold">USD 6,99</p>
            <p className="text-sm opacity-85">Pago único, con los 2 bonos.</p>
            <a
              href="https://pay.hotmart.com/L107111884K?off=axlr8y2x"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex min-h-11 items-center justify-center gap-2 rounded-full bg-primary px-5 text-sm font-extrabold text-primary-foreground"
            >
              <Crown className="size-4" aria-hidden="true" />
              Comprar la Versión Completa
            </a>
          </article>
        </div>

        <p className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
          <ShieldCheck className="size-4" aria-hidden="true" />7 días de garantía en ambas versiones
        </p>
      </div>
    </div>
  );
}
