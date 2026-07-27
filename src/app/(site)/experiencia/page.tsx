import { Experience } from "@/components/Experience";
import { SectionShell } from "@/components/SectionShell";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Experiência",
  description:
    "Trajetória profissional de Nathan Mateus: Analista de Sistemas na HSB Consultoria e desenvolvimento front-end voluntário.",
  path: "/experiencia",
});

export default function Page() {
  return (
    <SectionShell>
      <Experience />
    </SectionShell>
  );
}
