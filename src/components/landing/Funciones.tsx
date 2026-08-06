import {
  Brain,
  Languages,
  Eye,
  Baby,
  Dog,
  CalendarClock,
  MessageCircle,
  Droplets,
  Bone,
  Users,
  Clock,
  ShieldAlert,
  Home,
  Volume2,
  Link2,
  HeartCrack,
  Sofa,
  Zap,
  Ghost,
} from "lucide-react";
import cachorro from "@/assets/cachorro.jpg";
import perroAdulto from "@/assets/perro-adulto.jpg";

const puppyItems = [
  { label: "Higiene", Icon: Droplets },
  { label: "Mordidas", Icon: Bone },
  { label: "Socialización", Icon: Users },
  { label: "Rutinas", Icon: Clock },
  { label: "Límites", Icon: ShieldAlert },
  { label: "Adaptación al hogar", Icon: Home },
];

const adultItems = [
  { label: "Ladridos excesivos", Icon: Volume2 },
  { label: "Tirones de correa", Icon: Link2 },
  { label: "Ansiedad por separación", Icon: HeartCrack },
  { label: "Conductas destructivas", Icon: Sofa },
  { label: "Reactividad", Icon: Zap },
  { label: "Miedos", Icon: Ghost },
];


export function Funciones() {
  return (
    <section id="funciones" className="bg-cream">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16">
        <div className="flex justify-center">
          <span className="inline-flex rounded-full bg-primary/20 px-4 py-1.5 text-xs font-bold tracking-widest text-foreground/70 uppercase">Funciones</span>
        </div>
        <h2 className="text-center mx-auto max-w-3xl font-display text-3xl font-extrabold tracking-tight text-balance sm:text-4xl md:text-5xl">
          Todo lo que puedes hacer con TRADUCTOR CANINO IA
        </h2>

        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <article className="rounded-3xl bg-primary p-6 text-primary-foreground sm:p-7">
            <Brain className="size-7" aria-hidden="true" />
            <h3 className="text-center mt-4 font-display text-xl font-bold">Diagnóstico Inteligente</h3>
            <p className="text-justify hyphens-auto mt-2 text-base">
              Descubre la verdadera causa del comportamiento antes de intentar corregirlo.
            </p>
          </article>

          <article className="rounded-3xl border border-border bg-card p-6 sm:p-7">
            <Languages className="size-7 text-primary" aria-hidden="true" />
            <h3 className="text-center mt-4 font-display text-xl font-bold">Traductor de Conductas</h3>
            <p className="text-justify hyphens-auto mt-2 text-base text-muted-foreground">
              Comprende qué significan realmente los ladridos, mordidas, ansiedad, miedo,
              destrucción, reactividad y otros comportamientos cotidianos.
            </p>
          </article>

          <article className="rounded-3xl bg-wine p-6 text-wine-foreground sm:p-7">
            <Eye className="size-7 text-primary" aria-hidden="true" />
            <h3 className="text-center mt-4 font-display text-xl font-bold">Traductor de Señales Corporales</h3>
            <p className="text-justify hyphens-auto mt-2 text-base text-wine-foreground/85">
              Aprende a leer postura, orejas, cola y mirada para anticipar lo que tu perro va a
              hacer antes de que ocurra.
            </p>
          </article>

          <article className="overflow-hidden rounded-3xl bg-accent text-accent-foreground md:col-span-2">
            <div className="grid gap-0 sm:grid-cols-[minmax(0,1fr)_40%]">
              <div className="p-6 sm:p-7">
                <div className="flex justify-center">
                  <span className="grid size-11 place-items-center rounded-2xl bg-accent-foreground/10">
                    <Baby className="size-6" aria-hidden="true" />
                  </span>
                </div>
                <h3 className="text-center mt-3 font-display text-xl font-bold">Modo Cachorro</h3>
                <p className="text-center mt-2 text-base">
                  Aprende a prevenir problemas antes de que aparezcan.
                </p>
                <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                  {puppyItems.map(({ label, Icon }) => (
                    <li
                      key={label}
                      className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-2 rounded-full bg-accent-foreground/10 px-3 py-2 text-sm font-semibold"
                    >
                      <Icon className="size-4 shrink-0" aria-hidden="true" />
                      <span className="min-w-0">{label}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <img
                src={cachorro}
                alt="Cachorro mirando a cámara con la cabeza inclinada"
                loading="lazy"
                width={1000}
                height={1000}
                className="h-48 w-full object-cover sm:h-full"
              />
            </div>
          </article>

          <article className="overflow-hidden rounded-3xl border border-border bg-card">
            <img
              src={perroAdulto}
              alt="Perro adulto descansando tranquilo en casa"
              loading="lazy"
              width={1000}
              height={1000}
              className="h-40 w-full object-cover"
            />
            <div className="p-6 sm:p-7">
              <div className="flex justify-center">
                <span className="grid size-11 place-items-center rounded-2xl bg-primary/15">
                  <Dog className="size-6 text-primary" aria-hidden="true" />
                </span>
              </div>
              <h3 className="text-center mt-3 font-display text-xl font-bold">Modo Perro Adulto</h3>
              <p className="text-center mt-2 text-base text-muted-foreground">Corrige paso a paso:</p>
              <ul className="mt-5 space-y-2">
                {adultItems.map(({ label, Icon }) => (
                  <li
                    key={label}
                    className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-2 rounded-2xl bg-secondary px-3 py-2 text-sm font-semibold text-secondary-foreground"
                  >
                    <Icon className="size-4 shrink-0 text-primary" aria-hidden="true" />
                    <span className="min-w-0">{label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>

          <article className="rounded-3xl border border-border bg-secondary p-6 text-secondary-foreground sm:p-7">
            <CalendarClock className="size-7 text-primary" aria-hidden="true" />
            <h3 className="text-center mt-4 font-display text-xl font-bold">Predictor de Higiene</h3>
            <p className="text-justify hyphens-auto mt-2 text-base">
              Recibe recordatorios inteligentes para reducir accidentes y acelerar el aprendizaje.
            </p>
          </article>

          <article className="rounded-3xl bg-primary p-6 text-primary-foreground sm:p-7">
            <MessageCircle className="size-7" aria-hidden="true" />
            <h3 className="text-center mt-4 font-display text-xl font-bold">Asistente IA 24/7</h3>
            <p className="text-justify hyphens-auto mt-2 text-base">
              Haz preguntas cuando quieras y obtén respuestas personalizadas basadas en el historial
              de tu perro.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
