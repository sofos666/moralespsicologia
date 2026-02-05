"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Footer } from '@/components/Footer';
import Image from 'next/image';

export default function SobreMiPage() {
    return (
        <main className="min-h-screen relative z-10 overflow-hidden bg-transparent">

            {/* Hero Section */}
            <section className="relative pt-32 pb-16 px-6">
                <div className="container mx-auto max-w-5xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-16"
                    >
                        <h1 className="text-3xl md:text-5xl font-bold font-serif mb-4 text-gradient">
                            Cristian Morales Velásquez – Psicólogo en Medellín
                        </h1>
                    </motion.div>

                    <div className="grid lg:grid-cols-2 gap-12 items-start">
                        {/* Foto Principal - Solo visible en desktop */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="hidden md:block relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border border-white/10 group"
                        >
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
                            <img
                                src="/images/perfil/via_lactea_isla.png"
                                alt="Cristian Morales Velásquez"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        </motion.div>

                        {/* Contenido Biográfico */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            className="space-y-8 text-gray-300 leading-relaxed font-light text-lg"
                        >
                            <p>
                                Soy psicólogo clínico en Medellín, con más de 13 años de experiencia en el acompañamiento psicológico de personas, familias y comunidades. Mi práctica se caracteriza por un enfoque profesional, ético y comprometido con el bienestar emocional de cada paciente.
                            </p>

                            <p>
                                Trabajo desde una perspectiva integral, adaptando la intervención a las necesidades individuales y promoviendo procesos terapéuticos claros, respetuosos y efectivos.
                            </p>

                            <p>
                                De manera complementaria, he trabajado en Medellín y el Valle de Aburrá como psicólogo clínico, orientador y docente, en contextos educativos y programas de atención psicosocial, lo que ha permitido sostener una lectura precisa de las problemáticas contemporáneas en niños, adolescentes, familias y adultos.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Sección Experiencia Taraira */}
            <section className="relative py-16 px-6 bg-metallic-dark/30 border-y border-white/5">
                <div className="container mx-auto max-w-5xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="grid md:grid-cols-2 gap-12 items-center"
                    >
                        <div>
                            <h2 className="text-3xl font-serif text-white mb-6">
                                Experiencia en Territorios Ancestrales
                            </h2>
                            <div className="space-y-6 text-gray-300 leading-relaxed text-lg font-light">
                                <p>
                                    Entre 2018 y 2021 me desempeñé como psicólogo de la Comisaría de Familia del municipio de <strong>Taraira (Vaupés)</strong>, desarrollando labores clínicas y psicosociales en todo el territorio de Taraira, el <strong>Gran Resguardo Indígena Yaigojé Apaporis</strong> y Mitú.
                                </p>
                                <p>
                                    Allí trabajé en procesos de protección de derechos, Procesos Administrativos de Restablecimiento de Derechos (PARD), atención a situaciones de violencia intrafamiliar y acompañamiento a familias y comunidades, articulando el marco institucional con las particularidades culturales y comunitarias del territorio. Esta experiencia consolidó una práctica clínica sensible al contexto, respetuosa de la diferencia y éticamente situada.
                                </p>
                            </div>
                        </div>
                        <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                            {/* Placeholder para imagen de Taraira/Naturaleza */}
                            <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/40 to-transparent pointer-events-none z-10" />
                            <img
                                src="/images/perfil/la_libertad.png"
                                alt="Paisaje Taraira Vaupés"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Sección Fotografía y Behance */}
            <section className="relative py-20 px-6">
                <div className="container mx-auto max-w-4xl text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <div className="mb-8">
                            <span className="inline-block p-3 rounded-full bg-white/5 text-white mb-6">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                            </span>
                            <h2 className="text-3xl md:text-4xl font-serif text-white mb-6">
                                La Mirada Fotográfica
                            </h2>
                        </div>

                        <p className="text-gray-300 text-lg leading-relaxed font-light max-w-2xl mx-auto">
                            Paralelamente a mi ejercicio clínico, mantengo un vínculo activo con la fotografía, especialmente de naturaleza y astrofotografía, como una forma de mirada y elaboración simbólica. Concibo la creación artística como una vía de sublimación, que permite transformar la experiencia, dar forma a lo indecible y abrir nuevas posibilidades de sentido.
                        </p>

                        {/* Fotografía destacada - Formato vertical */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="relative aspect-[3/4] max-w-sm mx-auto rounded-2xl overflow-hidden shadow-2xl border border-white/10 my-8 md:hidden"
                        >
                            <img
                                src="/images/perfil/via_lactea_isla.png"
                                alt="Fotografía de naturaleza y astrofotografía por Cristian Morales"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                        </motion.div>

                        <p className="text-gray-300 text-lg leading-relaxed font-light max-w-2xl mx-auto">
                            Esta sensibilidad estética dialoga con mi práctica clínica, sin sustituirla, aportando una atención cuidadosa al detalle, al silencio y a lo que no siempre se dice con palabras.
                        </p>

                        <div className="pt-8">
                            <a
                                href="https://www.behance.net/cristianmoralesve"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-3 px-8 py-4 bg-[#1769ff] hover:bg-[#0056e0] text-white rounded-full font-medium transition-all duration-300 hover:scale-105 shadow-lg shadow-blue-500/20"
                            >
                                Ver portafolio en Behance
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Orientación Clínica */}
            <section className="relative py-16 px-6">
                <div className="container mx-auto max-w-4xl bg-gradient-to-br from-emerald-900/10 to-indigo-900/10 rounded-3xl p-8 md:p-12 border border-white/5 backdrop-blur-sm text-center">
                    <h3 className="text-2xl font-serif text-white mb-6">Orientación Clínica</h3>
                    <p className="text-gray-300 leading-relaxed font-light text-lg mb-8">
                        Mi orientación clínica se sostiene en los principios del psicoanálisis lacaniano: la centralidad del lenguaje, la responsabilidad subjetiva y la imposibilidad de respuestas universales al sufrimiento humano. En consulta ofrezco un espacio serio, ético y sin juicios, donde cada persona pueda hablar y trabajar aquello que le causa malestar.
                    </p>
                    <div className="text-emerald-300 font-medium">
                        Atiendo de manera presencial en Medellín y en modalidad virtual.
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
