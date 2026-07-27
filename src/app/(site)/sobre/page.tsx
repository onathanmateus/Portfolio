import { About } from "@/components/About";
import { SectionShell } from "@/components/SectionShell";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Sobre",
  description:
    "Quem é Nathan Mateus — Analista de Sistemas Pleno, autodidata, com foco em Protheus (ADVPL / TLPP) e desenvolvimento web.",
  path: "/sobre",
});

export default function Page() {
  return (
    <SectionShell>
      <About />
    </SectionShell>
  );
}
