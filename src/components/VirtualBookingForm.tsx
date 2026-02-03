"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// Para usar EmailJS en lugar de Formspree, descomentar la siguiente línea:
// import emailjs from '@emailjs/browser';

interface VirtualBookingFormProps {
    onClose: () => void;
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export const VirtualBookingForm: React.FC<VirtualBookingFormProps> = ({ onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        whatsapp: '',
        nationality: '',
        timezone: '',
        motive: ''
    });

    const [formStatus, setFormStatus] = useState<FormStatus>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormStatus('submitting');
        setErrorMessage('');

        try {
            // Envío a Formspree (Correo Electrónico)
            const response = await fetch("https://formspree.io/f/mqaeodlo", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    _subject: `Nueva Solicitud de Atención Virtual: ${formData.name}`,
                    ...formData
                })
            });

            if (!response.ok) {
                throw new Error("Error en el envío. Por favor intente nuevamente.");
            }

            // =====================================================
            // ALTERNATIVA: Usar EmailJS en lugar de Formspree
            // Descomentar el código siguiente y comentar el fetch de arriba
            // =====================================================
            // await emailjs.send(
            //     'TU_SERVICE_ID',      // Obtener de EmailJS Dashboard
            //     'TU_TEMPLATE_ID',     // Obtener de EmailJS Dashboard
            //     {
            //         to_email: 'cristianpsicologomed@gmail.com',
            //         from_name: formData.name,
            //         from_email: formData.email,
            //         whatsapp: formData.whatsapp,
            //         nationality: formData.nationality,
            //         timezone: formData.timezone,
            //         message: formData.motive,
            //     },
            //     'TU_PUBLIC_KEY'       // Obtener de EmailJS Dashboard
            // );
            // =====================================================

            setFormStatus('success');

            // Estructurar el mensaje para WhatsApp
            const message = `Hola Psic. Cristian, deseo agendar una *Atención Virtual con Precios Especiales*.\n\n` +
                `*FICHA DE CONTACTO:*\n` +
                `👤 *Nombre:* ${formData.name}\n` +
                `📧 *Email:* ${formData.email}\n` +
                `📱 *WhatsApp:* ${formData.whatsapp}\n` +
                `🌎 *Nacionalidad:* ${formData.nationality}\n` +
                `⏰ *Zona Horaria:* ${formData.timezone}\n\n` +
                `*MOTIVO DE CONSULTA:*\n` +
                `${formData.motive}`;

            const encodedMessage = encodeURIComponent(message);
            const whatsappUrl = `https://wa.me/573014975393?text=${encodedMessage}`;

            // Esperar un momento para mostrar el éxito antes de redirigir
            setTimeout(() => {
                window.open(whatsappUrl, '_blank');
                onClose();
            }, 1500);

        } catch (error) {
            console.error(error);
            setFormStatus('error');
            setErrorMessage(error instanceof Error ? error.message : 'Ocurrió un error inesperado');
        }
    };


    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl overflow-y-auto"
        >
            <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                className="bg-metallic-dark w-full max-w-xl rounded-[2.5rem] p-6 md:p-8 relative border border-white/10 shadow-2xl my-4"
            >
                {/* Botón Cerrar */}
                <button
                    onClick={onClose}
                    className="absolute top-5 right-5 text-gray-400 hover:text-white transition-colors p-2 z-20"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="text-center mb-6">
                    <span className="text-solar text-[10px] font-bold uppercase tracking-[0.4em] mb-2 block">Reserva Exclusiva</span>
                    <h2 className="text-2xl md:text-3xl font-light text-white tracking-tight">Atención Virtual</h2>
                    <p className="text-gray-400 mt-1 text-xs font-light px-4">Complete sus datos para aplicar a precios especiales internacionales.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-gray-500 ml-4">Nombre Completo</label>
                            <input
                                required
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-3 px-6 text-white outline-none focus:border-solar/50 transition-all text-sm"
                                placeholder="Ej. Cristian Morales"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-gray-500 ml-4">WhatsApp de Contacto</label>
                            <input
                                required
                                type="tel"
                                pattern="[0-9+ ]{10,20}"
                                title="Por favor ingrese un número de teléfono válido (mínimo 10 dígitos)"
                                value={formData.whatsapp}
                                onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                                className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-3 px-6 text-white outline-none focus:border-solar/50 transition-all text-sm"
                                placeholder="+57..."
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-gray-500 ml-4">Correo Electrónico</label>
                        <input
                            required
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-4 px-6 text-white outline-none focus:border-solar/50 transition-all text-sm"
                            placeholder="email@ejemplo.com"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-gray-500 ml-4">Nacionalidad</label>
                            <input
                                required
                                type="text"
                                value={formData.nationality}
                                onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
                                className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-3 px-6 text-white outline-none focus:border-solar/50 transition-all text-sm"
                                placeholder="Ej. Colombiana"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-gray-500 ml-4">Zona Horaria</label>
                            <select
                                required
                                value={formData.timezone}
                                onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
                                className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-4 px-6 text-white outline-none focus:border-solar/50 transition-all text-sm appearance-none"
                            >
                                <option value="" disabled className="bg-black">Seleccione una zona</option>
                                <option value="GMT-5 (Colombia, Perú, NY)" className="bg-black">GMT-5 (Col, Per, NY)</option>
                                <option value="GMT-6 (CDMX, Centroamérica)" className="bg-black">GMT-6 (CDMX)</option>
                                <option value="GMT-3 (Argentina, Chile, Uruguay)" className="bg-black">GMT-3 (Arg, Chi)</option>
                                <option value="GMT+1 (España, Europa Central)" className="bg-black">GMT+1 (España)</option>
                                <option value="OTRA" className="bg-black">Otra zona / No sé</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-gray-500 ml-4">Motivo de Consulta</label>
                        <textarea
                            required
                            value={formData.motive}
                            onChange={(e) => setFormData({ ...formData, motive: e.target.value })}
                            rows={4}
                            className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-4 px-6 text-white outline-none focus:border-solar/50 transition-all text-sm resize-none"
                            placeholder="Describa brevemente cómo puedo ayudarle..."
                        />
                    </div>

                    {/* Mensaje de error */}
                    {formStatus === 'error' && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-red-500/10 border border-red-500/30 rounded-2xl p-4 text-center"
                        >
                            <p className="text-red-400 text-sm">{errorMessage}</p>
                            <button
                                type="button"
                                onClick={() => setFormStatus('idle')}
                                className="text-red-300 text-xs mt-2 underline hover:no-underline"
                            >
                                Intentar de nuevo
                            </button>
                        </motion.div>
                    )}

                    {/* Mensaje de éxito */}
                    {formStatus === 'success' && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-6 text-center"
                        >
                            <svg className="w-12 h-12 text-emerald-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-emerald-300 font-medium">¡Solicitud enviada exitosamente!</p>
                            <p className="text-gray-400 text-sm mt-2">Redirigiendo a WhatsApp...</p>
                        </motion.div>
                    )}

                    {/* Botón de envío - solo mostrar si no hay éxito */}
                    {formStatus !== 'success' && (
                        <button
                            disabled={formStatus === 'submitting'}
                            type="submit"
                            className="w-full py-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-black font-bold uppercase tracking-[0.3em] transition-all duration-500 mt-4 relative overflow-hidden group shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {formStatus === 'submitting' ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                    </svg>
                                    Enviando...
                                </span>
                            ) : (
                                <span className="relative z-10">Solicitar Atención Especial</span>
                            )}
                            {/* Glass Shine Effect */}
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"
                            />
                        </button>
                    )}

                    <p className="text-center text-[9px] text-gray-600 uppercase tracking-widest">
                        Protocolo de Privacidad Internacional • Horizonte 2026
                    </p>
                </form>
            </motion.div>
        </motion.div>
    );
};
