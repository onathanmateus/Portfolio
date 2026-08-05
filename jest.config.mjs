import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  // Caminho do app Next para carregar next.config e o .env de teste
  dir: "./",
});

/** @type {import('jest').Config} */
const config = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    "^@heroui/react$": "<rootDir>/__mocks__/heroui.tsx",
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/tests-e2e/"],
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/**/*.d.ts",
    // Rotas, layouts e imagens geradas (next/og): dependem do runtime do Next,
    // não do jsdom. São exercitados pelos testes E2E e pelo Lighthouse.
    "!src/app/**",
    // Canvas + requestAnimationFrame puros: não dá para exercitar em jsdom.
    "!src/components/CircuitBackground.tsx",
    // Geração de imagem (next/og): depende do runtime do Next.
    "!src/lib/og.tsx",
  ],
  // Piso de cobertura: impede que a suíte regrida sem ninguém perceber.
  coverageThreshold: {
    global: { statements: 75, branches: 60, functions: 65, lines: 75 },
  },
};

export default createJestConfig(config);
