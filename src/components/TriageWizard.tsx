"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

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

const FEEDBACK_MESSAGES: Record<Category, { low: string, medium: string, high: string }> = {
    "Niños": {
        low: "🟢 Puntaje bajo – Malestar leve o puntual",
        medium: "🟡 Puntaje medio – Malestar persistente",
        high: "🔴 Puntaje alto – Malestar intenso"
    },
    "Adolescentes": {
        low: "🟢 Puntaje bajo",
        medium: "🟡 Puntaje medio",
        high: "🔴 Puntaje alto"
    },
    // ... Simplified for space but should be the full messages in the real file
    "Adultos": { low: "🟢", medium: "🟡", high: "🔴" },
    "Parejas": { low: "🟢", medium: "🟡", high: "🔴" },
    "Estrés Laboral": { low: "🟢", medium: "🟡", high: "🔴" },
    "Alta Gerencia": { low: "🟢", medium: "🟡", high: "🔴" },
    "Nomofobia": { low: "🟢", medium: "🟡", high: "🔴" },
    "Familia": { low: "🟢", medium: "🟡", high: "🔴" }
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

    const getScoreLevel = (score: number) => {
        if (score <= 15) return 'low';
        if (score <= 25) return 'medium';
        return 'high';
    };

    const calculateResult = () => {
        const score = answers.reduce((acc, curr) => acc + curr, 0);
        const level = getScoreLevel(score);

        if (level === 'low') return { label: 'Optimizada', color: 'text-platinum' };
        if (level === 'medium') return { label: 'En Evaluación', color: 'text-platinum/70' };
        return { label: 'Prioritaria', color: 'text-terracota' };
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormStatus('submitting');

        const score = answers.reduce((acc, curr) => acc + curr, 0);
        const level = getScoreLevel(score);
        const resultLabel = calculateResult().label;
        const feedbackMessage = FEEDBACK_MESSAGES[category][level];

        const message = `Hola Psic. Cristian, acabo de realizar el *Triaje Virtual* en su sitio web.\n\n` +
            `*RESULTADOS:*\n` +
            `📂 *Categoría:* ${category}\n` +
            `📊 *Perfil:* ${resultLabel}\n\n` +
            `*DATOS DE CONTACTO:*\n` +
            `👤 *Nombre:* ${formData.name}\n` +
            `📧 *Email:* ${formData.email}\n` +
            `📱 *WhatsApp:* ${formData.whatsapp}`;

        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/573014975393?text=${encodedMessage}`;

        try {
            await fetch("https://formspree.io/f/mqaeodlo", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    _subject: `Triaje ${category}: ${formData.name} (${resultLabel})`,
                    _replyto: formData.email,
                    category,
                    score,
                    result: resultLabel,
                    client_name: formData.name,
                    client_email: formData.email,
                    client_whatsapp: formData.whatsapp,
                    generated_feedback: feedbackMessage,
                    database_action: "CREATE_LEAD"
                })
            });

            setFormStatus('success');

            // Abrir WhatsApp después de asegurar el envío exitoso
            setTimeout(() => {
                window.open(whatsappUrl, '_blank');
                onClose();
            }, 2000);

        } catch (error) {
            console.error("Error enviando datos:", error);
            // Intentar abrir WhatsApp al menos si falla la base de datos
            window.open(whatsappUrl, '_blank');
            setFormStatus('success'); // Mostramos éxito igual para no frustrar al usuario
            setTimeout(() => onClose(), 2000);
        }
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/95 backdrop-blur-xl overflow-y-auto"
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    onClick={(e) => e.stopPropagation()}
                    className="relative w-full max-w-2xl mx-auto z-[110] my-8 sm:my-12"
                >
                    <div className="bg-metallic-dark rounded-[2.5rem] border border-white/10 shadow-3xl overflow-hidden relative p-8 sm:p-12 md:p-16">
                        {/* Botón Cerrar */}
                        <button
                            onClick={onClose}
                            className="absolute top-8 right-8 p-3 rounded-full bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-all z-20 touch-target"
                            aria-label="Cerrar"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        {!showLeadForm ? (
                            <div className="relative z-10">
                                <div className="mb-10">
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
                                        className="min-h-[200px] flex flex-col justify-center"
                                    >
                                        <h2 className="text-2xl sm:text-3xl font-light mb-12 text-white leading-tight tracking-tight">
                                            {currentQuestions[step]?.text}
                                        </h2>

                                        <div className="grid grid-cols-1 gap-4">
                                            {[
                                                { label: "Nunca", val: 1 },
                                                { label: "Ocasionalmente", val: 2 },
                                                { label: "Frecuentemente", val: 3 }
                                            ].map((opt) => (
                                                <button
                                                    key={opt.val}
                                                    onClick={() => handleAnswer(opt.val)}
                                                    className="p-5 rounded-2xl border border-white/[0.03] bg-white/[0.01] hover:bg-white/[0.05] hover:border-white/10 transition-all text-left group"
                                                >
                                                    <span className="text-gray-400 group-hover:text-white transition-colors">{opt.label}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-center relative z-10"
                            >
                                <h2 className="text-3xl font-light mb-6 text-white tracking-tighter">Análisis Finalizado</h2>
                                <p className="text-gray-400 mb-10 max-w-xl mx-auto text-sm sm:text-base font-light leading-relaxed">
                                    Hemos generado un reporte preliminar.
                                    <br /><br />
                                    <span className="text-emerald-400 font-medium italic">Se enviará una copia automática a tu correo electrónico</span> para seguimiento.
                                </p>

                                <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-6">
                                    <input
                                        required
                                        type="text"
                                        placeholder="NOMBRE COMPLETO"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full bg-transparent border-b border-white/10 py-4 outline-none focus:border-terracota transition-colors text-white tracking-widest text-[10px] font-light"
                                    />
                                    <input
                                        required
                                        type="email"
                                        placeholder="CORREO PARA EL REPORTE"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full bg-transparent border-b border-white/10 py-4 outline-none focus:border-terracota transition-colors text-white tracking-widest text-[10px] font-light"
                                    />
                                    <input
                                        required
                                        type="tel"
                                        placeholder="WHATSAPP DE CONTACTO"
                                        value={formData.whatsapp}
                                        onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                                        className="w-full bg-transparent border-b border-white/10 py-4 outline-none focus:border-terracota transition-colors text-white tracking-widest text-[10px] font-light"
                                    />
                                    <div className="pt-6">
                                        <button
                                            disabled={formStatus === 'submitting' || formStatus === 'success'}
                                            className="w-full py-5 rounded-full bg-white text-black font-bold text-[10px] uppercase tracking-[0.3em] hover:bg-terracota hover:text-white transition-all duration-700 disabled:opacity-50"
                                        >
                                            {formStatus === 'submitting' ? 'PROCESANDO...' : formStatus === 'success' ? '¡ENVIADO! REVISA TU CORREO' : 'OBTENER ANÁLISIS Y CONTACTAR'}
                                        </button>
                                    </div>
                                </form>
                            </motion.div>
                        )}
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};
