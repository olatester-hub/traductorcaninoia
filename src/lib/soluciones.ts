export type Solucion = {
  titulo: string;
  problema: string;
  senalDeQueEsEsto: string[];
  porque: string;
  mecanismo: string;
  ajuste: string[];
  errorFatal: string;
  plazo: string;
};

export const SOLUCIONES: Solucion[] = [
  {
    titulo: "«Lo hago todo bien y no mejora nada»",
    problema: "Aplicas el plan pero la conducta sigue igual después de dos semanas.",
    senalDeQueEsEsto: [
      "La conducta problema sigue ocurriendo varias veces al día fuera de las sesiones.",
      "En sesión acierta, pero en el resto de la jornada el entorno le permite el error sin consecuencia.",
      "Sientes que entrenas «contra reloj»: lo que ganas en 10 minutos se diluye el resto del día.",
    ],
    porque:
      "Casi siempre hay ensayo de la conducta fuera de las sesiones: entrenas 10 minutos y el entorno lo refuerza 10 veces al día.",
    mecanismo:
      "Cada repetición de la conducta no deseada la refuerza por su propia consecuencia natural (huir de la visita, cazar la ardilla, robar comida), aunque tú no la premies. El entrenamiento formal compite contra decenas de ensayos incontrolados y pierde por volumen, no por calidad.",
    ajuste: [
      "Bloquea físicamente el ensayo del error durante 14 días: correa larga en casa, puertas cerradas, gestión de visitas antes de cualquier sesión nueva.",
      "Haz 3 sesiones diarias de 3-5 minutos con criterio fijo, no una sesión larga.",
      "Sube de nivel solo cuando acierte 8 de 10 repeticiones en 2 sesiones seguidas.",
      "Verifica el valor real del premio en ese contexto probando 3 alternativas (hígado, queso, juguete) y usando la que gane en distracción alta.",
    ],
    errorFatal:
      "Seguir entrenando en el mismo contexto donde el entorno sigue premiando el error 10 veces más que tú.",
    plazo:
      "Día 3: baja la frecuencia del error si la gestión es real. Día 7: la conducta nueva aparece espontánea en al menos un contexto entrenado. Día 21: generaliza a 2-3 contextos sin gestión extra.",
  },
  {
    titulo: "«En casa obedece, en la calle no me escucha»",
    problema: "El comportamiento no se traslada al exterior.",
    senalDeQueEsEsto: [
      "Responde a la primera en el living pero ni te mira en la vereda.",
      "El fallo aumenta con más gente, olores o sonidos alrededor, no es azar.",
      "Cuando lo consigues afuera, necesitas repetir la señal o acercarte mucho más que en casa.",
    ],
    porque: "Los perros no generalizan: para él, «sentado» en el salón y en la vereda son dos cosas distintas.",
    mecanismo:
      "El aprendizaje canino es fuertemente dependiente del contexto (estímulos discriminativos): el perro asocia la señal a todo el escenario —suelo, olores, tu postura, ausencia de distracción—, no solo a la palabra. Cambiar cualquiera de esas variables reduce la probabilidad de respuesta correcta.",
    ajuste: [
      "Reentrena cada señal en 5 ubicaciones nuevas, del entorno más aburrido al más cargado (patio, vereda tranquila, esquina con tránsito).",
      "En cada ubicación nueva, retrocede un nivel de dificultad y usa premio de mayor valor los primeros 5 aciertos.",
      "Trabaja siempre a la distancia mínima donde aún pueda responder al primer intento; si falla 2 veces seguidas, aumenta la distancia al disparador.",
      "Registra por escrito en qué lugares ya generaliza antes de sumar el siguiente.",
    ],
    errorFatal:
      "Exigir el mismo nivel de precisión en la calle que en el living el primer día de práctica exterior.",
    plazo:
      "Día 3: responde en 1-2 lugares nuevos de baja distracción. Día 7: generaliza en 3-4 lugares con premio alto. Día 21: responde en la mayoría de entornos habituales con premio intermitente.",
  },
  {
    titulo: "«Solo obedece si ve la comida»",
    problema: "Depende del premio visible.",
    senalDeQueEsEsto: [
      "Si no sacas la comida antes de pedir, ignora la señal directamente.",
      "Mejora la obediencia solo cuando ve o huele el premio en tu mano.",
      "Nunca has retirado la comida de la mano al dar la señal para comprobarlo.",
    ],
    porque: "El premio se convirtió en señal previa (soborno) en vez de consecuencia.",
    mecanismo:
      "Cuando el estímulo (comida visible) precede a la señal, funciona como un segundo cue que anula al verbal: el perro obedece al lure, no a la palabra. Para revertirlo hay que romper la contingencia visual y pasar a refuerzo variable, que mantiene la conducta con menos premios pero más persistente en el tiempo (efecto de la razón variable).",
    ajuste: [
      "Da la señal con las manos vacías y visibles; premia después sacando la comida de un bolsillo o pote lejos de su vista.",
      "Repite esto 10 veces por sesión durante 3 días antes de avanzar.",
      "Pasa a refuerzo variable: premia 1 de cada 2 intentos, luego 1 de cada 3, subiendo solo si mantiene el 80% de aciertos.",
      "Suma refuerzos de vida diaria (abrir la puerta, soltar la correa, iniciar el juego) como pago alterno a la comida.",
    ],
    errorFatal: "Volver a mostrar la comida antes de pedir la conducta en cuanto falla una vez.",
    plazo:
      "Día 3: responde con manos vacías al menos 5 de 10 veces. Día 7: sostiene refuerzo variable 1 de cada 2. Día 21: obedece con premio intermitente y refuerzos de vida cotidiana.",
  },
  {
    titulo: "«Mejoró y de pronto retrocedió»",
    problema: "Recaída después de una buena racha.",
    senalDeQueEsEsto: [
      "La conducta antigua reaparece con más intensidad que antes de empezar a mejorar.",
      "Coincide con un cambio de rutina, mudanza, visita o menos horas de descanso.",
      "El retroceso dura pocos días si no cambias nada del plan.",
    ],
    porque:
      "Es la extinción normal del aprendizaje: aparece un pico de la conducta antigua antes de consolidarse la nueva.",
    mecanismo:
      "El «pico de extinción» es un fenómeno descripto en condicionamiento operante: al dejar de reforzarse la conducta antigua, esta se intensifica transitoriamente antes de desaparecer. Cambiar de método en ese punto interrumpe el proceso y refuerza justo el pico, empeorando el problema a mediano plazo.",
    ajuste: [
      "Mantén el mismo criterio y el mismo método mínimo 14 días más sin modificarlo.",
      "Audita cambios recientes: rutina, sueño, visitas, mudanza, dolor físico; anda al veterinario si hay dolor sospechado.",
      "Baja un nivel de dificultad durante 3 días (menos distracción, premio más alto) y retoma la progresión normal después.",
      "No agregues correcciones nuevas durante el pico: solo gestiona y espera.",
    ],
    errorFatal: "Cambiar de método o sumar castigo en el pico de extinción, pensando que «esto ya no funciona».",
    plazo:
      "Día 3: el pico empieza a bajar en frecuencia. Día 7: vuelve al nivel previo a la recaída. Día 21: supera el nivel anterior, más estable que antes de la recaída.",
  },
  {
    titulo: "«En casa cada uno hace algo distinto»",
    problema: "La familia no aplica el mismo criterio.",
    senalDeQueEsEsto: [
      "El perro obedece a una persona y a otra la ignora con la misma señal.",
      "Distintos miembros usan palabras distintas para pedir lo mismo (sentado/quieto/abajo).",
      "Lo que un día está permitido (subir al sofá) otro día se castiga.",
    ],
    porque: "La inconsistencia crea refuerzo intermitente, el patrón que más fija una conducta.",
    mecanismo:
      "El refuerzo intermitente e impredecible (a veces sí, a veces no, según quién esté) es el programa que genera las conductas más resistentes a extinguirse, incluido el efecto Ludic de las máquinas tragamonedas. Cada persona con criterio distinto es, en la práctica, una fuente de refuerzo variable para la conducta no deseada.",
    ajuste: [
      "Escriban 3 reglas no negociables en un lugar visible (mesa, sofá, saludo a visitas) y que las firme cada adulto de la casa.",
      "Una sola palabra por conducta, acordada por escrito, sin sinónimos.",
      "Hagan una reunión semanal de 10 minutos para revisar qué se está reforzando sin querer.",
      "Si alguien no puede sostener el criterio, que no dé la señal esa vez: mejor omitir que aplicar mal.",
    ],
    errorFatal: "Aceptar «total, algo hará bien» y dejar que cada persona improvise su propio criterio.",
    plazo:
      "Día 3: las 3 reglas están visibles y acordadas. Día 7: baja la confusión de señales notablemente. Día 21: el perro responde igual sin importar quién dé la orden.",
  },
  {
    titulo: "«Se porta peor por la noche»",
    problema: "Explosiones de actividad o destructividad al final del día.",
    senalDeQueEsEsto: [
      "El pico de excitación llega después de un día con muchos estímulos, no de inactividad.",
      "Más paseo o más pelota esa tarde no calma, empeora.",
      "Le cuesta asentarse aunque esté físicamente cansado.",
    ],
    porque: "Suele ser sobreestimulación acumulada, no falta de ejercicio: un perro cansado en exceso se desregula.",
    mecanismo:
      "El sistema nervioso autónomo necesita tiempo de recuperación entre activaciones; sin descanso suficiente se acumula arousal (activación fisiológica) que se expresa como hiperactividad nocturna. Añadir más ejercicio físico sube más el arousal en vez de bajarlo: hace falta actividad que active la calma (olfateo, masticación) para lograr saciedad conductual real.",
    ajuste: [
      "Asegura 16-18 horas de descanso real (sin ruido, sin visitas) al día en adultos, más en cachorros.",
      "Cambia una salida excitante por semana por un paseo de olfateo lento de 20-30 minutos.",
      "Instaura rutina de apagado 1 hora antes de dormir: luz baja, masticable, su cama, sin juego.",
      "Registra 5 días en una planilla la actividad y el sueño para identificar el día que dispara la explosión.",
    ],
    errorFatal: "Sumar más ejercicio físico intenso pensando que «así se cansa y duerme».",
    plazo:
      "Día 3: menos intensidad en el pico nocturno. Día 7: se asienta solo tras la rutina de apagado la mayoría de las noches. Día 21: el pico nocturno desaparece o es puntual.",
  },
  {
    titulo: "«El perro solo responde a una persona de la casa»",
    problema: "Obedece a quien entrena y al resto lo ignora o directamente le ladra.",
    senalDeQueEsEsto: [
      "Con una persona hace todo bien; con otra, ni te mira o se pone reactivo.",
      "Solo esa persona lo alimenta, pasea o entrena habitualmente.",
      "El resto de la familia usa un tono o postura distintos al dar la orden.",
    ],
    porque:
      "El vínculo de referencia y el historial de refuerzo están concentrados en una sola persona; para el resto no hay historial de aprendizaje ni de valor asociado.",
    mecanismo:
      "El perro discrimina también por la persona que emite la señal, como discrimina por contexto físico. Si solo una persona ha sido fuente consistente de refuerzo, señal clara y manejo, esa persona se vuelve el estímulo discriminativo válido; el resto no tiene historial suficiente para funcionar como tal.",
    ajuste: [
      "Reparte 3 recursos de alto valor (comida, paseo, juego) entre al menos dos personas durante 2 semanas.",
      "Cada persona practica las mismas 3 señales básicas 5 minutos diarios, con el mismo criterio y palabra que la persona de referencia.",
      "La persona «fuerte» se retira progresivamente de las sesiones de las demás para no competir como estímulo más reforzante.",
      "Empieza en baja distracción para la persona nueva y sube nivel solo cuando sostenga 8 de 10 aciertos.",
    ],
    errorFatal:
      "Que la persona de referencia intervenga o corrija cuando otro miembro de la familia está entrenando.",
    plazo:
      "Día 3: la segunda persona logra respuestas simples en casa. Día 7: sostiene 2-3 señales con distracción baja. Día 21: responde de forma comparable a ambas personas en contextos habituales.",
  },
  {
    titulo: "«Funciona en sesión pero no en la vida real»",
    problema: "En el entrenamiento estructurado responde perfecto; en el momento real (visita llega, otro perro aparece) no.",
    senalDeQueEsEsto: [
      "En sesiones con premio en mano el perro es impecable.",
      "En el momento espontáneo del problema real, ni intenta la conducta entrenada.",
      "Nunca practicaste la señal en el momento exacto en que ocurre el disparador real, solo en simulacros controlados.",
    ],
    porque:
      "El entrenamiento en sesión y el problema real no comparten el nivel de intensidad emocional ni la sorpresa del disparador auténtico.",
    mecanismo:
      "La conducta entrenada bajo baja activación emocional no se transfiere automáticamente a momentos de alta activación (umbral superado), porque el acceso cognitivo a conductas aprendidas se reduce cuando el sistema límbico domina la respuesta. Hace falta entrenar específicamente a la intensidad y sorpresa del disparador real, en aproximaciones graduales.",
    ajuste: [
      "Recrea el disparador real de forma controlada y predecible (visita avisada, perro señuelo a distancia) antes de esperar la conducta en el evento espontáneo.",
      "Sube la intensidad del simulacro solo un escalón por sesión: distancia, volumen, sorpresa.",
      "Practica la señal exacta que usarás en el momento real (palabra, postura) desde la primera repetición del simulacro.",
      "Ten siempre un plan de manejo de emergencia (retirarlo, bloquear visión) para el evento real mientras el entrenamiento aún no alcanza ese nivel.",
    ],
    errorFatal:
      "Esperar que la generalización ocurra sola sin haber entrenado nunca cerca de la intensidad real del disparador.",
    plazo:
      "Día 3: responde en el simulacro de baja intensidad. Día 7: sostiene la conducta en simulacros de intensidad media. Día 21: aparece la conducta entrenada en al menos un evento real espontáneo.",
  },
  {
    titulo: "«Empeora cuando hay visitas»",
    problema: "Ladridos, saltos, guardia de recursos o huida que solo pasan con gente ajena en casa.",
    senalDeQueEsEsto: [
      "El comportamiento normal de casa desaparece apenas suena el timbre.",
      "Mejora si la visita lo ignora completamente y empeora si lo saluda de entrada.",
      "El pico dura los primeros minutos y luego, si nadie interviene mal, va bajando.",
    ],
    porque:
      "La llegada de una visita combina novedad, ruido súbito e incertidumbre social, tres disparadores de arousal que rara vez se entrenan por separado.",
    mecanismo:
      "Es un caso de umbral superado por acumulación de estímulos simultáneos (timbre + persona nueva + emoción de la familia). Sin desensibilización previa a baja intensidad, el perro entra directo a una zona de sobreactivación donde no hay acceso a conductas entrenadas, similar al fenómeno de flooding no controlado.",
    ajuste: [
      "Practica con un «visitante» conocido que llegue sin timbre 5 veces, premiando calma antes de sumar el timbre real.",
      "Da al perro una tarea alternativa incompatible (ir a la cama con un masticable) que empieza a entrenarse sin visitas, no el día que llegan.",
      "Pide a la visita real que lo ignore los primeros 2-3 minutos, sin mirarlo ni hablarle.",
      "Gestiona la distancia física real (barrera, correa) mientras el entrenamiento aún no cubre ese nivel de intensidad.",
    ],
    errorFatal: "Dejar que la visita lo salude efusivamente «para que se acostumbre», sin desensibilización previa.",
    plazo:
      "Día 3: acepta al visitante conocido con timbre simulado sin explotar. Día 7: la tarea alternativa se activa con ayuda en visita real. Día 21: baja la intensidad del pico en visitas reales de forma sostenida.",
  },
  {
    titulo: "«No puedo premiar: no le interesa la comida»",
    problema: "El perro rechaza premios de comida en sesión, especialmente fuera de casa.",
    senalDeQueEsEsto: [
      "En casa come bien pero afuera o en sesión no acepta ni el premio de alto valor.",
      "Rechaza la comida en presencia de un disparador de miedo o de otro perro.",
      "Come normalmente en su plato diario pero no de la mano durante el entrenamiento.",
    ],
    porque:
      "El rechazo de comida en sesión suele indicar sobreumbral (demasiado estrés o excitación para activar el sistema digestivo) o un premio de bajo valor relativo al contexto, no falta de apetito real.",
    mecanismo:
      "El estrés agudo activa el sistema simpático y suprime funciones no esenciales como el apetito (por eso los animales no comen bajo amenaza real); en ese estado ningún premio de comida va a funcionar hasta bajar la intensidad del disparador. Además, la saciedad y el valor relativo del premio frente al entorno también determinan si «interesa» o no.",
    ajuste: [
      "Si rechaza en presencia del disparador, aumenta la distancia inmediatamente hasta que vuelva a aceptar comida: esa distancia es tu punto de partida real.",
      "Prueba jerarquía de premios (pollo hervido, queso, hígado deshidratado) y usa el de mayor valor solo para el entrenamiento, nunca en el plato diario.",
      "Entrena en ayuno relativo (2-3 horas sin comer) antes de sesiones fuera de casa.",
      "Si aun a distancia segura rechaza sistemáticamente, prueba refuerzo alternativo: juego breve, olfateo dirigido o acceso a un recurso valioso.",
    ],
    errorFatal: "Insistir con la sesión en el mismo punto de distancia cuando el perro ya rechazó el premio.",
    plazo:
      "Día 3: identificas la distancia mínima donde vuelve a comer. Día 7: acepta premio de alto valor en 2-3 contextos con esa distancia. Día 21: reduce distancia gradualmente manteniendo el interés por el premio.",
  },
];

