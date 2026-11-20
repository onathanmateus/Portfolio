import { render, screen } from "@testing-library/react";
import { SectionHeading } from "@/components/SectionHeading";
import { Footer } from "@/components/Footer";
import { contact, profile } from "@/data/portfolio";

describe("SectionHeading", () => {
  it("renderiza eyebrow, título e subtítulo", () => {
    render(
      <SectionHeading eyebrow="Stack" title="Conhecimentos" subtitle="Minhas ferramentas" />,
    );
    expect(screen.getByRole("heading", { name: "Conhecimentos" })).toBeInTheDocument();
    expect(screen.getByText("Stack")).toBeInTheDocument();
    expect(screen.getByText("Minhas ferramentas")).toBeInTheDocument();
  });

  it("usa h1 por padrão (é o título principal da página)", () => {
    render(<SectionHeading title="Projetos" />);
    expect(screen.getByRole("heading", { level: 1, name: "Projetos" })).toBeInTheDocument();
  });

  it("permite rebaixar para h2 quando a página já tem um h1", () => {
    render(<SectionHeading title="Projetos" as="h2" />);
    expect(screen.getByRole("heading", { level: 2, name: "Projetos" })).toBeInTheDocument();
  });
});

describe("Footer", () => {
  it("mostra o nome e os canais de contato", () => {
    render(<Footer />);
    expect(screen.getByText(new RegExp(profile.name))).toBeInTheDocument();

    const email = screen.getByRole("link", { name: "email" });
    expect(email).toHaveAttribute("href", `mailto:${contact.email}`);

    expect(screen.getByRole("link", { name: "linkedin" })).toHaveAttribute(
      "href",
      contact.linkedin,
    );
    expect(screen.getByRole("link", { name: "github" })).toHaveAttribute(
      "href",
      contact.github,
    );
  });
});
