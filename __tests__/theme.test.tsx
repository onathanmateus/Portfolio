import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider, useTheme, themeInitScript } from "@/components/ThemeProvider";

// Sonda: mostra o tema atual e permite alterná-lo.
function Probe() {
  const { theme, toggleTheme } = useTheme();
  return (
    <>
      <span data-testid="theme">{theme ?? "null"}</span>
      <button type="button" onClick={toggleTheme}>
        alternar
      </button>
    </>
  );
}

function renderWithProvider() {
  return render(
    <ThemeProvider>
      <Probe />
    </ThemeProvider>,
  );
}

beforeEach(() => {
  localStorage.clear();
  document.documentElement.classList.remove("dark");
  document.documentElement.style.colorScheme = "";
});

describe("ThemeProvider", () => {
  it("sincroniza com a classe já aplicada no <html> antes da hidratação", async () => {
    document.documentElement.classList.add("dark");
    await act(async () => {
      renderWithProvider();
    });
    expect(screen.getByTestId("theme")).toHaveTextContent("dark");
  });

  it("detecta o tema claro quando não há a classe dark", async () => {
    await act(async () => {
      renderWithProvider();
    });
    expect(screen.getByTestId("theme")).toHaveTextContent("light");
  });

  it("alterna o tema, aplica no <html> e persiste", async () => {
    const user = userEvent.setup();
    document.documentElement.classList.add("dark");
    await act(async () => {
      renderWithProvider();
    });

    await user.click(screen.getByRole("button", { name: "alternar" }));

    expect(screen.getByTestId("theme")).toHaveTextContent("light");
    expect(document.documentElement.classList.contains("dark")).toBe(false);
    expect(document.documentElement.style.colorScheme).toBe("light");
    expect(localStorage.getItem("theme")).toBe("light");
  });

  it("volta para o escuro ao alternar de novo", async () => {
    const user = userEvent.setup();
    await act(async () => {
      renderWithProvider();
    });

    await user.click(screen.getByRole("button", { name: "alternar" }));

    expect(screen.getByTestId("theme")).toHaveTextContent("dark");
    expect(document.documentElement.classList.contains("dark")).toBe(true);
    expect(localStorage.getItem("theme")).toBe("dark");
  });
});

describe("themeInitScript", () => {
  it("aplica o tema salvo antes da pintura", () => {
    localStorage.setItem("theme", "dark");
    eval(themeInitScript);
    expect(document.documentElement.classList.contains("dark")).toBe(true);
    expect(document.documentElement.style.colorScheme).toBe("dark");
  });

  it("usa a preferência do sistema quando não há tema salvo", () => {
    const original = window.matchMedia;
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      configurable: true,
      value: (query: string) => ({ matches: query.includes("dark"), media: query }),
    });

    eval(themeInitScript);
    expect(document.documentElement.classList.contains("dark")).toBe(true);

    Object.defineProperty(window, "matchMedia", {
      writable: true,
      configurable: true,
      value: original,
    });
  });
});
