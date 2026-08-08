export type PlanPaso = { titulo: string; detalle: string };

export type Eje =
  | "Activación"
  | "Inseguridad"
  | "Hábito reforzado"
  | "Necesidad no cubierta"
  | "Conflicto social";

export type FichaConducta = {
  /** Eje conductual dominante: define cómo se combina con otra conducta. */
  eje: Eje;
  interpretacion: string;
  /** Ciclo antecedente → conducta → consecuencia que la mantiene viva. */
  mecanismo: string;
  emocion: string;
  causaRaiz: string[];
  /** Qué mirar en el cuerpo para confirmar el diagnóstico. */
  lectura: string[];
  errores: string[];
  plan: PlanPaso[];
  /** Ejercicio mínimo para hacer hoy mismo, en menos de 5 minutos. */
  primerPaso: string;
  senales: string[];
  /** Cuándo dejar de entrenar y derivar a veterinario o etólogo clínico. */
  banderas: string[];
};

export const CONDUCTAS: Record<string, FichaConducta> = {
  "Ladridos excesivos": {
    eje: "Activación",
    interpretacion:
      "El ladrido repetido casi nunca es «carácter»: es una respuesta de alerta que se disparó, funcionó y quedó instalada. Como criador te diría que mires tres cosas antes de entrenar nada: dónde duerme (si descansa mirando la puerta o la ventana, vive de guardia), cuántas veces al día se le habla mientras ladra, y si el ladrido es agudo y en ráfagas (alerta/frustración) o grave y espaciado (aviso territorial). Son problemas distintos con soluciones distintas.",
    mecanismo:
      "Antecedente: un estímulo aparece a una distancia que ya lo supera (timbre, paso en el pasillo, perro en la vereda). Conducta: ladra. Consecuencia: el estímulo se va solo, o alguien lo mira, lo reta o lo toca. En ambos casos el ladrido «funcionó», y una conducta que funciona de forma impredecible se refuerza de manera intermitente, que es el patrón más resistente a la extinción que existe.",
    emocion:
      "Alerta sostenida con frustración: percibe algo que no puede resolver ni alejar, y el cuerpo queda en activación alta durante horas.",
    causaRaiz: [
      "Umbral de alerta bajo por exposición crónica: el entorno entrega más estímulos por hora de los que su sistema nervioso puede procesar y recuperar.",
      "Refuerzo social accidental: la atención posterior al ladrido (incluso el reto) llega en la ventana de 1-2 segundos en que el aprendizaje se consolida.",
      "Ausencia de conducta alternativa: no tiene ninguna otra forma aprendida de pedir distancia, acceso o información.",
      "Déficit de descanso real: por debajo de 14-16 h de sueño diario el umbral de reactividad cae de forma medible.",
    ],
    lectura: [
      "Ladrido agudo en ráfagas de 3-4, con salto o giro: frustración por acceso, no defensa.",
      "Pelo erizado en la cruz y peso hacia adelante: componente territorial o de amenaza percibida.",
      "Vuelve a la ventana o la puerta a los pocos segundos: sigue en el ciclo, no se recuperó.",
    ],
    errores: [
      "Gritar «¡ya basta!»: sube el volumen del grupo, no lo baja; para él el humano se sumó al coro.",
      "Abrir la puerta, dar comida o hablarle mientras ladra: entrega exactamente el resultado que estaba pidiendo.",
      "Castigar al terminar el episodio: sin contigüidad temporal no hay asociación posible, solo desconfianza hacia ti.",
      "Usar collares de citronela o vibración: suprimen el sonido sin tocar la emoción y suelen desplazar la conducta a jadeo, temblor o destrucción.",
    ],
    plan: [
      {
        titulo: "Día 1-7: baja la carga del entorno antes de entrenar",
        detalle:
          "Bloquea el acceso visual (vinilo esmerilado, cortina a media altura) y suma ruido blanco constante en la zona de descanso, que debe estar lejos de la puerta de entrada. Objetivo medible: bajar de más de 10 episodios diarios a menos de 4 sin pedirle nada al perro.",
      },
      {
        titulo: "Día 3-14: marca el silencio, nunca el ladrido",
        detalle:
          "Con el disparador a intensidad baja, espera 2 segundos de silencio, marca con una palabra corta («sí») y premia al piso. 10 repeticiones por día en situaciones fáciles antes de intentarlo con el timbre real. Si falla 2 veces seguidas, la distancia era corta.",
      },
      {
        titulo: "Día 5-21: entrena el reemplazo (DRI)",
        detalle:
          "Enseña «a tu sitio» con comida en la cama y luego enlázalo al disparador: suena el timbre → va a la cama → recibe 5 premios de a uno. Un perro no puede ladrar de guardia y descansar en su cama a la vez; por eso funciona.",
      },
      {
        titulo: "Diario: cubre la necesidad de fondo",
        detalle:
          "15-20 minutos de olfateo libre con correa larga (no paseo deportivo) más una sesión de masticación de 10-15 minutos por la tarde. El olfato y la masticación bajan la frecuencia cardíaca; correr la sube.",
      },
    ],
    primerPaso:
      "Hoy: mueve su cama fuera de la línea de visión de la puerta y dale un mordedor ahí durante 10 minutos. Nada más. Es la intervención con mejor relación esfuerzo/resultado del plan.",
    senales: [
      "Los episodios pasan de 30-40 segundos a 5-10 segundos aunque sigan apareciendo.",
      "Se corta solo después del primer o segundo ladrido y te busca con la mirada.",
      "Ante el disparador se dirige a su cama o toma un juguete sin que se lo pidas.",
      "Duerme siestas largas de día en vez de dormitar en alerta.",
    ],
    banderas: [
      "Ladridos nuevos en un perro adulto que antes no ladraba: descarta dolor, hipertensión o pérdida de audición.",
      "Vocalización nocturna con desorientación en un senior: posible disfunción cognitiva, requiere veterinario.",
      "Ladrido acompañado de gruñido con congelamiento hacia personas: derivación a etólogo clínico antes de seguir.",
    ],
  },

  "Ansiedad por separación": {
    eje: "Inseguridad",
    interpretacion:
      "No es venganza ni caprichito: es un cuadro de pánico. Lo que encuentras al volver (destrozos concentrados en puertas y ventanas, orina en zonas de paso, saludo desbordado) es el residuo de una crisis que ocurrió en los primeros 15-30 minutos. La prueba está en la cámara: si la crisis arranca antes del minuto 5 y no se recupera, es ansiedad de separación real y no aburrimiento.",
    mecanismo:
      "Antecedente: se acumulan señales de salida (ducha, llaves, zapatos) que anticipan la pérdida de la figura de seguridad. Conducta: intento de reunificación (rascar, morder salidas, vocalizar) más descarga fisiológica. Consecuencia: la ansiedad no baja porque el perro nunca comprueba que la ausencia es corta y predecible, y cada episodio sensibiliza más el sistema: el umbral baja en vez de subir.",
    emocion:
      "Miedo al abandono con activación fisiológica sostenida: cortisol alto, jadeo, salivación, incapacidad de comer durante toda la ausencia.",
    causaRaiz: [
      "Nunca hubo un protocolo de ausencias graduales: pasó de acompañamiento total a jornadas completas solo.",
      "Contacto permanente dentro de casa: te sigue de habitación en habitación y nunca practicó estar solo estando tú presente.",
      "Rituales de despedida y reencuentro muy cargados: convierten la ausencia en un evento enorme.",
      "Cambio reciente de rutina, mudanza, duelo o adopción: el 60-70 % de los casos aparece tras un cambio de contexto.",
    ],
    lectura: [
      "Deja de comer el premio que le diste al salir: señal inequívoca de que superó su umbral.",
      "Destrozos en los puntos de salida (marco de puerta, alfombra de entrada, persianas), no en objetos al azar.",
      "Jadeo sin calor, pupila dilatada y caminar en círculos en los primeros minutos.",
    ],
    errores: [
      "Despedidas largas y reencuentros eufóricos: amplifican el contraste emocional de la ausencia.",
      "Dejarlo muchas horas «para que se acostumbre»: eso es inundación y cronifica el cuadro.",
      "Retar los destrozos al volver: aumenta la ansiedad anticipatoria de la próxima salida.",
      "Adoptar otro perro como solución: el vínculo de apego es con la persona; rara vez lo resuelve.",
    ],
    plan: [
      {
        titulo: "Semana 1: independencia dentro de casa",
        detalle:
          "3-5 veces al día, mándalo a su sitio y aléjate a otra habitación 30 segundos a 3 minutos, con puerta entreabierta. Vuelve antes de que se levante. Criterio de avance: 5 repeticiones seguidas sin seguirte.",
      },
      {
        titulo: "Semana 1-2: desactiva las señales de salida",
        detalle:
          "Toma las llaves y siéntate. Ponte los zapatos y cocina. Abre y cierra la puerta sin salir. 15-20 repeticiones diarias hasta que deje de levantar la cabeza. Sin este paso, cualquier ausencia empieza con el perro ya activado.",
      },
      {
        titulo: "Semana 2-4: ausencias medidas con cámara",
        detalle:
          "Empieza en 30 segundos y sube solo si volvió tranquilo: 30 s, 1, 2, 3, 5, 8, 12, 20 min. Graba siempre los primeros 5 minutos. Si vocaliza o jadea, has ido 2 pasos demasiado lejos: retrocede al último tiempo exitoso.",
      },
      {
        titulo: "Todo el proceso: cero ausencias por encima del umbral",
        detalle:
          "Durante el protocolo no puede quedarse solo más de lo que tolera. Guardería, vecino o paseador. Cada crisis real borra alrededor de una semana de trabajo.",
      },
    ],
    primerPaso:
      "Hoy: toma las llaves, agítalas y vuelve a dejarlas 10 veces seguidas sin salir de casa. Es el primer ladrillo del protocolo y no requiere ausentarse.",
    senales: [
      "Se queda echado cuando cambias de habitación.",
      "Come el kong o mordedor durante los primeros minutos de ausencia.",
      "El reencuentro es tranquilo: se estira, bosteza y no salta ni jadea.",
      "La cámara muestra que se acuesta antes del minuto 10.",
    ],
    banderas: [
      "Autolesiones, uñas sangrantes o dientes rotos al intentar salir: urgencia conductual, requiere veterinario y posible apoyo farmacológico.",
      "Cuadro grave que no cede tras 4 semanas de protocolo bien aplicado: derivación a etólogo clínico veterinario.",
      "Aparición súbita en un perro senior: descartar dolor, deterioro sensorial o disfunción cognitiva.",
    ],
  },

  "Tirones de correa": {
    eje: "Hábito reforzado",
    interpretacion:
      "Tirar no es dominancia: es el hábito mejor pagado de su vida. Cada tirón acerca el poste, el pasto o el otro perro, y refuerza el patrón varias veces por minuto. Súmale que la mayoría de los perros pasean a un ritmo humano que les resulta lentísimo y con un collar que castiga la tráquea sin enseñar nada, y tienes el cuadro completo.",
    mecanismo:
      "Antecedente: correa puesta, olor interesante a 3 metros. Conducta: adelanta el peso y tira. Consecuencia: avanza y llega. Se refuerza en promedio 200-400 veces por paseo. Además la presión constante en el pecho activa el reflejo de oposición: cuanto más tiras tú, más contrapeso hace él, por pura biomecánica.",
    emocion:
      "Anticipación y frustración: nivel de excitación demasiado alto para el autocontrol que aún tiene disponible.",
    causaRaiz: [
      "Historia de refuerzo masiva: el hábito lleva cientos de horas de práctica exitosa.",
      "Equipo inadecuado: collar fijo o arnés de tiro (enganche dorsal) que amplifica el reflejo de oposición.",
      "Paseo demasiado excitante y demasiado corto: sale de casa con exceso de activación acumulada.",
      "Criterio inconsistente: a veces se permite tirar «porque hay prisa», lo que crea refuerzo intermitente.",
    ],
    lectura: [
      "Tos o arcada al tirar: presión traqueal, cambia el equipo hoy mismo.",
      "Cabeza baja y línea recta hacia un punto: motivación de olfato, se resuelve con permiso, no con corrección.",
      "Cuerpo lateral, ladrido y salto: no es tirón, es reactividad; trabaja distancia primero.",
    ],
    errores: [
      "Tirones secos de corrección: dañan cuello y tráquea, y el efecto dura hasta el siguiente estímulo.",
      "Avanzar «solo un poquito» mientras la correa está tensa: mantiene vivo el refuerzo intermitente.",
      "Correa retráctil: enseña que la tensión constante produce libertad, exactamente lo contrario de lo que quieres.",
      "Pedir caminar formal durante todo el paseo: nadie sostiene 40 minutos de autocontrol.",
    ],
    plan: [
      {
        titulo: "Hoy: cambia el equipo",
        detalle:
          "Arnés en Y con enganche frontal y correa fija de 1,5-2 m para los tramos de trabajo; correa larga de 5 m para los tramos de olfateo. El equipo no entrena, pero deja de sabotearte.",
      },
      {
        titulo: "Semana 1: divide el paseo en dos monedas",
        detalle:
          "Define una señal para «libre, olfatea» y otra para «conmigo». Estructura de 30 minutos: 5 conmigo, 10 libre, 5 conmigo, 10 libre. El olfateo pasa a ser el premio de caminar bien.",
      },
      {
        titulo: "Semana 1-3: el árbol y el pago por posición",
        detalle:
          "Si la correa se tensa, te detienes por completo; cuando afloja, avanzas. En los tramos «conmigo», premia cada 5-10 pasos junto a tu pierna. Criterio de avance: 20 pasos con correa floja antes de subir la dificultad.",
      },
      {
        titulo: "Semana 2-3: generaliza",
        detalle:
          "Repite el mismo protocolo en 5 entornos ordenados de menos a más distracción. Un perro que camina bien en tu cuadra no camina bien en la plaza: son aprendizajes distintos.",
      },
    ],
    primerPaso:
      "Hoy: los primeros 5 minutos del paseo, no des un solo paso con la correa tensa, aunque solo avances 20 metros. Ese contraste inicial es lo que instala la regla.",
    senales: [
      "Tramos con correa floja cada vez más largos entre premios.",
      "Cuando te detienes, afloja y te mira en menos de 3 segundos.",
      "Vuelve solo a tu lado después de olfatear, sin llamarlo.",
      "El paseo termina sin que te duela el hombro: el mejor indicador objetivo.",
    ],
    banderas: [
      "Tos persistente, arcadas o cambio de voz: revisión veterinaria de tráquea.",
      "Cojera o rechazo súbito a caminar: descartar dolor articular antes de insistir.",
    ],
  },

  "Conductas destructivas": {
    eje: "Necesidad no cubierta",
    interpretacion:
      "El objeto y el horario te dan el diagnóstico. Zócalos y patas de mesa en un cachorro: necesidad de masticación durante el recambio dentario. Cojines y control remoto a media tarde: aburrimiento y búsqueda de interacción. Puertas y ventanas al quedarse solo: eso no es destructividad, es ansiedad de separación y se trata distinto.",
    mecanismo:
      "Antecedente: activación sin salida (energía, estrés o necesidad oral) más acceso libre a objetos atractivos. Conducta: masticar o destrozar. Consecuencia: alivio inmediato por liberación de tensión (la masticación baja la frecuencia cardíaca) y, muchas veces, atención humana. Es autorreforzante: no necesita que nadie lo premie para mantenerse.",
    emocion:
      "Frustración acumulada y necesidad de descarga oral sin canal legal disponible.",
    causaRaiz: [
      "Días previsibles y vacíos: sin nada que resolver, el perro se inventa el problema.",
      "Sin alternativas de masticación seguras, atractivas y disponibles en los horarios críticos.",
      "Estrés ambiental de fondo: obras, visitas, mudanza, nuevo integrante en casa.",
      "Recambio dentario entre los 3 y 7 meses: necesidad fisiológica, no capricho.",
    ],
    lectura: [
      "Destrozos en objetos con tu olor (zapatos, ropa, mando): componente de apego y ansiedad.",
      "Destrozos en salidas y marcos de puerta: sospecha ansiedad de separación.",
      "Destrozos de tarde-noche con carrera y zoomies: sobreestimulación y falta de siestas.",
    ],
    errores: [
      "Retar sobre el objeto destruido horas después: cero asociación, mucha desconfianza.",
      "Dar el juguete justo cuando está destruyendo: refuerza el momento exacto del error.",
      "Retirar todo sin ofrecer sustituto: la conducta se desplaza a otro objeto, no desaparece.",
      "Aumentar el ejercicio físico intenso: sube el umbral de resistencia y a las semanas pide más.",
    ],
    plan: [
      {
        titulo: "Semana 1-2: gestión del acceso",
        detalle:
          "Sin supervisión, espacio reducido y a prueba de perro (corralito, una habitación, o zona con barrera). Cada episodio evitado es una repetición menos de un hábito autorreforzante.",
      },
      {
        titulo: "Diario: masticación legal y rotativa",
        detalle:
          "3 opciones seguras rotadas día por medio para mantener la novedad, disponibles 30 minutos antes de los horarios críticos que ya identificaste. Un perro que mastica 20 minutos al día destroza mucho menos.",
      },
      {
        titulo: "Diario: alimentación como trabajo mental",
        detalle:
          "Elimina el bol: reparte la ración en alfombra olfativa, kong y búsqueda por la casa. 10-15 minutos de olfato equivalen, en descarga, a un buen rato de paseo.",
      },
      {
        titulo: "Semana 1-3: refuerza la calma explícitamente",
        detalle:
          "Cuando esté echado con su mordedor, acércate en silencio y deja caer un premio. 5-8 veces al día. La calma se entrena igual que el «sentado», solo que casi nadie la premia.",
      },
    ],
    primerPaso:
      "Hoy: sirve la cena repartida en una alfombra olfativa o esparcida en el pasto en vez del bol. Son 10 minutos de trabajo mental que suelen apagar el episodio de la tarde.",
    senales: [
      "Elige su mordedor por iniciativa propia cuando se activa.",
      "Menos episodios por semana y sobre objetos de menor valor.",
      "Siestas más largas y profundas durante el día.",
      "Puede quedarse 20-30 minutos suelto sin supervisión sin incidentes.",
    ],
    banderas: [
      "Ingesta de trapos, piedras o plástico: riesgo de obstrucción, consulta veterinaria y posible pica.",
      "Destrucción exclusiva en ausencias con vocalización: tratar como ansiedad de separación.",
    ],
  },

  "Reactividad con otros perros": {
    eje: "Conflicto social",
    interpretacion:
      "Ladrar, tirar y gruñir hacia otro perro es, en la enorme mayoría de los casos, una estrategia para aumentar la distancia o para descargar la frustración de no poder llegar. Distinguirlas es clave: el perro con miedo tiene el cuerpo hacia atrás y la cola baja; el frustrado va hacia adelante, salta y llora. El primero necesita distancia; el segundo, autocontrol y saludos bien gestionados.",
    mecanismo:
      "Antecedente: otro perro aparece dentro de su distancia crítica, con la correa tensa y sin ruta de escape. Conducta: explosión (ladrido, tirón, gruñido). Consecuencia: el otro perro se aleja, o el dueño se lleva al perro. La estrategia funcionó, y además cada episodio deja el sistema nervioso cargado 24-72 horas, con el umbral más bajo para el siguiente encuentro (trigger stacking).",
    emocion:
      "Miedo o frustración social con umbral muy bajo y sin capacidad de escape por estar atado.",
    causaRaiz: [
      "Encuentros forzados de frente y a corta distancia que terminaron mal o resultaron abrumadores.",
      "Correa tensa: elimina la opción de huida y aumenta la activación por reflejo de oposición.",
      "Ventana de socialización pobre o experiencias negativas en etapas sensibles (3-16 semanas).",
      "Acumulación de estrés: dos malos encuentros el lunes explican la explosión del martes.",
    ],
    lectura: [
      "Congelamiento breve antes de explotar: ese microsegundo es tu verdadera señal de aviso.",
      "Se lame el hocico, bosteza o gira la cabeza al ver al otro perro: aún está por debajo del umbral, aquí se trabaja.",
      "Ya no acepta comida: superó el umbral, la sesión terminó, aléjate sin dramatismo.",
    ],
    errores: [
      "Obligarlo a saludar «para que se acostumbre»: es inundación y suele empeorar el cuadro.",
      "Tensar la correa al ver al otro perro: le anticipas peligro con tu propio cuerpo.",
      "Castigar el gruñido: eliminas el aviso y aumentas el riesgo de mordida sin advertencia.",
      "Ir al parque canino a «socializar»: entorno de máxima intensidad y mínimo control.",
    ],
    plan: [
      {
        titulo: "Semana 1: encuentra la distancia umbral",
        detalle:
          "Mide a cuántos metros puede ver otro perro y seguir comiendo. Ese número es tu punto de partida, sean 8 o 40 metros. Todo lo que trabajes por debajo de esa distancia es retroceso.",
      },
      {
        titulo: "Semana 1-4: contracondicionamiento (protocolo «aparece = jamón»)",
        detalle:
          "Aparece el perro a distancia umbral → comida de alto valor de a un trozo, sin parar → desaparece → se acaba la comida. 5-10 repeticiones por sesión, 3 sesiones por semana. Estás cambiando la emoción, no la obediencia.",
      },
      {
        titulo: "Semana 2: enseña una salida (giro en U y «vamos»)",
        detalle:
          "Palabra alegre, giro de 180° y 3 premios mientras se aleja. Practícalo 20 veces sin ningún perro presente antes de usarlo en la calle. Le da control y a ti una herramienta cuando algo aparece de golpe.",
      },
      {
        titulo: "Semana 3-8: reduce distancia y suma paralelos",
        detalle:
          "Acorta 1-2 metros solo tras 3 sesiones limpias. Cuando puedas trabajar a 5-8 metros, camina en paralelo con un perro conocido y equilibrado, nunca de frente. Y respeta 48-72 h de descanso tras cualquier episodio fuerte.",
      },
    ],
    primerPaso:
      "Hoy: sal con comida de altísimo valor (pollo, queso) y al primer perro que veas a lo lejos, empieza a darle de a un trozo hasta que desaparezca. Una sola repetición bien hecha vale más que un paseo entero.",
    senales: [
      "Te mira a ti al ver al otro perro en lugar de fijar la mirada en él («check-in»).",
      "Se recupera en menos de 1 minuto tras un episodio en vez de quedar activado.",
      "Puede caminar en paralelo a 5-10 metros sin explotar.",
      "El umbral sube: lo que antes explotaba a 20 m ahora se tolera a 8 m.",
    ],
    banderas: [
      "Mordida con daño hacia perros o personas: derivación inmediata a etólogo clínico veterinario.",
      "Reactividad de aparición súbita en un adulto estable: descartar dolor (cadera, cuello, oídos) y problemas de visión.",
      "Ausencia total de señales de aviso previas: caso de riesgo, no lo trabajes en solitario.",
    ],
  },

  "Miedos y fobias": {
    eje: "Inseguridad",
    interpretacion:
      "El miedo no se malcría: acompañar a un perro asustado no refuerza el miedo, porque el miedo es una emoción y las emociones no se refuerzan como las conductas. Lo que ves (temblor, esconderse, jadeo, negarse a caminar) es una respuesta fisiológica involuntaria. La pregunta útil no es «cómo hago que no tenga miedo», sino «a qué intensidad exacta puede estar cerca de eso y seguir comiendo».",
    mecanismo:
      "Antecedente: estímulo intenso, impredecible y sin posibilidad de escape. Conducta: huida, congelamiento o evitación. Consecuencia: alivio al alejarse, que refuerza la evitación y evita el aprendizaje correctivo. El miedo se generaliza al contexto: primero fue el petardo, después la calle de noche, después salir a la calle.",
    emocion:
      "Miedo con indefensión aprendida: pérdida de la sensación de control sobre lo que le pasa.",
    causaRaiz: [
      "Exposición única y traumática, o exposiciones repetidas sin escape posible.",
      "Predisposición genética y línea de cría: la sensibilidad al ruido tiene componente hereditario claro.",
      "Falta de un refugio fijo y respetado dentro de casa.",
      "Deprivación sensorial temprana: cachorros criados sin exposición gradual a superficies, ruidos y personas.",
    ],
    lectura: [
      "Orejas hacia atrás, cola pegada, cuerpo bajo y pupila dilatada: miedo activo, no exijas nada.",
      "Rechaza comida que normalmente adora: está por encima de su umbral.",
      "Jadeo con comisuras retraídas hacia atrás (sonrisa tensa) sin calor: estrés agudo.",
    ],
    errores: [
      "Exponerlo de golpe «para que lo supere»: la inundación cronifica el miedo y puede generar indefensión.",
      "Retarlo por temblar o esconderse: añade miedo a la relación contigo.",
      "Arrastrarlo con la correa hacia el estímulo: destruye la confianza en el paseo completo.",
      "Consolar con voz aguda y nerviosa: no es el mimo lo que daña, es tu propia activación transmitida.",
    ],
    plan: [
      {
        titulo: "Día 1: construye el refugio",
        detalle:
          "Un lugar fijo, cerrado por tres lados, con manta y agua, en la zona más silenciosa. Nadie lo molesta ahí jamás, ni los niños ni tú. Es la base de todo lo demás.",
      },
      {
        titulo: "Semana 1-6: desensibilización graduada",
        detalle:
          "Trabaja el estímulo a la mínima intensidad detectable (grabación de tormenta al 5 % de volumen, disparador a 30 m) y asócialo con comida durante 60-90 segundos. 3-4 sesiones semanales; sube la intensidad un escalón pequeño solo tras dos sesiones perfectas.",
      },
      {
        titulo: "Siempre: devuélvele el control",
        detalle:
          "Que pueda alejarse cuando quiera, sin correa tensa ni puertas cerradas. La posibilidad de huir reduce la respuesta de miedo más que cualquier premio: el control percibido es la variable más potente.",
      },
      {
        titulo: "Eventos previsibles (tormentas, fuegos artificiales)",
        detalle:
          "Prepara con anticipación: refugio listo, ruido blanco, cortinas, masticación de larga duración y, si el cuadro es intenso, plan farmacológico acordado con tu veterinario antes de la fecha.",
      },
    ],
    primerPaso:
      "Hoy: arma el refugio y siéntate cerca 10 minutos dejando caer premios sin decir nada. Estás cargando ese lugar de seguridad antes de necesitarlo.",
    senales: [
      "Sale del refugio antes que otras veces tras el episodio.",
      "Acepta comida en presencia del estímulo a baja intensidad.",
      "Postura más suelta: cola más alta, boca entreabierta, orejas neutras.",
      "Se recupera en minutos en vez de horas.",
    ],
    banderas: [
      "Pánico con riesgo de fuga o autolesión: urgencia, consulta veterinaria para apoyo farmacológico.",
      "Miedo generalizado a todo el entorno: requiere etólogo clínico, no protocolo autodidacta.",
      "Aparición súbita de miedo a estímulos antes neutros: descartar dolor o problema neurológico.",
    ],
  },

  "Higiene / accidentes en casa": {
    eje: "Hábito reforzado",
    interpretacion:
      "Casi siempre es un hábito incompleto, no un problema de inteligencia ni de rebeldía. Un cachorro controla aproximadamente una hora por mes de edad, y necesita oportunidades de acierto mucho más que consecuencias por error. En un adulto ya educado, un accidente nuevo es un dato médico hasta que se demuestre lo contrario.",
    mecanismo:
      "Antecedente: vejiga llena, sin acceso al lugar correcto y con superficie interior disponible que ya huele a lo mismo. Conducta: elimina dentro. Consecuencia: alivio inmediato más marca olfativa que fija el punto como «baño». Si además hubo castigo, aprende a esconderse para hacerlo, que es el error más frecuente y el que más confunde a las familias.",
    emocion:
      "Confusión sobre el criterio; con historial de castigo, ansiedad y ocultamiento.",
    causaRaiz: [
      "Intervalos entre salidas mayores que su capacidad real de control físico.",
      "Refuerzo tardío: se premia al volver a casa y no en el lugar y momento exactos.",
      "Restos de olor por limpieza inadecuada que reinvitan a repetir en el mismo punto.",
      "Uso prolongado de empapadores dentro de casa: enseña que el interior es un lugar válido.",
    ],
    lectura: [
      "Olfatea en círculos y se aleja de ti: le quedan unos 15 segundos, sácalo ya.",
      "Charcos pequeños y frecuentes con lamido genital: posible infección urinaria.",
      "Elimina mientras saluda o al retarlo: micción por sumisión o excitación, no es higiene, y el castigo la empeora.",
    ],
    errores: [
      "Restregar el hocico o retar: genera miedo y hace que se esconda para eliminar.",
      "Limpiar con productos con amoníaco o lavandina: el olor recuerda a la orina e invita a repetir.",
      "Premiar al entrar a casa después de hacerlo fuera: refuerza volver, no eliminar afuera.",
      "Salir 3 minutos y volver: no le dio tiempo real; necesita 10-15 minutos y un lugar predecible.",
    ],
    plan: [
      {
        titulo: "Semana 1: calendario fijo de salidas",
        detalle:
          "Al despertar, tras cada comida, después de jugar, antes de dormir y cada 2-3 horas en cachorros. Anótalo: en 3 días verás su patrón horario real y podrás anticiparte.",
      },
      {
        titulo: "Siempre: premia en el sitio y en 3 segundos",
        detalle:
          "Sal con premios en el bolsillo y refuerza en el mismo instante en que termina, en el lugar exacto. Un premio dado 20 segundos después ya no enseña nada.",
      },
      {
        titulo: "Cada accidente: limpieza enzimática",
        detalle:
          "Solo un limpiador enzimático elimina la marca olfativa. Mientras el punto huela, seguirá siendo un baño válido a su criterio.",
      },
      {
        titulo: "Semana 1-3: supervisión o gestión",
        detalle:
          "Si no puedes vigilar, reduce el espacio o usa correa dentro de casa. Cada accidente evitado acelera el aprendizaje más que diez aciertos premiados.",
      },
    ],
    primerPaso:
      "Hoy: anota la hora exacta de cada micción durante 24 horas. Ese registro te dará el horario de salidas más preciso que cualquier regla general.",
    senales: [
      "Se dirige a la puerta, mira o avisa de alguna forma.",
      "Los accidentes bajan de varios por día a menos de dos por semana y en menos lugares.",
      "Aguanta intervalos progresivamente más largos, incluida la noche completa.",
    ],
    banderas: [
      "Regresión súbita en un perro ya educado: análisis de orina para descartar infección o cálculos.",
      "Beber mucho más de lo habitual con micciones abundantes: descartar diabetes o problema renal.",
      "Incontinencia durante el sueño, sobre todo en hembras esterilizadas: consulta veterinaria.",
    ],
  },

  "Mordidas de juego": {
    eje: "Activación",
    interpretacion:
      "La boca es su mano: en juego, morder es normal y necesario. El problema no es que muerda, es que todavía no aprendió a medir la fuerza (inhibición de mordida) ni tiene un interruptor claro para terminar el juego. Un cachorro que muerde más al final del día casi nunca es un cachorro malo: es un cachorro sin dormir.",
    mecanismo:
      "Antecedente: juego con manos, excitación en ascenso y sin pausas. Conducta: muerde la piel o la ropa. Consecuencia: la mano se mueve rápido, alguien grita, el juego sigue. Todo eso es más juego, así que la conducta se refuerza justo cuando queremos frenarla.",
    emocion:
      "Excitación alta con autorregulación aún inmadura, típica de etapas de desarrollo.",
    causaRaiz: [
      "Juego con manos desde cachorro: enseña que la piel es un juguete válido.",
      "Sesiones largas sin pausas: la excitación sube y no vuelve a bajar.",
      "Déficit de sueño: los cachorros necesitan 16-20 h diarias; sin eso, la mordida se dispara.",
      "Separación temprana de la camada: perdió el aprendizaje de inhibición con hermanos.",
    ],
    lectura: [
      "Mordida con ojos duros, gruñido grave y cuerpo rígido: eso ya no es juego, para y reevalúa.",
      "Zoomies con mordidas al aire, al final del día: sobreestimulación, necesita siesta, no más juego.",
      "Mordida de ropa y pies al caminar: búsqueda de interacción y control de movimiento.",
    ],
    errores: [
      "Retirar la mano de golpe o gritar agudo: parece presa y sube la intensidad.",
      "Seguir jugando tras una mordida fuerte: le confirma que la fuerza no cambia nada.",
      "Sostenerle el hocico o cualquier castigo físico: aumenta la excitación y daña la confianza.",
      "Compensar con más juego cuando muerde: la sobreestimulación es la causa, no la cura.",
    ],
    plan: [
      {
        titulo: "Siempre: el juego termina al primer diente",
        detalle:
          "Sin drama y sin voz: te levantas, cruzas los brazos, 20-30 segundos de pausa y vuelves. Consecuencia clarísima: la boca en la piel apaga la diversión.",
      },
      {
        titulo: "Siempre: redirige antes de que llegue",
        detalle:
          "Ten un mordedor largo a mano y ofrécelo en el momento en que se activa, no después de la mordida. Con cachorros, tener juguetes distribuidos por la casa es media solución.",
      },
      {
        titulo: "Diario: sesiones cortas con freno incluido",
        detalle:
          "3-5 minutos de juego, pausa con «busca» o masticación, repetir. Estás entrenando el freno, no solo el acelerador. Termina siempre tú, y en calma.",
      },
      {
        titulo: "Diario: protege el descanso",
        detalle:
          "Siestas estructuradas cada 1-2 horas de actividad, en un lugar tranquilo. En cachorros, la mayoría de los casos de mordida intensa mejora solo con corregir el sueño.",
      },
    ],
    primerPaso:
      "Hoy: cronometra sus horas reales de sueño. Si duerme menos de 16, instala una siesta obligatoria de 1 hora después de cada rato de actividad y observa la diferencia esta misma tarde.",
    senales: [
      "La presión de la mordida baja: pasa de doler a solo apoyar los dientes.",
      "Se frena solo al ver tu mano o se corrige a mitad de camino.",
      "Elige el juguete en vez de la piel sin que se lo indiques.",
      "Los episodios de la tarde se acortan y aparecen siestas espontáneas.",
    ],
    banderas: [
      "Mordida con daño, gruñido de guarda de recursos o rigidez: no es juego, requiere evaluación profesional.",
      "Mordida que aparece de golpe en un adulto: descartar dolor, sobre todo dental, de oído o articular.",
    ],
  },
};

