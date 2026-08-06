export type NodoTriaje = {
  id: string;
  pregunta: string;
  ayuda?: string;
  si: string; // id del siguiente nodo o resultado
  no: string;
};

export type ResultadoTriaje = {
  id: string;
  nivel: "urgencia" | "veterinario" | "conducta";
  titulo: string;
  texto: string;
  acciones: string[];
};

export const NODOS: Record<string, NodoTriaje> = {
  inicio: {
    id: "inicio",
    pregunta: "¿Hay algún signo físico grave ahora mismo?",
    ayuda:
      "Dificultad para respirar, encías pálidas o azuladas, convulsiones, vómitos repetidos, abdomen hinchado y duro, colapso o sangrado que no se detiene.",
    si: "r-urgencia",
    no: "cambio",
  },
  cambio: {
    id: "cambio",
    pregunta: "¿La conducta apareció o cambió de forma brusca en los últimos días?",
    ayuda: "Un perro que siempre fue tranquilo y de pronto gruñe, se esconde o deja de comer.",
    si: "dolor",
    no: "agresion",
  },
  dolor: {
    id: "dolor",
    pregunta: "¿Se queja al tocarlo, cojea, come menos o duerme distinto?",
    ayuda: "El dolor es la causa oculta más frecuente de cambios de carácter repentinos.",
    si: "r-vet",
    no: "r-vet-descartar",
  },
  agresion: {
    id: "agresion",
    pregunta: "¿Ha habido mordidas que dejaran marca o rompieran la piel?",
    si: "r-profesional",
    no: "escalada",
  },
  escalada: {
    id: "escalada",
    pregunta: "¿La conducta empeora semana a semana pese a tus intentos?",
    si: "r-plan-intensivo",
    no: "frecuencia",
  },
  frecuencia: {
    id: "frecuencia",
    pregunta: "¿Ocurre casi todos los días?",
    si: "r-plan-intensivo",
    no: "r-plan",
  },
};

export const RESULTADOS: Record<string, ResultadoTriaje> = {
  "r-urgencia": {
    id: "r-urgencia",
    nivel: "urgencia",
    titulo: "Urgencia veterinaria ahora",
    texto:
      "Lo que describes no es un problema de conducta: es un cuadro que necesita atención médica inmediata.",
    acciones: [
      "Llama a una urgencia veterinaria antes de salir para que te esperen.",
      "No le des comida, agua ni medicación humana.",
      "Trasládalo con el mínimo movimiento posible y sin ruido.",
    ],
  },
  "r-vet": {
    id: "r-vet",
    nivel: "veterinario",
    titulo: "Consulta veterinaria antes de entrenar",
    texto:
      "Hay señales compatibles con dolor. Entrenar sobre un perro dolorido empeora la conducta y deteriora la confianza.",
    acciones: [
      "Pide una revisión con foco en articulaciones, boca, oídos y abdomen.",
      "Anota cuándo aparece la conducta y qué la precede: es información clínica útil.",
      "Suspende ejercicios de obediencia exigentes hasta el diagnóstico.",
    ],
  },
  "r-vet-descartar": {
    id: "r-vet-descartar",
    nivel: "veterinario",
    titulo: "Descarta causa médica y luego trabaja la conducta",
    texto:
      "Un cambio brusco sin signos claros de dolor sigue mereciendo un chequeo, pero puedes iniciar el plan de conducta en paralelo.",
    acciones: [
      "Agenda un chequeo general en los próximos días.",
      "Empieza el plan de acción con intensidad suave.",
      "Registra los episodios durante una semana.",
    ],
  },
  "r-profesional": {
    id: "r-profesional",
    nivel: "veterinario",
    titulo: "Caso para acompañamiento presencial",
    texto:
      "Cuando hay mordida con lesión, el trabajo debe hacerse con un profesional presente. La app te sirve como apoyo y registro, no como sustituto.",
    acciones: [
      "Busca un etólogo clínico o educador con enfoque en modificación de conducta.",
      "Gestiona el entorno para evitar la repetición: la práctica consolida la conducta.",
      "Usa el diagnóstico y el registro diario como historial para el profesional.",
    ],
  },
  "r-plan-intensivo": {
    id: "r-plan-intensivo",
    nivel: "conducta",
    titulo: "Plan de conducta con seguimiento diario",
    texto:
      "Es un problema de comportamiento activo y reforzado. Necesita constancia diaria y gestión del entorno, no correcciones puntuales.",
    acciones: [
      "Haz el diagnóstico completo y activa el seguimiento de 21 días.",
      "Revisa la rutina diaria: casi siempre hay un déficit de descanso o de olfateo.",
      "Evita exponerlo al disparador mientras no tenga una alternativa entrenada.",
    ],
  },
  "r-plan": {
    id: "r-plan",
    nivel: "conducta",
    titulo: "Trabajo preventivo, buen pronóstico",
    texto:
      "La conducta aún es ocasional. Es el mejor momento para intervenir: cuesta mucho menos que revertirla instalada.",
    acciones: [
      "Haz el diagnóstico y aplica los primeros 7 días del plan.",
      "Añade un juego de olfato diario.",
      "Reevalúa en dos semanas.",
    ],
  },
};
