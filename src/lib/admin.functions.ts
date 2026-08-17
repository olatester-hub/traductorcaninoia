import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import type { Database } from "@/integrations/supabase/types";

type EventoHotmart = Database["public"]["Tables"]["hotmart_eventos"]["Row"];
type LicenciaRow = Database["public"]["Tables"]["licencias"]["Row"];

function getAdminEmails(): string[] {
  const raw = process.env["ADMIN_EMAILS"] ?? "";
  return raw
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

function requireAdmin(email: string | null | undefined) {
  if (!email) throw new Error("Forbidden: no email");
  const admins = getAdminEmails();
  if (admins.length === 0) throw new Error("Forbidden: no admins configured");
  if (!admins.includes(email.toLowerCase())) throw new Error("Forbidden");
}

export const verificarSoyAdmin = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const email = context.claims["email"] as string | undefined;
    const admins = getAdminEmails();
    return {
      esAdmin: Boolean(email) && admins.includes(email!.toLowerCase()),
      adminEmails: admins,
    };
  });

export const obtenerEstadoConfiguracion = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const email = context.claims["email"] as string | undefined;
    requireAdmin(email);

    const projectId = process.env["VITE_SUPABASE_PROJECT_ID"] ?? null;

    return {
      webhookUrl: "/api/public/hotmart",
      hottokConfigurado: Boolean(process.env["HOTMART_HOTTOK"]),
      productoBaseConfigurado: Boolean(process.env["HOTMART_PRODUCT_BASE"]),
      productoPremiumConfigurado: Boolean(process.env["HOTMART_PRODUCT_PREMIUM"]),
      idBase: process.env["HOTMART_PRODUCT_BASE"] ?? null,
      idPremium: process.env["HOTMART_PRODUCT_PREMIUM"] ?? null,
      adminEmails: getAdminEmails(),
      urls: {
        preview: projectId ? `https://project--${projectId}-dev.lovable.app` : null,
        published: projectId ? `https://project--${projectId}.lovable.app` : null,
      },
    };
  });

export const listarEventosHotmart = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const email = context.claims["email"] as string | undefined;
    requireAdmin(email);

    const { data, error } = await context.supabase
      .from("hotmart_eventos")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(50);

    if (error) throw new Error(error.message);
    return (data ?? []) as EventoHotmart[];
  });

export const listarLicencias = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const email = context.claims["email"] as string | undefined;
    requireAdmin(email);

    const { data, error } = await context.supabase
      .from("licencias")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(100);

    if (error) throw new Error(error.message);
    return (data ?? []) as LicenciaRow[];
  });

export const simularCompraHotmart = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((input: { email: string; version: "base" | "premium"; nombre?: string }) => input)
  .handler(async ({ context, data }) => {
    const adminEmail = context.claims["email"] as string | undefined;
    requireAdmin(adminEmail);

    const email = data.email.trim().toLowerCase();
    const version = data.version;
    const idBase = process.env["HOTMART_PRODUCT_BASE"];
    const idPremium = process.env["HOTMART_PRODUCT_PREMIUM"];
    const productId = version === "premium" ? idPremium : idBase;

    if (!productId) throw new Error("Product ID not configured");

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const transaction = `SIM-${Date.now()}`;
    const payload = {
      event: "PURCHASE_APPROVED",
      data: {
        product: { id: productId },
        purchase: { status: "APPROVED", transaction },
        buyer: { email, name: data.nombre ?? null },
      },
    };

    const { error: errorLog } = await supabaseAdmin.from("hotmart_eventos").insert({
      evento: "PURCHASE_APPROVED",
      transaction,
      email,
      payload: payload as never,
    });
    if (errorLog) console.error("[admin] log evento simulado", errorLog.message);

    const { error } = await supabaseAdmin.from("licencias").upsert(
      {
        email,
        version,
        estado: "activa",
        hotmart_product_id: productId,
        hotmart_transaction: transaction,
        comprador_nombre: data.nombre ?? null,
      },
      { onConflict: "email" },
    );

    if (error) throw new Error(error.message);

    return { ok: true, email, version, transaction };
  });

export const revocarLicencia = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { email: string }) => input)
  .handler(async ({ context, data }) => {
    const adminEmail = context.claims["email"] as string | undefined;
    requireAdmin(adminEmail);

    const email = data.email.trim().toLowerCase();

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { error } = await supabaseAdmin
      .from("licencias")
      .update({ estado: "revocada", updated_at: new Date().toISOString() })
      .eq("email", email);

    if (error) throw new Error(error.message);

    return { ok: true, email };
  });