export type Metodo = {
  metodo: string;
  veredicto: "Recomendado" | "Con cautela" | "Evitar";
  efectoCorto: string;
  efectoLargo: string;
  razon: string;
  cuandoSiSirve: string;
  evidencia: string;
};

export const METODOS: Metodo[] = [
  {
    metodo: "Refuerzo positivo (premiar lo que sí quieres)",
    veredicto: "Recomendado",
    efectoCorto: "Progreso visible en días si el criterio es claro.",
    efectoLargo: "Conducta estable y perro que ofrece soluciones por iniciativa propia.",
    razon: "Construye una alternativa. El perro aprende qué hacer, no solo qué no hacer.",
    cuandoSiSirve: "Para instalar cualquier conducta nueva o reemplazar una indeseada por una incompatible.",
    evidencia:
      "El condicionamiento operante muestra que las conductas seguidas de consecuencias apetitivas aumentan en frecuencia sin generar los efectos secundarios emocionales del castigo.",
  },
  {
    metodo: "Gestión del entorno (evitar el ensayo del error)",
    veredicto: "Recomendado",
    efectoCorto: "Alivio inmediato para la familia.",
    efectoLargo: "Multiplica el efecto del entrenamiento al cortar el refuerzo accidental.",
    razon: "No es rendirse: es dejar de entrenar la conducta que quieres eliminar.",
    cuandoSiSirve: "Siempre, como base de cualquier plan, especialmente los primeros 15 días.",
    evidencia:
      "Cada repetición de una conducta reforzada la fortalece; impedir la repetición reduce su frecuencia sin necesidad de castigo.",
  },
  {
    metodo: "Desensibilización a distancia",
    veredicto: "Recomendado",
    efectoCorto: "Lento las primeras dos semanas.",
    efectoLargo: "Cambia la emoción de fondo, no solo la reacción visible.",
    razon: "Único enfoque que resuelve miedo y reactividad de raíz.",
    cuandoSiSirve: "Miedo, reactividad a otros perros o personas, ruidos y disparadores concretos identificables.",
    evidencia:
      "Exponer al disparador por debajo del umbral de reacción y de forma gradual reduce la respuesta de miedo sin generar la sensibilización que produce la exposición forzada.",
  },
  {
    metodo: "Contracondicionamiento con comida de alto valor",
    veredicto: "Recomendado",
    efectoCorto: "El perro empieza a mirar al disparador y buscarte a ti, no a reaccionar.",
    efectoLargo: "Cambia la asociación emocional del disparador de amenaza a predictor de algo bueno.",
    razon: "Combinado con desensibilización, es el estándar de oro para miedo y reactividad.",
    cuandoSiSirve: "Cuando el perro ya asocia un disparador concreto con malestar (otro perro, la aspiradora, visitas).",
    evidencia:
      "Basado en condicionamiento clásico: emparejar un estímulo neutro/aversivo con comida de alto valor de forma sistemática cambia la respuesta emocional condicionada asociada.",
  },
  {
    metodo: "Trabajo de umbral y distancia",
    veredicto: "Recomendado",
    efectoCorto: "Permite entrenar sin que el perro explote ni se bloquee.",
    efectoLargo: "Baja progresivamente la distancia de reactividad de forma sostenida.",
    razon: "Trabajar por encima del umbral impide el aprendizaje: el perro solo reacciona, no procesa.",
    cuandoSiSirve: "Reactividad, miedo o ansiedad ante disparadores identificables a distancia.",
    evidencia:
      "Por encima de cierto nivel de activación fisiológica se reduce el acceso a funciones cognitivas superiores necesarias para aprender nuevas asociaciones.",
  },
  {
    metodo: "Refuerzo diferencial de conducta incompatible (DRI)",
    veredicto: "Recomendado",
    efectoCorto: "Reduce la conducta problema sin necesidad de suprimirla directamente.",
    efectoLargo: "La conducta alternativa se vuelve el patrón por defecto en ese contexto.",
    razon: "Enseña una conducta que físicamente no puede coexistir con la indeseada (sentado en vez de saltar).",
    cuandoSiSirve: "Saltos, ladridos de demanda, robo de comida, guardia de recursos leve.",
    evidencia:
      "Reforzar sistemáticamente una conducta topográficamente incompatible reduce la frecuencia de la conducta problema sin recurrir a castigo, con menor riesgo de efectos secundarios.",
  },
  {
    metodo: "Clicker / marcador de evento",
    veredicto: "Recomendado",
    efectoCorto: "Mejora notablemente la precisión y velocidad de aprendizaje desde la primera sesión.",
    efectoLargo: "Facilita moldear conductas complejas por aproximaciones sucesivas.",
    razon: "Marca el instante exacto de la conducta correcta, algo que la voz humana rara vez logra con precisión.",
    cuandoSiSirve: "Aprendizaje de conductas nuevas y complejas, moldeamiento fino, trucos y trabajo de precisión.",
    evidencia:
      "Un marcador condicionado consistente reduce la ambigüedad temporal entre conducta y refuerzo, acelerando la formación de la asociación.",
  },
  {
    metodo: "Ignorar la conducta de demanda",
    veredicto: "Con cautela",
    efectoCorto: "Empeora antes de mejorar (pico de extinción).",
    efectoLargo: "Funciona solo si además enseñas una forma alternativa de pedir.",
    razon: "Ignorar sin alternativa deja al perro sin recurso y aumenta la frustración.",
    cuandoSiSirve: "Demandas de atención leves (empujar con la pata, ladrar pidiendo juego) en perros sin ansiedad severa.",
    evidencia:
      "La extinción sin refuerzo de una conducta alternativa genera un pico transitorio de la conducta y puede derivar en frustración si no hay salida funcional.",
  },
  {
    metodo: "Correr o lanzar la pelota hasta agotarlo",
    veredicto: "Con cautela",
    efectoCorto: "Se ve cansado esa tarde.",
    efectoLargo: "Aumenta el umbral de excitación y la tolerancia al ejercicio: pide cada vez más.",
    razon: "Cansancio físico no es calma. El gasto mental rinde mucho más por minuto.",
    cuandoSiSirve: "Como complemento puntual y moderado, nunca como estrategia principal de gasto energético.",
    evidencia:
      "El ejercicio de alta intensidad repetido genera adaptación cardiovascular y conductual (mayor tolerancia), no saciedad; el enriquecimiento cognitivo produce fatiga más estable.",
  },
  {
    metodo: "Gritos, tirones secos y collares aversivos",
    veredicto: "Evitar",
    efectoCorto: "Parece que funciona: la conducta se detiene en el momento.",
    efectoLargo: "Suprime el aviso (gruñido) y aumenta el riesgo de mordida sin advertencia.",
    razon: "Asocia dolor o miedo al disparador y a ti. Cambia la reacción, no la emoción.",
    cuandoSiSirve: "No hay contexto donde el beneficio supere el riesgo documentado; existen alternativas eficaces sin estos efectos.",
    evidencia:
      "Estudios sobre métodos aversivos muestran mayor incidencia de signos de estrés, miedo y agresión asociada en comparación con entrenamiento basado en refuerzo positivo.",
  },
  {
    metodo: "Dominar al perro / «hacerse el alfa»",
    veredicto: "Evitar",
    efectoCorto: "Sumisión aparente por miedo.",
    efectoLargo: "Deteriora el vínculo y genera conductas defensivas.",
    razon: "El modelo de jerarquía de manada está descartado por la etología actual.",
    cuandoSiSirve: "No aplica: el modelo teórico en que se basa fue refutado y no describe la estructura social real del perro doméstico.",
    evidencia:
      "El estudio original de manadas de lobos en cautiverio que originó el concepto fue revisado por su propio autor; los perros domésticos no organizan su comportamiento en torno a una jerarquía de dominancia rígida.",
  },
  {
    metodo: "Castigar después del hecho",
    veredicto: "Evitar",
    efectoCorto: "Cara de «culpa» que interpretas como que entendió.",
    efectoLargo: "Ansiedad general y conductas de apaciguamiento.",
    razon: "Esa cara es apaciguamiento ante tu enfado, no comprensión del error pasado.",
    cuandoSiSirve: "No aplica: para que un castigo module conducta debe ser inmediato al acto, algo imposible pasados segundos.",
    evidencia:
      "El aprendizaje asociativo requiere contigüidad temporal estrecha entre conducta y consecuencia; castigar minutos u horas después no modifica la conducta pasada, solo genera malestar asociado a tu llegada.",
  },
];
