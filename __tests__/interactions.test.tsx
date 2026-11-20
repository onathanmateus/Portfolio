import { render, screen, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Contact } from "@/components/Contact";
import { NotFound } from "@/components/NotFound";
import { SkipLink } from "@/components/SkipLink";
import { contact } from "@/data/portfolio";
import { ui } from "@/lib/i18n";

describe("CopyButton (na seção de contato)", () => {
  it("copia o e-mail e confirma na hora", async () => {
    // O userEvent.setup() instala o próprio stub de clipboard; o nosso precisa
    // vir depois para não ser sobrescrito.
    const user = userEvent.setup();
    const writeText = jest.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      writable: true,
      configurable: true,
      value: { writeText },
    });

    render(<Contact />);

    const botao = screen.getByRole("button", { name: ui.pt.copyLabel });
    expect(botao).toHaveTextContent(ui.pt.copy);

    await user.click(botao);

    expect(writeText).toHaveBeenCalledWith(contact.email);
    await waitFor(() => expect(botao).toHaveTextContent(ui.pt.copied));
  });

  it("só o canal de e-mail tem botão de copiar", () => {
    render(<Contact />);
    expect(screen.getAllByRole("button", { name: ui.pt.copyLabel })).toHaveLength(1);
  });

  it("não quebra quando a área de transferência é negada", async () => {
    const user = userEvent.setup();
    Object.defineProperty(navigator, "clipboard", {
      writable: true,
      configurable: true,
      value: { writeText: jest.fn().mockRejectedValue(new Error("negado")) },
    });

    render(<Contact />);
    const botao = screen.getByRole("button", { name: ui.pt.copyLabel });

    await act(async () => {
      await user.click(botao);
    });

    expect(botao).toHaveTextContent(ui.pt.copy);
  });
});

describe("NotFound", () => {
  it("explica o erro e oferece caminhos de volta", () => {
    render(<NotFound />);
    expect(
      screen.getByRole("heading", { name: ui.pt.notFound.title }),
    ).toBeInTheDocument();
    expect(screen.getByText(ui.pt.notFound.subtitle)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: ui.pt.notFound.home })).toHaveAttribute(
      "href",
      "/",
    );
    expect(screen.getByRole("link", { name: ui.pt.nav.projetos })).toHaveAttribute(
      "href",
      "/projetos",
    );
  });
});

describe("SkipLink", () => {
  it("aponta para o conteúdo principal", () => {
    render(<SkipLink />);
    expect(screen.getByRole("link", { name: ui.pt.skipToContent })).toHaveAttribute(
      "href",
      "#conteudo",
    );
  });
});
