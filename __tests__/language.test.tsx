import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  LanguageProvider,
  useContent,
  useLang,
  useUi,
} from "@/components/LanguageProvider";
import { LanguageToggle } from "@/components/LanguageToggle";
import { portfolio } from "@/data/portfolio";
import { ui } from "@/lib/i18n";

// Sonda que expõe o estado do contexto como texto.
function Probe() {
  const { lang } = useLang();
  const { profile } = useContent();
  const t = useUi();
  return (
    <>
      <span data-testid="lang">{lang}</span>
      <span data-testid="role">{profile.role}</span>
      <span data-testid="nav-sobre">{t.nav.sobre}</span>
    </>
  );
}

function renderWithProvider() {
  return render(
    <LanguageProvider>
      <LanguageToggle />
      <Probe />
    </LanguageProvider>,
  );
}

beforeEach(() => {
  localStorage.clear();
  document.documentElement.lang = "";
});

describe("LanguageProvider", () => {
  it("começa em português (idioma do SSR)", () => {
    renderWithProvider();
    expect(screen.getByTestId("lang")).toHaveTextContent("pt");
    expect(screen.getByTestId("role")).toHaveTextContent(portfolio.pt.profile.role);
    expect(screen.getByTestId("nav-sobre")).toHaveTextContent(ui.pt.nav.sobre);
  });

  it("troca para inglês, persiste e atualiza o <html lang>", async () => {
    const user = userEvent.setup();
    renderWithProvider();

    await user.click(screen.getByRole("switch"));

    expect(screen.getByTestId("lang")).toHaveTextContent("en");
    expect(screen.getByTestId("role")).toHaveTextContent(portfolio.en.profile.role);
    expect(screen.getByTestId("nav-sobre")).toHaveTextContent(ui.en.nav.sobre);
    expect(localStorage.getItem("lang")).toBe("en");
    expect(document.documentElement.lang).toBe("en");
  });

  it("volta para português ao alternar de novo", async () => {
    const user = userEvent.setup();
    renderWithProvider();

    const toggle = screen.getByRole("switch");
    await user.click(toggle);
    await user.click(toggle);

    expect(screen.getByTestId("lang")).toHaveTextContent("pt");
    expect(localStorage.getItem("lang")).toBe("pt");
    expect(document.documentElement.lang).toBe("pt-BR");
  });

  it("restaura o idioma salvo na montagem", async () => {
    localStorage.setItem("lang", "en");
    await act(async () => {
      renderWithProvider();
    });
    expect(screen.getByTestId("lang")).toHaveTextContent("en");
  });

  it("ignora valor inválido no localStorage", async () => {
    localStorage.setItem("lang", "klingon");
    await act(async () => {
      renderWithProvider();
    });
    expect(screen.getByTestId("lang")).toHaveTextContent("pt");
  });
});

describe("LanguageToggle", () => {
  it("expõe estado e rótulo acessíveis", async () => {
    const user = userEvent.setup();
    renderWithProvider();

    const toggle = screen.getByRole("switch");
    expect(toggle).toHaveAttribute("aria-checked", "false");
    expect(toggle).toHaveAccessibleName(ui.pt.langSwitch);

    await user.click(toggle);

    expect(toggle).toHaveAttribute("aria-checked", "true");
    expect(toggle).toHaveAccessibleName(ui.en.langSwitch);
  });
});

describe("conteúdo bilíngue", () => {
  it("mantém a mesma estrutura nos dois idiomas", () => {
    expect(portfolio.en.experiences).toHaveLength(portfolio.pt.experiences.length);
    expect(portfolio.en.projects).toHaveLength(portfolio.pt.projects.length);
    expect(portfolio.en.education).toHaveLength(portfolio.pt.education.length);
    expect(portfolio.en.skillGroups).toHaveLength(portfolio.pt.skillGroups.length);
    expect(portfolio.en.profile.about).toHaveLength(portfolio.pt.profile.about.length);
  });

  it("preserva links e tags entre os idiomas", () => {
    portfolio.pt.projects.forEach((project, i) => {
      expect(portfolio.en.projects[i].url).toBe(project.url);
      expect(portfolio.en.projects[i].repo).toBe(project.repo);
      expect(portfolio.en.projects[i].tags).toEqual(project.tags);
    });
  });

  it("traduz de fato os textos (não repete o português)", () => {
    expect(portfolio.en.profile.about[0]).not.toBe(portfolio.pt.profile.about[0]);
    expect(ui.en.hero.ctaContact).not.toBe(ui.pt.hero.ctaContact);
  });
});
