import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const data = await request.json();

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
