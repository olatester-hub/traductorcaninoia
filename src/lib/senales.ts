export type Senal = {
  zona: "Cola" | "Orejas" | "Ojos y cara" | "Cuerpo" | "Boca" | "Voz";
  senal: string;
  significa: string;
  /** Contexto típico donde aparece esta señal. */
  contexto: string;
  quehacer: string;
  /** El error más frecuente del tutor frente a esta señal. */
  error: string;
  nivel: "Calma" | "Duda" | "Tensión" | "Aviso";
};

export const SENALES: Senal[] = [
  {
    zona: "Cola",
    senal: "Cola suelta a media altura, movimiento amplio y blando",
    significa:
      "Sistema nervioso en equilibrio: hay activación, pero sin conflicto. El movimiento nace de la cadera, no solo de la punta.",
    contexto:
      "Al llegar a casa, al empezar un paseo conocido o al reencontrarse con un perro con el que ya jugó antes.",
    quehacer:
      "Es tu mejor ventana de aprendizaje: entrena, presenta algo nuevo o practica la llamada. Lo que se aprende en calma se retiene.",
    error:
      "Desaprovecharlo y dejar el entrenamiento para cuando ya está alterado, que es cuando peor aprende.",
    nivel: "Calma",
  },
  {
    zona: "Cola",
    senal: "Cola alta y rígida, vibrando solo en la punta",
    significa:
      "Activación alta con tensión muscular. No es alegría: es un perro decidiendo si avanza. La rigidez es el dato, no el movimiento.",
    contexto:
      "Ante otro perro a media distancia, en la reja frente a alguien que pasa, o al detectar un olor de otro macho.",
    quehacer:
      "Aumenta distancia y cambia de dirección con la correa floja antes de que se fije. Premia en cuanto el cuerpo se ablanda.",
    error:
      "Decir «mira, mueve la cola, quiere jugar» y permitir el acercamiento: así se producen la mayoría de los encontronazos.",
    nivel: "Tensión",
  },
  {
    zona: "Cola",
    senal: "Cola baja, pegada al vientre, cuerpo encogido",
    significa:
      "Miedo activo. El perro reduce su silueta para no ser un objetivo y busca una vía de escape.",
    contexto: "Petardos, tormentas, veterinario, calle nueva o personas que se acercan de frente.",
    quehacer:
      "Aléjate del estímulo y deja que él marque el ritmo del acercamiento. Consolar con voz suave no refuerza el miedo: lo regula.",
    error:
      "Forzar la exposición «para que se acostumbre». Sin control sobre la distancia, la exposición sensibiliza en lugar de habituar.",
    nivel: "Duda",
  },
  {
    zona: "Orejas",
    senal: "Orejas hacia adelante, fijas, con el resto del cuerpo quieto",
    significa: "Foco en un estímulo concreto y evaluación previa a la acción.",
    contexto: "Ruido en la escalera, un gato al final de la calle, alguien que se detiene a mirarlo.",
    quehacer:
      "Interrumpe con un sonido conocido y un giro. Ese medio segundo de latencia es tu única ventana antes de la reacción.",
    error: "Tirar de la correa hacia atrás, que añade tensión física a una tensión emocional ya alta.",
    nivel: "Tensión",
  },
  {
    zona: "Orejas",
    senal: "Orejas hacia atrás y pegadas al cráneo",
    significa:
      "Apaciguamiento o miedo: intenta desactivar el conflicto sin pelear. Suele acompañarse de cuerpo bajo.",
    contexto: "Al ser regañado, al ser abrazado por un desconocido o al entrar a un sitio ruidoso.",
    quehacer: "Baja el tono, retírate un paso y dale espacio para reorganizarse.",
    error: "Interpretarlo como culpa. No entiende de culpa: está leyendo tu tono y tu postura.",
    nivel: "Duda",
  },
  {
    zona: "Ojos y cara",
    senal: "Ojo de ballena: se ve la media luna blanca del ojo",
    significa:
      "Incomodidad clara. Vigila algo sin girar la cabeza, señal de que no quiere moverse pero tampoco está de acuerdo.",
    contexto: "Abrazos, niños encima, retirarle el plato, el juguete o el hueso, manipularlo dormido.",
    quehacer: "Detén la interacción de inmediato y deja que se levante y se aleje si quiere.",
    error:
      "Insistir «un segundito más» para la foto. Cada repetición acerca el gruñido y luego la mordida.",
    nivel: "Aviso",
  },
  {
    zona: "Ojos y cara",
    senal: "Parpadeo lento, mirada blanda, músculos de la cara sueltos",
    significa: "Ausencia de amenaza y confianza en la situación.",
    contexto: "En su cama, tras un paseo largo, cuando lo acaricias donde le gusta.",
    quehacer: "Asocia el momento con una palabra suave; te servirá después para bajarle revoluciones.",
    error: "Interrumpirlo con juego intenso justo cuando estaba entrando en calma.",
    nivel: "Calma",
  },
  {
    zona: "Ojos y cara",
    senal: "Mirada fija y congelada, respiración detenida",
    significa:
      "Segundos previos a la reacción. La quietud es la advertencia final; muchos perros no gruñen antes.",
    contexto: "Frente a un perro que se acerca de frente, junto a un recurso valioso, o en un rincón.",
    quehacer:
      "Rompe la escena sin gritos: giro de 180°, distancia, y solo después habla. Anota disparador y distancia exacta.",
    error: "Acercarse a tocarlo o a quitarle lo que tiene. Es el momento de mayor riesgo real de mordida.",
    nivel: "Aviso",
  },
  {
    zona: "Boca",
    senal: "Jadeo sin calor ni ejercicio, comisuras hacia atrás",
    significa:
      "Estrés fisiológico: cortisol y adrenalina en circulación. Puede durar horas después del episodio.",
    contexto: "Coche, visitas en casa, vuelta de un paseo conflictivo, vísperas de la ida al veterinario.",
    quehacer:
      "Sácalo del contexto y ofrece masticación larga o lametón: ambas activan la vía parasimpática y bajan la activación.",
    error: "Encadenar más estímulos «para que se canse». Un perro estresado no se cansa: se satura.",
    nivel: "Tensión",
  },
  {
    zona: "Boca",
    senal: "Bostezo, lamerse el hocico, olfatear el suelo de golpe",
    significa:
      "Señales de calma: pide bajar la tensión y evitar el conflicto. No es sueño ni distracción.",
    contexto: "Sesiones de entrenamiento largas, órdenes repetidas, niños que lo persiguen.",
    quehacer: "Reduce presión: menos órdenes, más distancia, pausa de 30 segundos y retomar más fácil.",
    error: "Repetir la orden más fuerte, que es exactamente lo que él está pidiendo que no hagas.",
    nivel: "Duda",
  },
  {
    zona: "Boca",
    senal: "Labios retraídos mostrando dientes delanteros y encías",
    significa: "Aviso serio e inequívoco previo a la mordida.",
    contexto: "Defensa de recursos, dolor al ser manipulado, acorralamiento sin salida.",
    quehacer:
      "Aumenta distancia con calma, retira la presión y busca acompañamiento profesional presencial.",
    error:
      "Castigar el gesto. Se elimina el aviso, no la emoción: obtienes un perro que muerde sin avisar.",
    nivel: "Aviso",
  },
  {
    zona: "Cuerpo",
    senal: "Reverencia de juego: pecho abajo, cadera arriba, movimientos exagerados",
    significa: "Metacomunicación: «lo que viene es juego». Cierra la posibilidad de conflicto.",
    contexto: "Inicio del juego con otro perro o contigo.",
    quehacer:
      "Acepta y mete pausas cada 20-30 segundos: el juego sin pausas escala a sobreexcitación y mordida.",
    error: "Dejar juegos largos sin cortes y luego regañar la mordida que provocó la propia excitación.",
    nivel: "Calma",
  },
  {
    zona: "Cuerpo",
    senal: "Peso adelantado, cuerpo tenso e inmóvil, pelo del lomo erizado",
    significa:
      "Preparación motora. El erizado es involuntario: indica activación intensa, sea miedo o intención de avance.",
    contexto: "Encuentros de frente, umbrales, rejas y pasillos estrechos.",
    quehacer: "Gira con correa floja y crea una curva; los perros se acercan en arco, no de frente.",
    error: "Frenarlo en seco y tensar la correa: la tensión mecánica dispara la reacción.",
    nivel: "Tensión",
  },
  {
    zona: "Cuerpo",
    senal: "Se sacude como si estuviera mojado, estando seco",
    significa: "Reinicio: descarga la tensión acumulada y cierra el episodio anterior.",
    contexto: "Tras un encuentro incómodo, después de una caricia no deseada o al salir del coche.",
    quehacer: "Buena señal. Dale 10 segundos antes de continuar y observa si el cuerpo se ablanda.",
    error: "Retomar la actividad de inmediato y no dejar que el sistema termine de bajar.",
    nivel: "Duda",
  },
  {
    zona: "Cuerpo",
    senal: "Se esconde detrás de ti o de un mueble",
    significa: "Te usa como refugio: hay confianza, pero está superado por el entorno.",
    contexto: "Visitas, fuegos artificiales, plazas con muchos perros sueltos.",
    quehacer:
      "Protégelo activamente: interponte y aleja al estímulo. Ser refugio fiable es lo que construye seguridad.",
    error: "Sacarlo de ahí «para que enfrente el miedo»: rompe la confianza y agrava el cuadro.",
    nivel: "Duda",
  },
  {
    zona: "Voz",
    senal: "Gruñido bajo y sostenido",
    significa: "Petición explícita de espacio antes de escalar. Es comunicación funcional y sana.",
    contexto: "Cerca de comida, juguetes, sitios de descanso o al ser manipulado con dolor.",
    quehacer:
      "Agradécelo: retírate, registra el disparador y trabaja después con intercambios y distancia.",
    error: "Castigarlo. Es la vía más rápida para crear un perro que muerde sin previo aviso.",
    nivel: "Aviso",
  },
  {
    zona: "Voz",
    senal: "Ladrido agudo y repetido con saltos y giros",
    significa: "Frustración o demanda. La conducta se mantiene porque históricamente ha funcionado.",
    contexto: "Antes del paseo, mientras preparas la comida, cuando dejas de hacerle caso.",
    quehacer:
      "Espera dos segundos de silencio antes de cualquier respuesta y refuerza esa pausa, no el silencio final tras diez minutos.",
    error: "Ceder tarde: enseña que insistir más tiempo funciona, y el ladrido se hace más largo.",
    nivel: "Tensión",
  },
  {
    zona: "Voz",
    senal: "Suspiro largo al echarse y aflojar el cuerpo",
    significa: "Cierre del ciclo de activación: entra en descanso profundo.",
    contexto: "Al final de la tarde, tras masticación o después de un paseo de olfateo.",
    quehacer:
      "No lo interrumpas. La consolidación del aprendizaje ocurre durante el sueño, no durante el ejercicio.",
    error: "Llamarlo o acariciarlo justo entonces y fragmentar el descanso.",
    nivel: "Calma",
  },
];

export const ZONAS = ["Cola", "Orejas", "Ojos y cara", "Cuerpo", "Boca", "Voz"] as const;

export const NIVEL_COLOR: Record<Senal["nivel"], string> = {
  Calma: "bg-primary/15 text-foreground",
  Duda: "bg-blush/40 text-foreground",
  Tensión: "bg-accent text-accent-foreground",
  Aviso: "bg-wine text-wine-foreground",
};

export const NIVEL_GUIA: Record<Senal["nivel"], string> = {
  Calma: "Ventana ideal para entrenar y presentar novedades.",
  Duda: "Pide espacio: baja presión y distancia antes de continuar.",
  Tensión: "Activación alta: interrumpe y cambia de escena.",
  Aviso: "Último aviso antes de escalar: retírate, no corrijas.",
};
