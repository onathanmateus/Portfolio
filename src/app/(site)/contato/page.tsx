import { Contact } from "@/components/Contact";
import { SectionShell } from "@/components/SectionShell";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Contato",
  description: "Fale com Nathan Mateus por email, LinkedIn ou GitHub.",
  path: "/contato",
});

export default function Page() {
  return (
    <SectionShell>
      <Contact />
    </SectionShell>
  );
}
