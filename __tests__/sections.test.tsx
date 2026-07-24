import { render, screen } from "@testing-library/react";
import { Skills } from "@/components/Skills";
import { Contact } from "@/components/Contact";
import { Projects } from "@/components/Projects";
import { Typewriter } from "@/components/Typewriter";
import { skillGroups, contact, projects } from "@/data/portfolio";

describe("Skills", () => {
  it("mostra todos os grupos e itens", () => {
    render(<Skills />);
    for (const group of skillGroups) {
      expect(screen.getByText(`// ${group.title}`)).toBeInTheDocument();
      for (const item of group.items) {
        expect(screen.getByText(item)).toBeInTheDocument();
      }
    }
  });
});

describe("Contact", () => {
  it("expõe os canais com os links corretos", () => {
    render(<Contact />);
    expect(screen.getByRole("link", { name: /hotmail/i })).toHaveAttribute(
      "href",
      `mailto:${contact.email}`,
    );
    expect(screen.getByRole("link", { name: /in\/onathanmateus/i })).toHaveAttribute(
      "href",
      contact.linkedin,
    );
    expect(screen.getByRole("link", { name: /@onathanmateus/i })).toHaveAttribute(
      "href",
      contact.github,
    );
  });
});

describe("Projects", () => {
  it("mostra todos os projetos com tags e link de acesso, sem link de repositório", () => {
    render(<Projects />);

    for (const project of projects) {
      expect(screen.getByRole("heading", { name: project.name })).toBeInTheDocument();
      // tags se repetem entre projetos, então basta existir ao menos uma
      for (const tag of project.tags) {
        expect(screen.getAllByText(tag).length).toBeGreaterThan(0);
      }
    }

    const online = projects.filter((p) => p.url);
    const links = screen.getAllByRole("link", { name: /acessar/i });
    expect(links).toHaveLength(online.length);
    online.forEach((project, i) => {
      expect(links[i]).toHaveAttribute("href", project.url);
    });

    // repo é opcional; sem ele o botão GitHub não aparece
    expect(screen.queryByRole("link", { name: /github/i })).toBeNull();
  });

  it("lista o portfólio como primeiro projeto", () => {
    expect(projects[0].name).toBe("Portfólio");
  });
});

describe("Typewriter", () => {
  it("no gatilho hover mostra o texto completo de início", () => {
    render(<Typewriter as="h2" trigger="hover" text="Título" />);
    expect(screen.getByRole("heading", { name: "Título" })).toBeInTheDocument();
  });

  it("respeita reduced-motion no mount (texto completo)", () => {
    const spy = jest.spyOn(window, "matchMedia").mockReturnValue({
      matches: true,
      media: "(prefers-reduced-motion: reduce)",
      addEventListener: () => {},
      removeEventListener: () => {},
      addListener: () => {},
      removeListener: () => {},
      onchange: null,
      dispatchEvent: () => false,
    } as unknown as MediaQueryList);

    render(<Typewriter text="Nathan" />);
    expect(screen.getByText("Nathan")).toBeInTheDocument();
    spy.mockRestore();
  });
});
