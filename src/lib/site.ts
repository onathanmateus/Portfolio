import type { Metadata } from "next";
import { profile, contact } from "@/data/portfolio";

// URL base do site. Em produção use NEXT_PUBLIC_SITE_URL; na Vercel cai no
// VERCEL_URL do deploy; localmente, localhost.
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

export const siteConfig = {
  name: profile.name,
  role: profile.role,
  title: `${profile.name} — ${profile.role}`,
  description:
    "Portfólio de Nathan Mateus, Analista de Sistemas Pleno especialista em Protheus (ADVPL / TLPP) com experiência em desenvolvimento web (React, Next.js, Node.js).",
  locale: "pt_BR",
  links: {
    linkedin: contact.linkedin,
    github: contact.github,
    email: contact.email,
  },
} as const;

// Metadata de uma rota interna. Sem isto, o `alternates` e o `openGraph` do
// layout raiz são herdados: todas as páginas declarariam canonical (e OG) da
// home, e o Google as trataria como duplicatas.
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const fullTitle = `${title} — ${profile.name}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      siteName: siteConfig.name,
      url: path,
      title: fullTitle,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}
