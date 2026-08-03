import { PawPrint } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur">
      <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 sm:px-6">
        <a href="#inicio" className="flex min-w-0 items-center gap-2">
          <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground">
            <PawPrint className="size-5" aria-hidden="true" />
          </span>
          <span className="truncate font-display text-sm font-extrabold tracking-tight uppercase sm:text-base">
            Traductor Canino IA
          </span>
        </a>
        <a
          href="#diagnostico"
          className="inline-flex min-h-11 shrink-0 items-center rounded-full bg-primary px-4 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Diagnóstico gratis
        </a>
      </div>
    </header>
  );
}
