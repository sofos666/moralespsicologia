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

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://Moralespsicologia.vercel.app";

export const metadata: Metadata = {
  title: "Psicólogo en Medellín | Terapia psicológica presencial y virtual",
  description: "Psicólogo en Medellín especializado en ansiedad, estrés, burnout, adolescentes, terapia de pareja y familia. Atención presencial y virtual. Agenda tu cita.",
  keywords: [
    "psicólogo en Medellín",
    "psicólogo Medellín",
    "terapia psicológica Medellín",
    "psicoterapia Medellín",
    "psicólogo clínico Medellín",
    "terapia de pareja Medellín",
    "psicólogo infantil Medellín",
    "psicólogo ansiedad Medellín",
    "atención psicológica virtual",
    "consulta psicológica Medellín"
  ],
  authors: [{ name: "Psic. Cristian Morales Velásquez" }],
  creator: "Psic. Cristian Morales Velásquez",
  metadataBase: new URL(baseUrl),
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: baseUrl,
    siteName: "Psic. Cristian Morales Velásquez",
    title: "Psicólogo en Medellín | Terapia psicológica presencial y virtual",
    description: "Psicólogo en Medellín especializado en ansiedad, estrés, burnout, adolescentes, terapia de pareja y familia. Atención presencial y virtual. Agenda tu cita.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Psic. Cristian Morales Velásquez",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Psicólogo en Medellín | Terapia psicológica presencial y virtual",
    description: "Psicólogo en Medellín especializado en ansiedad, estrés, burnout, adolescentes, terapia de pareja y familia. Atención presencial y virtual. Agenda tu cita.",
    images: ["/og-image.png"],
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
      <body className={`${outfit.variable} ${merriweather.variable} antialiased`} suppressHydrationWarning>
        {/* Structured Data for SEO */}
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Psychologist",
              "name": "Psic. Cristian Morales Velásquez",
              "alternateName": "MVP - Morales Velásquez Psicólogo",
              "description": "Psicólogo clínico en Medellín especializado en ansiedad, estrés, burnout, adolescentes, terapia de pareja y familia. Atención presencial y virtual.",
              "image": `${baseUrl}/og-image.png`,
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
              "areaServed": [
                { "@type": "City", "name": "Medellín" },
                { "@type": "City", "name": "Bello" },
                { "@type": "City", "name": "Envigado" },
                { "@type": "City", "name": "Sabaneta" },
                { "@type": "City", "name": "Itagüí" },
                { "@type": "City", "name": "La Estrella" },
                { "@type": "AdministrativeArea", "name": "Antioquia" }
              ],
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
              "founder": {
                "@type": "Person",
                "name": "Cristian Morales Velásquez",
                "jobTitle": "Psicólogo Clínico",
                "url": baseUrl,
                "sameAs": [
                  "https://www.behance.net/cristianmoralesve",
                  "https://www.instagram.com/ellocom",
                  "https://www.linkedin.com/in/cristianmoralesvelasquez/"
                ]
              },
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Servicios Psicológicos",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Psicoterapia Individual",
                      "description": "Atención psicológica para adultos que presentan ansiedad, estrés, depresión, crisis emocionales."
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Terapia de Pareja",
                      "description": "Espacio terapéutico para mejorar la comunicación, resolver conflictos y fortalecer el vínculo afectivo."
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Psicología Infantil y Adolescentes",
                      "description": "Intervención psicológica especializada para niños y adolescentes."
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Terapia Familiar",
                      "description": "Acompañamiento a familias que atraviesan crisis o conflictos."
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Atención Psicológica Virtual",
                      "description": "Terapia psicológica online con la misma efectividad que la modalidad presencial."
                    }
                  }
                ]
              },
              "medicalSpecialty": [
                {
                  "@type": "MedicalSpecialty",
                  "name": "Psicología Clínica",
                  "relevantSpecialty": [
                    { "@type": "MedicalSpecialty", "name": "Psychiatry" },
                    { "@type": "MedicalSpecialty", "name": "Pediatric" }
                  ]
                }
              ],
              "availableService": {
                "@type": "MedicalProcedure",
                "name": "Consulta Psicológica",
                "procedureType": "Noninvasive",
                "status": "http://schema.org/Active"
              },
              "isAcceptingNewPatients": true,
              "ethicsPolicy": "https://moralespsicologia.vercel.app/etica"
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
          strategy="afterInteractive"
        />
        <Script
          src="https://cdn.lordicon.com/lordicon.js"
          strategy="afterInteractive"
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
