## Objetivo

Construir la landing page de **TRADUCTOR CANINO IA** en `/` (reemplazando el placeholder), usando el copy exacto del archivo .md y el lenguaje visual de la imagen de referencia (bloques modulares tipo bento, colores cálidos, tipografía display grande, tarjetas redondeadas).

## Dirección visual (inspirada en la referencia, no copiada)

- Paleta cálida: crema (fondo), ámbar/naranja (acento primario), rosa suave (acento secundario), burdeos oscuro (bloques de contraste), con tokens semánticos en `src/styles.css` (oklch), light + dark.
- Tipografía: display condensada de peso alto para titulares + sans legible para cuerpo, cargada con `<link>` en `__root.tsx`.
- Bordes redondeados generosos, bloques de color de ancho completo alternando crema / ámbar / burdeos, tarjetas con sombras suaves.
- Sin gradientes morados genéricos, sin secciones "trusted by" inventadas.

## Estructura de secciones (copy exacto del .md, en orden)

1. **Hero** — "TRADUCTOR CANINO IA" / "Tu Copiloto de Crianza Canina" + párrafos + CTA "Haz tu primer diagnóstico completamente gratis" + nota "Sin tarjeta de crédito. Sin compromiso."
2. **"Tu perro no está intentando portarse mal."** — bloque narrativo de contraste (burdeos), líneas cortas con ritmo.
3. **¿Cómo funciona?** — lista de lo que analiza la IA + lista de lo que recibes en 3 minutos, en dos tarjetas.
4. **Todo lo que puedes hacer** — grid bento de 7 funciones (Diagnóstico Inteligente, Traductor de Conductas, Analizador de Video, Modo Cachorro, Modo Perro Adulto, Predictor de Higiene, Asistente IA 24/7).
5. **Lo que realmente estás comprando** — bloque tipográfico grande + CTA "Analizar a mi perro gratis" y el texto explicativo del diagnóstico gratuito.
6. **Todo lo que incluye tu suscripción** — lista de 11 ítems con checks.
7. **Bonos exclusivos** — 2 tarjetas (Calendario Inteligente de Salud Canina, Biblioteca de Juegos Inteligentes).
8. **Planes** — Plan Mensual (USD 6,99/mes) y Plan Anual (USD 55,99/año, ahorro 33 %, equivale a USD 4,67/mes) destacado.
9. **Garantía** — bloque con diagnóstico gratuito + 7 días de prueba.
10. **Preguntas frecuentes** — acordeón con las 5 preguntas.
11. **Empieza hoy** — cierre + CTA final.
12. **Footer** minimalista.

Todo el texto se usa literal del .md, sin reescribir ni añadir claims nuevos.

## UX y responsive

- Mobile-first: una columna en móvil, grids a partir de `sm`/`md`; filas con texto + icono usando `grid-cols-[minmax(0,1fr)_auto]`, `min-w-0`, `shrink-0`.
- Botones táctiles ≥44px, CTA repetido en 3 puntos, tipografía escalada por breakpoint.
- Nav superior simple (logo + un CTA); acordeón FAQ accesible (shadcn Accordion).
- Los CTA hacen scroll a la sección de planes/diagnóstico (sin backend en esta fase).

## Imágenes

Generar 3–4 imágenes de apoyo (perro con familia, mockup de app en móvil, cachorro) en `src/assets/` y usarlas en hero, sección "cómo funciona" y cierre. La imagen subida se usa solo como referencia visual.

## Detalles técnicos

- Reescribir `src/routes/index.tsx` con `head()` propio: título único (<60 chars), descripción (<160), og:title, og:description, og:type, twitter:card; H1 único.
- Componentes en `src/components/landing/*` (Hero, Problema, ComoFunciona, Funciones, Incluye, Bonos, Planes, Garantia, Faq, Cierre, Footer).
- Tokens de color/tipografía en `src/styles.css` con `@theme inline`; sin clases de color hardcodeadas.
- Añadir shadcn Accordion y Button si no existen.
- Sin backend: la landing es estática en esta fase.
