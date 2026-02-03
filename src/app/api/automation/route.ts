import { NextResponse } from 'next/server';

// URL del Google Apps Script Web App - SE DEBE CONFIGURAR
const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL || '';
const FORMSPREE_URL = "https://formspree.io/f/mqaeodlo";

interface AutomationPayload {
    formType: 'triaje' | 'presencial' | 'virtual';
    name: string;
    email: string;
    whatsapp: string;
    category?: string;
    score?: number;
    result?: string;
    feedback?: string;
    message?: string;
    preferredDate?: string;
    preferredTime?: string;
}

export async function POST(request: Request) {
    try {
        const data: AutomationPayload = await request.json();

        let googleSuccess = false;
        let formspreeSuccess = false;

        // Intentar enviar a Google Apps Script primero (base de datos + email)
        if (GOOGLE_SCRIPT_URL) {
            try {
                const googleResponse = await fetch(GOOGLE_SCRIPT_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
                googleSuccess = googleResponse.ok;
            } catch (error) {
                console.error('Error enviando a Google Apps Script:', error);
            }
        }

        // Fallback a Formspree si Google falla o no está configurado
        if (!googleSuccess) {
            try {
                const formspreeResponse = await fetch(FORMSPREE_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        _subject: `[${data.formType.toUpperCase()}] ${data.name}`,
                        _replyto: data.email,
                        ...data
                    })
                });
                formspreeSuccess = formspreeResponse.ok;
            } catch (error) {
                console.error('Error enviando a Formspree:', error);
            }
        }

        if (googleSuccess || formspreeSuccess) {
            return NextResponse.json({
                success: true,
                method: googleSuccess ? 'google' : 'formspree'
            });
        }

        return NextResponse.json({ success: false, error: 'Ambos servicios fallaron' }, { status: 500 });

    } catch (error) {
        console.error('Error en API automation:', error);
        return NextResponse.json({ success: false, error: 'Error interno' }, { status: 500 });
    }
}
