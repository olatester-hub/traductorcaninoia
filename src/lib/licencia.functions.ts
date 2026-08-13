import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export type LicenciaServidor = {
  version: "base" | "premium" | null;
  email: string | null;
};

/** Devuelve la licencia activa del usuario autenticado (validada contra la compra en Hotmart). */
export const obtenerMiLicencia = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<LicenciaServidor> => {
    const email = (context.claims["email"] as string | undefined)?.toLowerCase() ?? null;
    if (!email) return { version: null, email: null };

    const { data } = await context.supabase
      .from("licencias")
      .select("version, estado")
      .eq("estado", "activa")
      .maybeSingle();

    const version = data?.version === "premium" || data?.version === "base" ? data.version : null;
    return { version, email };
  });
