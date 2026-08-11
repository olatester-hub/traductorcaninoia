import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Activity,
  BellRing,
  Brain,
  Check,
  Clock,
  Moon,
  Sparkles,
  Timer,
  Wind,
} from "lucide-react";
import { K, useDatosPerro, useHistorial, usePerros } from "@/lib/app-store";

const title = "Recordatorios semanales — Traductor Canino IA";
const description =
  "Configura recordatorios para cumplir la rutina semanal de tu perro y marca cada tarea cuando la completes.";

export const Route = createFileRoute("/app/recordatorios")({
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
  component: RecordatoriosPage,
});

const DIAS = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

const TAREAS = [
  {
    id: "paseo",
    icon: Activity,
    titulo: "Paseo largo con ritmo tranquilo",
    detalle: "Mínimo 30-45 minutos sin tirones ni prisa.",
    dias: [0, 1, 2, 3, 4, 5, 6],
  },
  {
    id: "olfato",
    icon: Wind,
    titulo: "Olfateo libre o búsqueda de comida",
    detalle: "10-15 minutos donde tu perro decide dónde huele.",
    dias: [0, 2, 4, 6],
  },
  {
    id: "mental",
    icon: Brain,
    titulo: "Trabajo mental corto",
    detalle: "2 sesiones de 5 minutos: nombres, targets, quieto.",
    dias: [1, 3, 5],
  },
  {
    id: "calma",
    icon: Moon,
    titulo: "Ritual de calma y descanso",
    detalle: "Masticación o zona de descanso sin estímulos 20 minutos.",
    dias: [0, 1, 2, 3, 4, 5, 6],
  },
  {
    id: "plan",
    icon: Timer,
    titulo: "Sesión del plan de 21 días",
    detalle: "Repasa las tareas del día de tu plan activo.",
    dias: [0, 1, 2, 3, 4, 5, 6],
  },
  {
    id: "revision",
    icon: Sparkles,
    titulo: "Revisión semanal de avances",
    detalle: "Anota qué mejoró y qué ajustar la próxima semana.",
    dias: [6],
  },
] as const;

type Config = {
  hora: string;
  notificar: boolean;
  dias: Record<string, number[]>;
  hechos: Record<string, boolean>;
};

const CONFIG_INICIAL: Config = {
  hora: "18:00",
  notificar: false,
  dias: Object.fromEntries(TAREAS.map((t) => [t.id, [...t.dias]])),
  hechos: {},
};

/** Identificador de semana (año + número de semana ISO). */
function semanaActual(d = new Date()) {
  const fecha = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const dia = (fecha.getUTCDay() + 6) % 7;
  fecha.setUTCDate(fecha.getUTCDate() - dia + 3);
  const primerJueves = new Date(Date.UTC(fecha.getUTCFullYear(), 0, 4));
  const semana =
    1 + Math.round((fecha.getTime() - primerJueves.getTime()) / 604800000);
  return `${fecha.getUTCFullYear()}-S${String(semana).padStart(2, "0")}`;
}

function diaHoy() {
  return (new Date().getDay() + 6) % 7;
}

