// Usando fetch nativo de Node.js 18+

async function testAutomation() {
    console.log("🚀 Iniciando prueba de API de automatización...");

    const payload = {
        formType: 'triaje',
        name: 'Cliente de Prueba',
        email: 'test@example.com',
        whatsapp: '3000000000',
        category: 'Adultos',
        score: 20,
        result: 'En Evaluación',
        feedback: 'Puntaje medio – Malestar persistente'
    };

    try {
        const response = await fetch('http://localhost:3000/api/automation', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const data = await response.json();
        console.log("✅ Respuesta recibida:", data);

        if (data.success) {
            console.log("✨ Prueba exitosa. Método usado:", data.method);
        } else {
            console.log("❌ Error en la API:", data.error);
        }
    } catch (error) {
        console.log("⚠️ Asegúrate de tener el servidor corriendo con 'npm run dev'");
        console.error("❌ Error de conexión:", error.message);
    }
}

testAutomation();
