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
      data.modality || data.timezone || ''
    ];
    
    // Agregar a la hoja
    sheet.appendRow(row);
    
    // Enviar email si es triaje
    if (data.formType === 'triaje' && data.email) {
      sendTriageEmail(data);
    }
    
    return ContentService.createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function sendTriageEmail(data) {
  const subject = `Tu Análisis Psicológico - ${data.category}`;
  
  // Nivel de atención según resultado
  let levelColor = '#22c55e'; // verde
  let levelText = 'Malestar leve';
  if (data.result === 'En Evaluación') {
    levelColor = '#eab308';
    levelText = 'Malestar persistente';
  } else if (data.result === 'Prioritaria') {
    levelColor = '#ef4444';
    levelText = 'Malestar intenso';
  }
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #111; color: #fff; padding: 40px; }
        .container { max-width: 600px; margin: 0 auto; background: #1a1a1a; border-radius: 24px; padding: 40px; border: 1px solid #333; }
        .header { text-align: center; margin-bottom: 30px; }
        .header h1 { color: #fff; font-size: 28px; font-weight: 300; margin: 0; }
        .header p { color: #888; margin-top: 8px; }
        .result-box { background: #222; border-radius: 16px; padding: 24px; margin: 24px 0; border-left: 4px solid ${levelColor}; }
        .result-box h3 { color: ${levelColor}; margin: 0 0 12px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 2px; }
        .result-box .score { font-size: 48px; color: #fff; font-weight: 200; }
        .result-box .level { color: #ccc; font-size: 16px; margin-top: 8px; }
        .category { display: inline-block; background: #333; color: #fff; padding: 8px 16px; border-radius: 20px; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; }
        .feedback { background: #222; border-radius: 12px; padding: 20px; margin: 24px 0; color: #aaa; line-height: 1.6; }
        .cta { text-align: center; margin-top: 32px; }
        .cta a { display: inline-block; background: #10b981; color: #000; text-decoration: none; padding: 16px 32px; border-radius: 50px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; font-size: 12px; }
        .footer { text-align: center; margin-top: 40px; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Análisis Psicológico</h1>
          <p>Triaje Virtual Completado</p>
        </div>
        
        <p style="color: #ccc;">Hola <strong>${data.name}</strong>,</p>
        <p style="color: #888;">Gracias por tomarte el tiempo de completar nuestro triaje virtual. A continuación encontrarás tus resultados:</p>
        
        <div style="text-align: center; margin: 24px 0;">
          <span class="category">${data.category}</span>
        </div>
        
        <div class="result-box">
          <h3>Resultado del Análisis</h3>
          <div class="score">${data.score}/30</div>
          <div class="level">Perfil: <strong>${data.result}</strong> - ${levelText}</div>
        </div>
        
        <div class="feedback">
          <strong>Interpretación:</strong><br>
          ${data.feedback}
        </div>
        
        <p style="color: #888; font-size: 14px;">
          Este análisis es una herramienta de orientación. Para una evaluación completa y personalizada, 
          te invito a agendar una consulta donde podremos explorar juntos tu situación particular.
        </p>
        
        <div class="cta">
          <a href="https://wa.me/573014975393">Agendar Consulta por WhatsApp</a>
        </div>
        
        <div class="footer">
          <p><strong>Psic. Cristian Morales Velásquez</strong></p>
          <p>Universidad Católica Luis Amigó • Medellín, Colombia</p>
          <p>www.moralespsicologia.com</p>
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
    formType: 'triaje',
    name: 'Test User',
    email: 'test@example.com',
    whatsapp: '+573001234567',
    category: 'Adultos',
    score: 18,
    result: 'En Evaluación',
    feedback: 'Puntaje medio – Malestar persistente'
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
