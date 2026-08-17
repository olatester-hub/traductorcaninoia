import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  Copy,
  History,
  KeyRound,
  LayoutDashboard,
  Loader2,
  RefreshCw,
  ShieldCheck,
  Smartphone,
  Trash2,
  UserPlus,
} from "lucide-react";
import {
  listarEventosHotmart,
  listarLicencias,
  obtenerEstadoConfiguracion,
  revocarLicencia,
  simularCompraHotmart,
} from "@/lib/admin.functions";
import { useLicencia } from "@/lib/version";

const title = "Diagnóstico de ventas — Traductor Canino IA";
const description = "Panel interno para verificar el flujo de compras, webhooks y licencias.";

export const Route = createFileRoute("/app/admin/diagnostico")({
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
  component: DiagnosticoPage,
});

function DiagnosticoPage() {
  const { email: miEmail } = useLicencia();
  const queryClient = useQueryClient();

  const fetchEstado = useServerFn(obtenerEstadoConfiguracion);
  const fetchEventos = useServerFn(listarEventosHotmart);
  const fetchLicencias = useServerFn(listarLicencias);
  const fnSimular = useServerFn(simularCompraHotmart);
  const fnRevocar = useServerFn(revocarLicencia);

  const estadoQuery = useQuery({
    queryKey: ["admin", "estado"],
    queryFn: () => fetchEstado(),
  });
  const eventosQuery = useQuery({
    queryKey: ["admin", "eventos"],
    queryFn: () => fetchEventos(),
  });
  const licenciasQuery = useQuery({
    queryKey: ["admin", "licencias"],
    queryFn: () => fetchLicencias(),
  });

  const [emailSimular, setEmailSimular] = useState("");
  const [nombreSimular, setNombreSimular] = useState("");
  const [versionSimular, setVersionSimular] = useState<"base" | "premium">("base");
  const [simulando, setSimulando] = useState(false);
  const [mensaje, setMensaje] = useState<{ tipo: "ok" | "error"; texto: string } | null>(null);
  const [revocando, setRevocando] = useState<string | null>(null);

  useEffect(() => {
    if (miEmail && !emailSimular) setEmailSimular(miEmail);
  }, [miEmail, emailSimular]);

  const recargar = () => {
    void queryClient.invalidateQueries({ queryKey: ["admin"] });
  };

  const simular = async (e: React.FormEvent) => {
    e.preventDefault();
    setSimulando(true);
    setMensaje(null);
    try {
      const res = await fnSimular({
        data: { email: emailSimular, version: versionSimular, nombre: nombreSimular || undefined },
      });
      setMensaje({
        tipo: "ok",
        texto: `Licencia ${res.version} creada para ${res.email} (${res.transaction}).`,
      });
      recargar();
    } catch (err) {
      setMensaje({ tipo: "error", texto: String(err) });
    } finally {
      setSimulando(false);
    }
  };

  const revocar = async (email: string) => {
    setRevocando(email);
    try {
      await fnRevocar({ data: { email } });
      recargar();
    } finally {
      setRevocando(null);
    }
  };

  const copiar = (texto: string) => {
    void navigator.clipboard.writeText(texto);
  };

  const estado = estadoQuery.data;
  const eventos = eventosQuery.data ?? [];
  const licencias = licenciasQuery.data ?? [];
  const cargando = estadoQuery.isLoading || eventosQuery.isLoading || licenciasQuery.isLoading;
  const error = estadoQuery.error?.message || eventosQuery.error?.message || licenciasQuery.error?.message;

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link
          to="/app"
          className="inline-flex min-h-10 items-center gap-2 rounded-full bg-secondary px-4 text-sm font-bold text-secondary-foreground"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Volver al panel
        </Link>
        <button
          type="button"
          onClick={recargar}
          disabled={cargando}
          className="inline-flex min-h-10 items-center gap-2 rounded-full bg-primary px-4 text-sm font-bold text-primary-foreground disabled:opacity-60"
        >
          <RefreshCw className={`size-4 ${cargando ? "animate-spin" : ""}`} aria-hidden="true" />
          Recargar
        </button>
      </div>

      <section className="rounded-4xl bg-wine p-6 text-wine-foreground sm:p-8">
        <span className="inline-flex items-center gap-2 rounded-full bg-primary/20 px-3 py-1 text-[11px] font-bold tracking-widest uppercase">
          <ShieldCheck className="size-3.5 text-primary" aria-hidden="true" />
          Panel de administración
        </span>
        <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-balance sm:text-4xl">
          Diagnóstico de ventas
        </h1>
        <p className="mt-2 max-w-2xl text-base text-wine-foreground/85">
          Verifica que el webhook de Hotmart, las licencias y el acceso de compradores estén
          funcionando correctamente.
        </p>
      </section>

      {error ? (
        <div className="rounded-3xl bg-destructive/10 p-5 text-destructive">
          <div className="flex items-start gap-3">
            <AlertTriangle className="size-5 shrink-0" aria-hidden="true" />
            <div>
              <p className="font-bold">Error al cargar el diagnóstico</p>
              <p className="text-sm">{error}</p>
            </div>
          </div>
        </div>
      ) : null}

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <EstadoCard
          ok={estado?.hottokConfigurado}
          label="HOTTOK"
          icon={KeyRound}
          detail={estado?.hottokConfigurado ? "Configurado" : "Falta"}
        />
        <EstadoCard
          ok={estado?.productoBaseConfigurado}
          label="Producto Base"
          icon={LayoutDashboard}
          detail={estado?.idBase ?? "—"}
        />
        <EstadoCard
          ok={estado?.productoPremiumConfigurado}
          label="Producto Premium"
          icon={Smartphone}
          detail={estado?.idPremium ?? "—"}
        />
        <EstadoCard
          ok={Boolean(estado?.urls.published)}
          label="URL publicada"
          icon={CheckCircle2}
          detail={estado?.urls.published ?? "—"}
        />
      </section>

      <section className="rounded-3xl border border-border bg-card p-6 sm:p-8">
        <h2 className="font-display text-2xl font-extrabold">URLs del webhook</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Configura estas URLs en Hotmart (Configuraciones → Webhooks) según el entorno que quieras
          probar.
        </p>
        <div className="mt-4 space-y-3">
          {estado?.urls.published ? (
            <UrlRow label="Producción" url={`${estado.urls.published}/api/public/hotmart`} copiar={copiar} />
          ) : null}
          {estado?.urls.preview ? (
            <UrlRow label="Preview / desarrollo" url={`${estado.urls.preview}/api/public/hotmart`} copiar={copiar} />
          ) : null}
        </div>
      </section>

      <section className="rounded-3xl border border-border bg-card p-6 sm:p-8">
        <h2 className="flex items-center gap-2 font-display text-2xl font-extrabold">
          <UserPlus className="size-6 text-primary" aria-hidden="true" />
          Simular una compra aprobada
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Crea una licencia directamente en la base de datos como si Hotmart hubiera enviado un
          evento PURCHASE_APPROVED. Úsalo para agilizar pruebas sin depender del webhook.
        </p>
        <form onSubmit={simular} className="mt-5 grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="text-sm font-bold">Email del comprador</span>
            <input
              type="email"
              required
              value={emailSimular}
              onChange={(e) => setEmailSimular(e.target.value)}
              placeholder="tucorreo@ejemplo.com"
              className="mt-1.5 min-h-12 w-full rounded-2xl border border-input bg-background px-4 text-base outline-none focus:border-primary focus:ring-2 focus:ring-ring/40"
            />
          </label>
          <label className="block">
            <span className="text-sm font-bold">Nombre (opcional)</span>
            <input
              type="text"
              value={nombreSimular}
              onChange={(e) => setNombreSimular(e.target.value)}
              placeholder="Ej: Sergio Olate"
              className="mt-1.5 min-h-12 w-full rounded-2xl border border-input bg-background px-4 text-base outline-none focus:border-primary focus:ring-2 focus:ring-ring/40"
            />
          </label>
          <div className="block sm:col-span-2">
            <span className="text-sm font-bold">Versión</span>
            <div className="mt-1.5 flex flex-wrap gap-2">
              {(["base", "premium"] as const).map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setVersionSimular(v)}
                  className={`min-h-11 rounded-full px-5 text-sm font-bold transition-colors ${
                    versionSimular === v
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground"
                  }`}
                >
                  {v === "base" ? "Versión Básica" : "Versión Completa"}
                </button>
              ))}
            </div>
          </div>
          <div className="sm:col-span-2">
            <button
              type="submit"
              disabled={simulando}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 text-base font-extrabold text-primary-foreground disabled:opacity-60"
            >
              {simulando ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : null}
              Crear licencia de prueba
            </button>
          </div>
        </form>
        {mensaje ? (
          <p
            className={`mt-4 rounded-2xl px-4 py-3 text-sm font-semibold ${
              mensaje.tipo === "ok"
                ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200"
                : "bg-destructive/10 text-destructive"
            }`}
          >
            {mensaje.texto}
          </p>
        ) : null}
      </section>

      <section className="rounded-3xl border border-border bg-card p-6 sm:p-8">
        <h2 className="flex items-center gap-2 font-display text-2xl font-extrabold">
          <History className="size-6 text-primary" aria-hidden="true" />
          Últimos eventos recibidos ({eventos.length})
        </h2>
        {eventos.length === 0 ? (
          <p className="mt-3 text-sm text-muted-foreground">
            Aún no se ha recibido ningún evento. Realiza una compra de prueba o usa el simulador.
          </p>
        ) : (
          <div className="mt-4 overflow-x-auto rounded-2xl border border-border">
            <table className="w-full text-sm">
              <thead className="bg-secondary text-secondary-foreground">
                <tr>
                  <th className="px-4 py-3 text-left font-bold">Fecha</th>
                  <th className="px-4 py-3 text-left font-bold">Evento</th>
                  <th className="px-4 py-3 text-left font-bold">Email</th>
                  <th className="px-4 py-3 text-left font-bold">Transacción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {eventos.map((e) => (
                  <tr key={e.id} className="hover:bg-secondary/40">
                    <td className="px-4 py-3 whitespace-nowrap">
                      {new Date(e.created_at).toLocaleString("es", {
                        dateStyle: "short",
                        timeStyle: "short",
                      })}
                    </td>
                    <td className="px-4 py-3">{e.evento ?? "—"}</td>
                    <td className="px-4 py-3">{e.email ?? "—"}</td>
                    <td className="px-4 py-3 font-mono text-xs">{e.transaction ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="rounded-3xl border border-border bg-card p-6 sm:p-8">
        <h2 className="flex items-center gap-2 font-display text-2xl font-extrabold">
          <Activity className="size-6 text-primary" aria-hidden="true" />
          Licencias ({licencias.length})
        </h2>
        {licencias.length === 0 ? (
          <p className="mt-3 text-sm text-muted-foreground">
            No hay licencias registradas todavía.
          </p>
        ) : (
          <div className="mt-4 overflow-x-auto rounded-2xl border border-border">
            <table className="w-full text-sm">
              <thead className="bg-secondary text-secondary-foreground">
                <tr>
                  <th className="px-4 py-3 text-left font-bold">Email</th>
                  <th className="px-4 py-3 text-left font-bold">Versión</th>
                  <th className="px-4 py-3 text-left font-bold">Estado</th>
                  <th className="px-4 py-3 text-left font-bold">Creada</th>
                  <th className="px-4 py-3 text-left font-bold">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {licencias.map((l) => (
                  <tr key={l.id} className="hover:bg-secondary/40">
                    <td className="px-4 py-3">{l.email}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2 py-1 text-xs font-bold ${
                          l.version === "premium"
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary text-secondary-foreground"
                        }`}
                      >
                        {l.version}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2 py-1 text-xs font-bold ${
                          l.estado === "activa"
                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200"
                            : "bg-destructive/10 text-destructive"
                        }`}
                      >
                        {l.estado}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {new Date(l.created_at).toLocaleString("es", {
                        dateStyle: "short",
                        timeStyle: "short",
                      })}
                    </td>
                    <td className="px-4 py-3">
                      {l.estado === "activa" ? (
                        <button
                          type="button"
                          onClick={() => revocar(l.email)}
                          disabled={revocando === l.email}
                          className="inline-flex items-center gap-1.5 rounded-full bg-destructive/10 px-3 py-1.5 text-xs font-bold text-destructive"
                        >
                          {revocando === l.email ? (
                            <Loader2 className="size-3 animate-spin" aria-hidden="true" />
                          ) : (
                            <Trash2 className="size-3" aria-hidden="true" />
                          )}
                          Revocar
                        </button>
                      ) : (
                        <span className="text-xs text-muted-foreground">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}

function EstadoCard({
  ok,
  label,
  icon: Icon,
  detail,
}: {
  ok?: boolean;
  label: string;
  icon: typeof Activity;
  detail: string;
}) {
  return (
    <article className="rounded-3xl border border-border bg-card p-5">
      <div className="flex items-center gap-2">
        <Icon className="size-5 text-primary" aria-hidden="true" />
        <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{label}</span>
      </div>
      <div className="mt-3 flex items-center gap-2">
        <span
          className={`grid size-5 place-items-center rounded-full text-[10px] font-bold ${
            ok ? "bg-green-500 text-white" : "bg-destructive text-white"
          }`}
        >
          {ok ? "✓" : "✕"}
        </span>
        <span className="text-sm font-bold">{detail}</span>
      </div>
    </article>
  );
}

function UrlRow({ label, url, copiar }: { label: string; url: string; copiar: (t: string) => void }) {
  return (
    <div className="flex flex-col gap-2 rounded-2xl bg-secondary/60 p-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{label}</p>
        <p className="mt-1 break-all font-mono text-sm">{url}</p>
      </div>
      <button
        type="button"
        onClick={() => copiar(url)}
        className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-secondary px-3 py-2 text-xs font-bold"
      >
        <Copy className="size-3.5" aria-hidden="true" />
        Copiar
      </button>
    </div>
  );
}
