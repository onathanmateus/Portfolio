import { Skills } from "@/components/Skills";
import { SectionShell } from "@/components/SectionShell";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Skills",
  description:
    "Conhecimentos técnicos de Nathan Mateus: ADVPL / TLPP, PO-UI, JavaScript, TypeScript, React, Next.js, Node.js e mais.",
  path: "/skills",
});

export default function Page() {
  return (
    <SectionShell>
      <Skills />
    </SectionShell>
  );
}
