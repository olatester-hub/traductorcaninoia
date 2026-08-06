import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "¿Necesito experiencia?",
    a: [
      "No.",
      "La aplicación está diseñada para cualquier propietario, incluso si es la primera vez que convive con un perro.",
    ],
  },
  {
    q: "¿Sirve para cualquier raza?",
    a: [
      "Sí.",
      "El análisis considera las características específicas de cada perro para ofrecer recomendaciones personalizadas.",
    ],
  },
  {
    q: "¿Cuánto tarda el diagnóstico?",
    a: [
      "Menos de tres minutos.",
      "Solo respondes unas preguntas sobre tu perro y su entorno.",
      "El informe se genera al instante, sin necesidad de grabar nada.",
    ],
  },
  {
    q: "¿Sustituye a un veterinario o a un adiestrador?",
    a: [
      "No.",
      "TRADUCTOR CANINO IA es una herramienta de apoyo para la educación y el comportamiento canino.",
      "Ante cualquier problema de salud siempre debes acudir a un veterinario.",
      "Cuando un caso requiera intervención presencial, la aplicación también podrá orientarte para buscar ayuda profesional.",
    ],
  },
  {
    q: "¿Las respuestas son iguales para todos?",
    a: [
      "No.",
      "Ese es precisamente el mayor diferencial de TRADUCTOR CANINO IA.",
      "Cada análisis considera la información específica de tu perro y de tu familia para generar recomendaciones personalizadas.",
      "No recibirás respuestas genéricas.",
    ],
  },
];

export function Faq() {
  return (
    <section className="bg-cream">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 md:py-16">
        <h2 className="text-center font-display text-3xl font-extrabold tracking-tight text-balance sm:text-4xl md:text-5xl">
          Preguntas frecuentes
        </h2>

        <Accordion type="single" collapsible className="mt-8">
          {faqs.map((f) => (
            <AccordionItem key={f.q} value={f.q}>
              <AccordionTrigger className="py-5 text-left font-display text-lg font-bold hover:no-underline sm:text-xl">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="space-y-2 text-justify hyphens-auto text-base text-muted-foreground">
                {f.a.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
