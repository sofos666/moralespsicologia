import { NextResponse } from 'next/server';
import { z } from 'zod';

// URL del Google Apps Script Web App - SE DEBE CONFIGURAR
const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL || '';
const FORMSPREE_URL = "https://formspree.io/f/mqaeodlo";

// Schema validation for automation payload
const automationSchema = z.object({
    formType: z.enum(['triaje', 'presencial', 'virtual']),
    name: z.string().min(2),
    email: z.string().email(),
    whatsapp: z.string().min(5),
    category: z.string().optional(),
    score: z.number().optional(),
    result: z.string().optional(),
    feedback: z.string().optional(),
    message: z.string().optional(),
    preferredDate: z.string().optional(),
    preferredTime: z.string().optional(),
});

type AutomationPayload = z.infer<typeof automationSchema>;

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Validate input
        const validation = automationSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json(
                { success: false, error: validation.error.format() },
                { status: 400 }
            );
        }

        const data: AutomationPayload = validation.data;

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
