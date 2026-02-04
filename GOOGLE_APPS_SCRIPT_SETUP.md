# Configuración de Google Apps Script

Este archivo contiene todo lo necesario para configurar la automatización gratuita con Google Sheets.

## Paso 1: Crear Google Sheet

1. Ve a [Google Sheets](https://sheets.google.com) y crea una nueva hoja de cálculo
2. Nombra el archivo: **"Leads Psicología Morales"**
3. Crea 3 hojas (pestañas abajo):
   - `Triaje`
   - `Reservas Presenciales`  
   - `Reservas Virtuales`
4. En cada hoja, agrega estos encabezados en la fila 1:

| A | B | C | D | E | F | G | H | I |
|---|---|---|---|---|---|---|---|---|
| Fecha | Nombre | Email | WhatsApp | Categoría | Puntaje | Resultado | Mensaje | Extra |

---

## Paso 2: Crear el Apps Script

1. En el Google Sheet, ve a **Extensions → Apps Script**
2. Borra todo el código existente
3. Pega el siguiente código:

```javascript
// Código para Google Apps Script
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    
    // Determinar hoja según tipo de formulario
    let sheetName = 'Triaje';
    if (data.formType === 'presencial') sheetName = 'Reservas Presenciales';
    if (data.formType === 'virtual') sheetName = 'Reservas Virtuales';
    
    const sheet = ss.getSheetByName(sheetName);
    
    // Preparar fila de datos
    const timestamp = new Date().toLocaleString('es-CO', { timeZone: 'America/Bogota' });
    const row = [
      timestamp,
      data.name || '',
      data.email || '',
      data.whatsapp || '',
      data.category || '',
      data.score || '',
      data.result || '',
      data.message || data.feedback || '',
      data.modality || data.nationality || data.timezone || '' // Información extra
    ];
    
    // Agregar a la hoja
    if (sheet) {
      sheet.appendRow(row);
    }
    
    // 1. Enviar email al paciente si es triaje
    if (data.formType === 'triaje' && data.email) {
      sendTriageEmail(data);
    }
    
    // 2. Notificar SIEMPRE al Psicólogo (Cristian) sobre nuevas conversiones
    sendAdminNotification(data);
    
    return ContentService.createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Función para avisarle al Psicólogo que alguien completó un formulario
function sendAdminNotification(data) {
  const adminEmail = "cristianpsicologomed@gmail.com";
  let subject = `📢 NUEVO LEAD: ${data.name} (${data.formType})`;
  
  let details = `Se ha recibido una nueva interacción desde la web:\n\n`;
  details += `Formulario: ${data.formType.toUpperCase()}\n`;
  details += `Nombre: ${data.name}\n`;
  details += `Email: ${data.email}\n`;
  details += `WhatsApp: ${data.whatsapp}\n`;
  
  if (data.category) details += `Categoría/Terapia: ${data.category}\n`;
  if (data.result) details += `Resultado Triaje: ${data.result} (Puntaje: ${data.score})\n`;
  if (data.modality) details += `Modalidad: ${data.modality}\n`;
  if (data.nationality) details += `Nacionalidad: ${data.nationality}\n`;
  if (data.timezone) details += `Zona Horaria: ${data.timezone}\n`;
  if (data.message) details += `Mensaje/Motivo: ${data.message}\n`;
  
  details += `\n---\nEste es un aviso automático de tu sistema de gestión.`;

  MailApp.sendEmail({
    to: adminEmail,
    subject: subject,
    body: details,
    name: 'Sistema de Automatización Web'
  });
}

function sendTriageEmail(data) {
  const subject = `Tu Análisis Psicológico - ${data.category}`;
  
  // Nivel de atención según resultado
  let levelColor = '#10b981'; // verde
  let levelText = 'Malestar leve';
  
  if (data.result === 'En Evaluación') {
    levelColor = '#eab308'; // amarillo
    levelText = 'Malestar persistente';
  } else if (data.result === 'Prioritaria') {
    levelColor = '#ef4444'; // rojo
    levelText = 'Malestar intenso';
  }
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { margin: 0; padding: 0; font-family: sans-serif; background-color: #000; color: #fff; }
        .container { max-width: 600px; margin: 20px auto; background: #111; border-radius: 16px; border: 1px solid #333; overflow: hidden; }
        .header { padding: 30px; text-align: center; border-bottom: 1px solid #333; }
        .result-card { padding: 30px; text-align: center; }
        .score { font-size: 32px; font-weight: bold; border: 3px solid ${levelColor}; width: 100px; height: 100px; line-height: 100px; border-radius: 50%; margin: 20px auto; color: ${levelColor}; }
        .feedback { text-align: left; background: #222; padding: 20px; border-radius: 8px; border-left: 4px solid ${levelColor}; margin-top: 20px; color: #ccc; line-height: 1.6; }
        .footer { padding: 30px; background: #0a0a0a; text-align: center; font-size: 12px; color: #666; }
        .btn { display: inline-block; background: #fff; color: #000; padding: 15px 30px; border-radius: 30px; text-decoration: none; font-weight: bold; margin-top: 25px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div style="font-size: 20px;">Psic. Cristian Morales</div>
          <div style="color: #888; text-transform: uppercase; font-size: 12px; letter-spacing: 2px;">Informe de Triaje Virtual</div>
        </div>
        <div class="result-card">
          <div style="background: #333; display: inline-block; padding: 5px 15px; border-radius: 20px; font-size: 11px;">${data.category}</div>
          <div class="score">${data.score}/30</div>
          <h2 style="margin: 10px 0;">Perfil: ${data.result}</h2>
          <div style="color: ${levelColor}; font-weight: bold;">${levelText}</div>
          <div class="feedback">${data.feedback}</div>
          <a href="https://wa.me/573014975393" class="btn">Agendar Consulta</a>
        </div>
        <div class="footer">
          <strong>Psic. Cristian Morales Velásquez</strong><br>
          Medellín, Colombia<br><br>
          ⚠️ IMPORTANTE: Este es un reporte preliminar generado automáticamente.
        </div>
      </div>
    </body>
    </html>
  `;
  
  MailApp.sendEmail({
    to: data.email,
    subject: subject,
    htmlBody: html,
    name: 'Psic. Cristian Morales'
  });
}

