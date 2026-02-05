
import React from 'react';
import type { Metadata } from 'next';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
    title: 'Política Ética y Aviso Legal | Psic. Cristian Morales',
    description: 'Política ética, manejo de confidencialidad, alcance de los servicios y tratamiento de datos personales del consultorio de Cristian Morales Velásquez.',
};

export default function EthicsPage() {
    return (
        <main className="min-h-screen bg-black text-white relative overflow-hidden font-sans selection:bg-olive selection:text-white">

            {/* Background Gradients */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-olive/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-900/10 rounded-full blur-[120px]" />
            </div>

            <div className="container mx-auto px-6 py-24 relative z-10 max-w-4xl">

                <header className="mb-16 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-1 mb-6 glass-effect rounded-full border border-white/10 text-gray-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-olive animate-pulse" />
                        <span className="text-xs font-bold uppercase tracking-widest">Documento Legal</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400">
                        Política Ética y Aviso Legal
                    </h1>
                    <p className="text-xl text-gray-400 font-light max-w-2xl mx-auto">
                        Compromiso con la transparencia, la confidencialidad y el ejercicio responsable de la psicología clínica.
                    </p>
                </header>

                <div className="space-y-12 text-gray-300 leading-relaxed text-lg font-light">

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                            <span className="text-olive">01.</span> Introducción
                        </h2>
                        <p>
                            El presente documento establece los principios éticos y legales que rigen la práctica profesional de Cristian Morales Velásquez (Psicólogo Clínico). Todos los servicios ofrecidos, tanto presenciales como virtuales, se adhieren estrictamente a la deontología profesional y a la normativa vigente en Colombia (Ley 1090 de 2006).
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                            <span className="text-olive">02.</span> Confidencialidad y Secreto Profesional
                        </h2>
                        <p className="mb-4">
                            La privacidad del consultante es sagrada. Toda la información compartida durante las sesiones, así como los registros clínicos y datos del triaje, están protegidos por el <strong>Secreto Profesional</strong>.
                        </p>
                        <p>
                            La información solo podrá ser revelada sin consentimiento en situaciones excepcionales donde exista un riesgo inminente y grave para la vida del paciente o de terceros, conforme a lo estipulado por la ley.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                            <span className="text-olive">03.</span> Alcance del Triaje Virtual
                        </h2>
                        <p>
                            El sistema de "Triaje Virtual" disponible en este sitio web es una herramienta de <strong>orientación preliminar</strong> diseñada para facilitar la autoevaluación y la solicitud de citas.
                        </p>
                        <ul className="list-disc pl-6 space-y-2 mt-4 marker:text-olive">
                            <li><strong>No constituye un diagnóstico clínico formal.</strong> Un diagnóstico requiere una evaluación exhaustiva en consulta.</li>
                            <li>Los resultados son indicativos y buscan ayudar al usuario a identificar su necesidad de atención.</li>
                            <li>No reemplaza la valoración médica o psiquiátrica.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                            <span className="text-olive">04.</span> Servicios en Línea y Manejo de Crisis
                        </h2>
                        <p className="mb-4">
                            La atención psicológica virtual (telepsicología) tiene limitaciones específicas.
                        </p>
                        <div className="bg-red-900/10 border border-red-500/20 p-6 rounded-2xl">
                            <h3 className="text-red-400 font-bold mb-2 text-base uppercase tracking-wide">Importante: Emergencias</h3>
                            <p className="text-sm">
                                Este servicio <strong>NO es una línea de emergencia</strong> ni de atención inmediata a crisis suicidas agudas. Si usted o alguien más está en peligro inmediato, por favor diríjase al servicio de urgencias más cercano o comuníquese a la línea de emergencia nacional (123 en Colombia).
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                            <span className="text-olive">05.</span> Tratamiento de Datos Personales
                        </h2>
                        <p>
                            Al utilizar los formularios de este sitio web, usted autoriza el tratamiento de sus datos personales únicamente con fines de contacto profesional y agendamiento. Sus datos no serán compartidos con terceros ni utilizados para fines comerciales ajenos a la prestación del servicio de psicología.
                        </p>
                    </section>

                </div>

                <div className="mt-20 pt-10 border-t border-white/10 text-center text-gray-500 text-sm">
                    <p>Última actualización: Febrero 2026</p>
                    <p className="mt-2">Medellín, Colombia</p>
                </div>

            </div>

            <Footer />
        </main>
    );
}
