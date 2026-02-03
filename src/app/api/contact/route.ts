import { NextResponse } from 'next/server';
import { z } from 'zod';

// Schema validation for contact form
const contactSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    message: z.string().min(10, "Message must be at least 10 characters"),
    phone: z.string().optional(),
    service: z.string().optional(),
});

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Validate input
        const validation = contactSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json(
                { success: false, error: validation.error.format() },
                { status: 400 }
            );
        }

        const data = validation.data;

        // El ID de Formspree como endpoint de servidor para seguridad
        const FORMSPREE_URL = "https://formspree.io/f/mqaeodlo";

        const response = await fetch(FORMSPREE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            return NextResponse.json({ success: true });
        } else {
            const errorData = await response.json();
            return NextResponse.json({ success: false, error: errorData }, { status: response.status });
        }
    } catch (error) {
        console.error('Error in contact proxy:', error);
        return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
    }
}
