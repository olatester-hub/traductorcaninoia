import { Link, Outlet, createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import logoUrl from "@/assets/logo.png";
import { AccesoBloqueado } from "@/components/app/AccesoBloqueado";
import { VERSION_LABEL, useLicencia } from "@/lib/version";
import { usePerros } from "@/lib/app-store";
import { verificarSoyAdmin } from "@/lib/admin.functions";
import {
  Activity,
  BellRing,
  CalendarHeart,
  Dog,
  Eye,
  Gamepad2,
  LayoutDashboard,
  ListChecks,
  Scale,
  Settings,
  Siren,
  Stethoscope,
} from "lucide-react";

type NavItem = {
  to: string;
  label: string;
  icon: typeof Activity;
  exact?: boolean;
  /** Solo disponible en la Versión Completa (bonos). */
  bono?: boolean;
};

export const NAV: NavItem[] = [
  { to: "/app", label: "Panel", icon: LayoutDashboard, exact: true },
  { to: "/app/diagnostico", label: "Diagnóstico", icon: Stethoscope },
  { to: "/app/plan", label: "Plan 21 días", icon: ListChecks },
  { to: "/app/rutina", label: "Rutina", icon: Activity },
  { to: "/app/recordatorios", label: "Recordatorios", icon: BellRing },
  { to: "/app/triaje", label: "Triaje", icon: Siren },
  { to: "/app/senales", label: "Señales", icon: Eye },
  { to: "/app/soluciones", label: "Soluciones", icon: Scale },
  { to: "/app/calendario", label: "Salud", icon: CalendarHeart, bono: true },
  { to: "/app/juegos", label: "Juegos", icon: Gamepad2, bono: true },
];

export const Route = createFileRoute("/app")({
  head: () => ({ meta: [{ name: "robots", content: "noindex" }] }),
  component: AppLayout,
});

function AppLayout() {
  const { version, hydrated, email: licenciaEmail } = useLicencia();
  const { perfil, lista } = usePerros();
  const [soyAdmin, setSoyAdmin] = useState(false);
  const fetchSoyAdmin = useServerFn(verificarSoyAdmin);

  useEffect(() => {
    if (licenciaEmail) {
      fetchSoyAdmin()
        .then((res) => setSoyAdmin(res.esAdmin))
        .catch(() => setSoyAdmin(false));
    }
  }, [fetchSoyAdmin, licenciaEmail]);

  if (!hydrated) return <div className="min-h-screen bg-background" />;
  if (!version) return <AccesoBloqueado />;

  const items = version === "base" ? NAV.filter((n) => !n.bono) : NAV;
  const nombre = perfil.nombre.trim();

  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-2 sm:px-6">
          <Link to="/" className="flex min-w-0 items-center">
            <img
              src={logoUrl}
              alt="Traductor Canino IA"
              className="h-12 w-auto max-w-full object-contain sm:h-16"
            />
          </Link>
          <div className="flex shrink-0 items-center gap-2">
            {lista.length > 0 ? (
              <Link
                to="/app"
                className="inline-flex max-w-32 items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-xs font-bold text-secondary-foreground sm:max-w-none"
              >
                <Dog className="size-3.5 shrink-0" aria-hidden="true" />
                <span className="truncate">{nombre || "Sin nombre"}</span>
              </Link>
            ) : null}
            <span
              className={`rounded-full px-3 py-1 text-[11px] font-bold tracking-widest uppercase ${
                version === "base"
                  ? "bg-secondary text-secondary-foreground"
                  : "bg-primary/20 text-foreground/70"
              }`}
            >
              {VERSION_LABEL[version]}
            </span>
          </div>
        </div>
        <nav className="border-t border-border/60">
          <ul className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-3 py-2 sm:px-5 [scrollbar-width:none]">
            {items.map(({ to, label, icon: Icon, exact }) => (
              <li key={to} className="shrink-0">
                <Link
                  to={to}
                  activeOptions={{ exact: Boolean(exact) }}
                  activeProps={{ className: "bg-primary text-primary-foreground" }}
                  inactiveProps={{ className: "bg-secondary text-secondary-foreground" }}
                  className="inline-flex min-h-10 items-center gap-2 rounded-full px-3.5 text-sm font-bold whitespace-nowrap"
                >
                  <Icon className="size-4 shrink-0" aria-hidden="true" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 md:py-10">
        <Outlet />
      </main>

      <footer className="border-t border-border/60 bg-cream">
        <div className="mx-auto max-w-6xl px-4 py-6 text-center text-xs text-muted-foreground sm:px-6">
          Herramienta de apoyo educativo. No sustituye la valoración de un veterinario ni de un
          profesional de conducta presencial.
        </div>
      </footer>
    </div>
  );
}
