"use client";

import { useUi } from "./LanguageProvider";

/**
 * Primeiro item na ordem de tabulação: pula a navbar e vai direto ao conteúdo.
 * Fica fora da tela até receber foco pelo teclado.
 */
export function SkipLink() {
  const t = useUi();

  return (
    <a
      href="#conteudo"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:rounded-full focus:border focus:border-accent focus:bg-surface focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-foreground"
    >
      {t.skipToContent}
    </a>
  );
}
