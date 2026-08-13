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

        await supabaseAdmin.from("hotmart_eventos").insert({
          evento,
          transaction,
          email: email || null,
          payload: payload as never,
        });

        if (!email) return new Response("ok (sin email)", { status: 200 });

        const version =
          productId === idPremium ? "premium" : productId === idBase ? "base" : null;

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
