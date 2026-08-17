# Guía de pruebas del flujo de venta completo sin tarjeta real

Esta guía te permite probar todo el recorrido de compra —landing → checkout Hotmart → webhook → licencia → login → app— sin usar una tarjeta bancaria real.

## Método recomendado: cupones de 100% de descuento en Hotmart

Hotmart no dispone de un sandbox con tarjetas de prueba, pero sí permite crear **cupones de descuento del 100%**. Al aplicarlos en el checkout, el total queda en USD 0,00 y Hotmart dispara los webhooks reales exactamente igual que en una compra pagada.

### 1. Crear los cupones en Hotmart

1. Entra a tu cuenta de Hotmart y ve al producto correspondiente.
2. Ve a **Configuraciones → Cupones de descuento** (o similar).
3. Crea un cupón para la **Versión Básica** con **100% de descuento**.
4. Crea otro cupón para la **Versión Completa / Premium** con **100% de descuento**.
5. Configúralos con uso ilimitado (o con un límite alto) durante la fase de pruebas.
6. Anota los códigos de cupón.

### 2. Configurar el webhook

Asegúrate de que en Hotmart esté configurada la URL del webhook:

- **Producción:** `https://project--{project-id}.lovable.app/api/public/hotmart`
- **Preview / desarrollo:** `https://project--{project-id}-dev.lovable.app/api/public/hotmart`

Activa al menos estos eventos:

- `PURCHASE_APPROVED`
- `PURCHASE_COMPLETE`
- `PURCHASE_REFUNDED`
- `PURCHASE_CANCELED`
- `SUBSCRIPTION_CANCELLATION`

### 3. Realizar una compra de prueba

1. Desde la landing page, haz clic en el botón de la **Versión Básica** o **Versión Completa**.
2. En el checkout de Hotmart, aplica el cupón del 100%.
3. Completa el formulario con un **email de prueba** (por ejemplo, `prueba1@ejemplo.com`).
4. Finaliza la compra. El total debe quedar en USD 0,00.

### 4. Verificar que llegó el webhook

1. Entra a la app con el mismo email de la compra de prueba.
2. Si tu email está en la lista de administradores (`ADMIN_EMAILS`), verás un botón **Admin** en el encabezado.
3. Ve a **Admin → Diagnóstico de ventas**.
4. Revisa:
   - **Últimos eventos recibidos:** debe aparecer `PURCHASE_APPROVED` con el email de prueba.
   - **Licencias:** debe aparecer una fila con el email, la versión correcta y estado `activa`.

### 5. Probar el acceso del comprador

1. Cierra sesión o abre una ventana de incógnito.
2. Ve a `/auth`.
3. Ingresa el email de la compra de prueba.
4. Ingresa el código OTP que recibas.
5. Deberías entrar a `/app` con la versión correspondiente desbloqueada.

## Alternativa rápida: simular una compra desde el panel de administración

Si no quieres depender del webhook de Hotmart para una prueba puntual:

1. Entra a la app con tu email de administrador.
2. Ve a **Admin → Diagnóstico de ventas**.
3. En la sección **Simular una compra aprobada**, ingresa un email y selecciona la versión.
4. Haz clic en **Crear licencia de prueba**.
5. El sistema insertará un evento y una licencia activa.
6. Prueba el login con ese email.

## Limpieza post-prueba

Antes de lanzar a producción:

1. **Desactiva o elimina los cupones del 100%** en Hotmart.
2. **Revoca las licencias de prueba** desde el panel de administración.
3. Opcionalmente, borra los eventos de prueba de la tabla `hotmart_eventos`.

## Variables de entorno necesarias

Asegúrate de que estas variables estén configuradas en el proyecto:

- `HOTMART_HOTTOK`: token de seguridad del webhook de Hotmart.
- `HOTMART_PRODUCT_BASE`: ID del producto de la Versión Básica.
- `HOTMART_PRODUCT_PREMIUM`: ID del producto de la Versión Completa.
- `ADMIN_EMAILS`: lista de emails separados por comas que pueden acceder al panel de diagnóstico.

## Solución de problemas comunes

### El webhook no llega

- Verifica que la URL del webhook esté bien escrita en Hotmart.
- Confirma que el `HOTMART_HOTTOK` coincide en ambos lados.
- Usa el panel de diagnóstico para ver el estado de la configuración.

### La licencia no se crea

- Revisa en **Últimos eventos recibidos** si el evento llegó.
- Confirma que el `product_id` del evento coincida con `HOTMART_PRODUCT_BASE` o `HOTMART_PRODUCT_PREMIUM`.
- Revisa los logs del servidor para ver errores de base de datos.

### No puedo entrar con el email de prueba

- Asegúrate de que la licencia esté en estado `activa`.
- Verifica que estés usando exactamente el mismo email (Hotmart puede enviarlo en mayúsculas; el sistema lo normaliza a minúsculas).
- Revisa la bandeja de spam por el código OTP.
