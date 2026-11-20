import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const rotas = [
  "/",
  "/sobre",
  "/experiencia",
  "/projetos",
  "/skills",
  "/formacao",
  "/contato",
];

test.describe("Acessibilidade (axe)", () => {
  for (const rota of rotas) {
    test(`sem violações em ${rota}`, async ({ page }) => {
      await page.goto(rota);
      // Espera a animação de entrada terminar: elementos ainda em opacity 0
      // não representam o estado final da página.
      await page.waitForTimeout(1200);

      const resultado = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
        .analyze();

      expect(resultado.violations).toEqual([]);
    });
  }

  test("sem violações no tema claro", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /tema/i }).click();
    await page.waitForTimeout(1200);

    const resultado = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();

    expect(resultado.violations).toEqual([]);
  });

  test("sem violações em inglês", async ({ page }) => {
    await page.goto("/projetos");
    await page.getByRole("switch").click();
    await page.waitForTimeout(1200);

    const resultado = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();

    expect(resultado.violations).toEqual([]);
  });
});

test.describe("Navegação por teclado", () => {
  test("o primeiro Tab revela o atalho para o conteúdo", async ({ page }) => {
    await page.goto("/projetos");
    await page.keyboard.press("Tab");

    const skip = page.getByRole("link", { name: /pular para o conteúdo/i });
    await expect(skip).toBeFocused();

    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/#conteudo$/);
  });
});
