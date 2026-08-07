import logoAsset from "@/assets/logo.png.asset.json";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur">
      <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 sm:px-6">
        <a href="#inicio" className="flex min-w-0 items-center">
          <img
            src={logoAsset.url}
            alt="Traductor Canino IA — Tu copiloto de crianza canina"
            className="h-10 w-auto max-w-full object-contain sm:h-24"
          />
        </a>
        <div className="flex shrink-0 items-center gap-2">
          <a
            href="#diagnostico"
            className="inline-flex min-h-11 items-center rounded-full bg-primary px-4 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Diagnóstico gratis
          </a>
        </div>
      </div>
    </header>
  );
}
