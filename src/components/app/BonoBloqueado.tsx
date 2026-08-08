import { Link } from "@tanstack/react-router";
import { Crown, Lock } from "lucide-react";

/** Bloque mostrado en la Versión BASE cuando la herramienta pertenece a los bonos. */
export function BonoBloqueado({ titulo, texto }: { titulo: string; texto: string }) {
  return (
    <section className="rounded-4xl border border-border bg-card p-6 text-center sm:p-10">
      <span className="mx-auto grid size-14 place-items-center rounded-full bg-secondary">
        <Lock className="size-6 text-muted-foreground" aria-hidden="true" />
      </span>
      <h1 className="mt-4 font-display text-2xl font-extrabold text-balance sm:text-3xl">{titulo}</h1>
      <p className="mx-auto mt-2 max-w-md text-base text-muted-foreground">{texto}</p>
      <p className="mx-auto mt-4 max-w-md rounded-2xl bg-secondary/60 p-4 text-sm text-muted-foreground">
        Estás usando la <span className="font-bold text-foreground">Versión BASE</span>, que incluye
        diagnóstico, plan de 21 días, rutina, triaje, señales y soluciones. Los bonos (calendario de
        salud y biblioteca de juegos) están en la Versión Completa.
      </p>
      <Link
        to="/checkout"
        search={{ plan: "anual" }}
        className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-7 text-base font-extrabold text-primary-foreground"
      >
        <Crown className="size-4" aria-hidden="true" />
        Pasar a la Versión Completa
      </Link>
    </section>
  );
}