function RecordatoriosPage() {
  const { perfil } = usePerros();
  const { registrar } = useHistorial();
  const { value: cfg, setValue: setCfg } = useDatosPerro<Config>(K.recordatorios, CONFIG_INICIAL);
  const [permiso, setPermiso] = useState<string>("default");
  const avisados = useRef<Set<string>>(new Set());
  const semana = semanaActual();
  const hoy = diaHoy();

  useEffect(() => {
    if (typeof Notification !== "undefined") setPermiso(Notification.permission);
  }, []);

  const pendientesHoy = useMemo(
    () =>
      TAREAS.filter(
        (t) =>
          (cfg.dias[t.id] ?? []).includes(hoy) && !cfg.hechos[`${semana}-${t.id}-${hoy}`],
      ),
    [cfg, hoy, semana],
  );

  // Aviso dentro de la app a la hora configurada.
  useEffect(() => {
    if (!cfg.notificar) return;
    const tick = () => {
      const ahora = new Date();
      const hhmm = `${String(ahora.getHours()).padStart(2, "0")}:${String(ahora.getMinutes()).padStart(2, "0")}`;
      if (hhmm !== cfg.hora) return;
      const clave = `${semana}-${hoy}-${cfg.hora}`;
      if (avisados.current.has(clave) || pendientesHoy.length === 0) return;
      avisados.current.add(clave);
      if (typeof Notification !== "undefined" && Notification.permission === "granted") {
        new Notification("Rutina de hoy", {
          body: `${perfil.nombre || "Tu perro"}: quedan ${pendientesHoy.length} tareas por completar.`,
        });
      }
    };
    const id = window.setInterval(tick, 30000);
    tick();
    return () => window.clearInterval(id);
  }, [cfg.notificar, cfg.hora, hoy, semana, pendientesHoy, perfil.nombre]);

  const pedirPermiso = async () => {
    if (typeof Notification === "undefined") {
      setCfg({ ...cfg, notificar: true });
      return;
    }
    const res = await Notification.requestPermission();
    setPermiso(res);
    setCfg({ ...cfg, notificar: true });
  };

  const toggleDia = (id: string, dia: number) =>
    setCfg((c) => {
      const actuales = c.dias[id] ?? [];
      const dias = actuales.includes(dia)
        ? actuales.filter((d) => d !== dia)
        : [...actuales, dia].sort((a, b) => a - b);
      return { ...c, dias: { ...c.dias, [id]: dias } };
    });

  const marcar = (id: string, dia: number, titulo: string) => {
    const clave = `${semana}-${id}-${dia}`;
    const nuevo = !cfg.hechos[clave];
    setCfg((c) => ({ ...c, hechos: { ...c.hechos, [clave]: nuevo } }));
    if (nuevo) {
      registrar({
        tipo: "rutina",
        titulo: `Rutina cumplida: ${titulo}`,
        detalle: `${DIAS[dia]} · semana ${semana}`,
      });
    }
  };

  const totalSemana = TAREAS.reduce((acc, t) => acc + (cfg.dias[t.id] ?? []).length, 0);
  const hechosSemana = TAREAS.reduce(
    (acc, t) =>
      acc +
      (cfg.dias[t.id] ?? []).filter((d) => cfg.hechos[`${semana}-${t.id}-${d}`]).length,
    0,
  );
  const pct = totalSemana ? Math.round((hechosSemana / totalSemana) * 100) : 0;

  return (
    <div className="space-y-6">
      <header className="rounded-4xl bg-wine p-6 text-wine-foreground sm:p-8">
        <span className="inline-flex items-center gap-2 rounded-full bg-primary/20 px-3 py-1 text-[11px] font-bold tracking-widest uppercase">
          <BellRing className="size-3.5 text-primary" aria-hidden="true" />
          Recordatorios semanales
        </span>
        <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-balance sm:text-4xl">
          La rutina de {perfil.nombre || "tu perro"}, semana a semana
        </h1>
        <p className="mt-2 max-w-2xl text-base text-wine-foreground/85">
          Elige los días de cada hábito, recibe el aviso a la hora que quieras y marca lo que ya
          hiciste. El progreso se reinicia cada semana.
        </p>

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl bg-wine-foreground/10 p-4">
            <p className="text-xs font-bold uppercase opacity-80">Semana {semana}</p>
            <p className="mt-1 font-display text-2xl font-extrabold">{pct}%</p>
          </div>
          <div className="rounded-2xl bg-wine-foreground/10 p-4">
            <p className="text-xs font-bold uppercase opacity-80">Cumplidas</p>
            <p className="mt-1 font-display text-2xl font-extrabold">
              {hechosSemana}/{totalSemana}
            </p>
          </div>
          <div className="rounded-2xl bg-wine-foreground/10 p-4">
            <p className="text-xs font-bold uppercase opacity-80">Pendientes hoy</p>
            <p className="mt-1 font-display text-2xl font-extrabold">{pendientesHoy.length}</p>
          </div>
        </div>

        <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-wine-foreground/15">
          <div className="h-full rounded-full bg-primary" style={{ width: `${pct}%` }} />
        </div>
      </header>

      <section className="rounded-4xl border border-border bg-card p-6 sm:p-8">
        <h2 className="font-display text-xl font-bold">Aviso diario</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-[auto_minmax(0,1fr)] sm:items-end">
          <label className="block">
            <span className="flex items-center gap-2 text-sm font-bold">
              <Clock className="size-4 text-primary" aria-hidden="true" /> Hora del recordatorio
            </span>
            <input
              type="time"
              value={cfg.hora}
              onChange={(e) => setCfg({ ...cfg, hora: e.target.value })}
              className="mt-1.5 min-h-12 w-full rounded-2xl border border-input bg-background px-4 text-base outline-none focus:border-primary sm:w-44"
            />
          </label>
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={cfg.notificar ? () => setCfg({ ...cfg, notificar: false }) : pedirPermiso}
              className={`inline-flex min-h-12 items-center gap-2 rounded-full px-5 text-sm font-extrabold ${
                cfg.notificar
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground"
              }`}
            >
              <BellRing className="size-4" aria-hidden="true" />
              {cfg.notificar ? "Recordatorios activos" : "Activar recordatorios"}
            </button>
            <span className="text-xs text-muted-foreground">
              {permiso === "granted"
                ? "Se enviará una notificación del navegador cuando la app esté abierta."
                : "Sin permiso de notificaciones verás el aviso dentro de la app."}
            </span>
          </div>
        </div>
      </section>

      <section className="space-y-3">
        {TAREAS.map(({ id, icon: Icon, titulo: t, detalle }) => {
          const dias = cfg.dias[id] ?? [];
          return (
            <article key={id} className="rounded-3xl border border-border bg-card p-5">
              <div className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-3">
                <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-primary/15">
                  <Icon className="size-5 text-primary" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="font-display text-lg font-bold">{t}</p>
                  <p className="mt-0.5 text-sm text-muted-foreground">{detalle}</p>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-7 gap-1.5">
                {DIAS.map((d, i) => {
                  const activo = dias.includes(i);
                  const hecho = Boolean(cfg.hechos[`${semana}-${id}-${i}`]);
                  return (
                    <div key={d} className="space-y-1.5">
                      <button
                        type="button"
                        aria-pressed={activo}
                        onClick={() => toggleDia(id, i)}
                        className={`min-h-9 w-full rounded-xl text-xs font-extrabold ${
                          activo
                            ? "bg-wine text-wine-foreground"
                            : "bg-secondary text-muted-foreground"
                        }`}
                      >
                        {d}
                      </button>
                      <button
                        type="button"
                        disabled={!activo}
                        aria-label={`Marcar ${t} el ${d}`}
                        aria-pressed={hecho}
                        onClick={() => marcar(id, i, t)}
                        className={`grid min-h-9 w-full place-items-center rounded-xl border transition-colors disabled:opacity-30 ${
                          hecho
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border bg-background text-muted-foreground"
                        } ${i === hoy && activo && !hecho ? "border-primary" : ""}`}
                      >
                        <Check className="size-4" aria-hidden="true" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </article>
          );
        })}
      </section>
    </div>
  );
}
