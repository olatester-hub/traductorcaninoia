import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import logoUrl from "@/assets/logo.png";
import { KeyRound, Mail, ShieldCheck, Loader2 } from "lucide-react";

const title = "Entrar con tu compra — Traductor Canino IA";
const description =
  "Accede a tu Versión Básica o Completa de Traductor Canino IA con el correo que usaste al comprar en Hotmart.";

export const Route = createFileRoute("/auth")({
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
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [paso, setPaso] = useState<"email" | "codigo">("email");
  const [email, setEmail] = useState("");
  const [codigo, setCodigo] = useState("");
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function enviarCodigo(e: React.FormEvent) {
    e.preventDefault();
    setCargando(true);
    setError(null);
    const { error: err } = await supabase.auth.signInWithOtp({
      email: email.trim().toLowerCase(),
      options: { shouldCreateUser: true },
    });
    setCargando(false);
    if (err) setError(err.message);
    else setPaso("codigo");
  }

  async function verificar(e: React.FormEvent) {
    e.preventDefault();
    setCargando(true);
    setError(null);
    const { error: err } = await supabase.auth.verifyOtp({
      email: email.trim().toLowerCase(),
      token: codigo.trim(),
      type: "email",
    });
    setCargando(false);
    if (err) {
      setError("El código no es válido o expiró. Pide uno nuevo.");
      return;
    }
    void navigate({ to: "/app", replace: true });
  }

  return (
    <div className="min-h-screen bg-cream font-sans antialiased">
      <div className="mx-auto flex max-w-md flex-col items-center px-4 py-12 text-center sm:px-6">
        <Link to="/" className="inline-flex">
          <img
            src={logoUrl}
            alt="Traductor Canino IA"
            className="h-14 w-auto object-contain sm:h-20"
          />
        </Link>

        <span className="mt-8 grid size-14 place-items-center rounded-full bg-primary/20">
          <KeyRound className="size-6 text-foreground/70" aria-hidden="true" />
        </span>
        <h1 className="mt-4 font-display text-3xl font-extrabold text-balance">
          Entra con tu compra
        </h1>
        <p className="mt-3 text-base text-muted-foreground">
          Usa el mismo correo con el que compraste en Hotmart. Te enviamos un código de 6 dígitos.
        </p>

        <div className="mt-8 w-full rounded-3xl border border-border bg-card p-6 text-left">
          {paso === "email" ? (
            <form onSubmit={enviarCodigo} className="grid gap-3">
              <label htmlFor="email" className="text-sm font-bold">
                Correo de la compra
              </label>
              <div className="flex items-center gap-2 rounded-2xl border border-border bg-background px-3">
                <Mail className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(ev) => setEmail(ev.target.value)}
                  placeholder="tucorreo@ejemplo.com"
                  className="min-h-11 w-full bg-transparent text-base outline-none"
                />
              </div>
              <button
                type="submit"
                disabled={cargando}
                className="mt-2 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 text-base font-extrabold text-primary-foreground disabled:opacity-60"
              >
                {cargando ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : null}
                Enviarme el código
              </button>
            </form>
          ) : (
            <form onSubmit={verificar} className="grid gap-3">
              <label htmlFor="codigo" className="text-sm font-bold">
                Código enviado a {email}
              </label>
              <input
                id="codigo"
                inputMode="numeric"
                autoComplete="one-time-code"
                required
                value={codigo}
                onChange={(ev) => setCodigo(ev.target.value)}
                placeholder="123456"
                className="min-h-12 rounded-2xl border border-border bg-background px-4 text-center text-xl font-extrabold tracking-[0.4em] outline-none"
              />
              <button
                type="submit"
                disabled={cargando}
                className="mt-2 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 text-base font-extrabold text-primary-foreground disabled:opacity-60"
              >
                {cargando ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : null}
                Entrar a la app
              </button>
              <button
                type="button"
                onClick={() => {
                  setPaso("email");
                  setCodigo("");
                  setError(null);
                }}
                className="min-h-11 text-sm font-bold text-muted-foreground"
              >
                Usar otro correo
              </button>
            </form>
          )}

          {error ? (
            <p className="mt-3 rounded-2xl bg-destructive/10 px-3 py-2 text-sm font-semibold text-destructive">
              {error}
            </p>
          ) : null}
        </div>

        <p className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
          <ShieldCheck className="size-4" aria-hidden="true" />
          Tu acceso se valida contra tu compra real
        </p>
      </div>
    </div>
  );
}
