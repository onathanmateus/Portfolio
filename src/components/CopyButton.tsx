"use client";

import { useEffect, useRef, useState } from "react";
import { useUi } from "./LanguageProvider";

/** Copia um texto para a área de transferência, com confirmação temporária. */
export function CopyButton({ value }: { value: string }) {
  const t = useUi();
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      /* sem permissão de área de transferência: o link mailto segue valendo */
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={t.copyLabel}
      className="mono shrink-0 cursor-pointer rounded-full border border-border px-3 py-1.5 text-xs text-muted transition-colors hover:border-accent hover:text-accent"
    >
      {copied ? t.copied : t.copy}
    </button>
  );
}