export const INTENSIDAD_NOTA: Record<string, string> = {
  Ocasional:
    "Al ser ocasional, el patrón todavía no está consolidado: con 2-3 semanas de criterio consistente suele revertirse por completo. Aprovecha esta ventana, es la más barata en esfuerzo.",
  Frecuente:
    "Al ser frecuente, el hábito ya tiene historial de refuerzo. Espera avances visibles entre la tercera y la cuarta semana, siempre que la gestión del entorno impida que siga practicándolo entre sesiones.",
  Constante:
    "Al ser constante, la conducta es la respuesta por defecto de tu perro ante ese contexto y hay activación de fondo permanente. Prioriza bajar la carga total de estrés durante 7-10 días antes de exigir aprendizaje nuevo, y considera apoyo profesional presencial.",
};

/** Cómo interactúan dos conductas seleccionadas, según sus ejes. */
export function lecturaCombinada(a: string, b: string): string {
  const fa = CONDUCTAS[a];
  const fb = CONDUCTAS[b];
  if (!fa || !fb) return "";
  const ejes = [fa.eje, fb.eje].sort().join(" + ");

  const mapa: Record<string, string> = {
    "Activación + Activación":
      "Ambas conductas comparten el mismo motor: un sistema nervioso que vive por encima de su umbral. No las trates como dos problemas: baja la carga total (descanso, olfato, menos estímulos) durante 10 días y verás las dos ceder a la vez.",
    "Activación + Hábito reforzado":
      "Una es emocional y la otra es un hábito bien pagado. Empieza por la emocional: mientras el perro esté activado, el hábito no responde al entrenamiento. Gestiona el entorno para el hábito y entrena la activación.",
    "Activación + Inseguridad":
      "Combinación exigente: por fuera se ve excitación, por dentro hay inseguridad. No subas la exigencia ni el ejercicio intenso; trabaja previsibilidad, refugio y descanso antes que cualquier ejercicio de obediencia.",
    "Activación + Necesidad no cubierta":
      "Aquí el orden es claro: primero cubre la necesidad (olfato, masticación, trabajo mental, sueño) y recién después entrena. Buena parte de la conducta activada desaparece en 7-10 días al cubrir el déficit.",
    "Activación + Conflicto social":
      "El estrés social carga el sistema durante 24-72 horas y desborda al resto del día. Reduce a la mitad los encuentros con otros perros durante dos semanas mientras trabajas la otra conducta.",
    "Hábito reforzado + Hábito reforzado":
      "Dos hábitos con mucho historial de refuerzo. No los ataques a la vez: elige el que más te afecta a diario, aplica criterio absoluto 21 días y gestiona el otro con el entorno mientras tanto.",
    "Conflicto social + Hábito reforzado":
      "Trabaja primero la parte social: el hábito (correa, saltos, ladrido) mejora casi solo cuando baja el nivel de conflicto y de frustración en la calle.",
    "Hábito reforzado + Inseguridad":
      "La inseguridad manda. Un perro que no se siente seguro no aprende hábitos nuevos: dale previsibilidad y control, y luego instala el criterio del hábito.",
    "Hábito reforzado + Necesidad no cubierta":
      "El hábito es la vía de escape de una necesidad sin cubrir. Si solo corriges el hábito, la conducta se desplaza a otra. Cubre el déficit y el entrenamiento rinde el doble.",
    "Inseguridad + Inseguridad":
      "Dos expresiones del mismo problema de fondo: falta de sensación de control. Refugio fijo, rutinas predecibles y avances mínimos por sesión. Objetivo del primer mes: que baje el estrés basal, no que «obedezca».",
    "Conflicto social + Inseguridad":
      "Perfil temeroso con presión social. La distancia es tu herramienta principal: nunca de frente, nunca forzando saludos, y siempre con ruta de escape disponible.",
    "Inseguridad + Necesidad no cubierta":
      "Cuidado con compensar el miedo con más actividad: eso lo carga. Prioriza descanso, olfato tranquilo y masticación, y trabaja el miedo a la mínima intensidad.",
    "Conflicto social + Conflicto social":
      "Todo el cuadro gira alrededor de la gestión de distancia. Durante un mes, cero encuentros improvisados: solo sesiones planificadas por debajo del umbral.",
    "Conflicto social + Necesidad no cubierta":
      "Un perro con déficit de descarga llega a la calle con el depósito de estrés lleno. Cubre olfato y masticación en casa antes de cada salida y el umbral social sube de inmediato.",
    "Necesidad no cubierta + Necesidad no cubierta":
      "Las dos conductas son síntomas del mismo vacío. Reestructura el día completo (sueño, olfato, masticación, trabajo mental) antes de entrenar cualquier conducta puntual: es el caso donde más rápido se ven resultados.",
  };

  return (
    mapa[ejes] ??
    "Las dos conductas se retroalimentan: la carga de estrés de una baja el umbral de la otra. Trabaja primero la que aparece antes en el día y gestiona la segunda con el entorno."
  );
}

