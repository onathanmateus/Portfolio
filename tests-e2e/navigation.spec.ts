import { test, expect } from "@playwright/test";

test.describe("Landing", () => {
  test("mostra o nome em destaque", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1, name: "Nathan Mateus" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Conhecer trajetória" })).toBeVisible();
  });
});

test.describe("Navegação entre as seções", () => {
  const routes = [
    { path: "/sobre", heading: "Um pouco sobre mim" },
    { path: "/experiencia", heading: "Experiência profissional" },
    { path: "/projetos", heading: "Projetos" },
    { path: "/skills", heading: "Conhecimentos técnicos" },
    { path: "/formacao", heading: "Educação" },
    { path: "/contato", heading: "Vamos conversar" },
  ];

  for (const route of routes) {
    test(`carrega ${route.path}`, async ({ page }) => {
      await page.goto(route.path);
      await expect(page.getByRole("heading", { name: route.heading })).toBeVisible();
    });
  }

  test("página de projetos mostra os projetos e os links de acesso", async ({ page }) => {
    await page.goto("/projetos");

    // o portfólio é o primeiro card, o FinTrack vem em seguida
    await expect(page.getByRole("heading", { name: "Portfólio" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "FinTrack" })).toBeVisible();

    const links = page.getByRole("link", { name: /acessar/i });
    await expect(links).toHaveCount(2);
    await expect(links.first()).toHaveAttribute("href", /portfolio-nathan-mateus/);
    await expect(links.last()).toHaveAttribute("href", /fintrack/);
  });

  test("navega pela navbar a partir da landing", async ({ page }) => {
    await page.goto("/");
    const link = page.getByRole("link", { name: "Experiência", exact: true });
    await link.waitFor({ state: "visible" });
    await Promise.all([
      page.waitForURL(/\/experiencia$/, { timeout: 15000 }),
      link.click(),
    ]);
    await expect(page.getByRole("heading", { name: "Experiência profissional" })).toBeVisible();
  });
});

test.describe("Tema", () => {
  test("alterna entre claro e escuro", async ({ page }) => {
    await page.goto("/");
    const html = page.locator("html");
    const initialDark = await html.evaluate((el) => el.classList.contains("dark"));

    await page.getByRole("button", { name: /Ativar tema/ }).click();

    await expect
      .poll(async () => html.evaluate((el) => el.classList.contains("dark")))
      .toBe(!initialDark);
  });
});
