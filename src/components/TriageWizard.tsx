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

// Objeto de Respuestas Dinámicas Detalladas
const FEEDBACK_MESSAGES: Record<Category, { low: string, medium: string, high: string }> = {
    "Niños": {
        low: "🟢 Puntaje bajo – Malestar leve o puntual\n\nGracias por responder el formulario.\n\nTus respuestas indican que el niño o la niña presenta algunas dificultades propias de su etapa de desarrollo, pero en general cuenta con recursos emocionales y relacionales que le permiten desenvolverse en su vida diaria.\n\nEs normal que en ciertos momentos aparezcan cambios en el comportamiento, el sueño o el estado de ánimo. Aun así, prestar atención a estas señales puede ayudar a acompañarlo de manera más tranquila y oportuna.\n\nUna orientación psicológica puede servir como espacio preventivo para comprender mejor lo que está viviendo y fortalecer su bienestar emocional.",
        medium: "🟡 Puntaje medio – Malestar persistente\n\nGracias por completar el formulario.\n\nLas respuestas sugieren que el niño o la niña está atravesando dificultades que se repiten y que pueden estar afectando su comportamiento, su estado emocional o su relación con otros niños y adultos.\n\nMuchas veces, cuando los niños no pueden expresar con palabras lo que sienten, esto aparece en forma de conductas, miedos o problemas escolares.\n\nUn espacio psicológico puede ayudar a comprender qué está expresando el niño y a encontrar formas más claras y tranquilas de acompañarlo en este momento.",
        high: "🔴 Puntaje alto – Malestar intenso\n\nGracias por responder el formulario.\n\nA partir de tus respuestas, se observa que el niño o la niña está atravesando un malestar importante que está interfiriendo de manera clara en su bienestar, su conducta o su vida cotidiana.\n\nEste tipo de situaciones no habla de fallas en la crianza ni de 'problemas graves', sino de la necesidad de un acompañamiento más cercano y especializado.\n\nBuscar apoyo psicológico en este momento puede ser fundamental para ayudar al niño a expresar lo que le ocurre y brindarle un entorno más seguro y comprensible."
    },
    "Adolescentes": {
        low: "🟢 Puntaje bajo\n\nGracias por completar el formulario.\n\nLas respuestas indican que el adolescente presenta inquietudes o cambios emocionales propios de esta etapa, sin que actualmente interfieran de manera significativa en su vida diaria.\n\nLa adolescencia es un momento de transformaciones, y es común que surjan dudas, cambios de humor o necesidad de mayor espacio personal.\n\nUn espacio de orientación puede servir para acompañar este proceso y favorecer una comunicación más clara y tranquila.",
        medium: "🟡 Puntaje medio\n\nGracias por responder el formulario.\n\nTus respuestas muestran que el adolescente está atravesando un malestar que se mantiene en el tiempo, como aislamiento, irritabilidad, desmotivación o conflictos frecuentes.\n\nEn muchos casos, esto aparece cuando no se encuentra un lugar seguro para hablar de lo que se siente o se piensa.\n\nUn espacio psicológico puede ofrecer una escucha sin juicios, ayudando al adolescente a comprender lo que le pasa y a encontrar nuevas formas de expresarse.",
        high: "🔴 Puntaje alto\n\nGracias por completar el formulario.\n\nLas respuestas indican que el adolescente podría estar atravesando un momento emocionalmente difícil, que afecta su bienestar, sus relaciones o su desempeño cotidiano.\n\nPasar por esto no significa debilidad ni fracaso; muchas veces es la forma en que se expresa un malestar que ha sido sostenido en silencio.\n\nContar con acompañamiento psicológico puede ser muy importante para brindar contención y ayudar a atravesar este momento de una manera más cuidada."
    },
    "Adultos": {
        low: "🟢 Puntaje bajo\n\nGracias por responder el formulario.\n\nTus respuestas muestran la presencia de preocupaciones o malestares puntuales, relacionados con situaciones específicas de tu vida actual.\n\nAunque no parecen dominar tu día a día, prestarles atención puede ayudarte a comprender mejor lo que estás atravesando.\n\nUn espacio de consulta puede servir como un lugar para pensar y ordenar aquello que hoy aparece de forma ocasional.",
        medium: "🟡 Puntaje medio\n\nGracias por completar el formulario.\n\nLas respuestas indican un malestar que se ha venido repitiendo y que empieza a generar cansancio emocional, preocupación o dificultad para disfrutar la vida cotidiana.\n\nEs común que en estos casos se sienta que se piensa mucho sin encontrar una salida clara.\n\nUn proceso psicológico puede ayudarte a poner en palabras lo que te pasa y a aliviar este desgaste progresivo.",
        high: "🔴 Puntaje alto\n\nGracias por responder el formulario.\n\nA partir de tus respuestas, se observa un malestar intenso que está afectando tu bienestar emocional, tu energía o tus relaciones.\n\nEsto no significa que 'no puedas' o que estés fallando, sino que has llegado a un punto donde no es fácil seguir sosteniendo todo en soledad.\n\nBuscar apoyo psicológico puede ofrecerte un espacio de contención y claridad para atravesar este momento con mayor alivio."
    },
    "Parejas": {
        low: "🟢 Puntaje bajo\n\nGracias por completar el formulario.\n\nLas respuestas sugieren que existen algunas dificultades en la relación, propias de la convivencia y los cambios que atraviesa toda pareja.\n\nEstos desacuerdos no necesariamente indican una crisis, pero sí pueden ser una oportunidad para mejorar la comunicación.\n\nUn espacio de orientación puede ayudar a fortalecer el diálogo y el entendimiento mutuo.",
        medium: "🟡 Puntaje medio\n\nGracias por responder el formulario.\n\nTus respuestas muestran conflictos que se repiten y generan malestar en la relación, como discusiones frecuentes, distancia emocional o dificultad para llegar a acuerdos.\n\nMuchas veces, estos problemas no se resuelven porque falta un espacio para escucharse de otra manera.\n\nUn acompañamiento psicológico puede ayudar a comprender lo que está ocurriendo entre ambos y abrir nuevas formas de encuentro.",
        high: "🔴 Puntaje alto\n\nGracias por completar el formulario.\n\nLas respuestas indican que la relación atraviesa un momento de alta tensión, con un impacto importante en el bienestar emocional de uno o ambos miembros de la pareja.\n\nEsto suele generar desgaste, confusión y sufrimiento.\n\nContar con un espacio profesional puede ser fundamental para pensar la relación, tomar decisiones con mayor claridad y cuidar el bienestar emocional de cada uno."
    },
    "Estrés Laboral": {
        low: "🟢 Puntaje bajo - Carga Manejable\n\nGracias por responder. Sus respuestas indican niveles de estrés laboral dentro de lo esperable. Sin embargo, es vital mantener hábitos saludables de desconexión.",
        medium: "🟡 Puntaje medio - Riesgo de Burnout\n\nGracias por responder. Se evidencian signos de agotamiento y desmotivación que requieren atención para prevenir un impacto mayor en su salud y desempeño.",
        high: "🔴 Puntaje alto - Burnout Activo\n\nGracias por responder. Sus respuestas sugieren un nivel crítico de estrés laboral que está afectando su salud física y mental. Se recomienda intervención profesional."
    },
    "Alta Gerencia": {
        low: "🟢 Puntaje bajo - Gestión Efectiva\n\nGracias por responder. Parece manejar adecuadamente las presiones del cargo. Un espacio de consultoría puede potenciar aún más su liderazgo.",
        medium: "🟡 Puntaje medio - Tensión de Rol\n\nGracias por responder. La soledad del líder y la carga de decisiones están empezando a impactar su equilibrio personal. Es momento de revisar estrategias de afrontamiento.",
        high: "🔴 Puntaje alto - Fatiga Ejecutiva\n\nGracias por responder. Se observan indicadores de saturación que ponen en riesgo su toma de decisiones y salud. Un acompañamiento externo es altamente recomendado."
    },
    "Nomofobia": {
        low: "🟢 Puntaje bajo - Uso Consciente\n\nGracias por responder. Su relación con la tecnología parece equilibrada, aunque siempre es bueno mantener espacios libres de pantallas.",
        medium: "🟡 Puntaje medio - Dependencia Moderada\n\nGracias por responder. Se notan dificultades para desconectar que podrían estar afectando su concentración y descanso. Es recomendable establecer límites digitales.",
        high: "🔴 Puntaje alto - Hiperconexión\n\nGracias por responder. El uso de dispositivos está interfiriendo significativamente en su vida diaria y bienestar. Un proceso de 'detox digital' acompañado sería beneficioso."
    },
    "Familia": {
        low: "🟢 Puntaje bajo - Dinámica Estable\n\nGracias por responder. La familia cuenta con recursos para resolver conflictos, aunque se pueden fortalecer los canales de comunicación.",
        medium: "🟡 Puntaje medio - Tensiones Recurrentes\n\nGracias por responder. Existen conflictos no resueltos que están afectando el clima familiar. Un espacio neutral podría facilitar el diálogo.",
        high: "🔴 Puntaje alto - Crisis Vincular\n\nGracias por responder. Se evidencian dificultades importantes en la convivencia y comunicación que requieren orientación profesional para restablecer la armonía."
    }
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

        // 1. Abrir WhatsApp (Acción inmediata para el usuario)
        window.open(whatsappUrl, '_blank');

        try {
            // 2. Enviar datos a Formspree (Centralización de Base de Datos)
            // Esto guardará el lead, el resultado y el mensaje de devolución que se debe enviar
            await fetch("https://formspree.io/f/mqaeodlo", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    _subject: `Nuevo Lead ${category} - ${formData.name} (${resultLabel})`,
                    _replyto: formData.email, // Para que responder en Formspree le llegue al usuario
                    category,
                    score,
                    result: resultLabel,
                    client_name: formData.name,
                    client_email: formData.email,
                    client_whatsapp: formData.whatsapp,
                    generated_feedback: feedbackMessage, // Guardamos la respuesta generada
                    database_action: "CREATE_LEAD" // Tag para automatización futura
                })
            });
        } catch (error) {
            console.error("Error enviando a base de datos:", error);
        }

        setFormStatus('success');
        setTimeout(() => onClose(), 2000);
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
                            Hemos generado un reporte preliminar basado en tus respuestas.
                            <br /><br />
                            <span className="text-emerald-400">Te enviaremos la devolución detallada a tu correo electrónico</span> para que puedas revisarla con calma, y conservaremos tus datos para crear tu historia clínica digital.
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
                                    placeholder="CORREO PARA RECIBIR RESPUESTA"
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
                                    {formStatus === 'submitting' ? 'Procesando...' : formStatus === 'success' ? '¡Enviado! Revisa tu Correo' : 'Obtener Análisis y Contactar'}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
};
