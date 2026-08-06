<div align="center">

# 💻 Portfólio — Nathan Mateus

**Portfólio pessoal com visual _tech/terminal_** — tema azul (claro/escuro), fundo animado de circuito, efeito **Liquid Glass** e digitação, tudo em uma interface 100% responsiva.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-149eca?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5%2B-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![HeroUI](https://img.shields.io/badge/HeroUI-v3-7828c8)](https://www.heroui.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Motion](https://img.shields.io/badge/Motion-12-000000?logo=framer&logoColor=white)](https://motion.dev/)
[![Jest](https://img.shields.io/badge/Jest-tested-c21325?logo=jest&logoColor=white)](https://jestjs.io/)
[![Playwright](https://img.shields.io/badge/Playwright-E2E-2EAD33?logo=playwright&logoColor=white)](https://playwright.dev/)
[![Lighthouse](https://img.shields.io/badge/Lighthouse-100%20a11y-f44b21?logo=lighthouse&logoColor=white)](https://developer.chrome.com/docs/lighthouse/)
[![CI](https://github.com/onathanmateus/Portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/onathanmateus/Portfolio/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

</div>

---

## ✨ Funcionalidades

- 🧬 **Estética tech/terminal** — fonte **JetBrains Mono** em tudo, rótulos em estilo terminal e navbar translúcida.
- 🧊 **Liquid Glass** — vidro translúcido com relevo especular na navbar, no rodapé, nos cards e nos botões (a luz do fundo passa por trás).
- ⌨️ **Efeito de digitação** — o nome digita ao carregar e os títulos das seções redigitam ao passar o mouse (respeita `prefers-reduced-motion`).
- 🔌 **Fundo animado de circuito** — traços de "linhas de chip" com pulsos de luz (canvas 2D leve); pausa com `prefers-reduced-motion` e com a aba oculta, e o desenho permanece estável ao redimensionar.
- 🌗 **Tema claro/escuro** — azul nos dois; escuro em cinza-grafite, com persistência e _script_ anti-_flash_.
- 🖥️ **Uma tela por página** — no desktop cada seção ocupa a viewport inteira, com o rodapé sempre visível.
- 🎞️ **Animações** com [Motion](https://motion.dev/) — botões magnéticos, _pill_ deslizante na navbar, _shimmer_ no nome e _reveals_ no scroll.
- 🔎 **SEO & compartilhamento** — metadata por rota, **OG/Twitter image** dinâmica (`next/og`), `sitemap.xml`, `robots.txt` e **JSON-LD `Person`**.
- 📊 **Vercel Analytics + Speed Insights** integrados.
- 📱 **Responsivo** e ♿ **acessível** — foco visível por teclado, `theme-color`, `aria-label`s e respeito ao `prefers-reduced-motion`.
- ✅ **Testado** — Jest (unitários, com piso de cobertura) e Playwright (E2E), incluindo auditoria de acessibilidade com **axe** em todas as rotas.

## 🧱 Stack

| Camada | Tecnologia |
|---|---|
| Framework | [Next.js 16](https://nextjs.org/) (App Router, Turbopack) |
| UI | [React 19](https://react.dev/) + [HeroUI v3](https://www.heroui.com/) + [Tailwind CSS v4](https://tailwindcss.com/) |
| Linguagem | [TypeScript](https://www.typescriptlang.org/) |
| Animações | [Motion](https://motion.dev/) |
| Fonte | [JetBrains Mono](https://www.jetbrains.com/lp/mono/) via `next/font` |
| Testes | [Jest](https://jestjs.io/) + [Testing Library](https://testing-library.com/) (unit) · [Playwright](https://playwright.dev/) (E2E) |
| Métricas | [Vercel Analytics](https://vercel.com/analytics) · [Speed Insights](https://vercel.com/docs/speed-insights) |
| Qualidade | [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci) (desktop e mobile) · [axe](https://github.com/dequelabs/axe-core) para acessibilidade |
| CI | [GitHub Actions](https://github.com/onathanmateus/Portfolio/actions) nos PRs + [Dependabot](https://docs.github.com/code-security/dependabot) com _auto-merge_ |
| Hospedagem | [Vercel](https://vercel.com/) |

## 🚀 Como executar

> Requisitos: **Node.js 20+**

```bash
# instalar dependências
npm install

# ambiente de desenvolvimento
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

## 📜 Scripts

| Script | Descrição |
|---|---|
| `npm run dev` | Servidor de desenvolvimento (Turbopack) |
| `npm run build` | Build de produção |
| `npm run start` | Servidor de produção |
| `npm run lint` | ESLint |
| `npm run typecheck` | Checagem de tipos (`tsc --noEmit`) |
| `npm run test` | Testes unitários (Jest) |
| `npm run test:watch` | Testes em modo *watch* |
| `npm run test:e2e` | Testes end-to-end (Playwright) |

## 🗂️ Estrutura

```
src/
├── app/
│   ├── layout.tsx        # raiz: tema, fonte, metadata, JSON-LD, fundo, métricas
│   ├── page.tsx          # landing (/)
│   ├── globals.css       # tokens do tema (azul claro/escuro) + Liquid Glass
│   ├── opengraph-image.tsx / twitter-image.tsx  # OG/Twitter dinâmicos (next/og)
│   ├── robots.ts / sitemap.ts
│   └── (site)/           # rotas com Navbar + Footer (uma tela por página)
│       └── sobre/ experiencia/ projetos/ skills/ formacao/ contato/
├── components/           # Hero, Navbar, Footer, About, Experience, Projects,
│                         #   Skills, Education, Contact, CircuitBackground,
│                         #   ThemeProvider/Toggle, Typewriter, Magnetic, Reveal...
├── data/
│   └── portfolio.ts      # 👈 todo o conteúdo do site
└── lib/
    └── site.ts           # config de SEO + URL base
__tests__/                # testes unitários (Jest + Testing Library)
tests-e2e/                # testes end-to-end (Playwright)
.github/                  # workflows de CI (em PRs), Dependabot e auto-merge
lighthouserc*.json        # metas do Lighthouse (desktop e mobile)
```

## 🗺️ Rotas

| Rota | Conteúdo |
|---|---|
| `/` | Landing (nome, função e navegação) |
| `/sobre` | Sobre mim |
| `/experiencia` | Experiência profissional (timeline) |
| `/projetos` | Projetos (com demos no ar) |
| `/skills` | Conhecimentos técnicos |
| `/formacao` | Formação acadêmica |
| `/contato` | Canais de contato |

## 🎨 Personalizando o conteúdo

Todo o conteúdo (textos, experiências, skills, formação e contatos) fica centralizado em [`src/data/portfolio.ts`](src/data/portfolio.ts) — basta editar esse arquivo, sem mexer nos componentes.

## 🌗 Temas

O app tem tema **claro** e **escuro** (ambos em azul; o escuro em cinza-grafite), com persistência em `localStorage` e um _script_ anti-_flash_ que aplica o tema antes da pintura. As cores são **tokens semânticos do HeroUI v3** (`accent`, `surface`, `border`, `muted`...) sobrescritos em [`globals.css`](src/app/globals.css), então tudo — inclusive o fundo de circuito e o Liquid Glass — reage ao tema automaticamente. O botão de alternância fica na navbar.

## 🧪 Testes & CI

A verificação roda **localmente antes de cada push** na `main`. No GitHub, o [workflow de CI](.github/workflows/ci.yml) roda **apenas em pull requests** — na prática, os do Dependabot — para poupar minutos do plano gratuito.

```bash
npm run lint           # ESLint
npm run typecheck      # tsc --noEmit
npm run test:coverage  # Jest, com piso mínimo de cobertura
npm run build          # build de produção
npm run test:e2e       # Playwright (E2E + acessibilidade)
```

**Unitários (Jest)** — em [`__tests__/`](__tests__/), com Jest + Testing Library (`jsdom`): conteúdo, componentes, alternância de tema e de idioma, efeito de digitação e metadados. O piso de cobertura está em [`jest.config.mjs`](jest.config.mjs).

**End-to-end (Playwright)** — em [`tests-e2e/`](tests-e2e/): navega pelas rotas, valida conteúdo, tema e idioma, e roda o **axe** em todas as páginas (nos dois temas e nos dois idiomas) exigindo zero violações WCAG 2.1 AA.

**Lighthouse** — metas por categoria em [`lighthouserc.json`](lighthouserc.json) (desktop) e [`lighthouserc.mobile.json`](lighthouserc.mobile.json) (mobile):

```bash
npm run build && npm start           # em um terminal
npx @lhci/cli autorun --config=./lighthouserc.json
```

**Dependabot** — abre PRs semanais agrupados de atualização ([`dependabot.yml`](.github/dependabot.yml)). O CI roda no PR e, passando, o [auto-merge](.github/workflows/dependabot-auto-merge.yml) aprova, faz _squash_ na `main` e apaga o branch.

---

## 📄 Licença

Distribuído sob a licença **MIT** — veja [`LICENSE`](LICENSE). Sinta-se livre para estudar e reutilizar o código. O conteúdo pessoal (nome, textos, identidade visual) permanece de propriedade de Nathan Mateus.

---

## 📫 Contato

- **E-mail:** [nathanmateudeo@hotmail.com](mailto:nathanmateudeo@hotmail.com)
- **LinkedIn:** [in/onathanmateus](https://www.linkedin.com/in/onathanmateus)
- **GitHub:** [@onathanmateus](https://github.com/onathanmateus)

<div align="center">
<sub>Feito com 💙 por <strong>Nathan Mateus</strong></sub>
</div>
