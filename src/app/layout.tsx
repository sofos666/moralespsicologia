import type { Metadata } from "next";
import { Outfit, Merriweather } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { InteractiveBackground } from "@/components/InteractiveBackground";
import { BorromeanKnot } from "@/components/BorromeanKnot";
import { Navbar } from "@/components/Navbar";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const merriweather = Merriweather({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-merriweather",
});

export const metadata: Metadata = {
  title: "Psic. Cristian Morales | MVP - Morales Velásquez Psicólogo",
  description: "Psicoterapia privada de alta especialidad en Medellín. Atención a niños, adolescentes, adultos, parejas y ejecutivos. +10 años de experiencia transformando vidas.",
  keywords: ["psicólogo Medellín", "psicoterapia", "terapia de pareja", "psicología infantil", "estrés laboral", "burnout", "Cristian Morales", "salud mental"],
  authors: [{ name: "Psic. Cristian Morales Velásquez" }],
  creator: "Psic. Cristian Morales Velásquez",
  metadataBase: new URL("https://psicologomorales.com"),
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: "https://psicologomorales.com",
    siteName: "MVP - Morales Velásquez Psicólogo",
    title: "Psic. Cristian Morales | Psicoterapia de Alta Especialidad",
    description: "Arquitectura Mental para Líderes & Familias. Psicoterapia privada en Medellín con +10 años de experiencia.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Psic. Cristian Morales - Psicoterapia de Alta Especialidad",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Psic. Cristian Morales | MVP - Morales Velásquez Psicólogo",
    description: "Psicoterapia privada de alta especialidad en Medellín. Atención a niños, adolescentes, adultos, parejas y ejecutivos.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark scroll-smooth" suppressHydrationWarning>
      <head>
        {/* Preconnect to external resources */}
        <link rel="preconnect" href="https://cdn.lordicon.com" />
        <link rel="preconnect" href="https://animatedicons.co" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      </head>
      <body className={`${outfit.variable} ${merriweather.variable} antialiased`}>
        {/* Structured Data for SEO */}
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MedicalBusiness",
              "name": "Psic. Cristian Morales Velásquez",
              "description": "Psicoterapia privada de alta especialidad en Medellín. Atención a niños, adolescentes, adultos, parejas y ejecutivos.",
              "url": "https://psicologomorales.com",
              "telephone": "+57-301-497-5393",
              "email": "cristianpsicologomed@gmail.com",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Medellín",
                "addressRegion": "Antioquia",
                "addressCountry": "CO"
              },
              "priceRange": "$$",
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                  "opens": "08:00",
                  "closes": "18:00"
                }
              ],
              "areaServed": {
                "@type": "City",
                "name": "Medellín"
              },
              "medicalSpecialty": "Psychology",
              "knowsAbout": [
                "Psicoterapia Infantil",
                "Terapia de Adolescentes",
                "Terapia de Adultos",
                "Terapia de Pareja",
                "Terapia Familiar",
                "Burnout",
                "Consultoría Ejecutiva",
                "Nomofobia"
              ]
            })
          }}
        />

        <InteractiveBackground />
        <BorromeanKnot />
        <Navbar />
        {children}

        {/* Global Scripts for Interactive Icons */}
        <Script
          src="https://animatedicons.co/scripts/animated-icons.js"
          strategy="lazyOnload"
        />
        <Script
          src="https://cdn.lordicon.com/lordicon.js"
          strategy="lazyOnload"
        />
        <Script id="global-icons-config" strategy="lazyOnload">
          {`
            window.ANIMATED_ICONS_CONFIG = {
              token: 'd6c93fe3-7bec-4d20-ac89-b0d803ce118f'
            };
          `}
        </Script>
      </body>
    </html>
  );
}
