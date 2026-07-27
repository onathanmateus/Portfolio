import { Education } from "@/components/Education";
import { SectionShell } from "@/components/SectionShell";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Formação",
  description:
    "Formação acadêmica de Nathan Mateus: Análise e Desenvolvimento de Sistemas (UNP) e Administração (UNIFACEX).",
  path: "/formacao",
});

export default function Page() {
  return (
    <SectionShell>
      <Education />
    </SectionShell>
  );
}
