import { render, screen, act } from "@testing-library/react";
import { Typewriter } from "@/components/Typewriter";

// Deixa o matchMedia responder ao "prefers-reduced-motion" sob demanda.
function setReducedMotion(reduce: boolean) {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    configurable: true,
    value: (query: string) => ({
      matches: reduce && query.includes("prefers-reduced-motion"),
      media: query,
      onchange: null,
      addEventListener: () => {},
      removeEventListener: () => {},
      addListener: () => {},
      removeListener: () => {},
      dispatchEvent: () => false,
    }),
  });
}

beforeEach(() => {
  jest.useFakeTimers();
  setReducedMotion(false);
});

afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
});

describe("Typewriter", () => {
  it("renderiza o texto completo antes de animar (SSR e no-JS)", () => {
    render(<Typewriter text="Nathan" trigger="hover" />);
    expect(screen.getByText("Nathan")).toBeInTheDocument();
  });

  it("digita caractere a caractere no mount", () => {
    const { container } = render(
      <Typewriter text="abc" trigger="mount" speed={10} />,
    );

    // O kickoff é agendado fora do effect; após ele o texto zera (sobra só o caret).
    act(() => {
      jest.advanceTimersByTime(1);
    });
    expect(container.textContent).toBe("");

    act(() => {
      jest.advanceTimersByTime(10);
    });
    expect(screen.getByText("a")).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(20);
    });
    expect(screen.getByText("abc")).toBeInTheDocument();
  });

  it("respeita o startDelay", () => {
    render(<Typewriter text="ab" trigger="mount" speed={10} startDelay={100} />);

    act(() => {
      jest.advanceTimersByTime(50);
    });
    expect(screen.queryByText("a")).not.toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(60);
    });
    expect(screen.getByText("a")).toBeInTheDocument();
  });

  it("não digita no mount quando o gatilho é hover", () => {
    render(<Typewriter text="parado" trigger="hover" speed={10} />);
    act(() => {
      jest.advanceTimersByTime(200);
    });
    expect(screen.getByText("parado")).toBeInTheDocument();
  });

  it("redigita quando o texto muda (troca de idioma)", () => {
    const { rerender } = render(
      <Typewriter text="Projetos" trigger="hover" speed={10} />,
    );
    expect(screen.getByText("Projetos")).toBeInTheDocument();

    rerender(<Typewriter text="Projects" trigger="hover" speed={10} />);

    // Começa vazio e vai preenchendo com o texto novo.
    act(() => {
      jest.advanceTimersByTime(10);
    });
    expect(screen.getByText("P")).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(100);
    });
    expect(screen.getByText("Projects")).toBeInTheDocument();
  });

  it("troca o texto sem animar quando o usuário prefere menos movimento", () => {
    setReducedMotion(true);
    const { rerender } = render(
      <Typewriter text="Projetos" trigger="mount" speed={10} />,
    );

    rerender(<Typewriter text="Projects" trigger="mount" speed={10} />);
    expect(screen.getByText("Projects")).toBeInTheDocument();
  });

  it("usa a tag informada em `as`", () => {
    render(<Typewriter as="h2" text="Titulo" trigger="hover" />);
    expect(screen.getByRole("heading", { name: "Titulo" })).toBeInTheDocument();
  });
});
