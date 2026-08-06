export type PlanPaso = { titulo: string; detalle: string };

export type FichaConducta = {
  interpretacion: string;
  emocion: string;
  causaRaiz: string[];
  errores: string[];
  plan: PlanPaso[];
  senales: string[];
};

export const CONDUCTAS: Record<string, FichaConducta> = {
  "Ladridos excesivos": {
    interpretacion:
      "El ladrido no es desobediencia: es el canal más rápido que tu perro tiene para avisar, pedir o descargar tensión. Cuando se repite, casi siempre está funcionando (alguien se va, alguien vuelve, alguien lo mira).",
    emocion: "Alerta sostenida y frustración por no poder resolver lo que percibe.",
    causaRaiz: [
      "Umbral de alerta bajo: el entorno le entrega más estímulos de los que puede procesar.",
      "Refuerzo accidental: la atención (aunque sea un reto) llega justo después del ladrido.",
      "Falta de una conducta alternativa clara que le sirva para pedir lo mismo sin ladrar.",
    ],
    errores: [
      "Gritar «¡ya basta!»: para él suena como que ladras con él y sube la excitación.",
      "Atenderlo o abrir la puerta mientras ladra: consolida el ladrido como llave de acceso.",
      "Castigar después del episodio: no asocia el castigo con la conducta, solo pierde confianza.",
    ],
    plan: [
      {
        titulo: "Baja el estímulo antes de entrenar",
        detalle:
          "Reduce el acceso visual y sonoro al disparador (cortina, sitio de descanso lejos de la puerta, ruido blanco) durante 7 días. Sin esto, cualquier ejercicio compite contra el entorno.",
      },
      {
        titulo: "Marca el silencio, no el ladrido",
        detalle:
          "Espera 2 segundos de silencio y recién ahí premia con voz suave y comida. Repite 10 veces al día en situaciones fáciles antes de exigirlo en las difíciles.",
      },
      {
        titulo: "Enséñale un «reemplazo»",
        detalle:
          "Cada vez que aparezca el disparador, pídele ir a su cama o buscar un juguete. Necesita algo que hacer, no solo algo que dejar de hacer.",
      },
      {
        titulo: "Cubre la necesidad de fondo",
        detalle:
          "Suma 10-15 minutos diarios de olfateo libre o masticación. Un perro con descarga mental ladra notablemente menos.",
      },
    ],
    senales: [
      "Episodios más cortos aunque sigan apareciendo.",
      "Se calla solo tras el primer o segundo ladrido.",
      "Busca su cama o su juguete cuando escucha el disparador.",
    ],
  },
  "Ansiedad por separación": {
    interpretacion:
      "No está enojado ni «se venga»: entra en pánico cuando pierde el acceso a su figura de seguridad. Lo que ves al volver (destrozos, pipí, saludo desbordado) es el final de una crisis, no el inicio.",
    emocion: "Miedo al abandono y activación fisiológica alta durante toda la ausencia.",
    causaRaiz: [
      "Nunca aprendió que la ausencia es predecible, corta y segura.",
      "Rutinas de salida muy cargadas emocionalmente (despedidas largas, reencuentros eufóricos).",
      "Dependencia de contacto permanente dentro de casa: te sigue de habitación en habitación.",
    ],
    errores: [
      "Despedirte y saludarlo con mucha emoción: marca la ausencia como algo enorme.",
      "Dejarlo solo muchas horas «para que se acostumbre»: la inundación empeora el pánico.",
      "Retar los destrozos al volver: aumenta la ansiedad de la próxima salida.",
    ],
    plan: [
      {
        titulo: "Independencia dentro de casa",
        detalle:
          "Durante una semana practica que descanse en su lugar mientras estás en otra habitación, 3-5 minutos varias veces al día, sin drama al entrar o salir.",
      },
      {
        titulo: "Desensibiliza las señales de salida",
        detalle:
          "Toma las llaves, ponte los zapatos, abre la puerta… y quédate. Repítelo hasta que esas señales dejen de anticipar el abandono.",
      },
      {
        titulo: "Ausencias progresivas y medidas",
        detalle:
          "Empieza en 30 segundos y sube solo si vuelve tranquilo. Grábalo: los primeros 3 minutos te dicen la verdad de su estado.",
      },
      {
        titulo: "Ancla positiva al salir",
        detalle:
          "Entrega un mordedor o kong congelado justo al irte y retíralo al volver. La ausencia pasa a predecir algo bueno.",
      },
    ],
    senales: [
      "Se queda en su sitio cuando te mueves por la casa.",
      "Vocaliza menos en los primeros 5 minutos de ausencia.",
      "El reencuentro es tranquilo, sin saltos ni jadeo intenso.",
    ],
  },
  "Tirones de correa": {
    interpretacion:
      "Tirar funciona: cada vez que tira, el mundo se acerca. No es dominancia, es un hábito muy reforzado sumado a un paseo demasiado excitante para su nivel de autocontrol.",
    emocion: "Excitación anticipatoria y frustración cuando el entorno lo frena.",
    causaRaiz: [
      "El avance sigue ocurriendo aunque la correa esté tensa.",
      "Salidas cortas y muy estimulantes: acumula ganas y las descarga tirando.",
      "Nunca se le enseñó qué posición sí es la correcta junto a ti.",
    ],
    errores: [
      "Tirones correctivos secos: aumentan la tensión y el riesgo físico en cuello y tráquea.",
      "Avanzar «solo esta vez» con la correa tensa: enseña que a veces sí funciona.",
      "Correa muy corta y tensa todo el paseo: nunca experimenta caminar en soltura.",
    ],
    plan: [
      {
        titulo: "Regla firme: correa tensa = paseo detenido",
        detalle:
          "Detente en cuanto la correa se tensa. Retoma solo cuando afloje. Los primeros 3 días avanzarás poco; es parte del proceso.",
      },
      {
        titulo: "Premia la posición correcta",
        detalle:
          "Refuerza cada 5-10 pasos mientras camina junto a ti con la correa floja. Debe cobrar más caminar bien que tirar.",
      },
      {
        titulo: "Descarga antes de exigir",
        detalle:
          "Comienza el paseo con 5 minutos de olfateo libre en una zona tranquila; luego pide caminar formal.",
      },
      {
        titulo: "Equipo adecuado",
        detalle:
          "Arnés antitirón de enganche frontal y correa de 1,5-2 m. No sustituye al entrenamiento, pero evita daño mientras aprende.",
      },
    ],
    senales: [
      "Tramos cada vez más largos con correa floja.",
      "Te mira al detenerse en lugar de seguir empujando.",
      "Vuelve solo a tu lado tras olfatear.",
    ],
  },
  "Conductas destructivas": {
    interpretacion:
      "Morder muebles, cojines o puertas casi nunca es «maldad»: es una vía de descarga. El objeto elegido y el momento del día te dicen si el motor es aburrimiento, estrés o necesidad de masticar.",
    emocion: "Frustración acumulada y necesidad de descarga oral no canalizada.",
    causaRaiz: [
      "Déficit de estimulación mental: días largos y predecibles sin nada que resolver.",
      "Sin alternativas legales de masticación disponibles y atractivas.",
      "Estrés ambiental (ruidos, cambios, soledad) que busca salida física.",
    ],
    errores: [
      "Retar sobre el objeto destruido horas después: no hay asociación posible.",
      "Dar el juguete justo cuando está destruyendo algo: premia el momento equivocado.",
      "Quitar todo sin ofrecer sustituto: la conducta se desplaza a otro objeto.",
    ],
    plan: [
      {
        titulo: "Gestiona el acceso",
        detalle:
          "Durante 2 semanas limita el espacio libre sin supervisión. Evitar la práctica del error acelera el aprendizaje.",
      },
      {
        titulo: "Ofrece masticación legal y rotativa",
        detalle:
          "2-3 opciones de mordida segura, rotadas cada día para que mantengan novedad, disponibles en los horarios críticos.",
      },
      {
        titulo: "Trabajo mental diario",
        detalle:
          "10 minutos de comida repartida en juegos de olfato o dispensadores. Sustituye buena parte del gasto energético.",
      },
      {
        titulo: "Refuerza la calma",
        detalle:
          "Cuando esté echado con su mordedor, acércate y premia en silencio. La calma también se entrena.",
      },
    ],
    senales: [
      "Elige su mordedor por iniciativa propia.",
      "Menos episodios y objetos dañados de menor valor.",
      "Períodos de descanso más largos durante el día.",
    ],
  },
  "Reactividad con otros perros": {
    interpretacion:
      "Ladrar, tirar o gruñir ante otro perro suele ser una estrategia de distancia: «no te acerques». Debajo casi siempre hay inseguridad o frustración, no agresividad gratuita.",
    emocion: "Miedo o frustración social con umbral muy bajo en presencia de otros perros.",
    causaRaiz: [
      "Encuentros forzados a corta distancia que nunca terminaron bien.",
      "Correa tensa: le quita opciones de huida y sube la activación.",
      "Socialización limitada o experiencias negativas en etapas sensibles.",
    ],
    errores: [
      "Obligarlo a saludar «para que se acostumbre».",
      "Tensar la correa al ver otro perro: le anticipas peligro.",
      "Castigar el gruñido: eliminas el aviso, no la emoción, y aumentas el riesgo.",
    ],
    plan: [
      {
        titulo: "Encuentra su distancia de seguridad",
        detalle:
          "Identifica a cuántos metros puede ver otro perro sin reaccionar. Ese es tu punto de partida real, aunque sean 30 m.",
      },
      {
        titulo: "Cambia la asociación",
        detalle:
          "En cuanto aparezca el otro perro a esa distancia, comida buena de forma continua; cuando desaparece, se acaba. Otro perro = cosas buenas.",
      },
      {
        titulo: "Enseña el giro en U",
        detalle:
          "Una señal alegre para girar y alejarse sin conflicto. Le da una salida y a ti control de la situación.",
      },
      {
        titulo: "Acorta distancias muy despacio",
        detalle:
          "Reduce un metro solo tras 3 sesiones sin reacción. Si reacciona, has ido demasiado rápido: retrocede.",
      },
    ],
    senales: [
      "Te mira al ver al otro perro en lugar de fijarse en él.",
      "Se recupera más rápido después de un episodio.",
      "Puede caminar en paralelo a distancia sin explotar.",
    ],
  },
  "Miedos y fobias": {
    interpretacion:
      "El miedo no se «malcría»: no se refuerza por acompañar a un perro asustado. Lo que ves (temblar, esconderse, huir) es una respuesta fisiológica que no puede controlar voluntariamente.",
    emocion: "Miedo con pérdida de control sobre el entorno y sensación de indefensión.",
    causaRaiz: [
      "Exposición a un estímulo intenso sin posibilidad de escape o control.",
      "Falta de un refugio seguro fijo dentro de casa.",
      "Generalización: el miedo se extiende a lugares o momentos asociados.",
    ],
    errores: [
      "Exponerlo de golpe para «que lo supere»: la inundación cronifica el miedo.",
      "Retarlo por esconderse o temblar.",
      "Obligarlo a acercarse al estímulo tirando de la correa.",
    ],
    plan: [
      {
        titulo: "Crea un refugio",
        detalle:
          "Un lugar fijo, cerrado y cómodo al que siempre pueda ir. Nadie lo molesta ahí, nunca.",
      },
      {
        titulo: "Baja la intensidad del estímulo",
        detalle:
          "Trabájalo a volumen o distancia mínima donde apenas lo note, y asócialo con comida o juego.",
      },
      {
        titulo: "Devuélvele el control",
        detalle:
          "Que siempre pueda alejarse. La posibilidad de huir reduce el miedo más que cualquier premio.",
      },
      {
        titulo: "Sube muy gradualmente",
        detalle:
          "Un pequeño incremento por sesión, solo si se mantiene relajado y come con normalidad.",
      },
    ],
    senales: [
      "Sale del refugio antes de lo habitual.",
      "Acepta comida en presencia del estímulo.",
      "Postura más suelta: cola más alta, orejas menos pegadas.",
    ],
  },
  "Higiene / accidentes en casa": {
    interpretacion:
      "Los accidentes suelen indicar un hábito incompleto, no falta de inteligencia. Necesita previsibilidad, más oportunidades de acierto y refuerzo inmediato en el lugar correcto.",
    emocion: "Confusión sobre dónde es correcto, a veces con ansiedad si hubo castigos previos.",
    causaRaiz: [
      "Ventanas de salida demasiado espaciadas para su edad o control físico.",
      "Refuerzo tardío: se premia al volver a casa, no en el sitio ni en el momento.",
      "Restos de olor en zonas de accidente que invitan a repetir.",
    ],
    errores: [
      "Regañar o restregar el hocico: genera miedo y hace que se esconda para hacerlo.",
      "Limpiar con productos con amoníaco: el olor invita a repetir en el mismo punto.",
      "Premiar al entrar a casa en vez de en el lugar exacto.",
    ],
    plan: [
      {
        titulo: "Calendario de salidas",
        detalle:
          "Al despertar, tras cada comida, tras jugar y antes de dormir. En cachorros, cada 2-3 horas.",
      },
      {
        titulo: "Premia en el sitio, en 3 segundos",
        detalle: "Refuerza justo al terminar, en el lugar correcto. El retraso rompe la asociación.",
      },
      {
        titulo: "Neutraliza los olores",
        detalle: "Limpieza enzimática en cada accidente para eliminar la marca que lo invita a repetir.",
      },
      {
        titulo: "Supervisa o gestiona",
        detalle:
          "Cuando no puedas vigilar, reduce el espacio disponible. Menos accidentes = aprendizaje más rápido.",
      },
    ],
    senales: [
      "Avisa o se dirige a la puerta.",
      "Menos accidentes por semana y en menos lugares.",
      "Aguanta intervalos más largos.",
    ],
  },
  "Mordidas de juego": {
    interpretacion:
      "La boca es su mano. En juego, morder es normal; el problema es la falta de control de la fuerza y de un interruptor claro para terminar el juego.",
    emocion: "Excitación alta con poca autorregulación, típica de etapas de aprendizaje.",
    causaRaiz: [
      "Juego con manos: enseña que la piel es un juguete válido.",
      "Sesiones de juego largas sin pausas: la excitación se desborda.",
      "Falta de descanso real: un perro sobreestimulado muerde más.",
    ],
    errores: [
      "Retirar la mano de golpe o gritar: parece parte del juego y sube la intensidad.",
      "Seguir jugando después de la mordida fuerte.",
      "Castigo físico: aumenta la excitación y daña la confianza.",
    ],
    plan: [
      {
        titulo: "Termina el juego al primer diente",
        detalle:
          "Sin drama: te levantas, 20-30 segundos de pausa y vuelves. La consecuencia es perder el juego.",
      },
      {
        titulo: "Sustituye por juguete",
        detalle: "Ten siempre un mordedor a mano y redirige la boca antes de que llegue a la piel.",
      },
      {
        titulo: "Sesiones cortas con pausas",
        detalle: "3-5 minutos de juego, pausa de calma, repetir. Entrena el freno, no solo el acelerador.",
      },
      {
        titulo: "Asegura el descanso",
        detalle:
          "Los cachorros necesitan 16-18 h de sueño. Gran parte del mordisqueo desaparece al dormir bien.",
      },
    ],
    senales: [
      "Mordida más suave o solo contacto.",
      "Se frena solo al ver tu mano.",
      "Elige el juguete en vez de la piel.",
    ],
  },
};

