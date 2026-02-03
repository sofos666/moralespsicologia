"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

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
            const response = await fetch("/api/automation", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    formType: 'virtual',
                    name: formData.name,
                    email: formData.email,
                    whatsapp: formData.whatsapp,
                    category: 'Atención Virtual Internacional',
                    message: formData.motive,
                    nationality: formData.nationality,
                    timezone: formData.timezone
                })
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || "Error en el servidor de envíos.");
            }

            setFormStatus('success');

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
                className="fixed inset-0 z-[100] flex items-start sm:items-center justify-center bg-black/90 backdrop-blur-xl overflow-y-auto overscroll-contain"
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
                            <span className="text-solar text-[10px] font-bold uppercase tracking-[0.4em] mb-3 block">Reserva Exclusiva</span>
                            <h2 className="text-3xl font-light text-white tracking-tight">Atención Virtual</h2>
                            <p className="text-gray-400 mt-2 text-xs font-light px-4 leading-relaxed">Internacional • Protocolo de Privacidad</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 gap-4">
                                <div className="space-y-1">
                                    <label className="text-[10px] uppercase tracking-widest text-gray-500 ml-4 font-bold">Nombre Completo</label>
                                    <input
                                        required
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-4 px-6 text-white outline-none focus:border-solar/50 transition-all text-sm font-light"
                                        placeholder="Ej. Cristian Morales"
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

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-[10px] uppercase tracking-widest text-gray-500 ml-4 font-bold">Nacionalidad</label>
                                    <input
                                        required
                                        type="text"
                                        value={formData.nationality}
                                        onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
                                        className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-4 px-6 text-white outline-none focus:border-solar/50 transition-all text-sm font-light"
                                        placeholder="Ej. Colombiana"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] uppercase tracking-widest text-gray-500 ml-4 font-bold">Zona Horaria</label>
                                    <select
                                        required
                                        value={formData.timezone}
                                        onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
                                        className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-4 px-6 text-white outline-none focus:border-solar/50 transition-all text-[11px] appearance-none"
                                    >
                                        <option value="" disabled className="bg-black">Seleccione...</option>
                                        <option value="GMT-5 (Colombia, Perú, NY)" className="bg-black">GMT-5 (Col, Per, NY)</option>
                                        <option value="GMT-6 (CDMX, Centroamérica)" className="bg-black">GMT-6 (CDMX)</option>
                                        <option value="GMT-3 (Argentina, Chile, Uruguay)" className="bg-black">GMT-3 (Arg, Chi)</option>
                                        <option value="GMT+1 (España, Europa Central)" className="bg-black">GMT+1 (España)</option>
                                        <option value="OTRA" className="bg-black">Otra zona / No sé</option>
                                    </select>
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
                                    placeholder="¿Cómo puedo ayudarle?"
                                />
                            </div>

                            {/* Estados de envío */}
                            {formStatus === 'error' && (
                                <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-4 text-center">
                                    <p className="text-red-400 text-[10px] uppercase tracking-widest font-bold">Error en el envío</p>
                                    <p className="text-red-300/80 text-[9px] mt-1">{errorMessage}</p>
                                </div>
                            )}

                            {formStatus === 'success' && (
                                <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-4 text-center animate-pulse">
                                    <p className="text-emerald-400 text-[10px] uppercase tracking-widest font-bold">¡Enviado!</p>
                                    <p className="text-emerald-300/60 text-[9px] mt-1 italic">Redirigiendo a WhatsApp...</p>
                                </div>
                            )}

                            {formStatus !== 'success' && (
                                <button
                                    disabled={formStatus === 'submitting'}
                                    type="submit"
                                    className="w-full py-5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-black font-bold uppercase tracking-[0.3em] transition-all duration-500 mt-2 relative overflow-hidden group shadow-xl"
                                >
                                    <span className="relative z-10 text-xs tracking-[0.4em]">
                                        {formStatus === 'submitting' ? 'Procesando...' : 'Aplicar ahora'}
                                    </span>
                                </button>
                            )}

                            <p className="text-center text-[9px] text-gray-600 uppercase tracking-widest mt-6 opacity-40 leading-relaxed font-bold">
                                Horizonte 2026 • Privacidad Internacional
                            </p>
                        </form>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};
