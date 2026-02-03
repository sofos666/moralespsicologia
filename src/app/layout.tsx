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

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://psicologomorales.com";

export const metadata: Metadata = {
  title: "Psic. Cristian Morales | MVP - Morales Velásquez Psicólogo",
  description: "Psicoterapia privada de alta especialidad en Medellín. Atención a niños, adolescentes, adultos, parejas y ejecutivos. +10 años de experiencia transformando vidas.",
  keywords: ["psicólogo Medellín", "psicoterapia", "terapia de pareja", "psicología infantil", "estrés laboral", "burnout", "Cristian Morales", "salud mental"],
  authors: [{ name: "Psic. Cristian Morales Velásquez" }],
  creator: "Psic. Cristian Morales Velásquez",
  metadataBase: new URL(baseUrl),
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: baseUrl,
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
              "alternateName": "MVP - Morales Velásquez Psicólogo",
              "description": "Consultorio de psicología clínica privada en Medellín. Especialista en psicoanálisis y salud mental para niños, adolescentes, adultos, parejas y alta gerencia. Atendemos ansiedad, depresión, burnout, conflictos familiares y adicciones digitales (nomofobia).",
              "image": `${baseUrl}/og-image.jpg`,
              "url": baseUrl,
              "telephone": "+57-301-497-5393",
              "email": "cristianpsicologomed@gmail.com",
              "priceRange": "$$",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Carrera 66ª # 34B - 08, Segundo piso",
                "addressLocality": "Medellín",
                "addressRegion": "Antioquia",
                "postalCode": "050030",
                "addressCountry": "CO"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 6.2407,
                "longitude": -75.5899
              },
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                  "opens": "07:00",
                  "closes": "20:00"
                }
              ],
              "areaServed": [
                { "@type": "City", "name": "Medellín" },
                { "@type": "City", "name": "Bello" },
                { "@type": "City", "name": "Envigado" },
                { "@type": "City", "name": "Sabaneta" },
                { "@type": "City", "name": "Rionegro" }
              ],
              "founder": {
                "@type": "Person",
                "name": "Cristian Morales Velásquez",
                "jobTitle": "Psicólogo Clínico, Social y Consultor Corporativo",
                "description": "Psicólogo con más de 10 años de experiencia. Especialista en trabajo clínico y comunitario con poblaciones vulnerables (Amazonía, NNA), Derechos Humanos y gestión de proyectos sociales. Experto en psicoanálisis, manejo de crisis y consultoría estratégica para empresas. Experiencia significativa en Taraira y el Gran Resguardo Indígena Yaigojé Apaporis.",
                "alumniOf": {
                  "@type": "CollegeOrUniversity",
                  "name": "Universidad Católica Luis Amigó"
                },
                "sameAs": [
                  "https://www.behance.net/cristianmoralesve",
                  "https://www.instagram.com/ellocom"
                ],
                "knowsAbout": [
                  "Psicología Clínica Infantil",
                  "Terapia de Pareja y Rupturas",
                  "Psicología Comunitaria",
                  "Intervención en Crisis",
                  "Poblaciones Vulnerables",
                  "Derechos Humanos",
                  "Orientación Vocacional",
                  "Manejo de Estrés y Ansiedad",
                  "Salud Mental Corporativa",
                  "Cosmovisión Indígena"
                ]
              },
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Catálogo de Servicios Psicológicos y Empresariales",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Psicoterapia Infantil y Adolescente",
                      "description": "Atención especializada para niños y jóvenes. Manejo de emociones, conducta, bullying y orientación vocacional para proyecto de vida."
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Terapia de Pareja y Manejo de Rupturas",
                      "description": "Espacio para resolver conflictos, superar infidelidades, mejorar la comunicación o acompañar procesos de separación saludables."
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Clínica de Ansiedad, Estrés y Angustia",
                      "description": "Tratamiento profundo para ataques de pánico, estrés crónico, duelo y depresión. Enfoque psicoanalítico."
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Servicios para Empresas y Bienestar Corporativo",
                      "description": "Consultoría en salud mental laboral, prevención de riesgo psicosocial (Batería), talleres de manejo de estrés y liderazgo."
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Programa Especializado en Nomofobia",
                      "description": "Tratamiento pionero para la adicción al celular, redes sociales y desconexión digital."
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Consultoría en Proyectos Sociales",
                      "description": "Diseño y ejecución de intervenciones comunitarias con poblaciones vulnerables y enfoque de derechos."
                    }
                  }
                ]
              },
              "medicalSpecialty": ["Psychology", "Community Psychology", "Occupational Medicine"],
              "knowsAbout": [
                "Psicoterapia Infantil",
                "Terapia de Pareja",
                "Ansiedad y Depresión",
                "Orientación Vocacional",
                "Psicología Comunitaria",
                "Burnout Laboral",
                "Nomofobia",
                "Trabajo Social"
              ],
              "availableService": {
                "@type": "MedicalProcedure",
                "name": "Consulta Psicológica Prioritaria",
                "procedureType": "Noninvasive",
                "status": "http://schema.org/Active"
              },
              "isAcceptingNewPatients": true,
              "ethicsPolicy": "https://psicologomorales.com/etica",
              "slogan": "Ética, Escucha y Resultados. Tu salud mental en manos expertas.",
              "review": {
                "@type": "Review",
                "reviewRating": {
                  "@type": "Rating",
                  "ratingValue": "5",
                  "bestRating": "5"
                },
                "author": {
                  "@type": "Person",
                  "name": "Paciente Verificado"
                },
                "reviewBody": "Profesional altamente ético, confiable y efectivo. Recomendado para procesos profundos y serios."
              }
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
