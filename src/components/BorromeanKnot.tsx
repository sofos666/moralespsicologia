'use client';

import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';


/**
 * Nudo Borromeo - Tres anillos entrelazados
 * Representa la tríada Real-Simbólico-Imaginario del psicoanálisis lacaniano
 */
export const BorromeanKnot = () => {

    const pathname = usePathname();
    const isTerapias = pathname === '/terapias';
    const isUbicacion = pathname === '/ubicacion';

    // Color based on page
    const ringColor = isTerapias
        ? '251, 191, 36'  // Amber
        : isUbicacion
            ? '59, 130, 246'  // Blue
            : '255, 255, 255'; // White

    return (
        <div className="fixed left-1/2 md:left-8 top-1/2 -translate-x-1/2 md:translate-x-0 -translate-y-1/2 z-0 pointer-events-none opacity-65 md:opacity-100 scale-75 md:scale-100">
            <svg
                width="450"
                height="450"
                viewBox="0 0 300 300"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="opacity-35"
            >
                {/* Definición de gradientes radiales para el efecto de nodo */}
                <defs>
                    {/* Gradiente para el glow grande del centro */}
                    <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor={`rgb(${ringColor})`} stopOpacity="0.4" />
                        <stop offset="40%" stopColor={`rgb(${ringColor})`} stopOpacity="0.15" />
                        <stop offset="100%" stopColor={`rgb(${ringColor})`} stopOpacity="0" />
                    </radialGradient>

                    {/* Gradiente para el núcleo brillante */}
                    <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor={`rgb(${ringColor})`} stopOpacity="0.8" />
                        <stop offset="50%" stopColor={`rgb(${ringColor})`} stopOpacity="0.4" />
                        <stop offset="100%" stopColor={`rgb(${ringColor})`} stopOpacity="0" />
                    </radialGradient>
                </defs>
                {/* Anillo 1 - Real (Azul-Verde) - Izquierda Superior */}
                <motion.g>
                    {/* Glow exterior */}
                    <motion.ellipse
                        cx="120"
                        cy="120"
                        rx="60"
                        ry="60"
                        stroke={`rgba(${ringColor}, 0.5)`}
                        strokeWidth="1"
                        fill="none"
                        initial={{ opacity: 0.3, strokeWidth: 1 }}
                        animate={{
                            opacity: [0.3, 0.6, 0.3],
                            strokeWidth: [1, 2, 1],
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />

                    {/* Anillo principal con luces viajeras */}
                    <motion.ellipse
                        cx="120"
                        cy="120"
                        rx="60"
                        ry="60"
                        stroke={`rgba(${ringColor}, 0.25)`}
                        strokeWidth="3"
                        fill="none"
                        strokeDasharray="6 6"
                        initial={{ strokeDashoffset: 0 }}
                        animate={{ strokeDashoffset: 378 }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    />

                    {/* Impulsos de luz que viajan por el anillo */}
                    <motion.ellipse
                        cx="120"
                        cy="120"
                        rx="60"
                        ry="60"
                        stroke={`rgba(${ringColor}, 0)`}
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray="15 365"
                        initial={{ strokeDashoffset: 0, opacity: 0.5 }}
                        animate={{
                            strokeDashoffset: [0, -378],
                            opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                            duration: 5,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                        style={{
                            filter: `drop-shadow(0 0 8px rgba(${ringColor}, 0.8))`,
                        }}
                    />
                </motion.g>

                {/* Anillo 2 - Simbólico (Púrpura) - Derecha Superior */}
                <motion.g>
                    {/* Glow exterior */}
                    <motion.ellipse
                        cx="180"
                        cy="120"
                        rx="60"
                        ry="60"
                        stroke={`rgba(${ringColor}, 0.5)`}
                        strokeWidth="1"
                        fill="none"
                        initial={{ opacity: 0.3, strokeWidth: 1 }}
                        animate={{
                            opacity: [0.3, 0.6, 0.3],
                            strokeWidth: [1, 2, 1],
                        }}
                        transition={{
                            duration: 4.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 0.5,
                        }}
                    />

                    {/* Anillo principal */}
                    <motion.ellipse
                        cx="180"
                        cy="120"
                        rx="60"
                        ry="60"
                        stroke={`rgba(${ringColor}, 0.25)`}
                        strokeWidth="3"
                        fill="none"
                        strokeDasharray="6 6"
                        initial={{ strokeDashoffset: 0 }}
                        animate={{ strokeDashoffset: -378 }}
                        transition={{
                            duration: 18,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    />

                    {/* Impulsos de luz */}
                    <motion.ellipse
                        cx="180"
                        cy="120"
                        rx="60"
                        ry="60"
                        stroke={`rgba(${ringColor}, 0)`}
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray="15 365"
                        initial={{ strokeDashoffset: 0, opacity: 0.5 }}
                        animate={{
                            strokeDashoffset: [0, 378],
                            opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                            duration: 4.5,
                            repeat: Infinity,
                            ease: "linear",
                            delay: 1,
                        }}
                        style={{
                            filter: `drop-shadow(0 0 8px rgba(${ringColor}, 0.8))`,
                        }}
                    />
                </motion.g>

                {/* Anillo 3 - Imaginario (Rosa-Dorado) - Centro Inferior */}
                <motion.g>
                    {/* Glow exterior */}
                    <motion.ellipse
                        cx="150"
                        cy="170"
                        rx="60"
                        ry="60"
                        stroke={`rgba(${ringColor}, 0.5)`}
                        strokeWidth="1"
                        fill="none"
                        initial={{ opacity: 0.3, strokeWidth: 1 }}
                        animate={{
                            opacity: [0.3, 0.6, 0.3],
                            strokeWidth: [1, 2, 1],
                        }}
                        transition={{
                            duration: 5,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 1,
                        }}
                    />

                    {/* Anillo principal */}
                    <motion.ellipse
                        cx="150"
                        cy="170"
                        rx="60"
                        ry="60"
                        stroke={`rgba(${ringColor}, 0.25)`}
                        strokeWidth="3"
                        fill="none"
                        strokeDasharray="6 6"
                        initial={{ strokeDashoffset: 0 }}
                        animate={{ strokeDashoffset: 378 }}
                        transition={{
                            duration: 22,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    />

                    {/* Impulsos de luz */}
                    <motion.ellipse
                        cx="150"
                        cy="170"
                        rx="60"
                        ry="60"
                        stroke={`rgba(${ringColor}, 0)`}
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray="15 365"
                        initial={{ strokeDashoffset: 0, opacity: 0.5 }}
                        animate={{
                            strokeDashoffset: [0, -378],
                            opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                            duration: 5.5,
                            repeat: Infinity,
                            ease: "linear",
                            delay: 0.5,
                        }}
                        style={{
                            filter: `drop-shadow(0 0 8px rgba(${ringColor}, 0.8))`,
                        }}
                    />
                </motion.g>

                {/* Efecto de Glow grande del centro (como los nodos de las neuronas) */}
                <motion.circle
                    cx="150"
                    cy="145"
                    r="40"
                    fill="url(#centerGlow)"
                    animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />

                {/* Glow medio */}
                <motion.circle
                    cx="150"
                    cy="145"
                    r="20"
                    fill="url(#coreGlow)"
                    animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 0.8, 0.5],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.5,
                    }}
                />

                {/* Puntos de intersección con brillo pulsante */}
                {/* Intersección izquierda */}
                <motion.circle
                    cx="140"
                    cy="145"
                    r="3"
                    fill={`rgba(${ringColor}, 0.8)`}
                    animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.6, 1, 0.6],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    style={{
                        filter: `drop-shadow(0 0 6px rgba(${ringColor}, 1))`,
                    }}
                />

                {/* Intersección derecha */}
                <motion.circle
                    cx="160"
                    cy="145"
                    r="3"
                    fill={`rgba(${ringColor}, 0.8)`}
                    animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.6, 1, 0.6],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.66,
                    }}
                    style={{
                        filter: `drop-shadow(0 0 6px rgba(${ringColor}, 1))`,
                    }}
                />

                {/* Punto central (núcleo del nudo) - Más brillante */}
                <motion.circle
                    cx="150"
                    cy="145"
                    r="5"
                    fill={`rgba(${ringColor}, 1)`}
                    animate={{
                        scale: [1, 2, 1],
                        opacity: [0.8, 1, 0.8],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.33,
                    }}
                    style={{
                        filter: `drop-shadow(0 0 15px rgba(${ringColor}, 1))`,
                    }}
                />

                {/* Centro brillante (dot) */}
                <motion.circle
                    cx="150"
                    cy="145"
                    r="2"
                    fill={`rgba(${ringColor}, 1)`}
                    animate={{
                        opacity: [0.9, 1, 0.9],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            </svg>

            {/* Texto sutil debajo del nudo */}
            <motion.div
                className="text-center mt-4 text-xs tracking-[0.3em] uppercase font-light"
                style={{ color: `rgba(${ringColor}, 0.3)` }}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.2, 0.4, 0.2] }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            >
                R·S·I
            </motion.div>
        </div>
    );
};
