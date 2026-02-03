"use client";

import React, { useRef, useState, useEffect, memo, useCallback } from "react";
import { usePathname } from "next/navigation";


interface Neuron {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
}

interface Impulse {
    from: number;
    to: number;
    progress: number;
    speed: number;
    id: number;
}

// Debounce utility
const debounce = (func: Function, wait: number) => {
    let timeout: NodeJS.Timeout;
    return (...args: any[]) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
};

/**
 * 🧠 INTERACTIVE NEURON BACKGROUND - PRO VERSION
 * Basado en la configuración de alta visibilidad proporcionada.
 * Optimizado para accesibilidad y performance móvil.
 */
export const InteractiveBackground = memo(() => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

    const pathname = usePathname();
    const isTerapias = pathname === '/terapias';
    const isUbicacion = pathname === '/ubicacion';

    // Base color configuration
    const baseColor = isTerapias
        ? '251, 191, 36'  // Amber (Terapias)
        : isUbicacion
            ? '59, 130, 246'  // Blue (Ubicación)
            : '255, 255, 255'; // White (Home/Default)

    useEffect(() => {
        // Detectar preferencia de movimiento reducido del usuario
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        setPrefersReducedMotion(mediaQuery.matches);

        const handleChange = (e: MediaQueryListEvent) => {
            setPrefersReducedMotion(e.matches);
        };

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    useEffect(() => {
        // Si el usuario prefiere movimiento reducido, mostrar fondo estático
        if (prefersReducedMotion) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resizeCanvas = () => {
            // Use visualViewport for iOS Safari compatibility (handles dynamic toolbar)
            const vw = window.visualViewport?.width || window.innerWidth;
            const vh = window.visualViewport?.height || window.innerHeight;
            // Always fill at least the full screen to prevent white gaps
            canvas.width = Math.max(vw, document.documentElement.clientWidth);
            canvas.height = Math.max(vh, document.documentElement.clientHeight);
            // Immediately fill background to prevent white flash
            ctx.fillStyle = '#0a0a0b';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        };

        // Debounced resize para performance
        const debouncedResize = debounce(resizeCanvas, 150);

        resizeCanvas();

        // Detectar tipo de dispositivo
        const isMobile = window.innerWidth < 768;
        const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;

        // ═══════════════════════════════════════════════════════════════════════
        // 📱 CONFIGURACIÓN MÓVIL - Sutil, como el nudo borromeo
        // ═══════════════════════════════════════════════════════════════════════
        const mobileConfig = {
            neuronDensityDivisor: 8000,   // Más neuronas pero más pequeñas y distribuidas
            maxNeurons: 60,               // Más neuronas para mejor distribución
            connectionDistance: 120,      // Conexiones más cortas para evitar saturación visual
            impulseChance: 0.025,         // Menos actividad para efecto más sutil
            neuronSpeed: 0.3,             // Velocidad más lenta y calmada
            neuronBaseSize: 1.5,          // Mucho más pequeñas (antes 2.8)
            connectionOpacityMultiplier: 0.15, // Misma intensidad que el nudo borromeo (antes 0.65)
            connectionLineWidth: 0.6,     // Líneas muy finas (antes 1.6)
        };

        // ═══════════════════════════════════════════════════════════════════════
        // 📟 CONFIGURACIÓN TABLET - Balance entre móvil y desktop
        // ═══════════════════════════════════════════════════════════════════════
        const tabletConfig = {
            neuronDensityDivisor: 14000,
            maxNeurons: 60,
            connectionDistance: 155,
            impulseChance: 0.035,
            neuronSpeed: 0.42,
            neuronBaseSize: 2.5,
            connectionOpacityMultiplier: 0.4,
            connectionLineWidth: 1.2,
        };

        // ═══════════════════════════════════════════════════════════════════════
        // 🖥️ CONFIGURACIÓN DESKTOP - Experiencia completa y fluida
        // ═══════════════════════════════════════════════════════════════════════
        const desktopConfig = {
            neuronDensityDivisor: 15000,
            maxNeurons: 90,
            connectionDistance: 165,
            impulseChance: 0.03,
            neuronSpeed: 0.4,
            neuronBaseSize: 2,
            connectionOpacityMultiplier: 0.15,
            connectionLineWidth: 0.8,
        };

        // Seleccionar configuración según dispositivo
        const config = isMobile ? mobileConfig : isTablet ? tabletConfig : desktopConfig;

        // Calcular neuronas basado en área de pantalla
        const NEURON_COUNT = Math.min(
            config.maxNeurons,
            Math.floor((canvas.width * canvas.height) / config.neuronDensityDivisor)
        );
        const CONNECTION_DISTANCE = config.connectionDistance;
        const IMPULSE_CHANCE = config.impulseChance;

        // Neurons (nodes) con configuración específica por dispositivo
        const neurons: Neuron[] = Array.from({ length: NEURON_COUNT }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * config.neuronSpeed,
            vy: (Math.random() - 0.5) * config.neuronSpeed,
            size: Math.random() * 3 + config.neuronBaseSize,
        }));



        // Active impulses traveling along connections
        const impulses: Impulse[] = [];
        let impulseIdCounter = 0;

        const createImpulse = (fromIndex: number, toIndex: number) => {
            impulses.push({
                from: fromIndex,
                to: toIndex,
                progress: 0,
                speed: 0.015 + Math.random() * 0.025, // Impulsos rápidos
                id: impulseIdCounter++,
            });
        };

        const updateNeurons = () => {
            neurons.forEach(neuron => {
                neuron.x += neuron.vx;
                neuron.y += neuron.vy;

                // Bounce off walls
                if (neuron.x < 0 || neuron.x > canvas.width) neuron.vx *= -1;
                if (neuron.y < 0 || neuron.y > canvas.height) neuron.vy *= -1;
            });
        };



        const drawConnection = (neuronA: Neuron, neuronB: Neuron, opacity: number) => {
            ctx.beginPath();
            ctx.moveTo(neuronA.x, neuronA.y);
            ctx.lineTo(neuronB.x, neuronB.y);
            // Usar configuración específica del dispositivo
            ctx.strokeStyle = `rgba(${baseColor}, ${opacity * config.connectionOpacityMultiplier})`;
            ctx.lineWidth = config.connectionLineWidth;
            ctx.stroke();
        };

        const drawImpulse = (impulse: Impulse) => {
            const fromNeuron = neurons[impulse.from];
            const toNeuron = neurons[impulse.to];

            if (!fromNeuron || !toNeuron) return;

            // Calculate position along the connection
            const x = fromNeuron.x + (toNeuron.x - fromNeuron.x) * impulse.progress;
            const y = fromNeuron.y + (toNeuron.y - fromNeuron.y) * impulse.progress;

            // Draw glowing impulse (white flash) - larger and brighter
            const gradient = ctx.createRadialGradient(x, y, 0, x, y, 15);
            gradient.addColorStop(0, `rgba(${baseColor}, 0.35)`); // ✅ Reducido de 1.0 a 0.35
            gradient.addColorStop(0.2, `rgba(${baseColor}, 0.28)`); // ✅ Proporcional
            gradient.addColorStop(0.5, `rgba(${baseColor}, 0.14)`); // ✅ Proporcional
            gradient.addColorStop(0.8, `rgba(${baseColor}, 0.05)`); // ✅ Proporcional
            gradient.addColorStop(1, `rgba(${baseColor}, 0)`);

            ctx.beginPath();
            ctx.arc(x, y, 15, 0, Math.PI * 2);
            ctx.fillStyle = gradient;
            ctx.fill();

            // Bright center
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${baseColor}, 0.35)`; // ✅ Reducido de 1.0 a 0.35
            ctx.shadowColor = `rgba(${baseColor}, 0.3)`; // ✅ Reducido glow
            ctx.shadowBlur = 10;
            ctx.fill();
            ctx.shadowBlur = 0; // Reset shadow
        };

        const drawNeuron = (neuron: Neuron, pulse: number) => {
            const size = neuron.size * (1 + pulse * 0.5);

            // Outer glow - more prominent
            const gradient = ctx.createRadialGradient(
                neuron.x, neuron.y, 0,
                neuron.x, neuron.y, size * 5
            );
            gradient.addColorStop(0, `rgba(${baseColor}, ${(0.25 + pulse * 0.15) * 0.35})`); // ✅ 35% de la opacidad original
            gradient.addColorStop(0.4, `rgba(${baseColor}, ${(0.1 + pulse * 0.08) * 0.35})`); // ✅ 35%
            gradient.addColorStop(1, `rgba(${baseColor}, 0)`);

            ctx.beginPath();
            ctx.arc(neuron.x, neuron.y, size * 5, 0, Math.PI * 2);
            ctx.fillStyle = gradient;
            ctx.fill();

            // Inner core - brighter
            ctx.beginPath();
            ctx.arc(neuron.x, neuron.y, size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${baseColor}, ${(0.5 + pulse * 0.3) * 0.35})`; // ✅ 35% de la opacidad original
            ctx.shadowColor = `rgba(${baseColor}, 0.2)`;
            ctx.shadowBlur = 8;
            ctx.fill();
            ctx.shadowBlur = 0; // Reset shadow

            // Bright center dot
            ctx.beginPath();
            ctx.arc(neuron.x, neuron.y, size * 0.4, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${baseColor}, 0.3)`; // ✅ Reducido de 0.8 a 0.3
            ctx.fill();
        };

        let time = 0;
        let animationFrameId: number;

        const animate = () => {
            // Fill with background color instead of clearing
            ctx.fillStyle = '#0a0a0b';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            time += 0.05;

            updateNeurons();

            // Find all connections
            const connections: Array<[number, number, number]> = [];
            for (let i = 0; i < neurons.length; i++) {
                for (let j = i + 1; j < neurons.length; j++) {
                    const dx = neurons[j].x - neurons[i].x;
                    const dy = neurons[j].y - neurons[i].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < CONNECTION_DISTANCE) {
                        const opacity = 1 - distance / CONNECTION_DISTANCE;
                        connections.push([i, j, opacity]);
                        drawConnection(neurons[i], neurons[j], opacity);
                    }
                }
            }

            // Spawn new impulses randomly
            if (connections.length > 0 && Math.random() < IMPULSE_CHANCE) {
                const connection = connections[Math.floor(Math.random() * connections.length)];
                const direction = Math.random() > 0.5 ? 1 : 0;
                if (direction) {
                    createImpulse(connection[0], connection[1]);
                } else {
                    createImpulse(connection[1], connection[0]);
                }

                if (Math.random() < 0.4 && connections.length > 0) {
                    const connection2 = connections[Math.floor(Math.random() * connections.length)];
                    const direction2 = Math.random() > 0.5 ? 1 : 0;
                    if (direction2) {
                        createImpulse(connection2[0], connection2[1]);
                    } else {
                        createImpulse(connection2[1], connection2[0]);
                    }
                }
            }

            // Update and draw impulses
            for (let i = impulses.length - 1; i >= 0; i--) {
                impulses[i].progress += impulses[i].speed;
                if (impulses[i].progress >= 1) {
                    impulses.splice(i, 1);
                } else {
                    drawImpulse(impulses[i]);
                }
            }

            // Draw neurons with pulsing effect
            neurons.forEach((neuron, index) => {
                const pulse = Math.sin(time + index * 0.5) * 0.5 + 0.5;
                drawNeuron(neuron, pulse);
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        const handleVisibilityChange = () => {
            if (document.hidden) {
                cancelAnimationFrame(animationFrameId);
            } else {
                animate();
            }
        };

        // Add visualViewport resize listener for iOS Safari dynamic toolbar
        const handleViewportResize = () => resizeCanvas();
        if (window.visualViewport) {
            window.visualViewport.addEventListener('resize', handleViewportResize);
        }

        window.addEventListener('resize', debouncedResize);
        document.addEventListener('visibilitychange', handleVisibilityChange);
        animate();

        return () => {
            if (window.visualViewport) {
                window.visualViewport.removeEventListener('resize', handleViewportResize);
            }
            window.removeEventListener('resize', debouncedResize);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            cancelAnimationFrame(animationFrameId);
        };
    }, [prefersReducedMotion, baseColor, pathname]);

    // Fondo estático cuando se prefiere movimiento reducido
    if (prefersReducedMotion) {
        return (
            <div
                className="fixed inset-0 w-full h-full"
                style={{
                    zIndex: -1,
                    backgroundColor: '#0a0a0b',
                    backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.02) 0%, transparent 50%)'
                }}
                aria-hidden="true"
            />
        );
    }

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 block"
            style={{
                zIndex: -1,
                width: '100vw',
                height: '100vh',
                minHeight: '100%',
                willChange: 'transform',
                transform: 'translateZ(0)',
                backgroundColor: '#0a0a0b',
            }}
            aria-hidden="true"
        />
    );
});

InteractiveBackground.displayName = 'InteractiveBackground';
