# 🚀 Guía de Automatización y Base de Datos (Horizonte 2026)

Tu sitio web ya está preparado para centralizar todos los contactos en una sola base de datos y responder automáticamente a los tests de triaje. Sigue estos pasos para activarlo:

## 1. Centralización en Formspree
Todos los formularios (Triaje, Reserva Virtual y Citas) ya envían la información al mismo endpoint: `https://formspree.io/f/mqaeodlo`.

### Para ver tus leads:
1. Entra a [Formspree.io](https://formspree.io).
2. Abre tu formulario con ID `mqaeodlo`.
3. En la pestaña **"Submissions"**, verás una tabla con todos los datos estandarizados (`client_name`, `client_email`, `generated_feedback`, etc.). Puedes descargar esto como **CSV** en cualquier momento para tener tu base de datos en Excel.

---

## 2. Automatización de "Devolución" por Correo (Triaje)
Para que el usuario reciba el texto de su test automáticamente:

1. En Formspree, ve a la pestaña **"Settings"**.
2. Busca la sección **"Auto-Response"** (disponible en planes pagos de Formspree) o usa el **"Email Notification"**.
3. **Opción recomendada (Gratis/Pro con Make.com):**
   - Crea una cuenta en [Make.com](https://make.com).
   - Crea un "Scenario" con un **Webhook** que reciba los datos de Formspree.
   - Conecta un módulo de **Gmail** o **SendGrid**.
   - Configura el cuerpo del correo para que use la variable `generated_feedback` que el sitio ya está enviando.

---

## 3. Conexión con Google Sheets (Base de Datos en Tiempo Real)
Si quieres que cada vez que alguien llene un formulario se escriba una fila en un Google Excel:

1. En **Make.com**, después del Webhook de Formspree, añade un módulo de **Google Sheets**.
2. Selecciona la acción **"Add a Row"**.
3. Mapea los campos:
   - Nombre -> `client_name`
   - Email -> `client_email`
   - Diagnóstico (Triaje) -> `generated_feedback`
   - Motivo -> `motive`

---

## ⚠️ Nota Importante
El código ya envía el campo `database_action: "CREATE_LEAD"`, lo que permite que tus automatizaciones sepan exactamente qué hacer con cada entrada. El sistema es totalmente escalable.
