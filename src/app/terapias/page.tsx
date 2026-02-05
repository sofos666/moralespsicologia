"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import { TiltCard } from '@/components/TiltCard';
import { Footer } from '@/components/Footer';

// Lazy load removed to ensure reliability on mobile
import { StandardBookingForm } from '@/components/StandardBookingForm';

// Defines the data structure for therapies
interface Therapy {
    id: string;
    title: string | React.ReactNode;
    subtitle: string;
    color: string;
    bgClass: string;
    icon: React.ReactNode;
    psychoanalyticFocus: {
        title: string;
        description: string;
        points: { title: string; desc: string }[];
    };
    complementaryTools: {
        title: string;
        points: { title: string; desc: string }[];
    };
}

const therapies: Therapy[] = [
    {
        id: "ninos",
        title: "Psicoterapia Infantil",
        subtitle: "El lenguaje del juego y la creatividad",
        color: "from-emerald-400 to-teal-500",
        bgClass: "bg-cat-kids/10",
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        psychoanalyticFocus: {
            title: "Desde el Psicoanálisis",
            description: "El niño a menudo refleja situaciones no resueltas en la familia. Nuestro enfoque escucha lo que el niño tiene para decir a través de sus propios medios.",
            points: [
                { title: "Terapia de Juego", desc: "Así como los adultos hablan, los niños juegan. El juego es su manera natural de expresar miedos y deseos." },
                { title: "El Dibujo", desc: "A través del arte, el niño da forma a su mundo interior y ordena sus emociones." }
            ]
        },
        complementaryTools: {
            title: "Herramientas de Apoyo",
            points: [
                { title: "Orientación a Padres", desc: "Trabajamos con ustedes para fortalecer su rol y mejorar la dinámica en casa, convirtiéndolos en aliados del proceso." }
            ]
        }
    },
    {
        id: "adolescentes",
        title: "Adolescentes y Jóvenes",
        subtitle: "Identidad, cambios y nuevos caminos",
        color: "from-violet-400 to-purple-500",
        bgClass: "bg-cat-teen/10",
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
            </svg>
        ),
        psychoanalyticFocus: {
            title: "Desde el Psicoanálisis",
            description: "La adolescencia es un despertar intenso. Acompañamos al joven en la construcción de su propia identidad, separada de las expectativas externas.",
            points: [
                { title: "Espacio de Escucha", desc: "Ofrecemos un lugar seguro para poner en palabras la angustia, evitando que se transforme en conductas impulsivas." },
                { title: "Flexibilidad", desc: "Adaptamos el encuadre para que el joven se sienta cómodo, priorizando el vínculo y la confianza." }
            ]
        },
        complementaryTools: {
            title: "Herramientas de Apoyo",
            points: [
                { title: "Terapia Narrativa", desc: "Ayudamos a reescribir su historia personal, alejándose de etiquetas limitantes." },
                { title: "Manejo Emocional", desc: "Estrategias prácticas para regular emociones intensas cuando es necesario." }
            ]
        }
    },
    {
        id: "familia",
        title: "Terapia Familiar",
        subtitle: "Sanando vínculos y estructuras",
        color: "from-indigo-400 to-blue-500",
        bgClass: "bg-cat-family/10",
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
        ),
        psychoanalyticFocus: {
            title: "Desde el Psicoanálisis",
            description: "El malestar de un miembro suele señalar algo en el grupo familiar. Trabajamos para entender y modificar esas dinámicas profundas.",
            points: [
                { title: "Historia Familiar", desc: "Identificamos patrones y temas que se repiten entre generaciones para poder transformarlos." }
            ]
        },
        complementaryTools: {
            title: "Herramientas de Apoyo",
            points: [
                { title: "Enfoque Sistémico", desc: "Visualizamos las alianzas y roles dentro de la familia para mejorar la comunicación y el equilibrio." }
            ]
        }
    },
    {
        id: "pareja",
        title: "Terapia de Pareja",
        subtitle: "Construyendo un amor real y respetuoso",
        color: "from-rose-400 to-pink-500",
        bgClass: "bg-cat-couples/10",
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
        ),
        psychoanalyticFocus: {
            title: "Desde el Psicoanálisis",
            description: "Más allá del ideal romántico, buscamos que cada uno pueda amar al otro tal como es, respetando sus diferencias.",
            points: [
                { title: "Dinámicas Inconscientes", desc: "Exploramos cómo las expectativas personales influyen en la relación y cómo salir de los conflictos repetitivos." }
            ]
        },
        complementaryTools: {
            title: "Herramientas de Apoyo",
            points: [
                { title: "Gestión de Conflictos", desc: "Técnicas prácticas para comunicarse mejor y desactivar discusiones antes de que escalen." },
                { title: "Seguridad Emocional", desc: "Fomentamos un vínculo seguro donde ambos se sientan escuchados y valorados." }
            ]
        }
    },
    {
        id: "burnout",
        title: "Burnout y Estrés Laboral",
        subtitle: "Recuperar el bienestar y el deseo",
        color: "from-emerald-500 to-green-600",
        bgClass: "bg-cat-burnout/10",
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" /></svg>
        ),
        psychoanalyticFocus: {
            title: "Desde el Psicoanálisis",
            description: "El agotamiento suele venir de una autoexigencia desmedida. Ayudamos a entender a quién tratamos de complacer a costa de nuestra salud.",
            points: [
                { title: "Límites Saludables", desc: "Trabajamos en poner freno a la presión interna por 'rendir siempre más'." }
            ]
        },
        complementaryTools: {
            title: "Herramientas de Apoyo",
            points: [
                { title: "Reconexión con Valores", desc: "Ayudamos a recordar qué es realmente importante para ti, más allá del trabajo." },
                { title: "Mindfulness", desc: "Técnicas para reducir la ansiedad inmediata y recuperar la calma." }
            ]
        }
    },
    {
        id: "nomofobia",
        title: "Nomofobia y Adicción Digital",
        subtitle: "Desconectar para reconectar con el deseo",
        color: "from-cyan-400 to-blue-500",
        bgClass: "bg-cat-digital/10",
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
        ),
        psychoanalyticFocus: {
            title: "Desde el Psicoanálisis",
            description: "A menudo buscamos en la pantalla algo que nos complete, pero esa satisfacción nunca llega. Trabajamos para tolerar esa 'falta' sin angustia inmediata.",
            points: [
                { title: "Del Scroll al Deseo", desc: "Pasar de consumir contenido pasivamente a crear y vivir tu propia vida." },
                { title: "Habitar el Vacío", desc: "Aprender a estar con uno mismo sin la necesidad de tapar el silencio con notificaciones." }
            ]
        },
        complementaryTools: {
            title: "Higiene Digital",
            points: [
                { title: "Espacios Libres de Tech", desc: "Establecer zonas sagradas (como la mesa o el dormitorio) para recuperar la presencia real." },
                { title: "Límites Estructurales", desc: "Recuperar el control sobre el dispositivo en lugar de que este controle tu tiempo." }
            ]
        }
    },
    {
        id: "alta-gerencia",
        title: (
            <>
                Consultoría Psicoanalítica
                <span className="block text-xl opacity-90 mt-1">Alta Gerencia</span>
            </>
        ),
        subtitle: "Estrategia mental para líderes",
        color: "from-amber-400 to-orange-500",
        bgClass: "bg-cat-exec/10",
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
        ),
        psychoanalyticFocus: {
            title: "Enfoque Consultivo",
            description: "No es una terapia tradicional. Es un espacio para analizar la soledad del mando y las dinámicas de poder en la organización.",
            points: [
                { title: "Mundo Interno y Liderazgo", desc: "Cómo tu personalidad influye en tus decisiones y en tu equipo." },
                { title: "Análisis Institucional", desc: "Entender la cultura de la empresa y sus defensas ante la ansiedad." }
            ]
        },
        complementaryTools: {
            title: "Formato",
            points: [
                { title: "Consultoría Ejecutiva", desc: "Sesiones enfocadas en desbloquear el potencial estratégico y personal." }
            ]
        }
    }
];

