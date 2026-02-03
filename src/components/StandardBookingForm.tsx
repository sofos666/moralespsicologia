"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

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
        modality: 'Presencial',
        motive: ''
    });

    const [formStatus, setFormStatus] = useState<FormStatus>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormStatus('submitting');
        setErrorMessage('');

        try {
            const response = await fetch("/api/automation", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    formType: 'presencial',
                    name: formData.name,
                    email: formData.email,
                    whatsapp: formData.whatsapp,
                    category: therapyTitle || 'Psicoterapia General',
                    message: formData.motive,
                    modality: formData.modality
                })
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || "Error en el servidor de envíos.");
            }

            setFormStatus('success');

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
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="fixed inset-0 z-[100] flex items-start sm:items-center justify-center bg-black/95 backdrop-blur-xl overflow-y-auto overscroll-contain"
                style={{
                    minHeight: 'calc(100vh)',
                    paddingTop: 'max(1rem, env(safe-area-inset-top))',
                    paddingBottom: 'max(1rem, env(safe-area-inset-bottom))',
                    paddingLeft: 'max(1rem, env(safe-area-inset-left))',
                    paddingRight: 'max(1rem, env(safe-area-inset-right))'
                }}
            >
                {/* Modal Container */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    onClick={(e) => e.stopPropagation()}
                    className="relative w-full max-w-lg mx-auto z-[110] my-4 sm:my-8"
                >
                    <div className="bg-metallic-dark rounded-[2.5rem] p-8 md:p-12 relative border border-white/10 shadow-2xl">
                        {/* Botón Cerrar */}
                        <button
                            onClick={onClose}
                            className="absolute top-8 right-8 text-gray-400 hover:text-white transition-all p-3 z-20 bg-white/5 rounded-full touch-target hover:scale-110"
                            aria-label="Cerrar"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <div className="text-center mb-8">
                            <span className="text-solar text-[10px] font-bold uppercase tracking-[0.4em] mb-3 block">Agendamiento Directo</span>
                            <h2 className="text-3xl font-light text-white tracking-tight">Solicitar Cita</h2>
                            {therapyTitle && <p className="text-solar/70 text-sm mt-2 font-medium italic">{therapyTitle}</p>}
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-4">
                                <div className="space-y-1">
                                    <label className="text-[10px] uppercase tracking-widest text-gray-500 ml-4 font-bold">Nombre Completo</label>
                                    <input
                                        required
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-4 px-6 text-white outline-none focus:border-solar/50 transition-all text-sm font-light"
                                        placeholder="Su nombre"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] uppercase tracking-widest text-gray-500 ml-4 font-bold">WhatsApp Contacto</label>
                                    <input
                                        required
                                        type="tel"
                                        value={formData.whatsapp}
                                        onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                                        className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-4 px-6 text-white outline-none focus:border-solar/50 transition-all text-sm font-light"
                                        placeholder="+57..."
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-[10px] uppercase tracking-widest text-gray-500 ml-4 font-bold">Correo Electrónico</label>
                                <input
                                    required
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-4 px-6 text-white outline-none focus:border-solar/50 transition-all text-sm font-light"
                                    placeholder="email@ejemplo.com"
                                />
                            </div>

                            <div className="space-y-3">
                                <label className="text-[10px] uppercase tracking-widest text-gray-500 ml-4 block font-bold">Modalidad de Atención</label>
                                <div className="grid grid-cols-2 gap-4">
                                    {['Presencial', 'Virtual'].map((mode) => (
                                        <button
                                            key={mode}
                                            type="button"
                                            onClick={() => setFormData({ ...formData, modality: mode })}
                                            className={`py-4 rounded-2xl text-xs font-bold tracking-widest transition-all duration-300 border ${formData.modality === mode
                                                ? 'bg-solar text-black border-solar shadow-lg shadow-solar/20 scale-[1.02]'
                                                : 'bg-white/[0.02] text-gray-400 border-white/5 hover:border-white/20'
                                                }`}
                                        >
                                            {mode.toUpperCase()}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-[10px] uppercase tracking-widest text-gray-500 ml-4 font-bold">Motivo de Consulta</label>
                                <textarea
                                    required
                                    value={formData.motive}
                                    onChange={(e) => setFormData({ ...formData, motive: e.target.value })}
                                    rows={3}
                                    className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-4 px-6 text-white outline-none focus:border-solar/50 transition-all text-sm font-light resize-none"
                                    placeholder="Describa brevemente su situación..."
                                />
                            </div>

                            {/* Estados de envío */}
                            {formStatus === 'error' && (
                                <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-4 text-center">
                                    <p className="text-red-400 text-[10px] uppercase tracking-widest font-bold">Error en el envío</p>
                                    <p className="text-red-300/80 text-[9px] mt-1">{errorMessage}</p>
                                    <p className="text-red-200 text-[8px] mt-2 italic">*Por favor intente nuevamente o contacte por WhatsApp directamente.</p>
                                </div>
                            )}

                            {formStatus === 'success' && (
                                <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-4 text-center animate-pulse">
                                    <p className="text-emerald-400 text-[10px] uppercase tracking-widest font-bold">¡Solicitud Procesada!</p>
                                    <p className="text-emerald-300/60 text-[9px] mt-1 italic">Redirigiendo a WhatsApp del Psicólogo...</p>
                                </div>
                            )}

                            {formStatus !== 'success' && (
                                <button
                                    disabled={formStatus === 'submitting'}
                                    type="submit"
                                    className="w-full py-5 rounded-full bg-solar text-black font-bold uppercase tracking-[0.3em] transition-all duration-500 mt-2 relative overflow-hidden group shadow-xl hover:shadow-solar/30 disabled:opacity-50"
                                >
                                    <span className="relative z-10 text-xs tracking-[0.4em]">
                                        {formStatus === 'submitting' ? 'Procesando...' : 'Confirmar Solicitud'}
                                    </span>
                                </button>
                            )}

                            <p className="text-center text-[9px] text-gray-600 uppercase tracking-widest mt-6 opacity-40">
                                Psic. Cristian Morales • Medellín • 2026
                            </p>
                        </form>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};
