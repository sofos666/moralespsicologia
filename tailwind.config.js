/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                terracota: '#c66b4d',
                solar: '#f2b705',
                'blue-ethereal': '#7dd3fc',
                'luxury-olive': '#556b2f',
                foreground: 'var(--foreground)',
                background: 'var(--background)',
                // Categorías de servicios
                'cat-kids': '#34d399',
                'cat-adult': '#60a5fa',
                'cat-teen': '#a78bfa',
                'cat-family': '#818cf8',
                'cat-couples': '#fb7185',
                'cat-burnout': '#10b981',
                'cat-exec': '#fbbf24',
                'cat-digital': '#22d3ee',
            },
            fontFamily: {
                outfit: ['var(--font-outfit)', 'sans-serif'],
                serif: ['var(--font-merriweather)', 'serif'],
            },
        },
    },
    future: {
        hoverOnlyWhenSupported: true,
    },
    corePlugins: {
        preflight: true,
    },
    plugins: [],
}
