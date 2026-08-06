export type Senal = {
  zona: "Cola" | "Orejas" | "Ojos y cara" | "Cuerpo" | "Boca" | "Voz";
  senal: string;
  significa: string;
  quehacer: string;
  nivel: "Calma" | "Duda" | "Tensión" | "Aviso";
};

export const SENALES: Senal[] = [
  {
    zona: "Cola",
    senal: "Cola suelta a media altura, movimiento amplio",
    significa: "Está cómodo y disponible para interactuar.",
    quehacer: "Buen momento para jugar, entrenar o presentarle algo nuevo.",
    nivel: "Calma",
  },
  {
    zona: "Cola",
    senal: "Cola alta y rígida, vibrando en punta",
    significa: "Excitación alta con tensión: no es alegría, es activación.",
    quehacer: "Aumenta distancia con el estímulo y cambia de dirección antes de que escale.",
    nivel: "Tensión",
  },
  {
    zona: "Cola",
    senal: "Cola baja o pegada al vientre",
    significa: "Miedo o inseguridad frente a algo del entorno.",
    quehacer: "No lo obligues a acercarse. Aléjate y deja que él decida el ritmo.",
    nivel: "Duda",
  },
  {
    zona: "Orejas",
    senal: "Orejas hacia adelante y fijas",
    significa: "Está enfocado en algo concreto y evaluando qué hacer.",
    quehacer: "Interrumpe con un premio o un cambio de dirección antes de que fije la mirada.",
    nivel: "Tensión",
  },
  {
    zona: "Orejas",
    senal: "Orejas hacia atrás y pegadas",
    significa: "Apaciguamiento o miedo: intenta evitar el conflicto.",
    quehacer: "Baja la intensidad de la interacción y dale espacio.",
    nivel: "Duda",
  },
  {
    zona: "Ojos y cara",
    senal: "Ojo de ballena (se ve el blanco del ojo)",
    significa: "Incomodidad clara. Suele aparecer antes de un gruñido.",
    quehacer: "Detén lo que estés haciendo (abrazo, caricia, retirar el plato) inmediatamente.",
    nivel: "Aviso",
  },
  {
    zona: "Ojos y cara",
    senal: "Parpadeo lento y mirada blanda",
    significa: "Confianza y ausencia de amenaza.",
    quehacer: "Refuerza el momento con voz suave; así es como quieres que se sienta.",
    nivel: "Calma",
  },
  {
    zona: "Ojos y cara",
    senal: "Mirada fija y congelada",
    significa: "Segundos antes de una reacción. La quietud es la advertencia.",
    quehacer: "Rompe la escena sin gritos: llámalo, cambia de acera, aumenta distancia.",
    nivel: "Aviso",
  },
  {
    zona: "Boca",
    senal: "Jadeo sin calor ni ejercicio",
    significa: "Estrés fisiológico acumulado.",
    quehacer: "Sácalo del contexto y ofrece masticación o descanso en un lugar tranquilo.",
    nivel: "Tensión",
  },
  {
    zona: "Boca",
    senal: "Bostezo, lamerse el hocico, olfatear el suelo de golpe",
    significa: "Señales de calma: pide bajar la tensión de la situación.",
    quehacer: "Reduce presión: menos órdenes, más distancia, pausa breve.",
    nivel: "Duda",
  },
  {
    zona: "Boca",
    senal: "Labios retraídos mostrando dientes delanteros y encías",
    significa: "Aviso serio previo a la mordida.",
    quehacer: "Nunca castigues el gruñido o el gesto: es su forma de avisar. Aumenta distancia y busca ayuda profesional.",
    nivel: "Aviso",
  },
  {
    zona: "Cuerpo",
    senal: "Reverencia de juego (pecho abajo, cola arriba)",
    significa: "Invitación clara a jugar, sin intención de conflicto.",
    quehacer: "Acepta el juego y mantenlo con pausas cada 20-30 segundos.",
    nivel: "Calma",
  },
  {
    zona: "Cuerpo",
    senal: "Peso adelantado, cuerpo tenso y quieto",
    significa: "Está listo para actuar sobre algo que percibe.",
    quehacer: "Cambia de dirección con la correa floja; no lo frenes en seco de golpe.",
    nivel: "Tensión",
  },
  {
    zona: "Cuerpo",
    senal: "Se sacude como si estuviera mojado",
    significa: "Está descargando tensión tras un momento incómodo.",
    quehacer: "Buena señal: dale unos segundos antes de continuar.",
    nivel: "Duda",
  },
  {
    zona: "Cuerpo",
    senal: "Se esconde detrás de ti o de un mueble",
    significa: "Te usa como refugio: confía, pero está superado.",
    quehacer: "Protégelo. Sacarlo de ahí «para que enfrente el miedo» empeora el cuadro.",
    nivel: "Duda",
  },
  {
    zona: "Voz",
    senal: "Gruñido bajo y sostenido",
    significa: "Petición de espacio antes de escalar.",
    quehacer: "Agradécelo: retírate y anota qué lo provocó para trabajarlo con distancia.",
    nivel: "Aviso",
  },
  {
    zona: "Voz",
    senal: "Ladrido agudo y repetido con saltos",
    significa: "Frustración o demanda de atención.",
    quehacer: "Espera 2 segundos de silencio antes de responder; nunca durante el ladrido.",
    nivel: "Tensión",
  },
  {
    zona: "Voz",
    senal: "Suspiro largo al echarse",
    significa: "Cierre del ciclo de activación: se está apagando.",
    quehacer: "Déjalo descansar sin interrumpirlo; el descanso profundo consolida el aprendizaje.",
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
