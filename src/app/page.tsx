"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { TiltCard } from '@/components/TiltCard';
import { AnimatePresence, motion } from 'framer-motion';
import Script from 'next/script';
import { Footer } from '@/components/Footer';
import { NewsFeed } from '@/components/NewsFeed';

// Lazy load heavy modal components
const VirtualBookingForm = dynamic(
  () => import('@/components/VirtualBookingForm').then(mod => ({ default: mod.VirtualBookingForm })),
  { ssr: false }
);

const TriageWizard = dynamic(
  () => import('@/components/TriageWizard').then(mod => ({ default: mod.TriageWizard })),
  { ssr: false }
);

type Category = 'Niños' | 'Adolescentes' | 'Adultos' | 'Parejas' | 'Estrés Laboral' | 'Alta Gerencia' | 'Nomofobia' | 'Familia';

export default function Home() {
  const [activeTriage, setActiveTriage] = useState<Category | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const execIconRef = useRef<HTMLElement>(null);

  // Detectar si es dispositivo móvil para animaciones condicionales
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (execIconRef.current) {
      execIconRef.current.setAttribute('attributes', '{"variationThumbColour":"#f2b705","variationName":"Two Tone","variationNumber":2,"numberOfGroups":2,"backgroundIsGroup":false,"strokeWidth":1,"defaultColours":{"group-1":"#ffffff","group-2":"#f2b705","background":"#00000000"}}');
    }
  }, []);

  return (
    <main className="min-h-screen relative z-10 overflow-hidden bg-transparent">
      <AnimatePresence>
        {activeTriage && (
          <TriageWizard
            category={activeTriage}
            onClose={() => setActiveTriage(null)}
          />
        )}
        {isBookingOpen && (
          <VirtualBookingForm
            onClose={() => setIsBookingOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative z-10 container mx-auto px-6 pt-32 pb-8 text-center">
        <div className="inline-flex items-center gap-2 px-6 py-2 mb-8 glass-effect rounded-full border-olive/20 text-olive">
          <span className="w-2 h-2 rounded-full bg-olive animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-[0.3em]">
            MVP: Morales Velásquez Psicólogo | Horizonte 2026
          </span>
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-hero font-bold mb-8 text-luxury-olive leading-tight tracking-tighter"
        >
          No seas el síntoma de otros
        </motion.h1>

        <p className="max-w-2xl mx-auto text-gray-400 text-body-responsive mb-12 leading-relaxed font-light">
          Psicoterapia privada de alta especialidad en Medellín. <br className="hidden md:block" />
          Un encuentro con la verdad de su deseo.
        </p>

        <div className="flex flex-col items-center justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsBookingOpen(true)}
            className="btn-luxury w-full sm:w-80 shadow-2xl shadow-solar/20 group relative overflow-hidden py-5 !text-white touch-target touch-manipulation focus-ring"
            aria-label="Abrir formulario de reserva virtual"
          >
            <span className="relative z-10 text-white">Atención virtual con precios especiales</span>
            <div
              className="absolute inset-0 bg-gradient-to-r from-solar/0 via-white/20 to-solar/0 translate-x-[-100%] animate-shine"
            />
          </motion.button>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-8 text-luxury-olive/60 text-xl md:text-2xl font-light tracking-wide max-w-3xl text-center leading-relaxed"
          >
            Realiza el <span className="text-luxury-olive font-bold text-3xl md:text-4xl block sm:inline mt-2 sm:mt-0">triaje virtual</span> y ten un <span className="text-solar font-bold text-4xl md:text-5xl block sm:inline mt-2 sm:mt-0">40% de descuento</span> en tu primera cita. Presencial o Virtual.
          </motion.p>
        </div>
      </section>

      {/* Ethical Note - Disclaimer */}
      <section className="relative z-10 container mx-auto px-6 py-4 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="max-w-4xl mx-auto text-gray-500 text-xs md:text-sm italic font-light leading-relaxed border-t border-b border-white/5 py-4"
        >
          <span className="text-luxury-olive font-medium not-italic uppercase tracking-widest mr-2 text-[10px]">Nota Ética:</span>
          Este triaje es una herramienta de orientación preliminar y no constituye un diagnóstico clínico formal. Su objetivo es identificar la pertinencia de una consulta profesional con el Psic. Cristian Morales.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
          className="mt-6 text-gray-300 text-sm md:text-base font-light tracking-wide"
        >
          Para comenzar su Triaje, <span className="text-emerald-400 font-medium">haga clic en la tarjeta de abajo</span> que mejor describa su situación actual:
        </motion.p>
      </section>

      {/* Features / Bento Grid */}
      <section className="relative z-10 container mx-auto px-6 pt-6 pb-20">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 auto-rows-[180px] sm:auto-rows-[280px]">

          {/* Main Infantil Card - Now the flagship card */}
          <TiltCard className="sm:col-span-2 sm:row-span-2">
            <div
              onClick={() => setActiveTriage('Niños')}
              onKeyDown={(e) => e.key === 'Enter' && setActiveTriage('Niños')}
              role="button"
              tabIndex={0}
              className="h-full bg-metallic-dark p-4 sm:p-12 rounded-[1.5rem] sm:rounded-[2.5rem] flex flex-col justify-end group cursor-pointer relative overflow-hidden group/main focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
            >
              {/* Diseño Lineal Central - Animación condicional: permanente en móvil, hover en desktop */}
              <div className="absolute inset-0 flex items-center justify-center opacity-40 md:opacity-25 group-hover:opacity-40 transition-all duration-700 scale-50 md:scale-100">
                <motion.svg
                  className="w-56 h-56 text-emerald-400"
                  viewBox="0 0 100 100"
                  fill="none"
                  stroke="currentColor"
                  initial={isMobile ? false : "rest"}
                  whileHover={isMobile ? undefined : "hover"}
                  animate={isMobile ? "hover" : undefined}
                >
                  <motion.rect
                    x="35" y="60" width="30" height="30" rx="4" strokeWidth="1.5"
                    variants={{
                      rest: { y: 0 },
                      hover: { y: [0, -5, 0], transition: { duration: 4, repeat: Infinity, ease: "easeInOut" } }
                    }}
                  />
                  <motion.rect
                    x="40" y="35" width="20" height="20" rx="3" strokeWidth="1.5"
                    variants={{
                      rest: { rotate: 0, scale: 1 },
                      hover: { rotate: [0, 90, 180, 270, 360], scale: [1, 1.1, 1], transition: { duration: 8, repeat: Infinity, ease: "linear" } }
                    }}
                    style={{ transformOrigin: "50px 45px" }}
                  />
                  <motion.circle
                    cx="50" cy="20" r="8" strokeWidth="1.5"
                    variants={{
                      rest: { y: 0, scale: 1 },
                      hover: { y: [0, -10, 0], scale: [1, 1.2, 1], transition: { duration: 3, repeat: Infinity, ease: "easeInOut" } }
                    }}
                  />
                  <motion.g
                    variants={{
                      rest: { opacity: 0.3, scale: 0.7 },
                      hover: { opacity: [0.3, 1, 0.3], scale: [0.7, 1.3, 0.7], transition: { duration: 3, repeat: Infinity } }
                    }}
                    style={{ transformOrigin: "50px 50px" }}
                  >
                    <circle cx="20" cy="30" r="2" fill="currentColor" />
                    <circle cx="80" cy="40" r="1.5" fill="currentColor" />
                    <circle cx="25" cy="80" r="2" fill="currentColor" />
                    <circle cx="75" cy="70" r="1.5" fill="currentColor" />
                  </motion.g>
                </motion.svg>
              </div>

              {/* Icon - responsive */}
              <div className="mb-auto z-10 w-full flex justify-end">
                <div className="w-10 h-10 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-emerald-500/5 flex items-center justify-center mb-2 sm:mb-6 group-hover:scale-110 group-hover:bg-emerald-500/20 transition-all duration-500">
                  <svg className="w-5 h-5 sm:w-8 sm:h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-base sm:text-4xl font-bold mb-1 sm:mb-4 text-white tracking-tight z-10">Psicoterapia <span className="text-emerald-300">Infantil</span></h3>
              <p className="text-gray-400 text-[10px] sm:text-lg leading-tight sm:leading-relaxed max-w-sm z-10 block">Constitución psíquica y estructuración del sujeto. Abordaje de los síntomas en la infancia desde la escucha analítica.</p>
              <div className="absolute inset-0 flex md:hidden items-center justify-center opacity-20 pointer-events-none z-0">
                <motion.svg className="w-32 h-32 text-emerald-400/30" viewBox="0 0 100 100" fill="none" stroke="currentColor">
                  <circle cx="50" cy="50" r="30" strokeWidth="1" />
                  <rect x="35" y="35" width="30" height="30" strokeWidth="1" />
                </motion.svg>
              </div>

              <motion.div
                animate={{ opacity: [0.1, 0.2, 0.1] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -bottom-20 -right-20 w-40 sm:w-80 h-40 sm:h-80 bg-emerald-500/10 rounded-full blur-3xl"
              />
            </div>
          </TiltCard>

          {/* Adultos */}
          <TiltCard className="sm:col-span-2">
            <div
              onClick={() => setActiveTriage('Adultos')}
              onKeyDown={(e) => e.key === 'Enter' && setActiveTriage('Adultos')}
              role="button"
              tabIndex={0}
              className="h-full bg-metallic-dark p-4 sm:p-8 rounded-[1.5rem] sm:rounded-[2rem] flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-8 group cursor-pointer transition-all duration-500 relative overflow-hidden group/adult focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            >
              {/* Diseño Lineal Central - LordIcon Adultos */}
              <div className="absolute inset-0 flex items-center justify-center opacity-40 md:opacity-25 group-hover:opacity-60 transition-all duration-700 z-10 scale-50 md:scale-100">
                {/* @ts-ignore */}
                <lord-icon
                  src="https://cdn.lordicon.com/shcfcebj.json"
                  trigger={isMobile ? "loop" : "hover"}
                  delay={isMobile ? "1500" : undefined}
                  colors="primary:#60a5fa,secondary:#93c5fd"
                  style={{ width: '250px', height: '250px' }}
                />
              </div>

              <div className="flex-1 z-10">
                <h3 className="text-base sm:text-2xl font-bold mb-1 sm:mb-2 text-blue-300">Adultos</h3>
                <p className="text-gray-400 text-[10px] sm:text-xs leading-tight block">Escucha de lo inconsciente, análisis de la repetición y elaboración de los conflictos subjetivos.</p>
              </div>
              <div className="w-10 h-10 sm:w-20 sm:h-20 rounded-full bg-cat-adult/20 flex items-center justify-center group-hover/adult:scale-110 transition-all duration-500 z-10 absolute top-4 right-4 sm:relative sm:top-auto sm:right-auto">
                <svg className="w-5 h-5 sm:w-8 sm:h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </TiltCard>


          {/* Adolescentes */}
          <TiltCard>
            <div
              onClick={() => setActiveTriage('Adolescentes')}
              onKeyDown={(e) => e.key === 'Enter' && setActiveTriage('Adolescentes')}
              role="button"
              tabIndex={0}
              className="h-full bg-metallic-dark p-4 sm:p-8 rounded-[1.5rem] sm:rounded-[2rem] flex flex-col justify-between group cursor-pointer transition-all duration-500 overflow-hidden group/teen relative focus:outline-none focus:ring-2 focus:ring-violet-500/50"
            >
              <div className="absolute top-4 right-4 sm:top-8 sm:right-8 w-10 h-10 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-cat-teen/10 flex items-center justify-center group-hover:bg-cat-teen/20 transition-all duration-500 z-10">
                <svg className="w-5 h-5 sm:w-8 sm:h-8 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" /></svg>
              </div>

              {/* Diseño Lineal Central - Animación condicional: permanente en móvil, hover en desktop */}
              <div className="absolute inset-0 flex items-center justify-center opacity-40 md:opacity-25 group-hover:opacity-40 transition-all duration-700 scale-50 md:scale-100">
                <motion.svg
                  className="w-56 h-56 text-violet-400"
                  viewBox="0 0 100 100"
                  fill="none"
                  stroke="currentColor"
                  initial={isMobile ? false : "rest"}
                  whileHover={isMobile ? undefined : "hover"}
                  animate={isMobile ? "hover" : undefined}
                >
                  <motion.path
                    d="M20 50 Q35 20 50 50 T80 50"
                    strokeWidth="1.5"
                    variants={{
                      rest: { d: "M20 50 Q35 20 50 50 T80 50" },
                      hover: {
                        d: ["M20 50 Q35 20 50 50 T80 50", "M20 50 Q35 80 50 50 T80 50", "M20 50 Q35 20 50 50 T80 50"],
                        transition: { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
                      }
                    }}
                  />
                  <motion.path
                    d="M10 50 Q35 30 50 50 T90 50"
                    strokeWidth="1"
                    opacity="0.5"
                    variants={{
                      rest: { d: "M10 50 Q35 30 50 50 T90 50" },
                      hover: {
                        d: ["M10 50 Q35 30 50 50 T90 50", "M10 50 Q35 70 50 50 T90 50", "M10 50 Q35 30 50 50 T90 50"],
                        transition: { duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }
                      }
                    }}
                  />
                  <motion.g
                    variants={{
                      rest: { rotate: 0 },
                      hover: { rotate: 360, transition: { duration: 20, repeat: Infinity, ease: "linear" } }
                    }}
                    style={{ transformOrigin: "50px 50px" }}
                  >
                    <circle cx="50" cy="15" r="2" fill="currentColor" opacity="0.8" />
                    <circle cx="50" cy="85" r="2" fill="currentColor" opacity="0.8" />
                    <circle cx="15" cy="50" r="2" fill="currentColor" opacity="0.8" />
                    <circle cx="85" cy="50" r="2" fill="currentColor" opacity="0.8" />
                  </motion.g>
                </motion.svg>
              </div>

              <h3 className="text-sm sm:text-xl font-bold text-violet-300 z-10">Adolescentes</h3>
              <p className="text-gray-500 text-[10px] sm:text-xs z-10 block leading-tight mt-1">Identidad, redes y bienestar emocional.</p>
              <div className="absolute -bottom-4 -right-4 w-16 sm:w-24 h-16 sm:h-24 bg-cat-teen/20 rounded-full blur-2xl" />
            </div>
          </TiltCard>

          {/* Parejas */}
          <TiltCard>
            <div
              onClick={() => setActiveTriage('Parejas')}
              onKeyDown={(e) => e.key === 'Enter' && setActiveTriage('Parejas')}
              role="button"
              tabIndex={0}
              className="h-full bg-metallic-dark p-4 sm:p-8 rounded-[1.5rem] sm:rounded-[2rem] flex flex-col justify-between group cursor-pointer transition-all duration-500 overflow-hidden group/couples relative focus:outline-none focus:ring-2 focus:ring-rose-500/50"
            >
              <div className="absolute top-4 right-4 sm:top-8 sm:right-8 w-10 h-10 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-cat-couples/10 flex items-center justify-center group-hover:bg-cat-couples/20 transition-all duration-500 z-10">
                <svg className="w-5 h-5 sm:w-8 sm:h-8 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
              </div>

              {/* Diseño Lineal Central - LordIcon Parejas */}
              <div className="absolute inset-0 flex items-center justify-center opacity-40 md:opacity-25 group-hover:opacity-80 transition-all duration-700 z-10 scale-50 md:scale-100">
                {/* @ts-ignore */}
                <lord-icon
                  src="https://cdn.lordicon.com/nvsfzbop.json"
                  trigger={isMobile ? "loop" : "hover"}
                  delay={isMobile ? "2000" : undefined}
                  colors="primary:#fb7185,secondary:#fda4af"
                  style={{ width: '150px', height: '150px' }}
                />
              </div>

              <h3 className="text-sm sm:text-xl font-bold text-rose-300 z-10">Parejas</h3>
              <p className="text-gray-500 text-[10px] sm:text-xs z-10 block leading-tight mt-1">Análisis de los nudos inconscientes y la repetición en el vínculo.</p>
              <div className="absolute -bottom-4 -right-4 w-16 sm:w-24 h-16 sm:h-24 bg-cat-couples/20 rounded-full blur-2xl" />
            </div>
          </TiltCard>

          {/* Alta Gerencia */}
          <TiltCard>
            <div
              onClick={() => setActiveTriage('Alta Gerencia')}
              className="h-full bg-metallic-dark p-4 sm:p-8 rounded-[1.5rem] sm:rounded-[2rem] flex flex-col justify-between group cursor-pointer transition-all duration-500 relative overflow-hidden group/exec"
            >
              <h3 className="text-sm sm:text-xl font-bold text-amber-300 z-10 pointer-events-none">Alta Gerencia</h3>

              {/* Diseño Central - LordIcon Alta Gerencia */}
              <div className="absolute inset-0 flex items-center justify-center opacity-40 md:opacity-25 group-hover:opacity-80 transition-all duration-700 z-10 scale-50 md:scale-100">
                {/* @ts-ignore */}
                <lord-icon
                  src="https://cdn.lordicon.com/lbcxnxti.json"
                  trigger={isMobile ? "loop" : "hover"}
                  delay={isMobile ? "2500" : undefined}
                  colors="primary:#fbbf24,secondary:#f59e0b"
                  style={{ width: '150px', height: '150px' }}
                />
              </div>

              <div className="absolute top-4 right-4 sm:top-8 sm:right-8 w-10 h-10 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-cat-exec/20 flex items-center justify-center group-hover:rotate-12 transition-all duration-500 z-20 pointer-events-none">
                <svg className="w-5 h-5 sm:w-8 sm:h-8 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>

              <p className="text-gray-300 text-[10px] sm:text-xs z-10 pointer-events-none block leading-tight mt-1">Resiliencia corporativa y soledad del líder.</p>

              <div className="absolute inset-0 bg-cat-exec/5" />
            </div>
          </TiltCard>

          {/* Familia */}
          <TiltCard>
            <div
              onClick={() => setActiveTriage('Familia')}
              className="h-full bg-metallic-dark p-4 sm:p-8 rounded-[1.5rem] sm:rounded-[2rem] flex flex-col justify-between group cursor-pointer transition-all duration-500 relative overflow-hidden group/family"
            >
              <div className="absolute top-4 right-4 sm:top-8 sm:right-8 w-10 h-10 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-cat-family/20 flex items-center justify-center group-hover:bg-cat-family/30 transition-all duration-500 z-10">
                <svg className="w-5 h-5 sm:w-8 sm:h-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
              </div>

              {/* Diseño Central - Familia LordIcon */}
              <div className="absolute inset-0 flex items-center justify-center opacity-40 md:opacity-25 group-hover:opacity-80 transition-all duration-700 z-10 scale-50 md:scale-100">
                {/* @ts-ignore */}
                <lord-icon
                  src="https://cdn.lordicon.com/jeuxydnh.json"
                  trigger={isMobile ? "loop" : "hover"}
                  delay={isMobile ? "1800" : undefined}
                  colors="primary:#818cf8,secondary:#c7d2fe"
                  style={{ width: '150px', height: '150px' }}
                />
              </div>

              <h3 className="text-sm sm:text-xl font-bold text-indigo-300 z-10">Familia</h3>
              <p className="text-gray-500 text-[10px] sm:text-xs z-10 block leading-tight mt-1">Dinámicas vinculares y resolución de conflictos.</p>
              <div className="absolute inset-0 bg-cat-family/5" />
            </div>
          </TiltCard>

          {/* Estrés Laboral */}
          <TiltCard>
            <div
              onClick={() => setActiveTriage('Estrés Laboral')}
              className="h-full bg-metallic-dark p-4 sm:p-8 rounded-[1.5rem] sm:rounded-[2rem] flex flex-col justify-between group cursor-pointer transition-all duration-500 relative overflow-hidden group/burnout"
            >
              <div className="absolute top-4 right-4 sm:top-8 sm:right-8 w-10 h-10 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-cat-burnout/20 flex items-center justify-center group-hover:bg-cat-burnout/30 transition-all duration-500 z-10">
                <svg className="w-5 h-5 sm:w-8 sm:h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" /></svg>
              </div>

              {/* Diseño Lineal Central - LordIcon Burnout */}
              <div className="absolute inset-0 flex items-center justify-center opacity-40 md:opacity-25 group-hover:opacity-80 transition-all duration-700 z-10 scale-50 md:scale-100">
                {/* @ts-ignore */}
                <lord-icon
                  src="https://cdn.lordicon.com/arwxzizt.json"
                  trigger={isMobile ? "loop" : "hover"}
                  delay={isMobile ? "2200" : undefined}
                  colors="primary:#34d399,secondary:#6ee7b7"
                  style={{ width: '150px', height: '150px' }}
                />
              </div>

              <h3 className="text-sm sm:text-xl font-bold text-emerald-200 z-10">Burnout</h3>
              <p className="text-gray-500 text-[10px] sm:text-xs z-10 block leading-tight mt-1">Manejo del estrés laboral crónico.</p>
              <div className="absolute -bottom-6 -right-6 w-16 sm:w-24 h-16 sm:h-24 border-[0.5px] border-emerald-500/20 rounded-full" />
            </div>
          </TiltCard>

          {/* Nomofobia */}
          <TiltCard>
            <div
              onClick={() => setActiveTriage('Nomofobia')}
              className="h-full bg-metallic-dark p-4 sm:p-8 rounded-[1.5rem] sm:rounded-[2rem] flex flex-col justify-between group cursor-pointer transition-all duration-500 relative overflow-hidden group/digital"
            >
              <div className="absolute top-4 right-4 sm:top-8 sm:right-8 w-10 h-10 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-cat-digital/10 flex items-center justify-center group-hover:bg-cat-digital/20 transition-all duration-500 z-10">
                <svg className="w-5 h-5 sm:w-8 sm:h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
              </div>

              {/* Diseño Lineal Central - Animación condicional: permanente en móvil, hover en desktop */}
              <div className="absolute inset-0 flex items-center justify-center opacity-40 md:opacity-25 group-hover:opacity-40 transition-all duration-700 scale-50 md:scale-100">
                <motion.svg
                  className="w-56 h-56 text-cyan-400"
                  viewBox="0 0 100 100"
                  fill="none"
                  stroke="currentColor"
                  initial={isMobile ? false : "rest"}
                  whileHover={isMobile ? undefined : "hover"}
                  animate={isMobile ? "hover" : undefined}
                >
                  <rect x="35" y="20" width="30" height="55" rx="4" strokeWidth="1.5" />
                  <rect x="38" y="28" width="24" height="38" strokeWidth="1" />
                  <circle cx="50" cy="70" r="2" strokeWidth="1" />
                  <motion.g
                    variants={{
                      rest: { scale: 1, opacity: 0.8 },
                      hover: { scale: [1, 1.3, 1], opacity: [0.8, 0.2, 0.8], transition: { duration: 2, repeat: Infinity } }
                    }}
                    style={{ transformOrigin: "50px 47px" }}
                  >
                    <ellipse cx="50" cy="47" rx="8" ry="6" strokeWidth="0.5" />
                  </motion.g>
                  <motion.g
                    variants={{
                      rest: { scale: 1, opacity: 0.6 },
                      hover: { scale: [1, 1.5, 1], opacity: [0.6, 0.1, 0.6], transition: { duration: 2, repeat: Infinity, delay: 0.3 } }
                    }}
                    style={{ transformOrigin: "50px 47px" }}
                  >
                    <ellipse cx="50" cy="47" rx="15" ry="12" strokeWidth="0.5" />
                  </motion.g>
                  <motion.g
                    variants={{
                      rest: { scale: 1, opacity: 0.4 },
                      hover: { scale: [1, 1.7, 1], opacity: [0.4, 0, 0.4], transition: { duration: 2, repeat: Infinity, delay: 0.6 } }
                    }}
                    style={{ transformOrigin: "50px 47px" }}
                  >
                    <ellipse cx="50" cy="47" rx="22" ry="18" strokeWidth="0.5" />
                  </motion.g>
                  <path d="M32 55 Q28 60 30 70 L35 68" strokeWidth="1" />
                  <path d="M68 55 Q72 60 70 70 L65 68" strokeWidth="1" />
                </motion.svg>
              </div>

              <h3 className="text-sm sm:text-xl font-bold text-cyan-200 z-10"><span className="hidden sm:inline">Nomofobia y adicción a internet</span><span className="sm:hidden">Nomofobia</span></h3>
              <p className="text-gray-500 text-[10px] sm:text-xs z-10 block leading-tight mt-1">Higiene digital y presencia real.</p>
              <div className="absolute -bottom-4 -right-4 w-12 sm:w-16 h-12 sm:h-16 bg-cat-digital/20 rounded-xl blur-xl" />
            </div>
          </TiltCard>

        </div>
      </section>

      {/* News Feed Section */}
      <section className="relative z-10 container mx-auto px-6 py-20">
        <NewsFeed />
      </section>

      <Footer />
    </main>
  );
}
