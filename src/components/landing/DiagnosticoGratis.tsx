import { useState } from "react";
import { Sparkles, Loader2, CheckCircle2, Lock } from "lucide-react";

const comportamientos = [
  "Ladridos excesivos",
  "Ansiedad por separación",
  "Tirones de correa",
  "Conductas destructivas",
  "Reactividad con otros perros",
  "Miedos",
  "Higiene / accidentes en casa",
  "Mordidas de cachorro",
];

const etapas = ["Cachorro (0-6 meses)", "Joven (6-18 meses)", "Adulto", "Senior"];

export function DiagnosticoGratis() {
  const [nombre, setNombre] = useState("");
  const [etapa, setEtapa] = useState<string>(etapas[0] ?? "");
  const [raza, setRaza] = useState("");
  const [conducta, setConducta] = useState<string>(comportamientos[0] ?? "");
  const [estado, setEstado] = useState<"idle" | "loading" | "done">("idle");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEstado("loading");
    setTimeout(() => setEstado("done"), 1400);
  };

  return (
    <section id="diagnostico" className="scroll-mt-24 bg-cream">
      <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 md:py-20">
        <div className="flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-wine px-4 py-1.5 text-xs font-bold tracking-widest text-wine-foreground uppercase">
            <Sparkles className="size-3.5 text-primary" aria-hidden="true" />
            Gancho gratuito
          </span>
        </div>
        <h2 className="mt-4 text-center font-display text-3xl font-extrabold tracking-tight text-balance sm:text-4xl md:text-5xl">
          Prueba tu primer diagnóstico gratuito
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-base text-muted-foreground sm:text-lg">
          Cuéntanos lo esencial sobre tu perro y la IA te mostrará una vista previa de su informe en
          menos de 3 minutos.
        </p>

        <div className="mt-8 overflow-hidden rounded-4xl border border-border bg-card shadow-xl shadow-wine/5">
          <div className="grid md:grid-cols-[minmax(0,1fr)_42%]">
            <form onSubmit={onSubmit} className="min-w-0 p-6 sm:p-8">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="min-w-0 text-sm font-bold">
                  Nombre de tu perro
                  <input
                    required
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Ej: Luna"
                    className="mt-1.5 min-h-12 w-full rounded-2xl border border-input bg-background px-4 text-base font-normal outline-none focus:border-primary focus:ring-2 focus:ring-ring/40"
                  />
                </label>
                <label className="min-w-0 text-sm font-bold">
                  Raza (o mestizo)
                  <input
                    value={raza}
                    onChange={(e) => setRaza(e.target.value)}
                    placeholder="Ej: Labrador"
                    className="mt-1.5 min-h-12 w-full rounded-2xl border border-input bg-background px-4 text-base font-normal outline-none focus:border-primary focus:ring-2 focus:ring-ring/40"
                  />
                </label>
                <label className="min-w-0 text-sm font-bold">
                  Etapa
                  <select
                    value={etapa}
                    onChange={(e) => setEtapa(e.target.value)}
                    className="mt-1.5 min-h-12 w-full rounded-2xl border border-input bg-background px-4 text-base font-normal outline-none focus:border-primary focus:ring-2 focus:ring-ring/40"
                  >
                    {etapas.map((e2) => (
                      <option key={e2}>{e2}</option>
                    ))}
                  </select>
                </label>
                <label className="min-w-0 text-sm font-bold">
                  Comportamiento a resolver
                  <select
                    value={conducta}
                    onChange={(e) => setConducta(e.target.value)}
                    className="mt-1.5 min-h-12 w-full rounded-2xl border border-input bg-background px-4 text-base font-normal outline-none focus:border-primary focus:ring-2 focus:ring-ring/40"
                  >
                    {comportamientos.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </label>
              </div>

              <button
                type="submit"
                disabled={estado === "loading"}
                className="mt-6 inline-flex min-h-13 w-full items-center justify-center gap-2 rounded-full bg-primary px-7 text-base font-extrabold text-primary-foreground transition-transform hover:scale-[1.01] disabled:opacity-70"
              >
                {estado === "loading" ? (
                  <>
                    <Loader2 className="size-5 animate-spin" aria-hidden="true" />
                    Analizando a {nombre || "tu perro"}…
                  </>
                ) : (
                  "Analizar a mi perro gratis"
                )}
              </button>
              <p className="mt-3 text-center text-sm text-muted-foreground">
                Sin tarjeta de crédito. Sin compromiso.
              </p>
            </form>

            <aside className="min-w-0 bg-wine p-6 text-wine-foreground sm:p-8">
              {estado === "done" ? (
                <div>
                  <p className="text-xs font-bold tracking-widest text-primary uppercase">
                    Vista previa del informe
                  </p>
                  <h3 className="mt-2 font-display text-xl font-bold">
                    {nombre || "Tu perro"} · {conducta}
                  </h3>
                  <ul className="mt-4 space-y-3 text-sm text-wine-foreground/85">
                    <li className="grid grid-cols-[auto_minmax(0,1fr)] gap-2">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                      <span className="min-w-0">
                        Causa probable identificada según etapa ({etapa.toLowerCase()}) y rutina.
                      </span>
                    </li>
                    <li className="grid grid-cols-[auto_minmax(0,1fr)] gap-2">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                      <span className="min-w-0">2 errores comunes que podrían estar reforzándolo.</span>
                    </li>
                    <li className="grid grid-cols-[auto_minmax(0,1fr)] gap-2">
                      <Lock className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                      <span className="min-w-0">
                        Plan completo paso a paso, seguimiento y análisis de video: disponible al
                        activar tu suscripción.
                      </span>
                    </li>
                  </ul>
                  <a
                    href="#planes"
                    className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-primary px-6 text-base font-extrabold text-primary-foreground"
                  >
                    Ver planes
                  </a>
                </div>
              ) : (
                <div>
                  <p className="text-xs font-bold tracking-widest text-primary uppercase">
                    Qué recibirás
                  </p>
                  <ul className="mt-4 space-y-3 text-sm text-wine-foreground/85">
                    {[
                      "Qué está ocurriendo realmente.",
                      "Por qué ocurre.",
                      "Qué errores refuerzan el problema.",
                      "Primeros pasos para corregirlo.",
                    ].map((t) => (
                      <li key={t} className="grid grid-cols-[auto_minmax(0,1fr)] gap-2">
                        <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                        <span className="min-w-0">{t}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 rounded-2xl bg-wine-foreground/10 p-4 text-sm">
                    <p className="font-display text-2xl font-extrabold text-primary">3 min</p>
                    <p className="mt-1 text-wine-foreground/80">
                      es todo lo que necesitas para entender a tu perro.
                    </p>
                  </div>
                </div>
              )}
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
