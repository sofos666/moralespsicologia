"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Category = 'Niños' | 'Adolescentes' | 'Adultos' | 'Parejas' | 'Estrés Laboral' | 'Alta Gerencia' | 'Nomofobia' | 'Familia';

interface Question {
    id: number;
    text: string;
}

const QUESTIONS: Record<Category, Question[]> = {
    "Niños": [
        { id: 1, text: "¿El niño/a presenta dificultades persistentes para seguir instrucciones simples?" },
        { id: 2, text: "¿Ha notado explosiones de ira o rabietas de difícil manejo?" },
        { id: 3, text: "¿Muestra timidez extrema o retraimiento en situaciones sociales nuevas?" },
        { id: 4, text: "¿Presenta problemas frecuentes para conciliar o mantener el sueño?" },
        { id: 5, text: "¿Expresa miedos intensos que interfieren con su vida cotidiana?" },
        { id: 6, text: "¿Se han reportado dificultades significativas en su rendimiento escolar?" },
        { id: 7, text: "¿Nota torpeza motriz o dificultades en la coordinación física?" },
        { id: 8, text: "¿Tiene problemas recurrentes para interactuar o jugar con sus pares?" },
        { id: 9, text: "¿Muestra cambios drásticos o selectividad extrema en su alimentación?" },
        { id: 10, text: "¿El juego suele ser repetitivo o carece de elementos imaginativos?" }
    ],
    "Adolescentes": [
        { id: 1, text: "¿Ha notado un aislamiento social marcado o rechazo a salir de casa?" },
        { id: 2, text: "¿Presenta cambios de humor bruscos e inexplicables con frecuencia?" },
        { id: 3, text: "¿Muestra actitudes de rebeldía o desafío constante a la autoridad?" },
        { id: 4, text: "¿Existe sospecha o evidencia del uso de sustancias psicoactivas o alcohol?" },
        { id: 5, text: "¿Se ha visto afectado su rendimiento académico de manera inusual?" },
        { id: 6, text: "¿Expresa insatisfacción constante con su autopercepción o imagen física?" },
        { id: 7, text: "¿Depende de manera excesiva de las redes sociales para su validación?" },
        { id: 8, text: "¿Ha invertido sus patrones de sueño (permanece despierto de noche)?" },
        { id: 9, text: "¿Se muestra irritable o reactivo ante conversaciones cotidianas?" },
        { id: 10, text: "¿Expresa falta de interés o desesperanza respecto a sus metas futuras?" }
    ],
    "Adultos": [
        { id: 1, text: "¿Siente una carga de ansiedad o preocupación difícil de controlar?" },
        { id: 2, text: "¿Ha experimentado episodios recurrentes de tristeza profunda o desánimo?" },
        { id: 3, text: "¿Siente que su nivel de vitalidad y energía ha disminuido notablemente?" },
        { id: 4, text: "¿Le resulta difícil mantener la concentración en sus tareas habituales?" },
        { id: 5, text: "¿Tiene dificultades para manejar la frustración ante imprevistos?" },
        { id: 6, text: "¿Siente que carece de una red de apoyo social o familiar sólida?" },
        { id: 7, text: "¿Presenta síntomas físicos (dolores, tensión) sin explicación médica clara?" },
        { id: 8, text: "¿Ha notado cambios significativos en su apetito o peso recientemente?" },
        { id: 9, text: "¿Experimenta sentimientos persistentes de culpa o inutilidad?" },
        { id: 10, text: "¿Muestra una visión pesimista o desesperanzada de su futuro?" }
    ],
    "Parejas": [
        { id: 1, text: "¿Considera que la calidad de la comunicación con su pareja es deficiente?" },
        { id: 2, text: "¿Siente una desconexión en la intimidad física o emocional?" },
        { id: 3, text: "¿Resulta imposible llegar a acuerdos satisfactorios en los conflictos?" },
        { id: 4, text: "¿Sienten que ya no comparten proyectos o metas de vida comunes?" },
        { id: 5, text: "¿Ha disminuido el respeto mutuo durante las discusiones?" },
        { id: 6, text: "¿Existen desacuerdos constantes sobre el manejo de las finanzas?" },
        { id: 7, text: "¿Han dejado de dedicar tiempo de calidad exclusivamente para los dos?" },
        { id: 8, text: "¿Siente que la confianza se ha visto vulnerada de alguna manera?" },
        { id: 9, text: "¿Predomina la crítica negativa sobre el reconocimiento mutuo?" },
        { id: 10, text: "¿Siente que sus metas individuales chocan con las de su pareja?" }
    ],
    "Estrés Laboral": [
        { id: 1, text: "¿Se siente exhausto física y mentalmente al terminar su jornada?" },
        { id: 2, text: "¿Ha desarrollado una actitud cínica o distante hacia sus tareas?" },
        { id: 3, text: "¿Siente irritabilidad o impaciencia constante con sus colegas?" },
        { id: 4, text: "¿Presenta olvidos frecuentes o falta de atención en detalles laborales?" },
        { id: 5, text: "¿Ha perdido la motivación que antes sentía por su profesión?" },
        { id: 6, text: "¿Sufre de tensiones musculares o dolores de cabeza por el trabajo?" },
        { id: 7, text: "¿Le resulta imposible desconectar mentalmente fuera del horario laboral?" },
        { id: 8, text: "¿Siente que su trabajo no está logrando los resultados esperados?" },
        { id: 9, text: "¿Ha faltado al trabajo o ha deseado no ir de manera recurrente?" },
        { id: 10, text: "¿Siente que sus esfuerzos no son reconocidos por la organización?" }
    ],
    "Alta Gerencia": [
        { id: 1, text: "¿Se siente abrumado por la responsabilidad de la toma de decisiones?" },
        { id: 2, text: "¿Experimenta el sentimiento de 'soledad del líder' en su cargo?" },
        { id: 3, text: "¿Le cuesta manejar crisis bajo presión sin afectar su equilibrio personal?" },
        { id: 4, text: "¿Siente que el trabajo ha invadido totalmente su espacio familiar?" },
        { id: 5, text: "¿El sueño se ve interrumpido por pensamientos sobre la operación?" },
        { id: 6, text: "¿Se nota más irritable o autoritario de lo habitual con su equipo?" },
        { id: 7, text: "¿Llega a sentir que no es tan capaz como los demás perciben?" },
        { id: 8, text: "¿Siente una necesidad excesiva de control sobre cada detalle?" },
        { id: 9, text: "¿Siente que su resiliencia emocional está llegando al límite?" },
        { id: 10, text: "¿Ha notado un impacto negativo de la carga gerencial en su salud física?" }
    ],
    "Nomofobia": [
        { id: 1, text: "¿Siente la necesidad imperiosa de revisar el celular al despertar?" },
        { id: 2, text: "¿Experimenta ansiedad o inquietud si no tiene conexión a internet?" },
        { id: 3, text: "¿Interrumpe conversaciones o comidas reales para mirar la pantalla?" },
        { id: 4, text: "¿Siente que procrastina tareas importantes por estar en el móvil?" },
        { id: 5, text: "¿Ha descuidado sus horas de sueño o higiene por el uso de dispositivos?" },
        { id: 6, text: "¿Usa el celular como la vía principal para evadir sus problemas?" },
        { id: 7, text: "¿Ha intentado reducir el uso de pantallas sin éxito en repetidas ocasiones?" },
        { id: 8, text: "¿Prefiere la interacción digital sobre el encuentro físico personal?" },
        { id: 9, text: "¿Siente aislamiento de su entorno cercano por su actividad digital?" },
        { id: 10, text: "¿Considera que invierte demasiado tiempo en navegación no productiva?" }
    ],
    "Familia": [
        { id: 1, text: "¿Son frecuentes las discusiones que terminan sin resolverse?" },
        { id: 2, text: "¿Siente que hay miembros de la familia que se aíslan o no participan?" },
        { id: 3, text: "¿Se respetan los límites y la privacidad de cada miembro?" },
        { id: 4, text: "¿Existen conflictos recurrentes por el manejo de las finanzas o tareas del hogar?" },
        { id: 5, text: "¿Se siente escuchado y comprendido cuando expresa sus sentimientos?" },
        { id: 6, text: "¿Han disminuido los momentos de disfrute o tiempo de calidad compartido?" },
        { id: 7, text: "¿Existen alianzas o coaliciones que excluyen a otros miembros?" },
        { id: 8, text: "¿Se recurre a gritos o faltas de respeto durante los desacuerdos?" },
        { id: 9, text: "¿Siente que las reglas son inconsistentes o poco claras para los hijos?" },
        { id: 10, text: "¿Hay temas importantes que se evitan por 'miedo' a la reacción de otros?" }
    ]
};

