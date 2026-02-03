'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log error to error reporting service
        console.error('Application error:', error);
    }, [error]);

    return (
        <div className="min-h-screen flex items-center justify-center px-6 bg-transparent">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center max-w-md"
            >
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-500/10 flex items-center justify-center"
                >
                    <svg
                        className="w-10 h-10 text-red-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                    </svg>
                </motion.div>

                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    Algo salió mal
                </h2>

                <p className="text-gray-400 mb-8 leading-relaxed">
                    Lo sentimos, ha ocurrido un error inesperado. Por favor, intenta nuevamente.
                </p>

                <motion.button
                    onClick={reset}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-luxury"
                >
                    Intentar de nuevo
                </motion.button>

                <p className="mt-6 text-xs text-gray-600">
                    Si el problema persiste, contáctanos al{' '}
                    <a href="tel:+573014975393" className="text-luxury-olive hover:underline">
                        +57 301 497 5393
                    </a>
                </p>
            </motion.div>
        </div>
    );
}
