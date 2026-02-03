"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Footer } from '@/components/Footer';

// Image list - Lobby first, then the rest
const images = [
    "/images/consultorio/WhatsApp Image 2026-01-29 at 6.22.19 PM (1).jpeg", // Lobby (primera)
    "/images/consultorio/WhatsApp Image 2026-01-29 at 6.22.13 PM.jpeg",
    "/images/consultorio/WhatsApp Image 2026-01-29 at 6.22.15 PM.jpeg",
    "/images/consultorio/WhatsApp Image 2026-01-29 at 6.22.16 PM (1).jpeg",
    "/images/consultorio/WhatsApp Image 2026-01-29 at 6.22.16 PM.jpeg",
    "/images/consultorio/WhatsApp Image 2026-01-29 at 6.22.17 PM (1).jpeg",
    "/images/consultorio/WhatsApp Image 2026-01-29 at 6.22.17 PM.jpeg",
    "/images/consultorio/WhatsApp Image 2026-01-29 at 6.22.18 PM.jpeg",
    "/images/consultorio/WhatsApp Image 2026-01-29 at 6.22.19 PM.jpeg"
];

export default function UbicacionPage() {
    return (
        <main className="min-h-screen relative z-10 overflow-hidden bg-transparent pt-32 pb-20 px-6">
            <div className="container mx-auto max-w-5xl">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-6xl font-bold font-serif mb-6 text-gradient">
                        Espacios de Bienestar
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light">
                        Un lugar diseñado para la calma, la escucha y el encuentro con uno mismo.
                    </p>
                </motion.div>

                {/* Main Info Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-metallic-dark rounded-[2rem] border border-white/5 p-8 md:p-12 mb-12 shadow-2xl relative overflow-hidden"
                >
                    <div className="relative z-10 grid md:grid-cols-2 gap-12">
                        <div>
                            <h2 className="text-3xl font-bold text-white mb-6">Seele – Espacios de bienestar</h2>
                            <div className="space-y-4 text-gray-300">
                                <p className="flex items-start gap-3">
                                    <svg className="w-6 h-6 text-emerald-400 mt-1 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                    <span>
                                        <strong className="block text-white">Dirección:</strong>
                                        Carrera 66ª # 34B - 08, Segundo piso
                                    </span>
                                </p>
                                <p className="flex items-start gap-3">
                                    <svg className="w-6 h-6 text-emerald-400 mt-1 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    <span>
                                        <strong className="block text-white">Puntos de Referencia:</strong>
                                        Al frente de Unicentro por la salida 3 (Conquistadores), al lado de Nutrilight, en el segundo piso de Vap.
                                    </span>
                                </p>
                                <div className="pt-4">
                                    <a
                                        href="https://maps.app.goo.gl/DArmyZrX7rpniykD9?g_st=com.google.maps.preview.copy"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 px-6 py-3 rounded-full hover:bg-emerald-500/20 transition-colors border border-emerald-500/20"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 7m0 13V7" /></svg>
                                        Ver en Google Maps
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white/5 rounded-xl p-6 border border-white/5">
                            <h3 className="text-xl font-serif text-white mb-4 border-b border-white/10 pb-2">
                                ¿Cómo llegas caminando desde Unicentro?
                            </h3>
                            <p className="text-gray-400 leading-relaxed text-sm">
                                Te ubicas mirando la entrada de la avenida Bolivariana del centro comercial Unicentro, tomas la cuadra que está a la derecha, y cruzas a la acera izquierda, caminas una cuadra y al inicio de la siguiente veras un local que se llama Vap, subes al segundo piso y ahí está ubicado Seele.
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Directions Details */}
                <div className="grid md:grid-cols-3 gap-6 mb-16">
                    {/* Car */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-black/20 backdrop-blur-sm p-6 rounded-2xl border border-white/5 hover:bg-black/30 transition-colors"
                    >
                        <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-4 text-blue-400">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m10 0a2 2 0 104 0m-4 0a2 2 0 114 0" /></svg>
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">Vehículo Particular</h3>
                        <p className="text-sm text-gray-400 leading-relaxed">
                            Sentido oriente-occidente: tomar Av. Bolivariana hasta glorieta de Bulerías, retornar hasta entrada principal de Unicentro. Voltear derecha, pasar primera cuadra. Seele está en la esq. mano izquierda, 2do piso.
                        </p>
                    </motion.div>

                    {/* Taxi */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-black/20 backdrop-blur-sm p-6 rounded-2xl border border-white/5 hover:bg-black/30 transition-colors"
                    >
                        <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center mb-4 text-yellow-400">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">Taxi</h3>
                        <p className="text-sm text-gray-400 leading-relaxed">
                            Indicar al conductor: Entrada principal Unicentro por Av. Bolivariana, bajar hasta la esquina y derecha. O por Carrera 65D (canalización) hasta calle 34B, derecha y al finalizar cuadra a mano derecha.
                        </p>
                    </motion.div>

                    {/* Public Transport */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="bg-black/20 backdrop-blur-sm p-6 rounded-2xl border border-white/5 hover:bg-black/30 transition-colors"
                    >
                        <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mb-4 text-purple-400">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">Transporte Público</h3>
                        <p className="text-sm text-gray-400 leading-relaxed">
                            Metro estación Santa Lucia, Aguacatala o Exposiciones + integrado a Unicentro. Rutas: Laureles 192/193, Belén 170-178, Circular Coonatra 300/301.
                        </p>
                    </motion.div>
                </div>

                {/* Gallery Carousel */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="relative"
                >
                    <h3 className="text-2xl font-serif text-white mb-8 text-center">Nuestras Instalaciones</h3>

                    {/* Carousel Container */}
                    <div className="relative group">
                        {/* Left Arrow */}
                        <button
                            onClick={() => {
                                const container = document.getElementById('gallery-carousel');
                                if (container) container.scrollBy({ left: -320, behavior: 'smooth' });
                            }}
                            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-black/60 hover:bg-black/80 rounded-full flex items-center justify-center text-white transition-all opacity-0 group-hover:opacity-100 -translate-x-2 hover:scale-110 backdrop-blur-sm border border-white/10"
                            aria-label="Anterior"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>

                        {/* Right Arrow */}
                        <button
                            onClick={() => {
                                const container = document.getElementById('gallery-carousel');
                                if (container) container.scrollBy({ left: 320, behavior: 'smooth' });
                            }}
                            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-black/60 hover:bg-black/80 rounded-full flex items-center justify-center text-white transition-all opacity-0 group-hover:opacity-100 translate-x-2 hover:scale-110 backdrop-blur-sm border border-white/10"
                            aria-label="Siguiente"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>

                        {/* Scrollable Gallery */}
                        <div
                            id="gallery-carousel"
                            className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 px-2"
                            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                        >
                            {images.map((src, index) => (
                                <div
                                    key={index}
                                    className="relative flex-shrink-0 w-[280px] sm:w-[320px] aspect-[4/3] rounded-xl overflow-hidden shadow-lg border border-white/10 group/img bg-gray-900 snap-center"
                                >
                                    <img
                                        src={src}
                                        alt={`Consultorio Seele ${index + 1}`}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-110"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-300" />
                                </div>
                            ))}
                        </div>

                        {/* Mobile swipe hint */}
                        <p className="text-center text-gray-500 text-xs mt-4 sm:hidden">
                            ← Desliza para ver más →
                        </p>
                    </div>
                </motion.div>

            </div>

            <Footer />
        </main>
    );
}
