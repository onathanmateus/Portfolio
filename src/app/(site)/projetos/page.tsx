import { Projects } from "@/components/Projects";
import { SectionShell } from "@/components/SectionShell";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Projetos",
  description:
    "Projetos desenvolvidos por Nathan Mateus, disponíveis no ar para explorar.",
  path: "/projetos",
});

export default function Page() {
  return (
    <SectionShell>
      <Projects />
    </SectionShell>
  );
}