interface TriageWizardProps {
    category: Category;
    onClose: () => void;
}

export const TriageWizard: React.FC<TriageWizardProps> = ({ category, onClose }) => {
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState<number[]>([]);
    const [showLeadForm, setShowLeadForm] = useState(false);
    const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [formData, setFormData] = useState({ name: '', email: '', whatsapp: '' });

    const currentQuestions = QUESTIONS[category] || [];
    const progress = ((step) / currentQuestions.length) * 100;

    const handleAnswer = (value: number) => {
        const newAnswers = [...answers, value];
        setAnswers(newAnswers);
        if (step < currentQuestions.length - 1) {
            setStep(step + 1);
        } else {
            setShowLeadForm(true);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormStatus('submitting');

        const result = calculateResult();
        const score = answers.reduce((acc, curr) => acc + curr, 0);


        // Preparar mensaje de WhatsApp
        const message = `Hola Psic. Cristian, acabo de realizar el *Triaje Virtual* en su sitio web.\n\n` +
            `*RESULTADOS:*\n` +
            `📂 *Categoría:* ${category}\n` +
            `📊 *Perfil:* ${result.label}\n\n` +
            `*DATOS DE CONTACTO:*\n` +
            `👤 *Nombre:* ${formData.name}\n` +
            `📧 *Email:* ${formData.email}\n` +
            `📱 *WhatsApp:* ${formData.whatsapp}`;

        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/573014975393?text=${encodedMessage}`;

        // Prioridad 1: Abrir WhatsApp inmediatamente
        window.open(whatsappUrl, '_blank');

        try {
            // Prioridad 2: Intentar respaldo en Formspree (sin bloquear al usuario)
            await fetch("https://formspree.io/f/mqaeodlo", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    _subject: `Triaje Virtual: ${category} - ${formData.name}`,
                    category,
                    score,
                    result: result.label,
                    ...formData
                })
            });
        } catch (error) {
            // Si falla el correo, no importa, ya el usuario está en WhatsApp
            console.error("Error silencioso en Formspree:", error);
        }

        setFormStatus('success');
        setTimeout(() => onClose(), 1000);
    };

    const calculateResult = () => {
        const total = answers.reduce((acc, curr) => acc + curr, 0);
        if (total <= 15) return { label: 'Optimizada', color: 'text-platinum' };
        if (total <= 25) return { label: 'En Evaluación', color: 'text-platinum/70' };
        return { label: 'Prioritaria', color: 'text-terracota' };
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-10 bg-black/90 backdrop-blur-sm overflow-y-auto"
        >
            <div className="bg-metallic-dark w-full max-w-4xl rounded-[2rem] sm:rounded-[3rem] p-6 sm:p-10 md:p-20 relative overflow-hidden my-auto">
                {/* Background lighting effect */}
                <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-white/[0.01] blur-[150px] rounded-full pointer-events-none" />

                <button onClick={onClose} className="absolute top-6 right-6 sm:top-10 sm:right-10 text-gray-500 hover:text-white transition-all hover:scale-110 z-10">
                    <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>

                {!showLeadForm ? (
                    <div className="relative z-10">
                        <div className="mb-10 sm:mb-16">
                            <span className="text-terracota text-[10px] font-bold uppercase tracking-[0.5em] block mb-4">{category}</span>
                            <div className="w-full h-[1px] bg-white/5 relative">
                                <motion.div
                                    className="absolute top-0 left-0 h-full bg-terracota/50"
                                    animate={{ width: `${progress}%` }}
                                    transition={{ duration: 0.8, ease: "circOut" }}
                                />
                            </div>
                        </div>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={step}
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -20, opacity: 0 }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                                className="min-h-[250px] sm:min-h-[300px] flex flex-col justify-center"
                            >
                                <h2 className="text-2xl sm:text-3xl md:text-5xl font-light mb-10 sm:mb-16 text-white leading-tight tracking-tight">
                                    {currentQuestions[step]?.text}
                                </h2>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                                    {[
                                        { label: "Nunca", val: 1 },
                                        { label: "Ocasionalmente", val: 2 },
                                        { label: "Frecuentemente", val: 3 }
                                    ].map((opt) => (
                                        <button
                                            key={opt.val}
                                            onClick={() => handleAnswer(opt.val)}
                                            className="group relative p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-white/[0.03] bg-white/[0.01] hover:bg-white/[0.05] hover:border-white/10 transition-all duration-500 text-center overflow-hidden"
                                        >
                                            <span className="relative z-10 text-gray-400 group-hover:text-white transition-colors duration-500 font-light tracking-wide text-sm sm:text-base">{opt.label}</span>
                                            <div className="absolute inset-0 bg-gradient-to-t from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        <p className="mt-8 sm:mt-12 text-[8px] sm:text-[9px] text-gray-600 uppercase tracking-widest font-medium text-center opacity-50">
                            Protocolo de Evaluación Confidencial • Psic. Cristian Morales
                        </p>
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center relative z-10"
                    >
                        <h2 className="text-3xl sm:text-4xl md:text-6xl font-light mb-4 sm:mb-6 text-white tracking-tighter">Análisis Finalizado</h2>
                        <p className="text-gray-400 mb-8 sm:mb-12 max-w-xl mx-auto text-base sm:text-lg font-light leading-relaxed">
                            Detectamos un perfil <span className={calculateResult().color + " font-medium"}>{calculateResult().label}</span>.
                            Para acceder a su hoja de ruta personalizada y reservar su espacio exclusivo, proporcione sus credenciales de contacto.
                        </p>

                        <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-6 sm:space-y-8">
                            <div className="relative">
                                <input
                                    required
                                    type="text"
                                    placeholder="NOMBRE COMPLETO"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full bg-transparent border-b border-white/10 py-3 sm:py-4 outline-none focus:border-terracota transition-colors text-white tracking-widest text-[10px] sm:text-xs font-light"
                                />
                            </div>
                            <div className="relative">
                                <input
                                    required
                                    type="email"
                                    placeholder="CORREO INSTITUCIONAL O PERSONAL"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full bg-transparent border-b border-white/10 py-3 sm:py-4 outline-none focus:border-terracota transition-colors text-white tracking-widest text-[10px] sm:text-xs font-light"
                                />
                            </div>
                            <div className="relative">
                                <input
                                    required
                                    type="tel"
                                    placeholder="WHATSAPP DE CONTACTO"
                                    value={formData.whatsapp}
                                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                                    className="w-full bg-transparent border-b border-white/10 py-3 sm:py-4 outline-none focus:border-terracota transition-colors text-white tracking-widest text-[10px] sm:text-xs font-light"
                                />
                            </div>
                            <div className="pt-4 sm:pt-8">
                                <button
                                    disabled={formStatus === 'submitting' || formStatus === 'success'}
                                    className="w-full py-4 sm:py-6 rounded-full bg-white text-black font-bold text-[10px] sm:text-xs uppercase tracking-[0.3em] hover:bg-terracota hover:text-white transition-all duration-700 shadow-2xl hover:shadow-terracota/20 disabled:opacity-50"
                                >
                                    {formStatus === 'submitting' ? 'Enviando...' : formStatus === 'success' ? '¡Enviado!' : 'Solicitar Hoja de Ruta'}
                                </button>
                            </div>
                            {formStatus === 'error' && (
                                <p className="text-terracota text-[10px] uppercase tracking-widest mt-4">Error al enviar. Intente de nuevo.</p>
                            )}
                        </form>
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
};
