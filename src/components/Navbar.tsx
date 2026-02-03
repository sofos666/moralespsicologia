"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export const Navbar = () => {
    const pathname = usePathname();

    const links = [
        { href: "/", label: "Inicio" },
        { href: "/terapias", label: "Terapias" },
        { href: "/ubicacion", label: "Ubicación" },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center py-6 pointer-events-none">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3 flex gap-8 pointer-events-auto shadow-2xl">
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
        </nav>
    );
};
