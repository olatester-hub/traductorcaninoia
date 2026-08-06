# Cómo seguir: recomendación

**Recomendación: seguir en este mismo proyecto.** No abras otro proyecto ni otro chat.

Motivos concretos:

- El sistema de diseño (tokens crema/ámbar/burdeos, tipografía, chips con íconos) ya está en `src/styles.css` y en los componentes de `src/components/landing/*`. En un proyecto nuevo habría que rehacerlo.
- El logo transparente, el favicon y las imágenes generadas ya viven acá.
- La base de conocimiento del diagnóstico (`src/lib/diagnostico.ts`) y el `BreedPicker` son exactamente el núcleo del producto premium: la app se construye encima, no desde cero.
- El embudo comercial necesita continuidad: landing → `/checkout` → app. Si la app vive en otro dominio, se rompe la venta, el login y la medición.
- El contexto de este chat (decisiones de copy, precios, planes, bonos) no se transfiere a otro chat. Referenciar otro proyecto solo permite leer archivos, no heredar el criterio.

Cuándo *sí* convendría separar: solo si la app fuera un producto distinto, con otra marca o vendido aparte. No es el caso.

Sobre el prompt que tienes listo: pégalo en este mismo chat. Lo integro al plan en vez de arrancar un desarrollo paralelo.

## Arquitectura propuesta

```text
/                     landing de ventas (ya existe)
/checkout             resumen de plan (ya existe)
/auth                 registro / inicio de sesión
/app                  panel del usuario (protegido)
/app/perros           perfiles de perro (multi-perro)
/app/diagnostico      diagnóstico completo con IA
/app/plan/:id         plan de acción con seguimiento
/app/chat             asistente IA 24/7
/app/calendario       Bono 1 — calendario de salud
/app/juegos           Bono 2 — biblioteca de juegos
```

La landing queda intacta; la app vive bajo `/app` reutilizando los mismos tokens y componentes.

## Fases

**Fase 1 — Backend y cuentas**
Activar Lovable Cloud. Registro/login con email, perfiles de usuario, tabla de perros, tablas de diagnósticos y planes, con seguridad por usuario. Ruta `/app` protegida.

**Fase 2 — Diagnóstico con IA (el corazón)**
Reemplazar el simulador estático por un diagnóstico real con IA: mismo formulario, misma estructura de salida (interpretación, causa raíz emocional, errores comunes, plan de acción, señales de progreso), pero generado y personalizado por perro. `src/lib/diagnostico.ts` pasa a ser el prompt maestro que garantiza calidad y tono. Se guarda el historial.

**Fase 3 — Plan de acción vivo**
Cada plan con pasos accionables, check diario, racha, progreso semanal y reevaluación. Es lo que convierte una compra en una suscripción que se retiene.

**Fase 4 — Asistente IA 24/7**
Chat con memoria del perfil del perro y de los diagnósticos previos.

**Fase 5 — Bonos**
Calendario inteligente de salud (vacunas, desparasitación, recordatorios) y biblioteca de juegos filtrable por edad, energía y espacio.

**Fase 6 — Monetización y cierre del embudo**
Conectar el pago real (Paddle recomendado), muro de suscripción, diagnóstico gratuito como gancho hacia el registro, y estados de prueba/garantía de 7 días.

## Orden de trabajo sugerido

Fase 1 y 2 primero: con cuentas + un diagnóstico IA real ya tienes un producto vendible. Las fases 3–5 aumentan retención. La 6 se activa cuando quieras cobrar.

## Detalles técnicos

- Rutas nuevas en `src/routes/app/*` con layout protegido; la landing sigue en `src/routes/index.tsx`.
- Lovable Cloud para base de datos, autenticación y funciones de servidor; políticas de acceso por usuario en cada tabla.
- IA vía la pasarela integrada (sin claves propias), con salida estructurada validada para que el diagnóstico nunca rompa la interfaz.
- Componentes de app en `src/components/app/*`, reutilizando `BreedPicker`, chips con íconos Lucide y los tokens existentes.
- `head()` propio por ruta y `noindex` en las rutas privadas.
- Todo mobile-first, igual que la landing.

## Siguiente paso

Pega acá tu prompt del producto. Con eso ajusto el alcance de las fases 2–5 y empezamos por la Fase 1.
