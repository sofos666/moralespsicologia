"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface StandardBookingFormProps {
    onClose: () => void;
    therapyTitle?: string;
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export const StandardBookingForm: React.FC<StandardBookingFormProps> = ({ onClose, therapyTitle }) => {
    const [formData, setFormData] = useState({
        name: '',
        whatsapp: '',
        email: '',
        modality: 'Presencial', // Valor por defecto
        motive: ''
    });

    const [formStatus, setFormStatus] = useState<FormStatus>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormStatus('submitting');
        setErrorMessage('');

        try {
            // Envío a Formspree (Mismo endpoint que el virtual para centralizar lead)
            const response = await fetch("https://formspree.io/f/mqaeodlo", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    _subject: `Nueva Cita (${formData.modality}): ${formData.name}`,
                    servicio: therapyTitle,
                    ...formData
                })
            });

            if (!response.ok) {
                throw new Error("Error en el envío. Por favor intente nuevamente.");
            }

            setFormStatus('success');

            // Estructurar el mensaje para WhatsApp
            const message = `Hola Psic. Cristian, deseo agendar una cita para *${therapyTitle || 'Psicoterapia'}*.\n\n` +
                `*DATOS DE CONTACTO:*\n` +
                `👤 *Nombre:* ${formData.name}\n` +
                `📱 *WhatsApp:* ${formData.whatsapp}\n` +
                `📧 *Email:* ${formData.email}\n` +
                `📍 *Modalidad:* ${formData.modality.toUpperCase()}\n\n` +
                `*MOTIVO DE CONSULTA:*\n` +
                `${formData.motive}`;

            const encodedMessage = encodeURIComponent(message);
            const whatsappUrl = `https://wa.me/573014975393?text=${encodedMessage}`;

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
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl overflow-y-auto"
        >
            <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                className="bg-metallic-dark w-full max-w-lg rounded-[2.5rem] p-6 md:p-8 relative border border-white/10 shadow-2xl my-4"
            >
                {/* Botón Cerrar */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors p-2 z-20 bg-white/5 rounded-full"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="text-center mb-6">
                    <span className="text-solar text-[10px] font-bold uppercase tracking-[0.4em] mb-2 block">Agendamiento Directo</span>
                    <h2 className="text-2xl md:text-3xl font-light text-white tracking-tight">Solicitar Cita</h2>
                    {therapyTitle && <p className="text-solar/70 text-sm mt-1 font-medium italic">{therapyTitle}</p>}
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-[10px] uppercase tracking-widest text-gray-500 ml-4">Nombre Completo</label>
                            <input
                                required
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-3 px-6 text-white outline-none focus:border-solar/50 transition-all text-sm font-light"
                                placeholder="Su nombre"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] uppercase tracking-widest text-gray-500 ml-4">WhatsApp Contacto</label>
                            <input
                                required
                                type="tel"
                                value={formData.whatsapp}
                                onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                                className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-3 px-6 text-white outline-none focus:border-solar/50 transition-all text-sm font-light"
                                placeholder="+57..."
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-[10px] uppercase tracking-widest text-gray-500 ml-4">Correo Electrónico</label>
                        <input
                            required
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-3 px-6 text-white outline-none focus:border-solar/50 transition-all text-sm font-light"
                            placeholder="email@ejemplo.com"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-gray-500 ml-4 block mb-2">Modalidad de Atención</label>
                        <div className="grid grid-cols-2 gap-4">
                            {['Presencial', 'Virtual'].map((mode) => (
                                <button
                                    key={mode}
                                    type="button"
                                    onClick={() => setFormData({ ...formData, modality: mode })}
                                    className={`py-3 rounded-2xl text-xs font-bold tracking-widest transition-all duration-300 border ${formData.modality === mode
                                        ? 'bg-solar text-black border-solar shadow-lg shadow-solar/20'
                                        : 'bg-white/[0.02] text-gray-400 border-white/5 hover:border-white/20'
                                        }`}
                                >
                                    {mode.toUpperCase()}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-[10px] uppercase tracking-widest text-gray-500 ml-4">Motivo de Consulta</label>
                        <textarea
                            required
                            value={formData.motive}
                            onChange={(e) => setFormData({ ...formData, motive: e.target.value })}
                            rows={3}
                            className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-3 px-6 text-white outline-none focus:border-solar/50 transition-all text-sm font-light resize-none"
                            placeholder="Describa brevemente su situación..."
                        />
                    </div>

                    {/* Estados de envío */}
                    {formStatus === 'error' && (
                        <p className="text-red-400 text-[10px] text-center uppercase tracking-widest animate-pulse">{errorMessage}</p>
                    )}

                    {formStatus === 'success' && (
                        <p className="text-emerald-400 text-[10px] text-center uppercase tracking-widest font-bold">¡Solicitud Procesada! Redirigiendo...</p>
                    )}

                    {formStatus !== 'success' && (
                        <button
                            disabled={formStatus === 'submitting'}
                            type="submit"
                            className="w-full py-4 rounded-full bg-solar text-black font-bold uppercase tracking-[0.3em] transition-all duration-500 mt-2 relative overflow-hidden group shadow-xl hover:shadow-solar/30"
                        >
                            <span className="relative z-10 text-xs">
                                {formStatus === 'submitting' ? 'Procesando...' : 'Confirmar Solicitud'}
                            </span>
                        </button>
                    )}

                    <p className="text-center text-[8px] text-gray-600 uppercase tracking-widest mt-4">
                        Psic. Cristian Morales • Medellín • 2026
                    </p>
                </form>
            </motion.div>
        </motion.div>
    );
};
