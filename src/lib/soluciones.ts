export type Solucion = {
  titulo: string;
  problema: string;
  porque: string;
  ajuste: string[];
};

export const SOLUCIONES: Solucion[] = [
  {
    titulo: "«Lo hago todo bien y no mejora nada»",
    problema: "Aplicas el plan pero la conducta sigue igual después de dos semanas.",
    porque:
      "Casi siempre hay ensayo de la conducta fuera de las sesiones: entrenas 10 minutos y el entorno lo refuerza 10 veces al día.",
    ajuste: [
      "Gestiona el entorno primero: si no puede practicar el error, el entrenamiento gana.",
      "Reduce la dificultad hasta que acierte 8 de cada 10 veces.",
      "Comprueba que el premio sea realmente valioso en ese contexto.",
    ],
  },
  {
    titulo: "«En casa obedece, en la calle no me escucha»",
    problema: "El comportamiento no se traslada al exterior.",
    porque: "Los perros no generalizan: para él, «sentado» en el salón y en la vereda son dos cosas distintas.",
    ajuste: [
      "Reentrena cada señal en 5 lugares nuevos, empezando por los más aburridos.",
      "Sube el valor del premio proporcionalmente a la distracción.",
      "Trabaja a la distancia en la que aún puede pensar, no en la que ya está desbordado.",
    ],
  },
  {
    titulo: "«Solo obedece si ve la comida»",
    problema: "Depende del premio visible.",
    porque: "El premio se convirtió en señal previa (soborno) en vez de consecuencia.",
    ajuste: [
      "Pide la conducta con las manos vacías y premia después, sacando la comida de un bolsillo.",
      "Pasa a refuerzo variable: premia 1 de cada 2, luego 1 de cada 3.",
      "Suma premios de vida: abrir la puerta, soltar la correa, lanzar el juguete.",
    ],
  },
  {
    titulo: "«Mejoró y de pronto retrocedió»",
    problema: "Recaída después de una buena racha.",
    porque:
      "Es la extinción normal del aprendizaje: aparece un pico de la conducta antigua antes de consolidarse la nueva.",
    ajuste: [
      "No cambies de método: mantén el mismo criterio dos semanas más.",
      "Revisa cambios de rutina, mudanzas, visitas o menos descanso.",
      "Vuelve un nivel atrás en dificultad durante 3 días y retoma.",
    ],
  },
  {
    titulo: "«En casa cada uno hace algo distinto»",
    problema: "La familia no aplica el mismo criterio.",
    porque: "La inconsistencia crea refuerzo intermitente, el patrón que más fija una conducta.",
    ajuste: [
      "Elige 3 reglas no negociables y escríbelas donde todos las vean.",
      "Una sola señal por conducta, con la misma palabra.",
      "Acuerden qué está permitido en el sofá y en la mesa antes de entrenar nada más.",
    ],
  },
  {
    titulo: "«Se porta peor por la noche»",
    problema: "Explosiones de actividad o destructividad al final del día.",
    porque: "Suele ser sobreestimulación acumulada, no falta de ejercicio: un perro cansado en exceso se desregula.",
    ajuste: [
      "Añade siestas reales: 16-18 horas de descanso diario en adultos, más en cachorros.",
      "Cambia una salida excitante por un paseo de olfateo lento.",
      "Rutina de apagado: luz baja, masticación y su sitio de descanso.",
    ],
  },
];

export type Metodo = {
  metodo: string;
  veredicto: "Recomendado" | "Con cautela" | "Evitar";
  efectoCorto: string;
  efectoLargo: string;
  razon: string;
};

export const METODOS: Metodo[] = [
  {
    metodo: "Refuerzo positivo (premiar lo que sí quieres)",
    veredicto: "Recomendado",
    efectoCorto: "Progreso visible en días si el criterio es claro.",
    efectoLargo: "Conducta estable y perro que ofrece soluciones por iniciativa propia.",
    razon: "Construye una alternativa. El perro aprende qué hacer, no solo qué no hacer.",
  },
  {
    metodo: "Gestión del entorno (evitar el ensayo del error)",
    veredicto: "Recomendado",
    efectoCorto: "Alivio inmediato para la familia.",
    efectoLargo: "Multiplica el efecto del entrenamiento al cortar el refuerzo accidental.",
    razon: "No es rendirse: es dejar de entrenar la conducta que quieres eliminar.",
  },
  {
    metodo: "Desensibilización a distancia",
    veredicto: "Recomendado",
    efectoCorto: "Lento las primeras dos semanas.",
    efectoLargo: "Cambia la emoción de fondo, no solo la reacción visible.",
    razon: "Único enfoque que resuelve miedo y reactividad de raíz.",
  },
  {
    metodo: "Ignorar la conducta de demanda",
    veredicto: "Con cautela",
    efectoCorto: "Empeora antes de mejorar (pico de extinción).",
    efectoLargo: "Funciona solo si además enseñas una forma alternativa de pedir.",
    razon: "Ignorar sin alternativa deja al perro sin recurso y aumenta la frustración.",
  },
  {
    metodo: "Correr o lanzar la pelota hasta agotarlo",
    veredicto: "Con cautela",
    efectoCorto: "Se ve cansado esa tarde.",
    efectoLargo: "Aumenta el umbral de excitación y la tolerancia al ejercicio: pide cada vez más.",
    razon: "Cansancio físico no es calma. El gasto mental rinde mucho más por minuto.",
  },
  {
    metodo: "Gritos, tirones secos y collares aversivos",
    veredicto: "Evitar",
    efectoCorto: "Parece que funciona: la conducta se detiene en el momento.",
    efectoLargo: "Suprime el aviso (gruñido) y aumenta el riesgo de mordida sin advertencia.",
    razon: "Asocia dolor o miedo al disparador y a ti. Cambia la reacción, no la emoción.",
  },
  {
    metodo: "Dominar al perro / «hacerse el alfa»",
    veredicto: "Evitar",
    efectoCorto: "Sumisión aparente por miedo.",
    efectoLargo: "Deteriora el vínculo y genera conductas defensivas.",
    razon: "El modelo de jerarquía de manada está descartado por la etología actual.",
  },
  {
    metodo: "Castigar después del hecho",
    veredicto: "Evitar",
    efectoCorto: "Cara de «culpa» que interpretas como que entendió.",
    efectoLargo: "Ansiedad general y conductas de apaciguamiento.",
    razon: "Esa cara es apaciguamiento ante tu enfado, no comprensión del error pasado.",
  },
];
