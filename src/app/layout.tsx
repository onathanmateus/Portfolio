import type { Metadata, Viewport } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider, themeInitScript } from "@/components/ThemeProvider";
import { LanguageProvider, langInitScript } from "@/components/LanguageProvider";
import { CircuitBackground } from "@/components/CircuitBackground";
import { siteConfig, siteUrl } from "@/lib/site";
import { contact, education, experiences, profile } from "@/data/portfolio";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteConfig.title,
    template: "%s — Nathan Mateus",
  },
  description: siteConfig.description,
  keywords: [
    "Nathan Mateus",
    "Analista de Sistemas",
    "Protheus",
    "TOTVS",
    "ADVPL",
    "TLPP",
    "ERP",
    "Desenvolvedor Web",
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "portfólio",
    "Natal RN",
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.links.github }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  applicationName: siteConfig.name,
  category: "technology",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteUrl,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#eef1f6" },
    { media: "(prefers-color-scheme: dark)", color: "#12151b" },
  ],
};

// Dados estruturados: ajuda o Google a entender quem é a pessoa.
const currentJob = experiences.find((exp) => exp.current);

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  description: profile.tagline,
  url: siteUrl,
  email: `mailto:${contact.email}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Parnamirim",
    addressRegion: "RN",
    addressCountry: "BR",
  },
  ...(currentJob
    ? { worksFor: { "@type": "Organization", name: currentJob.company, url: currentJob.url } }
    : {}),
  alumniOf: education.map((item) => ({
    "@type": "CollegeOrUniversity",
    name: item.school,
    url: item.url,
  })),
  knowsLanguage: ["pt-BR", "en"],
  sameAs: [contact.linkedin, contact.github],
  knowsAbout: [
    "Protheus",
    "ADVPL",
    "TLPP",
    "TOTVS",
    "ERP",
    "React",
    "Next.js",
    "Node.js",
    "TypeScript",
    "SQL",
  ],
};

// Marca o site em si — ajuda o Google a exibir o nome certo nos resultados.
const siteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteConfig.title,
  url: siteUrl,
  inLanguage: "pt-BR",
  author: { "@type": "Person", name: profile.name, url: siteUrl },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${jetbrainsMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script dangerouslySetInnerHTML={{ __html: langInitScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }}
        />
      </head>
      <body className="relative min-h-full" suppressHydrationWarning>
        <ThemeProvider>
          <LanguageProvider>
            <CircuitBackground />
            {children}
          </LanguageProvider>
        </ThemeProvider>
        {/* Os scripts só existem quando o site está hospedado na Vercel; fora
            dela (dev, CI, Lighthouse) dariam 404 e poluiriam o console. */}
        {process.env.VERCEL === "1" ? (
          <>
            <Analytics />
            <SpeedInsights />
          </>
        ) : null}
      </body>
    </html>
  );
}
