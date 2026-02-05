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
        id: "psicoterapia-individual",
        title: "Psicoterapia individual",
        subtitle: "Ansiedad, depresión y crisis emocional",
        color: "from-blue-400 to-indigo-500",
        bgClass: "bg-cat-adult/10",
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
        ),
        psychoanalyticFocus: {
            title: "Atención Psicológica Adultos",
            description: "Atención psicológica para adultos que presentan ansiedad, estrés, depresión, crisis emocionales, dificultades laborales o personales. Ideal para quienes buscan terapia psicológica en Medellín con acompañamiento profesional.",
            points: [
                { title: "Ansiedad y Estrés", desc: "Tratamiento efectivo para ataques de pánico y ansiedad generalizada." },
                { title: "Depresión", desc: "Acompañamiento profesional para superar estados depresivos y recuperar el sentido vital." }
            ]
        },
        complementaryTools: {
            title: "Abordaje Terapéutico",
            points: [
                { title: "Escucha Activa", desc: "Un espacio libre de juicios para elaborar el malestar." }
            ]
        }
    },
    {
        id: "infantil-adolescentes",
        title: "Psicología infantil y adolescentes",
        subtitle: "Dificultades emocionales y conductuales",
        color: "from-emerald-400 to-teal-500",
        bgClass: "bg-cat-kids/10",
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        psychoanalyticFocus: {
            title: "Intervención Especializada",
            description: "Intervención psicológica especializada para niños y adolescentes, abordando dificultades emocionales, conductuales, escolares y familiares, en coordinación con padres y cuidadores.",
            points: [
                { title: "Problemas de Conducta", desc: "Manejo de límites y agresividad en el entorno familiar y escolar." },
                { title: "TDAH y Autismo", desc: "Evaluación y acompañamiento en procesos de neurodesarrollo." }
            ]
        },
        complementaryTools: {
            title: "Orientación a Padres",
            points: [
                { title: "Crianza Respetuosa", desc: "Herramientas para fortalecer el vínculo y la autoridad." }
            ]
        }
    },
    {
        id: "pareja",
        title: "Terapia de pareja",
        subtitle: "Comunicación y resolución de conflictos",
        color: "from-rose-400 to-pink-500",
        bgClass: "bg-cat-couples/10",
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
        ),
        psychoanalyticFocus: {
            title: "Vínculo y Afecto",
            description: "Espacio terapéutico para mejorar la comunicación, resolver conflictos y fortalecer el vínculo afectivo. Servicio de terapia de pareja en Medellín presencial y virtual.",
            points: [
                { title: "Crisis de Pareja", desc: "Superación de infidelidades, celos y monotonía." },
                { title: "Comunicación", desc: "Herramientas para diálogos constructivos y empáticos." }
            ]
        },
        complementaryTools: {
            title: "Objetivos",
            points: [
                { title: "Reconexión", desc: "Recuperar la intimidad y el proyecto común." }
            ]
        }
    },
    {
        id: "familia",
        title: "Terapia familiar",
        subtitle: "Armonía y convivencia en el hogar",
        color: "from-indigo-400 to-blue-500",
        bgClass: "bg-cat-family/10",
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
        ),
        psychoanalyticFocus: {
            title: "Dinámica Familiar",
            description: "Acompañamiento a familias que atraviesan crisis, conflictos o procesos de adaptación, fortaleciendo la dinámica familiar y la convivencia.",
            points: [
                { title: "Resolución de Conflictos", desc: "Gestión de peleas y malentendidos entre miembros." }
            ]
        },
        complementaryTools: {
            title: "Apoyo",
            points: [
                { title: "Ciclos Vitales", desc: "Adaptación a cambios: duelos, separaciones, mudanzas." }
            ]
        }
    },
    {
        id: "virtual",
        title: "Atención psicológica virtual",
        subtitle: "Terapia online efectiva y segura",
        color: "from-violet-400 to-purple-500",
        bgClass: "bg-cat-teen/10",
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
        ),
        psychoanalyticFocus: {
            title: "Terapia Online Global",
            description: "Terapia psicológica online con la misma efectividad que la modalidad presencial, ideal para personas fuera de Medellín o con limitaciones de tiempo.",
            points: [
                { title: "Accesibilidad", desc: "Conéctate desde cualquier lugar de Colombia o el mundo." }
            ]
        },
        complementaryTools: {
            title: "Plataformas",
            points: [
                { title: "Seguridad", desc: "Sesiones privadas por Google Meet o la plataforma de su elección." }
            ]
        }
    },
    {
        id: "burnout-estres",
        title: "Psicólogo para estrés y burnout en Medellín",
        subtitle: "Recuperar el bienestar laboral",
        color: "from-emerald-500 to-green-600",
        bgClass: "bg-cat-burnout/10",
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" /></svg>
        ),
        psychoanalyticFocus: {
            title: "Salud Mental Laboral",
            description: "El burnout laboral y el estrés crónico afectan la salud mental y física. La psicoterapia permite comprender el origen del desgaste emocional y construir herramientas para mejorar la calidad de vida personal y profesional.",
            points: [
                { title: "Agotamiento", desc: "Manejo del cansancio emocional y mental extremo." }
            ]
        },
        complementaryTools: {
            title: "Recuperación",
            points: [
                { title: "Equilibrio", desc: "Balance entre vida laboral y personal." }
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
            title: "Higiene Digital",
            description: "Tratamiento pionero para la adicción al celular, redes sociales y desconexión digital.",
            points: [
                { title: "Dependencia", desc: "Superar la ansiedad por estar desconectado." }
            ]
        },
        complementaryTools: {
            title: "Estrategias",
            points: [
                { title: "Desconexión", desc: "Espacios libres de pantallas." }
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
                            Servicios psicológicos en Medellín
                        </h1>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light">
                            Atención profesional presencial y virtual adaptada a tus necesidades.
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
