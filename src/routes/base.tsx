import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { activarLicencia } from "@/lib/version";

export const Route = createFileRoute("/base")({
  head: () => ({
    meta: [
      { title: "Acceso Versión BASE — Traductor Canino IA" },
      { name: "description", content: "Acceso a la Versión BASE de Traductor Canino IA." },
      { property: "og:title", content: "Acceso Versión BASE — Traductor Canino IA" },
      { property: "og:description", content: "Acceso a la Versión BASE de Traductor Canino IA." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AccesoBase,
});

function AccesoBase() {
  const navigate = useNavigate();

  useEffect(() => {
    activarLicencia("base");
    void navigate({ to: "/app", replace: true });
  }, [navigate]);

  return (
    <div className="grid min-h-screen place-items-center bg-background px-6 text-center">
      <p className="text-base font-bold text-muted-foreground">Activando la Versión BASE…</p>
    </div>
  );
}
