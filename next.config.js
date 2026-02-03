/** @type {import('next').NextConfig} */
const nextConfig = {
  // Compresión y optimización
  compress: true,
  poweredByHeader: false,

  // Optimización de imágenes
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Experimental features para mejor performance
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['framer-motion', 'lucide-react'],
  },

  // Production optimizations
  productionBrowserSourceMaps: false,
  reactStrictMode: true,
  // Note: swcMinify is deprecated in Next.js 16 (enabled by default)

  // Para analizar el bundle size, ejecutar:
  // ANALYZE=true npm run build
  // Requiere: npm install -D @next/bundle-analyzer
};

module.exports = nextConfig;