// Función de prueba
function testDoPost() {
  const testData = {
    formType: 'virtual',
    name: 'Prueba Ejecución',
    email: 'test@example.com',
    whatsapp: '3001234567',
    category: 'VIRTUAL',
    nationality: 'Colombiana',
    timezone: 'GMT-5',
    message: 'Prueba de integración final'
  };
  
  const e = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };
  
  const result = doPost(e);
  Logger.log(result.getContent());
}
```

---

## Paso 3: Desplegar como Web App

1. Clic en **Deploy → New deployment**
2. Tipo: **Web app**
3. Descripción: "API Automatización Psicología"
4. **Execute as**: "Me"
5. **Who has access**: "Anyone"
6. Clic en **Deploy**
7. **IMPORTANTE**: Copia la URL que te da (algo como `https://script.google.com/macros/s/xxxxx/exec`)

---

## Paso 4: Configurar Variable de Entorno en Vercel

1. Ve a tu proyecto en [Vercel Dashboard](https://vercel.com)
2. Settings → Environment Variables
3. Agrega:
   - **Key**: `GOOGLE_SCRIPT_URL`
   - **Value**: La URL del paso anterior
4. Redeploy el proyecto

---

## Notas Importantes

- Los emails se envían desde TU cuenta de Gmail (la que usaste para crear el Script)
- El límite gratuito es ~100 emails/día
- Google Sheets es ilimitado
- Si no configuras la variable `GOOGLE_SCRIPT_URL`, el sistema usará Formspree como fallback
