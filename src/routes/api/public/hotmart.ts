import { createFileRoute } from "@tanstack/react-router";

type HotmartPayload = {
  event?: string;
  data?: {
    product?: { id?: number | string; ucode?: string };
    purchase?: {
      status?: string;
      transaction?: string;
      offer?: { code?: string; key?: string };
    };
    buyer?: { email?: string; name?: string };
    subscription?: { subscriber?: { email?: string } };
  };
};

const APROBADOS = new Set(["APPROVED", "COMPLETE", "COMPLETED"]);
const REVOCADOS = new Set([
  "PURCHASE_REFUNDED",
  "PURCHASE_CHARGEBACK",
  "PURCHASE_CANCELED",
  "PURCHASE_EXPIRED",
  "PURCHASE_PROTEST",
  "SUBSCRIPTION_CANCELLATION",
]);

export const Route = createFileRoute("/api/public/hotmart")({
  server: {
    handlers: {
      // Modo de prueba / diagnóstico: verifica configuración y muestra los últimos eventos recibidos.
      GET: async ({ request }) => {
        const hottok = process.env["HOTMART_HOTTOK"];
        const url = new URL(request.url);
        const enviado =
          request.headers.get("x-hotmart-hottok") ??
          request.headers.get("hottok") ??
          url.searchParams.get("hottok") ??
          "";

        const estadoConfig = {
          endpoint: "/api/public/hotmart",
          hottok_configurado: Boolean(hottok),
          producto_base_configurado: Boolean(process.env["HOTMART_PRODUCT_BASE"]),
          producto_premium_configurado: Boolean(process.env["HOTMART_PRODUCT_PREMIUM"]),
          hora_servidor: new Date().toISOString(),
        };

        if (!hottok || enviado !== hottok) {
          return Response.json({ ok: true, autenticado: false, ...estadoConfig });
        }

        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const { data, error } = await supabaseAdmin
          .from("hotmart_eventos")
          .select("id, evento, email, transaction, created_at")
          .order("created_at", { ascending: false })
          .limit(20);

        if (error) {
          return Response.json(
            { ok: false, autenticado: true, ...estadoConfig, error: error.message },
            { status: 500 },
          );
        }

        return Response.json({
          ok: true,
          autenticado: true,
          ...estadoConfig,
          total_mostrados: data?.length ?? 0,
          ultimos_eventos: data ?? [],
        });
      },
      POST: async ({ request }) => {
        const hottok = process.env["HOTMART_HOTTOK"];
        const idBase = process.env["HOTMART_PRODUCT_BASE"];
        const idPremium = process.env["HOTMART_PRODUCT_PREMIUM"];

        if (!hottok) return new Response("Not configured", { status: 500 });

        const enviado =
          request.headers.get("x-hotmart-hottok") ??
          request.headers.get("hottok") ??
          new URL(request.url).searchParams.get("hottok") ??
          "";

        if (enviado !== hottok) return new Response("Invalid token", { status: 401 });

        let payload: HotmartPayload;
        try {
          payload = (await request.json()) as HotmartPayload;
        } catch {
          return new Response("Invalid JSON", { status: 400 });
        }

        const data = payload.data ?? {};
        const email = (
          data.buyer?.email ??
          data.subscription?.subscriber?.email ??
          ""
        )
          .trim()
          .toLowerCase();
        const productId = String(data.product?.id ?? "");
        const transaction = data.purchase?.transaction ?? null;
        const evento = payload.event ?? null;
        const estadoCompra = (data.purchase?.status ?? "").toUpperCase();

        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

        const { error: errorLog } = await supabaseAdmin.from("hotmart_eventos").insert({
          evento,
          transaction,
          email: email || null,
          payload: payload as never,
        });
        if (errorLog) console.error("[hotmart] log evento", errorLog.message);

        const version =
          productId === idPremium ? "premium" : productId === idBase ? "base" : null;

        // Modo de prueba: registra el evento y devuelve el diagnóstico sin tocar licencias.
        const esPrueba =
          new URL(request.url).searchParams.get("test") === "1" ||
          request.headers.get("x-hotmart-test") === "1";

        if (esPrueba) {
          return Response.json({
            ok: true,
            modo: "prueba",
            recibido: true,
            evento,
            email: email || null,
            product_id: productId || null,
            version_detectada: version,
            estado_compra: estadoCompra || null,
            transaction,
            nota: "Evento registrado en el historial. No se creó ni modificó ninguna licencia.",
          });
        }

        if (!email) return new Response("ok (sin email)", { status: 200 });

        if (!version) return new Response("ok (producto no reconocido)", { status: 200 });


        const revocar = REVOCADOS.has(evento ?? "") || estadoCompra === "REFUNDED";
        const aprobar =
          !revocar &&
          (evento === "PURCHASE_APPROVED" ||
            evento === "PURCHASE_COMPLETE" ||
            APROBADOS.has(estadoCompra));

        if (!aprobar && !revocar) return new Response("ok (evento ignorado)", { status: 200 });

        const { error } = await supabaseAdmin.from("licencias").upsert(
          {
            email,
            version,
            estado: revocar ? "revocada" : "activa",
            hotmart_product_id: productId,
            hotmart_offer: data.purchase?.offer?.code ?? data.purchase?.offer?.key ?? null,
            hotmart_transaction: transaction,
            comprador_nombre: data.buyer?.name ?? null,
          },
          { onConflict: "email" },
        );

        if (error) {
          console.error("[hotmart] upsert licencia", error.message);
          return new Response("DB error", { status: 500 });
        }

        return new Response("ok", { status: 200 });
      },
    },
  },
});
