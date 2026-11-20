import { render, screen } from "@testing-library/react";
import { About } from "@/components/About";
import { Experience } from "@/components/Experience";
import { Education } from "@/components/Education";
import { Hero } from "@/components/Hero";
import { experiences, education, profile } from "@/data/portfolio";
import { ui } from "@/lib/i18n";
import { pageMetadata, siteConfig, siteUrl } from "@/lib/site";

describe("About", () => {
  it("mostra os parágrafos e o cartão de detalhes", () => {
    render(<About />);
    for (const paragraph of profile.about) {
      expect(screen.getByText(paragraph)).toBeInTheDocument();
    }
    expect(screen.getByText(ui.pt.about.role)).toBeInTheDocument();
    expect(screen.getByText(profile.location)).toBeInTheDocument();
    expect(screen.getByText(ui.pt.about.focusValue)).toBeInTheDocument();
  });
});

describe("Experience", () => {
  it("lista cargos, empresas e destaques", () => {
    render(<Experience />);
    for (const exp of experiences) {
      expect(screen.getByText(exp.role)).toBeInTheDocument();
      expect(screen.getByText(exp.period)).toBeInTheDocument();
      expect(screen.getByText(exp.summary)).toBeInTheDocument();
      for (const highlight of exp.highlights) {
        expect(screen.getByText(highlight)).toBeInTheDocument();
      }
    }
  });

  it("marca apenas a experiência atual com o selo", () => {
    render(<Experience />);
    const atuais = experiences.filter((exp) => exp.current);
    expect(screen.getAllByText(ui.pt.experience.current)).toHaveLength(atuais.length);
  });

  it("aponta a empresa para o site dela", () => {
    render(<Experience />);
    const links = screen.getAllByRole("link", { name: experiences[0].company });
    expect(links[0]).toHaveAttribute("href", experiences[0].url);
  });
});

describe("Education", () => {
  it("lista cursos, instituições e períodos", () => {
    render(<Education />);
    for (const item of education) {
      expect(screen.getByText(item.course)).toBeInTheDocument();
      expect(screen.getByText(item.period)).toBeInTheDocument();
      expect(screen.getByRole("link", { name: item.school })).toHaveAttribute(
        "href",
        item.url,
      );
    }
  });
});

describe("Hero", () => {
  it("mostra nome, cargo, chamada e os dois botões", () => {
    render(<Hero />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(profile.name);
    expect(screen.getByText(profile.role)).toBeInTheDocument();
    expect(screen.getByText(profile.tagline)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: ui.pt.hero.ctaJourney })).toHaveAttribute(
      "href",
      "/sobre",
    );
    expect(screen.getByRole("link", { name: ui.pt.hero.ctaContact })).toHaveAttribute(
      "href",
      "/contato",
    );
  });
});

describe("pageMetadata", () => {
  it("gera canonical e Open Graph da própria rota", () => {
    const meta = pageMetadata({
      title: "Projetos",
      description: "Coisas que construí.",
      path: "/projetos",
    });

    expect(meta.title).toBe("Projetos");
    expect(meta.description).toBe("Coisas que construí.");
    expect(meta.alternates?.canonical).toBe("/projetos");
    expect(meta.openGraph?.url).toBe("/projetos");
    expect(meta.openGraph?.title).toBe(`Projetos — ${profile.name}`);
    expect(meta.twitter?.title).toBe(`Projetos — ${profile.name}`);
  });
});

describe("siteConfig", () => {
  it("deriva os dados do perfil e dos contatos", () => {
    expect(siteConfig.name).toBe(profile.name);
    expect(siteConfig.title).toContain(profile.role);
    expect(siteUrl).toMatch(/^https?:\/\//);
  });
});
