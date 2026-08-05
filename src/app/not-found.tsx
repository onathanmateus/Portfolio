import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SectionShell } from "@/components/SectionShell";
import { NotFound } from "@/components/NotFound";

export const metadata: Metadata = {
  title: "Página não encontrada",
  description: "O endereço acessado não existe neste site.",
  robots: { index: false, follow: true },
};

// O not-found da raiz não passa pelo layout de (site), então repete a casca
// para manter navbar, rodapé e o formato de uma tela.
export default function NotFoundPage() {
  return (
    <div className="flex h-[100svh] flex-col overflow-hidden">
      <Navbar />
      <main id="conteudo" className="flex min-h-0 flex-1 flex-col overflow-y-auto pt-20">
        <SectionShell>
          <NotFound />
        </SectionShell>
      </main>
      <Footer />
    </div>
  );
}
