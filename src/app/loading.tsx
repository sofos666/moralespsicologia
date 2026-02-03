'use client';

import { motion } from 'framer-motion';

export default function Loading() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-transparent">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
            >
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="text-luxury-olive text-3xl md:text-4xl font-bold mb-4"
                >
                    MVP
                </motion.div>
                <p className="text-gray-400 text-sm uppercase tracking-[0.3em]">
                    Cargando...
                </p>
            </motion.div>
        </div>
    );
}
