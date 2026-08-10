import { Link, createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import {
  Activity,
  ArrowRight,
  CalendarHeart,
  Dog,
  Eye,
  Gamepad2,
  ListChecks,
  Plus,
  Scale,
  Siren,
  Sparkles,
  Stethoscope,
  Trash2,
} from "lucide-react";
import { BreedPicker } from "@/components/landing/BreedPicker";
import {
  ENTORNOS,
  ETAPAS,
  K,
  MAX_PERROS,
  type PlanGuardado,
  diasDesde,
  useLocalState,
  usePerros,
} from "@/lib/app-store";
import { useVersion } from "@/lib/version";

const title = "Panel de tu perro — Traductor Canino IA";
const description =
  "Tu centro de crianza: diagnóstico, plan de 21 días, rutina, señales corporales, salud y juegos en un solo lugar.";

export const Route = createFileRoute("/app/")({
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
  component: Panel,
});

const HERRAMIENTAS = [
  {
    to: "/app/diagnostico",
    icon: Stethoscope,
    titulo: "Diagnóstico interactivo",
    texto: "Interpretación, causa raíz emocional, errores comunes y plan de acción.",
  },
  {
    to: "/app/plan",
    icon: ListChecks,
    titulo: "Seguimiento de 21 días",
    texto: "Marca cada día, mantén la racha y mide el progreso real.",
  },
  {
    to: "/app/rutina",
    icon: Activity,
    titulo: "Calculadora de rutina",
    texto: "Detecta déficits de paseo, olfato, trabajo mental y descanso.",
  },
  {
    to: "/app/triaje",
    icon: Siren,
    titulo: "Triaje de urgencia",
    texto: "Distingue en 4 preguntas si es conducta, dolor o emergencia.",
  },
  {
    to: "/app/senales",
    icon: Eye,
    titulo: "Traductor de señales",
    texto: "Qué significa cada postura, oreja, cola y mirada, y qué hacer.",
  },
  {
    to: "/app/soluciones",
    icon: Scale,
    titulo: "Soluciones y métodos",
    texto: "Qué hacer cuando no avanza y qué métodos evitar (y por qué).",
  },
  {
    bono: true,
    to: "/app/calendario",
    icon: CalendarHeart,
    titulo: "Calendario de salud",
    texto: "Bono 1: vacunas, antiparasitarios e higiene con próximas fechas.",
  },
  {
    bono: true,
    to: "/app/juegos",
    icon: Gamepad2,
    titulo: "Biblioteca de juegos",
    texto: "Bono 2: filtra por espacio, energía, etapa y objetivo.",
  },
];

function Panel() {
  const version = useVersion();
  const herramientas = version === "base" ? HERRAMIENTAS.filter((h) => !h.bono) : HERRAMIENTAS;
  const { lista, perro, perfil, puedeAgregar, seleccionar, agregar, actualizar, eliminar } =
    usePerros();
  const { value: plan } = useLocalState<PlanGuardado | null>(K.plan, null);

  const dia = useMemo(() => (plan ? Math.min(21, diasDesde(plan.creado) + 1) : 0), [plan]);
  const hechos = plan ? Object.values(plan.hechos).filter(Boolean).length : 0;

  const inputCls =
    "mt-1.5 min-h-12 w-full rounded-2xl border border-input bg-background px-4 text-base outline-none focus:border-primary focus:ring-2 focus:ring-ring/40";

  const set = (patch: Parameters<typeof actualizar>[1]) => {
    if (perro) actualizar(perro.id, patch);
  };

  return (
    <div className="space-y-8">
      <section className="rounded-4xl bg-wine p-6 text-wine-foreground sm:p-8">
        <span className="inline-flex items-center gap-2 rounded-full bg-primary/20 px-3 py-1 text-[11px] font-bold tracking-widest uppercase">
          <Sparkles className="size-3.5 text-primary" aria-hidden="true" />
          Tu copiloto de crianza
        </span>
        <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-balance sm:text-4xl">
          {perfil.nombre ? `Hola, ${perfil.nombre}` : "Empecemos por conocer a tu perro"}
        </h1>
        <p className="mt-2 max-w-2xl text-base text-wine-foreground/85">
          Puedes administrar hasta {MAX_PERROS} perros. El perro activo personaliza el diagnóstico,
          la rutina, el calendario de salud y los juegos recomendados.
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-2">
          {lista.map((p) => {
            const activo = perro?.id === p.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => seleccionar(p.id)}
                className={`inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-sm font-bold transition-colors ${
                  activo
                    ? "bg-primary text-primary-foreground"
                    : "bg-wine-foreground/10 text-wine-foreground"
                }`}
              >
                <Dog className="size-4 shrink-0" aria-hidden="true" />
                <span className="max-w-40 truncate">
                  {p.nombre.trim() || "Perro sin nombre"}
                  {p.raza ? ` · ${p.raza}` : ""}
                </span>
              </button>
            );
          })}

          {puedeAgregar ? (
            <button
              type="button"
              onClick={agregar}
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-wine-foreground/30 px-4 text-sm font-bold"
            >
              <Plus className="size-4" aria-hidden="true" />
              Añadir perro
            </button>
          ) : (
            <span className="text-xs font-semibold text-wine-foreground/70">
              Máximo de {MAX_PERROS} perros alcanzado
            </span>
          )}
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="text-sm font-bold">Nombre</span>
            <input
              value={perfil.nombre}
              onChange={(e) => set({ nombre: e.target.value })}
              placeholder="Ej: Luna"
              className={`${inputCls} text-foreground`}
            />
          </label>
          <div>
            <span className="text-sm font-bold">Raza o tipo</span>
            <div className="mt-1.5 text-foreground">
              <BreedPicker value={perfil.raza} onChange={(v) => set({ raza: v })} />
            </div>
          </div>
          <label className="block">
            <span className="text-sm font-bold">Etapa</span>
            <select
              value={perfil.etapa}
              onChange={(e) => set({ etapa: e.target.value })}
              className={`${inputCls} text-foreground`}
            >
              {ETAPAS.map((x) => (
                <option key={x}>{x}</option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="text-sm font-bold">Entorno</span>
            <select
              value={perfil.entorno}
              onChange={(e) => set({ entorno: e.target.value })}
              className={`${inputCls} text-foreground`}
            >
              {ENTORNOS.map((x) => (
                <option key={x}>{x}</option>
              ))}
            </select>
          </label>
          <div className="sm:col-span-2">
            <span className="text-sm font-bold">Nivel de energía</span>
            <div className="mt-1.5 grid grid-cols-3 gap-2">
              {(["Baja", "Media", "Alta"] as const).map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => set({ energia: n })}
                  className={`min-h-11 rounded-2xl px-3 text-sm font-bold transition-colors ${
                    perfil.energia === n
                      ? "bg-primary text-primary-foreground"
                      : "bg-wine-foreground/10 text-wine-foreground"
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
        </div>

        {perro && lista.length > 1 ? (
          <button
            type="button"
            onClick={() => eliminar(perro.id)}
            className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full border border-wine-foreground/30 px-4 text-sm font-bold"
          >
            <Trash2 className="size-4" aria-hidden="true" />
            Eliminar este perro
          </button>
        ) : null}
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        <article className="rounded-3xl border border-border bg-card p-5">
          <Dog className="size-6 text-primary" aria-hidden="true" />
          <p className="mt-3 text-sm text-muted-foreground">Perfil activo</p>
          <p className="font-display text-xl font-bold">{perfil.raza || "Sin raza definida"}</p>
          <p className="text-sm text-muted-foreground">{perfil.etapa}</p>
        </article>
        <article className="rounded-3xl bg-primary p-5 text-primary-foreground">
          <ListChecks className="size-6" aria-hidden="true" />
          <p className="mt-3 text-sm opacity-90">Plan activo</p>
          <p className="font-display text-xl font-bold">{plan ? plan.conducta : "Aún sin plan"}</p>
          <p className="text-sm opacity-90">
            {plan ? `Día ${dia} de 21 · ${hechos} tareas completadas` : "Haz tu diagnóstico"}
          </p>
        </article>
        <article className="rounded-3xl border border-border bg-accent p-5 text-accent-foreground">
          <Activity className="size-6" aria-hidden="true" />
          <p className="mt-3 text-sm opacity-80">Siguiente paso</p>
          <Link
            to={plan ? "/app/plan" : "/app/diagnostico"}
            className="mt-1 inline-flex items-center gap-2 font-display text-xl font-bold underline underline-offset-4"
          >
            {plan ? "Continuar el plan" : "Diagnosticar ahora"}
            <ArrowRight className="size-5" aria-hidden="true" />
          </Link>
        </article>
      </section>

      <section>
        <h2 className="text-center font-display text-2xl font-extrabold sm:text-3xl">
          Tus herramientas
        </h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {herramientas.map(({ to, icon: Icon, titulo, texto }) => (
            <Link
              key={to}
              to={to}
              className="group grid grid-cols-[auto_minmax(0,1fr)] items-start gap-3 rounded-3xl border border-border bg-card p-5 transition-colors hover:border-primary"
            >
              <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-primary/15">
                <Icon className="size-5 text-primary" aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="block font-display text-lg font-bold">{titulo}</span>
                <span className="mt-1 block text-sm text-muted-foreground">{texto}</span>
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
