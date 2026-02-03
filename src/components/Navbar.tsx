"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export const Navbar = () => {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    // Cerrar menú al hacer clic fuera
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent | TouchEvent) => {
            if (
                isOpen &&
                menuRef.current &&
                buttonRef.current &&
                !menuRef.current.contains(event.target as Node) &&
                !buttonRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('touchstart', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
        };
    }, [isOpen]);

    const links = [
        { href: "/", label: "Inicio" },
        { href: "/terapias", label: "Terapias" },
        { href: "/sobre-mi", label: "Sobre Mí" },
        { href: "/ubicacion", label: "Ubicación" },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center py-4 md:py-6 pointer-events-none">
            {/* Desktop Menu */}
            <div className="hidden md:flex bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3 gap-8 pointer-events-auto shadow-2xl">
                {links.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                        <Link key={link.href} href={link.href} className="relative group">
                            <span
                                className={`text-sm font-medium transition-colors duration-300 ${isActive ? "text-white" : "text-gray-400 group-hover:text-white"
                                    }`}
                            >
                                {link.label}
                            </span>
                            {isActive && (
                                <motion.div
                                    layoutId="navbar-underline"
                                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full"
                                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                />
                            )}
                        </Link>
                    );
                })}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden pointer-events-auto absolute top-4 right-4 z-50">
                <button
                    ref={buttonRef}
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-3 bg-white/10 backdrop-blur-md rounded-full border border-white/10 text-white shadow-lg"
                    aria-label="Menu"
                >
                    {isOpen ? (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    ) : (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                    )}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        ref={menuRef}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="absolute top-20 left-4 right-4 p-6 bg-[#0a0a0a]/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl pointer-events-auto md:hidden flex flex-col gap-4 z-40"
                    >
                        {links.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className={`text-lg font-medium p-3 rounded-xl transition-all ${isActive ? "bg-white/10 text-white pl-6" : "text-gray-400 hover:text-white hover:bg-white/5"}`}
                                >
                                    {link.label}
                                </Link>
                            );
                        })}
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};
