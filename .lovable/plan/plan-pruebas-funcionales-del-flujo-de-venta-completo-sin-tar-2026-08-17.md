# Plan: Pruebas funcionales del flujo de venta completo sin tarjeta real

## Objetivo
Permitirte probar el flujo completo de venta —landing → checkout Hotmart → webhook → licencia → login → app— sin usar una tarjeta bancaria real, usando cupones de 100% de descuento en Hotmart y un panel de diagnóstico interno.

## Pasos a implementar

### 1. Configurar cupones de 100% en Hotmart
- Crear un cupón de descuento del 100% para el producto de la **Versión Básica**.
- Crear otro cupón del 100% para el producto de la **Versión Completa / Premium**.
- Configurar los cupones para uso ilimitado (o con un límite alto) durante la fase de pruebas.
- Anotar los códigos de cupón para usarlos en las pruebas.

### 2. Verificar la configuración del webhook en Hotmart
- Asegurar que la URL del webhook apunte a `/api/public/hotmart` del entorno publicado o de preview.
- Confirmar que el `HOTMART_HOTTOK` configurado en el proyecto coincide con el de Hotmart.
- Verificar que los eventos `PURCHASE_APPROVED`, `PURCHASE_COMPLETE`, `PURCHASE_REFUNDED` y `SUBSCRIPTION_CANCELLATION` estén activos.

### 3. Construir un panel de diagnóstico interno en la app
- Crear una ruta protegida `/app/admin/diagnostico` accesible solo para emails autorizados.
- Mostrar:
  - Estado de la configuración del webhook (Hottok, IDs de productos).
  - Últimos eventos recibidos desde Hotmart.
  - Licencias activas/revocadas en la base de datos.
  - Botón para simular manualmente un evento de compra aprobada (como respaldo).

### 4. Documentar el flujo de prueba paso a paso
- Instrucciones para aplicar el cupón 100% en el checkout de Hotmart.
- Qué datos de comprador usar (emails de prueba).
- Cómo verificar que el webhook llegó y creó la licencia.
- Cómo iniciar sesión con el mismo email de la compra de prueba.
- Cómo confirmar que la versión correcta se desbloqueó en `/app`.

### 5. Limpieza post-prueba
- Instrucciones para eliminar o desactivar los cupones 100% antes de lanzar a producción.
- Script o panel para revocar licencias de prueba si es necesario.

## Resultado esperado
Podrás realizar compras de prueba reales en Hotmart sin pagar dinero, validando que el webhook crea la licencia correcta y que el usuario puede entrar a la app con la versión correspondiente.
