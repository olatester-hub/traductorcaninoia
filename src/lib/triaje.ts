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
  /** Razonamiento clínico: por qué el árbol llega a esta conclusión. */
  porque: string;
  acciones: string[];
  /** Errores que empeoran el cuadro en este escenario. */
  evitar: string[];
  /** Qué observar y registrar en los próximos días. */
  observar: string[];
};

export const NODOS: Record<string, NodoTriaje> = {
  inicio: {
    id: "inicio",
    pregunta: "¿Hay algún signo físico grave ahora mismo?",
    ayuda:
      "Dificultad para respirar, encías pálidas o azuladas, convulsiones, vómitos repetidos, intentos de vomitar sin resultado, abdomen hinchado y duro, colapso, desorientación o sangrado que no se detiene.",
    si: "r-urgencia",
    no: "cambio",
  },
  cambio: {
    id: "cambio",
    pregunta: "¿La conducta apareció o cambió de forma brusca en los últimos días?",
    ayuda:
      "Un perro que siempre fue tranquilo y de pronto gruñe, se esconde, deja de comer o duerme en otro sitio. Los cambios bruscos de carácter son un signo clínico, no un capricho.",
    si: "dolor",
    no: "agresion",
  },
  dolor: {
    id: "dolor",
    pregunta: "¿Se queja al tocarlo, cojea, come menos, se lame una zona o duerme distinto?",
    ayuda:
      "El dolor es la causa oculta más frecuente de cambios repentinos de carácter: dolor lumbar, otitis, dientes, artrosis o molestias digestivas. En perros mayores, súmale pérdida de visión, audición y deterioro cognitivo.",
    si: "r-vet",
    no: "r-vet-descartar",
  },
  agresion: {
    id: "agresion",
    pregunta: "¿Ha habido mordidas que dejaran marca o rompieran la piel?",
    ayuda:
      "Aquí importa el nivel de inhibición: no es lo mismo un contacto sin marca que una mordida que perfora. Cuenta también las mordidas a otros perros.",
    si: "r-profesional",
    no: "escalada",
  },
  escalada: {
    id: "escalada",
    pregunta: "¿La conducta empeora semana a semana pese a tus intentos?",
    ayuda:
      "Si va a más, algo la está reforzando o el perro se está sensibilizando por exposición repetida al disparador.",
    si: "r-plan-intensivo",
    no: "frecuencia",
  },
  frecuencia: {
    id: "frecuencia",
    pregunta: "¿Ocurre casi todos los días?",
    ayuda:
      "La frecuencia marca cuánto se está consolidando el patrón: cada repetición lo hace más automático.",
    si: "r-plan-intensivo",
    no: "descanso",
  },
  descanso: {
    id: "descanso",
    pregunta: "¿Duerme menos de 14 horas al día o se le interrumpe el descanso a menudo?",
    ayuda:
      "Un perro adulto necesita 14-16 horas de sueño total; los cachorros, hasta 18-20. El déficit de sueño se parece mucho a un problema de conducta.",
    si: "r-rutina",
    no: "r-plan",
  },
};