export default function TerapiasPage() {
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [isBookingOpen, setIsBookingOpen] = useState(false);

    const toggleExpand = (id: string) => {
        setExpandedId(expandedId === id ? null : id);
    };

    return (
        <>
            <AnimatePresence>
                {isBookingOpen && (
                    <StandardBookingForm
                        onClose={() => setIsBookingOpen(false)}
                        therapyTitle={expandedId ? therapies.find(t => t.id === expandedId)?.title as string : undefined}
                    />
                )}
            </AnimatePresence>

            <main className="min-h-screen relative z-10 overflow-hidden bg-transparent pt-32 pb-20 px-6">

                <div className="container mx-auto max-w-5xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-16"
                    >
                        <h1 className="text-4xl md:text-6xl font-bold font-serif mb-6 text-gradient">
                            Enfoques Terapéuticos
                        </h1>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light">
                            Soluciones clínicas de alta especialidad adaptadas a cada etapa y necesidad.
                        </p>
                    </motion.div>

                    <div className="grid gap-6">
                        {therapies.map((therapy) => (
                            <TiltCard key={therapy.id} className="w-full">
                                <div
                                    onClick={() => toggleExpand(therapy.id)}
                                    onKeyDown={(e) => e.key === 'Enter' && toggleExpand(therapy.id)}
                                    role="button"
                                    tabIndex={0}
                                    className={`relative bg-metallic-dark rounded-[2rem] overflow-hidden border border-white/5 hover:border-white/10 transition-colors ${expandedId === therapy.id ? 'bg-opacity-100 cursor-default' : 'cursor-pointer'
                                        }`}>
                                    {/* Header de la tarjeta - Clickable Area */}
                                    <div
                                        className={`p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center gap-6 relative z-10 transition-colors`}
                                    >
                                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 bg-gradient-to-br ${therapy.color} bg-opacity-20`}>
                                            <div className="text-white opacity-90">
                                                {therapy.icon}
                                            </div>
                                        </div>

                                        <div className="flex-1">
                                            <h2 className={`text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${therapy.color} mb-2`}>
                                                {therapy.title}
                                            </h2>
                                            <p className="text-gray-400 font-light text-lg">
                                                {therapy.subtitle}
                                            </p>
                                        </div>

                                        <motion.div
                                            animate={{ rotate: expandedId === therapy.id ? 180 : 0 }}
                                            className="p-3 rounded-full bg-white/5 text-gray-400 hover:text-white transition-colors"
                                        >
                                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </motion.div>
                                    </div>

                                    {/* Contenido Expandible */}
                                    <AnimatePresence>
                                        {expandedId === therapy.id && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                                className="bg-black/20"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <div className="p-8 pt-0 md:p-10 md:pt-0 grid md:grid-cols-2 gap-10 text-left">
                                                    {/* Columna Psicoanálisis */}
                                                    <div>
                                                        <h3 className="text-xl font-serif text-white mb-4 border-b border-white/10 pb-2">
                                                            {therapy.psychoanalyticFocus.title}
                                                        </h3>
                                                        <p className="text-gray-400 mb-6 leading-relaxed">
                                                            {therapy.psychoanalyticFocus.description}
                                                        </p>
                                                        <ul className="space-y-4">
                                                            {therapy.psychoanalyticFocus.points.map((point, idx) => (
                                                                <li key={idx} className="flex gap-3">
                                                                    <span className={`mt-1.5 w-1.5 h-1.5 rounded-full bg-gradient-to-r ${therapy.color}`} />
                                                                    <div>
                                                                        <strong className="text-white block mb-1">{point.title}</strong>
                                                                        <span className="text-sm text-gray-500">{point.desc}</span>
                                                                    </div>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>

                                                    {/* Columna Complementaria */}
                                                    <div>
                                                        <h3 className="text-xl font-serif text-white mb-4 border-b border-white/10 pb-2">
                                                            {therapy.complementaryTools.title}
                                                        </h3>
                                                        <ul className="space-y-6">
                                                            {therapy.complementaryTools.points.map((point, idx) => (
                                                                <li key={idx} className="bg-white/5 p-4 rounded-xl border border-white/5 hover:bg-white/10 transition-colors">
                                                                    <strong className="text-emerald-400 block mb-2 text-sm uppercase tracking-wider">{point.title}</strong>
                                                                    <p className="text-gray-400 text-sm leading-relaxed">{point.desc}</p>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>

                                                {/* Botón de Agendamiento - Amarillo Solar */}
                                                <div className="px-8 pb-10 md:px-10 flex justify-center md:justify-start">
                                                    <motion.button
                                                        whileHover={{ scale: 1.05 }}
                                                        whileTap={{ scale: 0.95 }}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setIsBookingOpen(true);
                                                        }}
                                                        className="relative z-50 bg-solar text-black px-8 py-4 rounded-full font-bold text-sm uppercase tracking-wider shadow-lg shadow-solar/20 hover:shadow-solar/40 transition-all duration-300 flex items-center gap-2 touch-manipulation cursor-pointer"
                                                    >
                                                        Agendar cita
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                        </svg>
                                                    </motion.button>
                                                </div>
                                                <div className="h-6" />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    {/* Background decoration */}
                                    <div className={`hidden md:block absolute top-0 right-0 w-96 h-96 bg-gradient-to-br ${therapy.color} opacity-5 blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/3`} />
                                </div>
                            </TiltCard>
                        ))}
                    </div>
                </div>

                <Footer />
            </main>
        </>
    );
}