export const INTENSIDAD_NOTA: Record<string, string> = {
  Ocasional:
    "Al ser ocasional, el patrón aún no está consolidado: con 2-3 semanas de consistencia suele revertirse por completo.",
  Frecuente:
    "Al ser frecuente, el hábito ya está reforzado. Espera avances visibles en 3-4 semanas si el plan se aplica todos los días, sin excepciones.",
  Constante:
    "Al ser constante, hay activación emocional de fondo: prioriza bajar el estímulo y la gestión del entorno antes de exigir obediencia. Considera descartar dolor o causa médica con tu veterinario.",
};

export const ETAPA_NOTA: Record<string, string> = {
  "Cachorro (< 6 meses)":
    "En esta etapa el cerebro está en plena construcción: repeticiones muy cortas, mucha calma y descanso valen más que sesiones largas.",
  "Cachorro joven (6-12 meses)":
    "Está en plena adolescencia canina: es normal que parezca «olvidar» lo aprendido. Mantén las reglas estables y no cedas por cansancio.",
  "Adulto (1-6 años)":
    "En un adulto el hábito está bien instalado, pero la capacidad de aprendizaje es excelente: la clave es la consistencia diaria.",
  "Senior (+7 años)":
    "En un senior, descarta primero dolor, pérdida de audición o visión y deterioro cognitivo: muchos cambios de conducta a esta edad tienen origen físico.",
};

export const ENTORNO_NOTA: Record<string, string> = {
  "Casa con patio":
    "Ojo: el patio no sustituye el paseo ni el trabajo mental. El acceso libre puede aumentar la vigilancia y los ladridos al exterior.",
  "Departamento / piso sin patio":
    "En piso, cada salida cuenta doble: prioriza olfateo de calidad y rutinas de calma dentro de casa.",
  "Hogar con niños pequeños":
    "Con niños, define reglas claras de interacción y zonas de descanso donde el perro nunca sea molestado.",
  "Hogar con otras mascotas":
    "Con otras mascotas, gestiona recursos por separado (comida, camas, juguetes) para reducir tensión de fondo.",
};
