import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { Problema } from "@/components/landing/Problema";
import { ComoFunciona } from "@/components/landing/ComoFunciona";
import { DiagnosticoGratis } from "@/components/landing/DiagnosticoGratis";
import { Funciones } from "@/components/landing/Funciones";
import { Valor } from "@/components/landing/Valor";
import { Suscripcion } from "@/components/landing/Suscripcion";
import { Planes } from "@/components/landing/Planes";
import { Faq } from "@/components/landing/Faq";
import { Cierre, Footer } from "@/components/landing/Cierre";

const title = "Traductor Canino IA — Entiende a tu perro";
const description =
  "Diagnóstico con IA del comportamiento de tu perro en menos de 3 minutos y un plan personalizado paso a paso. Primer análisis gratis.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      <Header />
      <main>
        <Hero />
        <Problema />
        <ComoFunciona />
        <DiagnosticoGratis />
        <Funciones />
        <Valor />
        <Suscripcion />
        <Planes />
        <Faq />
        <Cierre />
      </main>
      <Footer />
    </div>
  );
}
