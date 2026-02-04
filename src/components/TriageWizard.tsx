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
        low: "🟢 Puntaje bajo<br><br>Gracias por responder el formulario.<br><br>A partir de tus respuestas, se observa que el niño o la niña atraviesa algunas situaciones que pueden generar inquietud, pero que en general logra desenvolverse en su vida cotidiana. Estos momentos suelen formar parte del crecimiento y de los cambios propios de cada etapa.<br><br>Aun así, prestar atención a estas señales puede ser una buena oportunidad para comprender mejor lo que está necesitando y acompañarlo de manera más tranquila.<br><br>Un espacio de orientación psicológica puede servir para pensar estas situaciones con mayor claridad y fortalecer el bienestar emocional del niño.",
        medium: "🟡 Puntaje medio<br><br>Gracias por tomarte el tiempo de responder el formulario.<br><br>Las respuestas sugieren que el niño o la niña presenta dificultades que se repiten y que pueden estar influyendo en su estado emocional, su comportamiento o su relación con los demás.<br><br>En muchos casos, los niños expresan a través de sus conductas aquello que todavía no pueden decir con palabras. Comprender esto suele aliviar tanto al niño como a su entorno.<br><br>Un acompañamiento psicológico puede ayudar a dar sentido a lo que está ocurriendo y a encontrar formas más adecuadas de sostener este momento.",
        high: "🔴 Puntaje alto<br><br>Gracias por responder el formulario.<br><br>Según tus respuestas, el niño o la niña podría estar atravesando un momento de malestar importante, que está afectando distintos aspectos de su vida diaria. Esto puede resultar preocupante y generar muchas preguntas.<br><br>Estas situaciones no hablan de errores ni de fallas, sino de la necesidad de un acompañamiento más cercano y cuidadoso.<br><br>Contar con un espacio profesional puede ser un paso importante para comprender lo que está ocurriendo y ofrecerle al niño un entorno más seguro y comprensible."
    },
    "Adolescentes": {
        low: "🟢 Puntaje bajo<br><br>Gracias por completar el formulario.<br><br>Las respuestas indican que el adolescente atraviesa inquietudes y cambios emocionales propios de esta etapa, sin que actualmente interfieran de manera significativa en su vida cotidiana.<br><br>La adolescencia suele estar acompañada de preguntas, transformaciones y búsqueda de identidad, lo cual puede generar tensiones normales.<br><br>Un espacio de orientación puede ayudar a acompañar este proceso y favorecer una comunicación más abierta y tranquila.",
        medium: "🟡 Puntaje medio<br><br>Gracias por responder el formulario.<br><br>A partir de tus respuestas, se observa un malestar que se mantiene en el tiempo y que puede expresarse en aislamiento, irritabilidad, desmotivación o conflictos frecuentes.<br><br>Muchas veces, el adolescente no encuentra un lugar donde hablar con libertad de lo que siente o piensa.<br><br>Un espacio de escucha profesional puede ofrecerle la posibilidad de expresarse sin juicios y comenzar a comprender mejor lo que le está pasando.",
        high: "🔴 Puntaje alto<br><br>Gracias por completar el formulario.<br><br>Las respuestas sugieren que el adolescente podría estar atravesando un momento emocionalmente complejo, que impacta su bienestar y su relación con los demás.<br><br>Estos momentos pueden vivirse con mucha soledad, tanto por parte del adolescente como de su entorno.<br><br>Contar con un acompañamiento psicológico puede ofrecer un espacio de contención y apoyo para atravesar este momento con mayor cuidado."
    },
    "Adultos": {
        low: "🟢 Puntaje bajo<br><br>Gracias por responder el formulario.<br><br>Tus respuestas muestran la presencia de preocupaciones o malestares puntuales, vinculados a situaciones específicas de tu vida actual. Aunque no parecen dominar tu día a día, es comprensible que generen inquietud.<br><br>Detenerse a pensar en estas situaciones puede ser una forma de cuidarte y entender mejor lo que estás atravesando.<br><br>Un espacio de consulta puede ayudarte a poner en palabras aquello que hoy aparece de manera ocasional.",
        medium: "🟡 Puntaje medio<br><br>Gracias por completar el formulario.<br><br>Las respuestas indican un malestar que se ha venido sosteniendo en el tiempo y que empieza a generar cansancio emocional, preocupación o dificultad para disfrutar la vida cotidiana.<br><br>Es común sentir, en estos casos, que se da vueltas sobre lo mismo sin encontrar una salida clara.<br><br>Un proceso psicológico puede ofrecer un espacio para ordenar lo que te pasa y aliviar este desgaste progresivo.",
        high: "🔴 Puntaje alto<br><br>Gracias por responder el formulario.<br><br>A partir de tus respuestas, se observa un malestar intenso que está afectando tu bienestar emocional, tu energía o tus vínculos. Esto puede sentirse como un peso difícil de llevar.<br><br>Llegar a este punto no habla de debilidad, sino de haber sostenido mucho durante demasiado tiempo.<br><br>Contar con un espacio de acompañamiento profesional puede ayudarte a atravesar este momento con mayor alivio y claridad."
    },
    "Parejas": {
        low: "🟢 Puntaje bajo<br><br>Gracias por completar el formulario.<br><br>Las respuestas sugieren la presencia de algunas dificultades propias de la convivencia y de los cambios que atraviesa toda relación. Estas situaciones suelen generar roces, pero también pueden ser una oportunidad para revisar la forma de comunicarse.<br><br>Un espacio de orientación puede ayudar a fortalecer el diálogo y el entendimiento mutuo.",
        medium: "🟡 Puntaje medio<br><br>Gracias por responder el formulario.<br><br>Tus respuestas muestran conflictos que se repiten y que generan malestar en la relación, como discusiones frecuentes, distancia emocional o dificultad para llegar a acuerdos.<br><br>Cuando estos conflictos se sostienen en el tiempo, suelen desgastar el vínculo.<br><br>Un acompañamiento psicológico puede ayudar a comprender lo que está ocurriendo y abrir nuevas formas de encuentro.",
        high: "🔴 Puntaje alto<br><br>Gracias por completar el formulario.<br><br>Las respuestas indican que la relación atraviesa un momento de alta tensión, con un impacto importante en el bienestar emocional de uno o ambos miembros.<br><br>Estas situaciones suelen vivirse con cansancio, confusión y sufrimiento.<br><br>Contar con un espacio profesional puede ayudar a pensar la relación con mayor claridad y cuidado."
    },
    "Estrés Laboral": {
        low: "🟢 Puntaje bajo<br><br>Gracias por responder el formulario.<br><br>Tus respuestas indican señales de cansancio o tensión relacionadas con el trabajo, que aún parecen manejables dentro de tu rutina diaria.<br><br>Escuchar estas señales a tiempo puede ayudarte a prevenir un mayor desgaste.<br><br>Un espacio de orientación puede servir para pensar el lugar que el trabajo ocupa en tu vida.",
        medium: "🟡 Puntaje medio<br><br>Gracias por completar el formulario.<br><br>Las respuestas muestran un nivel de desgaste laboral que empieza a afectar tu bienestar emocional, tu energía y tu motivación.<br><br>Cuando el trabajo ocupa demasiado espacio, suele dejar poco lugar para el descanso y el disfrute.<br><br>Un proceso psicológico puede ayudarte a ordenar estas exigencias y encontrar un mayor equilibrio.",
        high: "🔴 Puntaje alto<br><br>Gracias por responder el formulario.<br><br>A partir de tus respuestas, se observa un nivel importante de agotamiento físico y emocional relacionado con el trabajo.<br><br>Este tipo de desgaste no aparece de un día para otro, y suele ser una señal clara de que algo necesita ser revisado.<br><br>Contar con un espacio de acompañamiento puede ayudarte a cuidar tu salud emocional y recuperar bienestar."
    },
    "Alta Gerencia": {
        low: "🟢 Puntaje bajo<br><br>Gracias por completar el formulario.<br><br>Las respuestas indican tensiones propias de los roles de liderazgo, que hasta ahora parecen integrarse de manera adecuada a tu vida personal.<br><br>Aun así, revisar estos aspectos puede ser una forma de cuidado y prevención.<br><br>Un espacio de reflexión profesional puede ayudarte a sostener tu rol con mayor equilibrio.",
        medium: "🟡 Puntaje medio<br><br>Gracias por responder el formulario.<br><br>Tus respuestas muestran que la carga de responsabilidad y la presión del rol están comenzando a impactar tu bienestar personal.<br><br>Muchas veces, quienes ocupan cargos de liderazgo no encuentran espacios donde hablar libremente de estas tensiones.<br><br>Un acompañamiento psicológico puede ofrecer un lugar confidencial para pensar estas exigencias.",
        high: "🔴 Puntaje alto<br><br>Gracias por completar el formulario.<br><br>Las respuestas sugieren que la exigencia del rol gerencial está afectando de manera significativa tu equilibrio emocional y personal.<br><br>Sostener estas responsabilidades en soledad suele generar un alto costo subjetivo.<br><br>Contar con un espacio profesional puede ayudarte a recuperar claridad y bienestar."
    },
    "Nomofobia": {
        low: "🟢 Puntaje bajo<br><br>Gracias por responder el formulario.<br><br>Tus respuestas indican un uso frecuente del celular, que por ahora parece integrarse a tu vida cotidiana sin grandes interferencias.<br><br>Revisar estos hábitos puede ser una forma de tomar mayor conciencia de tu relación con la tecnología.<br><br>Un espacio de orientación puede ayudarte a pensar este vínculo con mayor claridad.",
        medium: "🟡 Puntaje medio<br><br>Gracias por completar el formulario.<br><br>Las respuestas muestran que el uso del celular comienza a interferir en tu descanso, tu concentración o tus relaciones.<br><br>En muchos casos, el uso constante de pantallas funciona como una forma de evadir preocupaciones o malestares.<br><br>Un acompañamiento psicológico puede ayudarte a entender qué lugar ocupa el celular en tu vida.",
        high: "🔴 Puntaje alto<br><br>Gracias por responder el formulario.<br><br>A partir de tus respuestas, se observa que el uso del celular está teniendo un impacto importante en tu bienestar y en tu vida cotidiana.<br><br>Esto no se trata de falta de voluntad, sino de un vínculo que se ha vuelto difícil de regular.<br><br>Un espacio de consulta puede ayudarte a comprender esta relación y encontrar formas más saludables de vincularte contigo y con los demás."
    },
    "Familia": {
        low: "🟢 Puntaje bajo<br><br>Gracias por completar el formulario.<br><br>Las respuestas sugieren la presencia de tensiones familiares propias de la convivencia y de las diferencias entre sus miembros.<br><br>Estas situaciones pueden ser una oportunidad para revisar la comunicación y los acuerdos.<br><br>Un espacio de orientación puede ayudar a fortalecer el clima familiar.",
        medium: "🟡 Puntaje medio<br><br>Gracias por responder el formulario.<br><br>Tus respuestas muestran conflictos familiares que se repiten y que generan malestar en la convivencia cotidiana.<br><br>Cuando estos conflictos no encuentran un lugar para ser hablados, suelen intensificarse.<br><br>Un acompañamiento psicológico puede ayudar a comprender estas dinámicas y favorecer vínculos más claros y respetuosos.",
        high: "🔴 Puntaje alto<br><br>Gracias por completar el formulario.<br><br>Las respuestas indican un nivel importante de tensión familiar, que está afectando el bienestar emocional de sus integrantes.<br><br>Estas situaciones suelen generar cansancio y desgaste en todos los miembros.<br><br>Contar con un espacio profesional puede ayudar a pensar estas dificultades y a construir formas más cuidadas de convivencia."
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
    const [whatsappLink, setWhatsappLink] = useState('');

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

        // Acceso seguro al feedback con valor por defecto para depuración
        const defaultFeedback = "Gracias por completar el triaje. Su resultado está siendo procesado.";
        const feedbackMessage = FEEDBACK_MESSAGES[category]?.[level] || defaultFeedback;

        console.log("Enviando Feedback:", {
            categoria: category,
            nivel: level,
            longitud: feedbackMessage.length,
            texto: feedbackMessage.substring(0, 50) + "..."
        });

        // Mensaje para WhatsApp
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

        // Guardar URL para el botón manual
        setWhatsappLink(whatsappUrl);

        // Datos para la API de automatización (Google Sheets + Email)
        const automationData = {
            formType: 'triaje' as const,
            name: formData.name,
            email: formData.email,
            whatsapp: formData.whatsapp,
            category,
            score,
            result: resultLabel,
            feedback: feedbackMessage
        };

        try {
            await fetch("/api/automation", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(automationData)
            });
            // Éxito: Cambiamos estado para mostrar el botón de WhatsApp
            setFormStatus('success');

        } catch (error) {
            console.error("Error enviando datos:", error);
            // Incluso si falla la API, permitimos ir a WhatsApp
            setFormStatus('success');
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
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    onClick={(e) => e.stopPropagation()}
                    className="relative w-full max-w-2xl mx-auto z-[110] my-4 sm:my-8"
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
                                {formStatus === 'success' ? (
                                    <div className="text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                                        <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                            <svg className="w-10 h-10 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <h3 className="text-2xl font-bold text-white">¡Informe Enviado!</h3>
                                        <p className="text-gray-300 text-sm">
                                            Hemos enviado tu análisis al correo.<br />
                                            Para finalizar, envía tu resultado por WhatsApp.
                                        </p>

                                        <a
                                            href={whatsappLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={() => setTimeout(onClose, 1000)}
                                            className="block w-full py-4 rounded-full bg-[#25D366] text-white font-bold text-sm uppercase tracking-widest hover:bg-[#128C7E] transition-all shadow-lg shadow-emerald-900/20 transform hover:scale-105 select-none"
                                        >
                                            CONTINUAR EN WHATSAPP →
                                        </a>
                                    </div>
                                ) : (
                                    <>
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
                                                    disabled={formStatus === 'submitting'}
                                                    className="w-full py-5 rounded-full bg-white text-black font-bold text-[10px] uppercase tracking-[0.3em] hover:bg-terracota hover:text-white transition-all duration-700 disabled:opacity-50"
                                                >
                                                    {formStatus === 'submitting' ? 'PROCESANDO...' : 'OBTENER ANÁLISIS Y CONTACTAR'}
                                                </button>
                                            </div>
                                        </form>
                                    </>
                                )}
                            </motion.div>
                        )}
                    </div>
                </motion.div>
            </motion.div >
        </AnimatePresence >
    );
};
