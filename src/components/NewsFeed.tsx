'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Article {
    id: string;
    title: string;
    summary: string;
    link: string;
    source: string;
    sourceColor: string;
    publishedAt: string;
}

interface NewsResponse {
    articles: Article[];
    total: number;
}

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Hoy';
    if (diffDays === 1) return 'Ayer';
    if (diffDays < 7) return `Hace ${diffDays} días`;

    return date.toLocaleDateString('es-CO', {
        day: 'numeric',
        month: 'short'
    });
};

const ArticleSkeleton = () => (
    <div className="flex-shrink-0 w-80 bg-metallic-dark/50 rounded-2xl p-5 animate-pulse">
        <div className="flex items-center gap-2 mb-3">
            <div className="w-20 h-5 bg-white/10 rounded-full" />
            <div className="w-16 h-4 bg-white/5 rounded" />
        </div>
        <div className="w-full h-5 bg-white/10 rounded mb-2" />
        <div className="w-3/4 h-5 bg-white/10 rounded mb-3" />
        <div className="w-full h-4 bg-white/5 rounded mb-2" />
        <div className="w-5/6 h-4 bg-white/5 rounded" />
    </div>
);

export function NewsFeed() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const fetchArticles = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/news');
            if (!response.ok) throw new Error('Error al cargar artículos');

            const data: NewsResponse = await response.json();
            setArticles(data.articles);
        } catch (err) {
            setError('No se pudieron cargar las noticias.');
            console.error('Error fetching articles:', err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchArticles();
    }, []);

    const checkScrollButtons = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
        }
    };

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (container) {
            container.addEventListener('scroll', checkScrollButtons);
            checkScrollButtons();
            return () => container.removeEventListener('scroll', checkScrollButtons);
        }
    }, [articles]);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = 340; // Card width + gap
            const newScrollLeft = scrollContainerRef.current.scrollLeft +
                (direction === 'left' ? -scrollAmount : scrollAmount);

            scrollContainerRef.current.scrollTo({
                left: newScrollLeft,
                behavior: 'smooth'
            });
        }
    };

    if (error && articles.length === 0) {
        return (
            <div className="text-center py-8">
                <p className="text-gray-500 text-sm">{error}</p>
            </div>
        );
    }

    return (
        <div className="w-full">
            {/* Header with navigation arrows */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-white">
                        Lecturas <span className="text-emerald-400">Recomendadas</span>
                    </h2>
                    <p className="text-gray-500 text-sm mt-1">
                        Artículos sobre salud mental y bienestar
                    </p>
                </div>

                {/* Navigation Arrows - Hidden on mobile, visible on desktop */}
                <div className="hidden md:flex items-center gap-2">
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => scroll('left')}
                        disabled={!canScrollLeft}
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${canScrollLeft
                            ? 'bg-white/10 hover:bg-white/20 text-white cursor-pointer'
                            : 'bg-white/5 text-gray-600 cursor-not-allowed'
                            }`}
                        aria-label="Anterior"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => scroll('right')}
                        disabled={!canScrollRight}
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${canScrollRight
                            ? 'bg-white/10 hover:bg-white/20 text-white cursor-pointer'
                            : 'bg-white/5 text-gray-600 cursor-not-allowed'
                            }`}
                        aria-label="Siguiente"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </motion.button>
                </div>
            </div>

            {/* Horizontal Carousel */}
            <div className="relative">
                <div
                    ref={scrollContainerRef}
                    className="flex gap-4 md:gap-5 overflow-x-auto scrollbar-hide pb-4 -mx-6 px-6 scroll-smooth snap-x snap-mandatory md:snap-none"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {isLoading ? (
                        <>
                            <ArticleSkeleton />
                            <ArticleSkeleton />
                            <ArticleSkeleton />
                            <ArticleSkeleton />
                        </>
                    ) : (
                        <AnimatePresence mode="popLayout">
                            {articles.map((article, index) => (
                                <motion.a
                                    key={article.id}
                                    href={article.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.05 }}
                                    className="flex-shrink-0 w-[85vw] sm:w-80 group bg-metallic-dark/60 backdrop-blur-sm rounded-2xl p-5 border border-white/5 hover:border-white/20 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/5 snap-center"
                                >
                                    {/* Source Badge & Date */}
                                    <div className="flex items-center justify-between mb-3">
                                        <span
                                            className="px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wide"
                                            style={{
                                                backgroundColor: `${article.sourceColor}20`,
                                                color: article.sourceColor
                                            }}
                                        >
                                            {article.source}
                                        </span>
                                        <span className="text-[10px] text-gray-500">
                                            {formatDate(article.publishedAt)}
                                        </span>
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-base font-semibold text-white mb-2 line-clamp-2 group-hover:text-emerald-300 transition-colors leading-snug">
                                        {article.title}
                                    </h3>

                                    {/* Summary */}
                                    <p className="text-gray-400 text-xs leading-relaxed line-clamp-3">
                                        {article.summary}
                                    </p>

                                    {/* Read More */}
                                    <div className="mt-3 flex items-center text-emerald-400 text-xs font-medium group-hover:text-emerald-300">
                                        <span>Leer artículo</span>
                                        <svg
                                            className="w-3.5 h-3.5 ml-1 transform group-hover:translate-x-1 transition-transform"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </motion.a>
                            ))}
                        </AnimatePresence>
                    )}
                </div>

                {/* Gradient fade edges */}
                <div className="absolute left-0 top-0 bottom-4 w-6 bg-gradient-to-r from-black/80 to-transparent pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-4 w-6 bg-gradient-to-l from-black/80 to-transparent pointer-events-none" />
            </div>
        </div>
    );
}