export const ETAPA_NOTA: Record<string, string> = {
  "Cachorro (< 6 meses)":
    "En esta etapa el cerebro está en plena construcción y el control de impulsos es fisiológicamente limitado: repeticiones de 2-3 minutos, mucho descanso (16-20 h) y exposición gradual valen más que cualquier sesión larga.",
  "Cachorro joven (6-12 meses)":
    "Plena adolescencia canina: hay poda neuronal y cambios hormonales, y es normal que parezca «olvidar» lo aprendido. No cambies de método ni cedas por cansancio; mantén las reglas estables y reduce la exigencia, no el criterio.",
  "Adulto (1-6 años)":
    "El hábito ya está bien instalado pero la capacidad de aprendizaje es excelente. La variable decisiva es la consistencia diaria de toda la familia, no la cantidad de horas de entrenamiento.",
  "Senior (+7 años)":
    "En un senior, todo cambio de conducta se investiga primero en la clínica: dolor articular, pérdida de audición o visión, hipertensión y disfunción cognitiva explican una gran parte de los casos. Entrenar sobre un perro con dolor no funciona.",
};

export const ENTORNO_NOTA: Record<string, string> = {
  "Casa con patio":
    "El patio no sustituye el paseo ni el trabajo mental: el acceso libre suele aumentar la vigilancia perimetral y los ladridos al exterior. Considera restringirlo a horarios y acompañar las salidas.",
  "Departamento / piso sin patio":
    "En piso cada salida cuenta doble: prioriza olfateo de calidad sobre distancia recorrida, y construye rutinas de calma dentro de casa (masticación, alfombra olfativa, sitio de descanso lejos de la puerta).",
  "Hogar con niños pequeños":
    "Con niños, define reglas de interacción explícitas y una zona de descanso inviolable. Nunca dejes interacciones sin supervisión y enseña a los niños a leer las señales de incomodidad: lamido de hocico, bostezo y giro de cabeza.",
  "Hogar con otras mascotas":
    "Con otras mascotas, gestiona los recursos por separado (comida, camas, juguetes, accesos) para bajar la tensión de fondo, y asegúrate de que cada animal tenga un espacio propio donde nadie lo moleste.",
};
