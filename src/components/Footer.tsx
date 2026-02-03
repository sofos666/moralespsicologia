'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

/**
 * <footer> Footer Component
 * Contiene la información de contacto y créditos.
 */
export const Footer = () => {
    return (
        <footer className="relative z-10 py-16 border-t border-white/5 text-center">
            <div className="container mx-auto px-6">
                <p className="font-serif text-2xl text-white mb-4 italic">Psic. Cristian Morales Velásquez</p>
                <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-12 text-gray-500 text-sm mb-10">
                    <span className="flex items-center justify-center gap-2 italic">Universidad Luis Amigó</span>
                </div>



                <div className="flex flex-col items-center gap-8 mb-16">
                    <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
                        {/* WhatsApp Contact */}
                        <div className="flex items-center gap-4 group">
                            <span className="text-gray-400 font-light tracking-wider text-base">+57 301 497 5393</span>
                            <motion.a
                                href="https://wa.me/573014975393"
                                target="_blank"
                                rel="noopener noreferrer"
                                animate={{
                                    scale: [1, 1.15, 1],
                                    boxShadow: [
                                        "0 0 10px rgba(16, 185, 129, 0.2)",
                                        "0 0 25px rgba(16, 185, 129, 0.6)",
                                        "0 0 10px rgba(16, 185, 129, 0.2)"
                                    ]
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                                whileHover={{ scale: 1.3, rotate: 5 }}
                                className="p-4 rounded-full bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-white transition-colors duration-500 relative"
                                aria-label="Contactar por WhatsApp"
                            >
                                <svg className="w-6 h-6 relative z-10" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                            </motion.a>
                        </div>

                        {/* Email Contact */}
                        <div className="flex items-center gap-4 group">
                            <span className="text-gray-400 font-light tracking-wider text-base">cristianpsicologomed@gmail.com</span>
                            <motion.a
                                href="mailto:cristianpsicologomed@gmail.com"
                                animate={{
                                    scale: [1, 1.15, 1],
                                    boxShadow: [
                                        "0 0 10px rgba(59, 130, 246, 0.2)",
                                        "0 0 25px rgba(59, 130, 246, 0.6)",
                                        "0 0 10px rgba(59, 130, 246, 0.2)"
                                    ]
                                }}
                                transition={{
                                    duration: 3,
                                    delay: 1.5,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                                whileHover={{ scale: 1.3, rotate: -5 }}
                                className="p-4 rounded-full bg-blue-500/10 text-blue-500 hover:bg-blue-500 hover:text-white transition-colors duration-500 relative"
                                aria-label="Enviar correo electrónico"
                            >
                                <svg className="w-6 h-6 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2v10a2 2 0 002 2z" />
                                </svg>
                            </motion.a>
                        </div>
                    </div>
                </div>

                {/* Address Link */}
                <div className="flex justify-center mb-12">
                    <Link
                        href="/ubicacion"
                        className="group flex items-center gap-4 px-6 py-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all duration-300"
                    >
                        <div className="p-2.5 rounded-full bg-indigo-500/20 text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-all duration-300">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </div>
                        <span className="text-gray-300 group-hover:text-white transition-colors text-sm tracking-wide">
                            <strong className="text-indigo-400">Dirección:</strong> Carrera 66ª # 34B - 08, Segundo piso
                        </span>
                    </Link>
                </div>

                <p className="text-gray-600 text-xs uppercase tracking-[0.2em]">MVP - Morales Velásquez Psicólogo © 2025</p>
            </div>
        </footer>
    );
};
