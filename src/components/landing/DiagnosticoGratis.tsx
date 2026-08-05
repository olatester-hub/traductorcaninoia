import { useState } from "react";
import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Brain,
  CheckCircle2,
  Dog,
  Home,
  Loader2,
  Lock,
  PawPrint,
  Search,
  Sparkles,
  Target,
  Timer,
} from "lucide-react";
import { TrustChips } from "./Trust";

const etapas = [
  "Cachorro (< 6 meses)",
  "Cachorro joven (6-12 meses)",
  "Adulto (1-6 años)",
  "Senior (+7 años)",
];

const entornos = [
  "Casa con patio",
  "Departamento / piso sin patio",
  "Hogar con niños pequeños",
  "Hogar con otras mascotas",
];

const comportamientos = [
  "Ladridos excesivos",
  "Ansiedad por separación",
  "Tirones de correa",
  "Conductas destructivas",
  "Reactividad con otros perros",
  "Miedos y fobias",
  "Higiene / accidentes en casa",
  "Mordidas de juego",
];

const intensidades = ["Ocasional", "Frecuente", "Constante"];

const razas = [
  "Mestizo / sin raza definida",
  "Labrador Retriever",
  "Golden Retriever",
  "Pastor Alemán",
  "Bulldog Francés",
  "Bulldog Inglés",
  "Poodle / Caniche",
  "Chihuahua",
  "Yorkshire Terrier",
  "Beagle",
  "Dachshund / Salchicha",
  "Rottweiler",
  "Boxer",
  "Shih Tzu",
  "Pomerania",
  "Border Collie",
  "Husky Siberiano",
  "Schnauzer",
  "Cocker Spaniel",
  "Maltés",
  "Pug",
  "Pastor Australiano",
  "Doberman",
  "Gran Danés",
  "Bichón Frisé",
  "Jack Russell Terrier",
  "Basset Hound",
  "Akita",
  "Shiba Inu",
  "Weimaraner",
  "Pitbull / American Bully",
  "Setter Irlandés",
  "San Bernardo",
  "Samoyedo",
  "Galgo / Whippet",
  "Terranova",
  "Cane Corso",
  "Dálmata",
  "Collie",
  "Mastín",
  "Otra raza",
];

type Estado = "form" | "loading" | "done";

