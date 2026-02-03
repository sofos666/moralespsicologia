# 🚀 Despliegue en Vercel (Guía Final)

Este proyecto está optimizado para funcionar en el plan gratuito de Vercel. Sigue estos pasos para poner tu sitio en producción:

## 1. Subir a GitHub
1. Crea un repositorio en GitHub.
2. Sube los archivos de este proyecto (excepto `node_modules`).

## 2. Conectar con Vercel
1. Ve a [Vercel.com](https://vercel.com) e inicia sesión.
2. Haz clic en **"Add New"** -> **"Project"**.
3. Importa tu repositorio desde GitHub.

## 3. Configuración Importante
En la sección **Settings -> Environment Variables** de Vercel, debes añadir:
- `NEXT_PUBLIC_BASE_URL`: Pon la URL de tu sitio (ej: `https://tu-proyecto.vercel.app`).
- Si en el futuro compras `psicologomorales.com`, solo tienes que cambiar este valor.

---

## 4. Gestión de Imágenes
Todas las fotos están en la carpeta `/public`. Vercel las sirve automáticamente a través de su CDN, por lo que cargan instantáneamente sin costo adicional.

---

## 5. Captura de Leads (Base de Datos)
Tus formularios están conectados a Formspree (ID: `mqaeodlo`). 
- Consulta el archivo `AUTOMATION.md` para conectar estos datos con **Google Sheets**.
- El sistema envía automáticamente el diagnóstico del triaje para que lo tengas en tu base de datos.

---

## 6. Verificación Post-Despliegue
Una vez desplegado, entra a tu URL y prueba:
1. Navegación móvil (menú hamburguesa).
2. Envío de un test de triaje.
3. Carga del feed de noticias.

**¡Todo está listo para el éxito!** 🥂