export const RESULTADOS: Record<string, ResultadoTriaje> = {
  "r-urgencia": {
    id: "r-urgencia",
    nivel: "urgencia",
    titulo: "Urgencia veterinaria ahora",
    texto:
      "Lo que describes no es un problema de conducta: es un cuadro compatible con una emergencia médica que necesita atención inmediata.",
    porque:
      "Signos como disnea, mucosas pálidas, convulsiones, abdomen distendido o colapso indican compromiso de la vía aérea, circulatoria o neurológica. En cuadros como la dilatación-torsión gástrica, la ventana útil se mide en horas.",
    acciones: [
      "Llama a la urgencia veterinaria antes de salir para que te esperen preparados.",
      "No le des comida, agua ni medicación humana: el ibuprofeno y el paracetamol son tóxicos para el perro.",
      "Trasládalo con el mínimo movimiento, en superficie rígida si hay sospecha de trauma, y sin ruido.",
      "Lleva la información útil: hora de inicio, si comió, tóxicos posibles y medicación actual.",
    ],
    evitar: [
      "Esperar «a ver si se le pasa» durante la noche.",
      "Provocar el vómito por tu cuenta sin indicación veterinaria.",
      "Manipular la zona dolorida o abrir la boca a la fuerza.",
    ],
    observar: [
      "Color de las encías y ritmo respiratorio mientras vas de camino.",
      "Si hay pérdida de conciencia, duración exacta de cada episodio.",
    ],
  },
  "r-vet": {
    id: "r-vet",
    nivel: "veterinario",
    titulo: "Consulta veterinaria antes de entrenar",
    texto:
      "Hay señales compatibles con dolor. Entrenar sobre un perro dolorido empeora la conducta y deteriora la confianza en ti.",
    porque:
      "El dolor baja el umbral de tolerancia: el perro reacciona antes y con más intensidad ante estímulos que antes soportaba. Mientras la fuente de dolor siga activa, ningún protocolo de conducta se sostiene.",
    acciones: [
      "Pide una revisión con foco en columna y cadera, boca, oídos, piel y abdomen.",
      "Lleva un vídeo del movimiento o de la conducta: vale más que cualquier descripción.",
      "Anota qué ocurre justo antes de la conducta; ese antecedente es información clínica.",
      "Suspende saltos, tirones de correa y obediencia exigente hasta tener diagnóstico.",
    ],
    evitar: [
      "Corregir el gruñido: es el aviso que te protege de la mordida.",
      "Automedicar con analgésicos humanos.",
      "Aumentar el ejercicio pensando que «le falta desahogo».",
    ],
    observar: [
      "Postura al levantarse tras el descanso y al subir escaleras.",
      "Zonas que evita que le toques y cambios en apetito o sed.",
    ],
  },
  "r-vet-descartar": {
    id: "r-vet-descartar",
    nivel: "veterinario",
    titulo: "Descarta causa médica y trabaja la conducta en paralelo",
    texto:
      "Un cambio brusco sin signos claros de dolor sigue mereciendo un chequeo, pero puedes iniciar el plan de conducta desde hoy con intensidad suave.",
    porque:
      "Muchos procesos silenciosos (tiroides, dolor visceral, deterioro sensorial en seniors) se manifiestan primero como cambio de carácter, sin cojera ni queja evidente.",
    acciones: [
      "Agenda un chequeo general con analítica en los próximos días.",
      "Empieza el plan de acción en su versión más suave, sin exponerlo al disparador.",
      "Registra los episodios durante siete días: hora, contexto, duración e intensidad.",
      "Revisa cambios recientes del entorno: mudanza, horarios, nueva mascota o ausencia de alguien.",
    ],
    evitar: [
      "Cambiar varias cosas a la vez: no sabrás qué funcionó.",
      "Aumentar la exigencia del entrenamiento mientras el cuadro está sin explicar.",
    ],
    observar: [
      "Si el patrón aparece siempre a la misma hora o en el mismo lugar.",
      "Calidad y cantidad del sueño y consistencia de las heces.",
    ],
  },
  "r-profesional": {
    id: "r-profesional",
    nivel: "veterinario",
    titulo: "Caso para acompañamiento presencial",
    texto:
      "Cuando hay mordida con lesión, el trabajo debe hacerse con un profesional presente. La app te sirve como apoyo y registro, nunca como sustituto.",
    porque:
      "Una mordida que rompe piel indica baja inhibición o un nivel de amenaza percibida muy alto. El riesgo para personas obliga a gestión de seguridad, evaluación en persona y, a veces, apoyo farmacológico veterinario.",
    acciones: [
      "Busca un etólogo clínico veterinario o un educador con enfoque en modificación de conducta.",
      "Gestiona el entorno para que la conducta no pueda repetirse: cada ensayo la consolida.",
      "Entrena el bozal en positivo desde ya: bien introducido, da libertad y seguridad.",
      "Usa el diagnóstico y el registro diario como historial para el profesional.",
    ],
    evitar: [
      "Métodos de castigo, collares de impulsos o de púas: suprimen el aviso y aumentan el riesgo.",
      "Exponerlo al disparador «para probar si mejoró».",
      "Dejarlo suelto con niños o desconocidos mientras el caso esté abierto.",
    ],
    observar: [
      "Distancia exacta a la que empieza la tensión: es tu umbral de trabajo.",
      "Señales previas (congelarse, ojo de ballena, gruñido) y cuánto duran.",
    ],
  },
  "r-plan-intensivo": {
    id: "r-plan-intensivo",
    nivel: "conducta",
    titulo: "Plan de conducta con seguimiento diario",
    texto:
      "Es un problema de comportamiento activo y ya reforzado. Necesita constancia diaria y gestión del entorno, no correcciones puntuales.",
    porque:
      "Una conducta diaria o en escalada se ha automatizado: obtiene un resultado que le funciona. Sin cambiar la consecuencia y sin bajar la exposición, la repetición seguirá entrenándola.",
    acciones: [
      "Haz el diagnóstico completo y activa el seguimiento de 21 días.",
      "Revisa la rutina: casi siempre hay déficit de descanso o de olfateo detrás.",
      "Evita el disparador mientras no tenga una conducta alternativa entrenada.",
      "Refuerza la alternativa 20 veces en contexto fácil antes de probarla en contexto difícil.",
    ],
    evitar: [
      "Cambiar de método cada semana: el criterio inconsistente prolonga el problema.",
      "Trabajar por encima del umbral, donde el perro ya no puede aprender.",
    ],
    observar: [
      "Intensidad de 1 a 5 en cada episodio y tiempo que tarda en recuperarse.",
      "Si en dos semanas no baja ni intensidad ni frecuencia, escala a profesional presencial.",
    ],
  },
  "r-rutina": {
    id: "r-rutina",
    nivel: "conducta",
    titulo: "Primero corrige la rutina: hay déficit de descanso",
    texto:
      "El patrón encaja con falta de sueño y estimulación mal repartida más que con un problema de conducta en sí.",
    porque:
      "El sueño insuficiente eleva la activación basal y reduce el control de impulsos: aparecen mordidas de juego, hiperactividad al atardecer, reactividad y desobediencia aparente. Es reversible en pocos días.",
    acciones: [
      "Usa la calculadora de rutina y ajusta descanso, olfateo y trabajo mental.",
      "Crea un lugar de descanso fijo, en penumbra y fuera del paso.",
      "Cambia parte del paseo rápido por 15 minutos de olfateo libre en hierba.",
      "Añade masticación larga diaria a la hora de mayor alboroto.",
    ],
    evitar: [
      "Cansarlo con más ejercicio intenso o pelota: eleva aún más la activación.",
      "Interrumpir sus siestas para jugar o acariciarlo.",
    ],
    observar: [
      "Horas totales de sueño en 24 horas durante una semana.",
      "Si el alboroto de la tarde desaparece al tercer o cuarto día de rutina corregida.",
    ],
  },
  "r-plan": {
    id: "r-plan",
    nivel: "conducta",
    titulo: "Trabajo preventivo, buen pronóstico",
    texto:
      "La conducta aún es ocasional y la rutina base está cubierta. Es el mejor momento para intervenir: cuesta mucho menos que revertirla instalada.",
    porque:
      "Sin signos médicos, sin escalada y con descanso suficiente, lo más probable es un aprendizaje puntual reforzado por accidente en contextos concretos.",
    acciones: [
      "Haz el diagnóstico y aplica los primeros 7 días del plan.",
      "Añade un juego de olfato diario y una sesión corta de entrenamiento en calma.",
      "Refuerza la conducta correcta cuando aparezca sola: es lo que más rápido la consolida.",
      "Reevalúa en dos semanas con este mismo triaje.",
    ],
    evitar: [
      "Esperar a que sea grave para empezar.",
      "Reforzar sin querer la conducta con atención, aunque sea regañando.",
    ],
    observar: [
      "En qué contextos concretos aparece y quién está presente.",
      "Si tras dos semanas la frecuencia sube, pasa al plan intensivo.",
    ],
  },
};