export function DiagnosticoGratis() {
  const [paso, setPaso] = useState<1 | 2>(1);
  const [estado, setEstado] = useState<Estado>("form");
  const [nombre, setNombre] = useState("");
  const [etapa, setEtapa] = useState(etapas[0] ?? "");
  const [raza, setRaza] = useState("");
  const [entorno, setEntorno] = useState(entornos[0] ?? "");
  const [conducta, setConducta] = useState("");
  const [intensidad, setIntensidad] = useState("");
  const [detalle, setDetalle] = useState("");

  const paso2Completo = conducta.trim() !== "" && intensidad.trim() !== "";

  const analizar = (e: React.FormEvent) => {
    e.preventDefault();
    if (paso !== 2 || !paso2Completo) return;
    setEstado("loading");
    setTimeout(() => setEstado("done"), 1800);
  };

  const reiniciar = () => {
    setEstado("form");
    setPaso(1);
    setConducta("");
    setIntensidad("");
    setDetalle("");
  };

  const inputCls =
    "mt-1.5 min-h-12 w-full rounded-2xl border border-input bg-background px-4 text-base font-normal outline-none focus:border-primary focus:ring-2 focus:ring-ring/40";

  return (
    <section id="diagnostico" className="scroll-mt-24 bg-cream">
      <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 md:py-20">
        <div className="flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-wine px-4 py-1.5 text-xs font-bold tracking-widest text-wine-foreground uppercase">
            <Sparkles className="size-3.5 text-primary" aria-hidden="true" />
            Simulador de diagnóstico gratuito
          </span>
        </div>
        <h2 className="mt-4 text-center font-display text-3xl font-extrabold tracking-tight text-balance sm:text-4xl md:text-5xl">
          Prueba tu primer diagnóstico gratuito
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-base text-muted-foreground sm:text-lg">
          Completa la información de tu perro y deja que la inteligencia artificial analice la causa
          emocional y te entregue un plan de acción en tiempo real.
        </p>

        <div className="mt-8 overflow-hidden rounded-4xl border border-border bg-card shadow-xl shadow-wine/5">
          {/* Stepper */}
          <div className="grid grid-cols-2 border-b border-border">
            {[
              { n: 1, label: "Datos del perro", icon: Dog },
              { n: 2, label: "Comportamiento & diagnóstico", icon: Brain },
            ].map(({ n, label, icon: Icon }) => {
              const activo = (estado === "done" && n === 2) || (estado !== "done" && paso === n);
              return (
                <div
                  key={n}
                  className={`grid min-w-0 grid-cols-[auto_minmax(0,1fr)] items-center gap-2 px-4 py-3 text-left sm:px-6 ${
                    activo ? "bg-primary/15" : "bg-transparent"
                  }`}
                >
                  <span
                    className={`inline-flex size-8 shrink-0 items-center justify-center rounded-full ${
                      activo
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-muted-foreground"
                    }`}
                  >
                    <Icon className="size-4" aria-hidden="true" />
                  </span>
                  <span className="min-w-0 truncate text-xs font-bold sm:text-sm">{label}</span>
                </div>
              );
            })}
          </div>

          <div className="grid md:grid-cols-[minmax(0,1fr)_42%]">
            <div className="min-w-0 p-6 sm:p-8">
              {estado === "done" ? (
                <div>
                  <p className="inline-flex items-center gap-2 rounded-full bg-primary/20 px-3 py-1.5 text-xs font-bold tracking-widest uppercase">
                    <Search className="size-3.5 text-primary" aria-hidden="true" />
                    Diagnóstico preliminar
                  </p>
                  <h3 className="mt-3 font-display text-2xl font-extrabold">
                    {nombre || "Tu perro"} · {conducta}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {etapa} · {raza || "Mestizo"} · {entorno} · Intensidad: {intensidad.toLowerCase()}
                  </p>

                  <ul className="mt-6 space-y-4">
                    {[
                      {
                        icon: Activity,
                        titulo: "Qué está ocurriendo",
                        texto: `Señales compatibles con activación emocional sostenida: ${conducta.toLowerCase()} como forma de comunicar una necesidad no cubierta.`,
                      },
                      {
                        icon: Brain,
                        titulo: "Por qué ocurre",
                        texto: `Combinación de etapa (${etapa.toLowerCase()}), nivel de estimulación y entorno (${entorno.toLowerCase()}).`,
                      },
                      {
                        icon: AlertTriangle,
                        titulo: "Errores a evitar",
                        texto:
                          "Regañar después del hecho y dar atención justo cuando aparece la conducta: ambos la refuerzan.",
                      },
                    ].map(({ icon: Icon, titulo, texto }) => (
                      <li key={titulo} className="grid grid-cols-[auto_minmax(0,1fr)] gap-3">
                        <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-2xl bg-primary/20">
                          <Icon className="size-4 text-primary" aria-hidden="true" />
                        </span>
                        <div className="min-w-0">
                          <p className="text-sm font-bold">{titulo}</p>
                          <p className="mt-0.5 text-sm text-muted-foreground">{texto}</p>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 rounded-3xl border border-dashed border-primary/50 bg-primary/10 p-5">
                    <p className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-2 text-sm font-bold">
                      <Lock className="size-4 shrink-0 text-primary" aria-hidden="true" />
                      <span className="min-w-0">Paso a paso exacto + seguimiento continuo</span>
                    </p>
                    <p className="mt-1.5 text-sm text-muted-foreground">
                      El plan completo, el análisis de video y el asistente 24/7 se desbloquean al
                      activar tu suscripción.
                    </p>
                    <a
                      href="#planes"
                      className="mt-4 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-6 text-base font-extrabold text-primary-foreground"
                    >
                      Ver planes
                      <ArrowRight className="size-4" aria-hidden="true" />
                    </a>
                  </div>

                  <button
                    type="button"
                    onClick={reiniciar}
                    className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-foreground"
                  >
                    <ArrowLeft className="size-4" aria-hidden="true" />
                    Hacer otro diagnóstico
                  </button>
                </div>
              ) : (
                <form onSubmit={analizar}>
                  {paso === 1 ? (
                    <div className="grid gap-4 sm:grid-cols-2">
                      <label className="min-w-0 text-sm font-bold">
                        <span className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-1.5">
                          <PawPrint className="size-4 shrink-0 text-primary" aria-hidden="true" />
                          <span className="min-w-0">Nombre de tu perro *</span>
                        </span>
                        <input
                          required
                          value={nombre}
                          onChange={(e) => setNombre(e.target.value)}
                          placeholder="Ej: Luna"
                          className={inputCls}
                        />
                      </label>
                      <label className="min-w-0 text-sm font-bold">
                        <span className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-1.5">
                          <Timer className="size-4 shrink-0 text-primary" aria-hidden="true" />
                          <span className="min-w-0">Edad o etapa de vida</span>
                        </span>
                        <select
                          value={etapa}
                          onChange={(e) => setEtapa(e.target.value)}
                          className={inputCls}
                        >
                          {etapas.map((x) => (
                            <option key={x}>{x}</option>
                          ))}
                        </select>
                      </label>
                      <label className="min-w-0 text-sm font-bold">
                        <span className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-1.5">
                          <Dog className="size-4 shrink-0 text-primary" aria-hidden="true" />
                          <span className="min-w-0">Raza o tipo</span>
                        </span>
                        <input
                          value={raza}
                          onChange={(e) => setRaza(e.target.value)}
                          list="razas-comunes"
                          placeholder="Elige o escribe la raza"
                          className={inputCls}
                        />
                        <datalist id="razas-comunes">
                          {razas.map((x) => (
                            <option key={x} value={x} />
                          ))}
                        </datalist>
                      </label>
                      <label className="min-w-0 text-sm font-bold">
                        <span className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-1.5">
                          <Home className="size-4 shrink-0 text-primary" aria-hidden="true" />
                          <span className="min-w-0">Entorno familiar</span>
                        </span>
                        <select
                          value={entorno}
                          onChange={(e) => setEntorno(e.target.value)}
                          className={inputCls}
                        >
                          {entornos.map((x) => (
                            <option key={x}>{x}</option>
                          ))}
                        </select>
                      </label>
                    </div>
                  ) : (
                    <div className="grid gap-4">
                      <label className="min-w-0 text-sm font-bold">
                        <span className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-1.5">
                          <Target className="size-4 shrink-0 text-primary" aria-hidden="true" />
                          <span className="min-w-0">Comportamiento a resolver</span>
                        </span>
                        <select
                          required
                          value={conducta}
                          onChange={(e) => setConducta(e.target.value)}
                          className={inputCls}
                        >
                          <option value="" disabled>
                            Selecciona la conducta observada
                          </option>
                          {comportamientos.map((x) => (
                            <option key={x}>{x}</option>
                          ))}
                        </select>
                      </label>

                      <fieldset className="min-w-0">
                        <legend className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-1.5 text-sm font-bold">
                          <Activity className="size-4 shrink-0 text-primary" aria-hidden="true" />
                          <span className="min-w-0">Frecuencia e intensidad</span>
                        </legend>
                        <div className="mt-2 grid grid-cols-3 gap-2">
                          {intensidades.map((x) => (
                            <button
                              key={x}
                              type="button"
                              onClick={() => setIntensidad(x)}
                              className={`min-h-11 rounded-2xl border px-2 text-sm font-bold transition-colors ${
                                intensidad === x
                                  ? "border-primary bg-primary text-primary-foreground"
                                  : "border-input bg-background hover:bg-secondary"
                              }`}
                            >
                              {x}
                            </button>
                          ))}
                        </div>
                      </fieldset>

                      <label className="min-w-0 text-sm font-bold">
                        <span className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-1.5">
                          <Search className="size-4 shrink-0 text-primary" aria-hidden="true" />
                          <span className="min-w-0">¿Cuándo ocurre? (opcional)</span>
                        </span>
                        <textarea
                          value={detalle}
                          onChange={(e) => setDetalle(e.target.value)}
                          rows={3}
                          placeholder="Ej: cuando salgo de casa o cuando pasa otro perro"
                          className="mt-1.5 w-full rounded-2xl border border-input bg-background px-4 py-3 text-base font-normal outline-none focus:border-primary focus:ring-2 focus:ring-ring/40"
                        />
                      </label>
                    </div>
                  )}

                  <div className="mt-6 flex flex-col gap-3 sm:flex-row-reverse">
                    {paso === 1 ? (
                      <button
                        type="button"
                        onClick={() => nombre.trim() && setPaso(2)}
                        disabled={!nombre.trim()}
                        className="inline-flex min-h-13 w-full items-center justify-center gap-2 rounded-full bg-primary px-7 text-base font-extrabold text-primary-foreground transition-transform hover:scale-[1.01] disabled:opacity-60"
                      >
                        Continuar al diagnóstico
                        <ArrowRight className="size-5" aria-hidden="true" />
                      </button>
                    ) : (
                      <>
                        <button
                          type="submit"
                          disabled={estado === "loading" || !paso2Completo}
                          className="inline-flex min-h-13 w-full items-center justify-center gap-2 rounded-full bg-primary px-7 text-base font-extrabold text-primary-foreground transition-transform hover:scale-[1.01] disabled:opacity-70"
                        >
                          {estado === "loading" ? (
                            <>
                              <Loader2 className="size-5 animate-spin" aria-hidden="true" />
                              Analizando a {nombre || "tu perro"}…
                            </>
                          ) : (
                            <>
                              <Sparkles className="size-5" aria-hidden="true" />
                              Analizar a mi perro gratis
                            </>
                          )}
                        </button>
                        <button
                          type="button"
                          onClick={() => setPaso(1)}
                          className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full border border-foreground/20 px-6 text-base font-bold hover:bg-secondary"
                        >
                          <ArrowLeft className="size-4" aria-hidden="true" />
                          Volver
                        </button>
                      </>
                    )}
                  </div>
                  <TrustChips className="mt-4" withTime />
                </form>
              )}
            </div>

            <aside className="min-w-0 bg-wine p-6 text-wine-foreground sm:p-8">
              <p className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-2 text-xs font-bold tracking-widest text-primary uppercase">
                <Brain className="size-4 shrink-0" aria-hidden="true" />
                <span className="min-w-0">Qué recibirás</span>
              </p>
              <ul className="mt-4 space-y-3 text-sm text-wine-foreground/85">
                {[
                  { icon: Activity, t: "Qué está ocurriendo realmente." },
                  { icon: Brain, t: "Por qué ocurre (causa raíz)." },
                  { icon: AlertTriangle, t: "Qué errores refuerzan el problema." },
                  { icon: Target, t: "Primeros pasos para corregirlo." },
                ].map(({ icon: Icon, t }) => (
                  <li key={t} className="grid grid-cols-[auto_minmax(0,1fr)] gap-2">
                    <Icon className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                    <span className="min-w-0">{t}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 rounded-2xl bg-wine-foreground/10 p-4">
                <p className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-2">
                  <Timer className="size-5 shrink-0 text-primary" aria-hidden="true" />
                  <span className="min-w-0 font-display text-2xl font-extrabold text-primary">
                    3 min
                  </span>
                </p>
                <p className="mt-1 text-sm text-wine-foreground/80">
                  es todo lo que necesitas para entender a tu perro.
                </p>
              </div>

              <ul className="mt-6 space-y-2 text-sm text-wine-foreground/85">
                {["Sin adivinar.", "Sin consejos genéricos.", "Sin perder horas buscando."].map(
                  (t) => (
                    <li key={t} className="grid grid-cols-[auto_minmax(0,1fr)] gap-2">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                      <span className="min-w-0">{t}</span>
                    </li>
                  ),
                )}
              </ul>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
