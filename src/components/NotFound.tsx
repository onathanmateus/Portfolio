"use client";

import Link from "next/link";
import { Magnetic } from "./Magnetic";
import { SectionHeading } from "./SectionHeading";
import { useUi } from "./LanguageProvider";

/** Conteúdo do 404, no mesmo visual das demais seções. */
export function NotFound() {
  const t = useUi();

  return (
    <section className="mx-auto my-auto w-full max-w-5xl">
      <SectionHeading
        eyebrow={t.notFound.eyebrow}
        title={t.notFound.title}
        subtitle={t.notFound.subtitle}
      />

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <Magnetic className="inline-flex">
          <Link
            href="/"
            className="liquid-sheen inline-block rounded-full border border-transparent bg-accent px-6 py-3 text-sm font-medium text-accent-foreground shadow-lg shadow-accent/25 transition-transform active:scale-95"
          >
            {t.notFound.home}
          </Link>
        </Magnetic>
        <Magnetic className="inline-flex">
          <Link
            href="/projetos"
            className="liquid-glass inline-block rounded-full border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            {t.nav.projetos}
          </Link>
        </Magnetic>
      </div>
    </section>
  );
}
