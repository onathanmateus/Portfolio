// Idiomas suportados e strings de interface (rótulos, títulos de seção,
// botões e aria-labels). O conteúdo pessoal fica em `@/data/portfolio`.

export type Lang = "pt" | "en";

export const ui = {
  pt: {
    nav: {
      sobre: "Sobre",
      experiencia: "Experiência",
      projetos: "Projetos",
      skills: "Skills",
      formacao: "Formação",
      contato: "Contato",
    },
    openMenu: "Abrir menu",
    skipToContent: "Pular para o conteúdo",
    copy: "Copiar",
    copied: "Copiado!",
    copyLabel: "Copiar o e-mail",
    notFound: {
      eyebrow: "// erro 404",
      title: "Página não encontrada",
      subtitle:
        "O endereço não existe ou foi movido. Use os atalhos abaixo para voltar ao caminho.",
      home: "Ir para o início",
    },
    themeToDark: "Ativar tema escuro",
    themeToLight: "Ativar tema claro",
    langSwitch: "Mudar o idioma para inglês",
    hero: {
      ctaJourney: "Conhecer trajetória",
      ctaContact: "Entrar em contato",
    },
    about: {
      eyebrow: "// sobre",
      title: "Um pouco sobre mim",
      role: "Cargo atual",
      location: "Localização",
      focus: "Foco",
      focusValue: "Protheus · ADVPL / TLPP · Web",
    },
    experience: {
      eyebrow: "// trajetoria",
      title: "Experiência profissional",
      current: "Atual",
    },
    projects: {
      eyebrow: "// projetos",
      title: "Projetos",
      subtitle: "Projetos que criei — disponíveis no ar para explorar.",
      access: "Acessar",
      online: "online",
    },
    skills: {
      eyebrow: "// stack",
      title: "Conhecimentos técnicos",
      subtitle: "Ferramentas e tecnologias com que trabalho no dia a dia.",
      specialty: "especialidade",
    },
    education: {
      eyebrow: "// formacao",
      title: "Educação",
    },
    contact: {
      eyebrow: "// contato",
      title: "Vamos conversar",
      subtitle: "Escolha o canal que preferir para entrar em contato.",
    },
  },
  en: {
    nav: {
      sobre: "About",
      experiencia: "Experience",
      projetos: "Projects",
      skills: "Skills",
      formacao: "Education",
      contato: "Contact",
    },
    openMenu: "Open menu",
    skipToContent: "Skip to content",
    copy: "Copy",
    copied: "Copied!",
    copyLabel: "Copy the e-mail address",
    notFound: {
      eyebrow: "// error 404",
      title: "Page not found",
      subtitle:
        "This address doesn't exist or has moved. Use the shortcuts below to get back on track.",
      home: "Go to the homepage",
    },
    themeToDark: "Switch to dark theme",
    themeToLight: "Switch to light theme",
    langSwitch: "Switch the language to Portuguese",
    hero: {
      ctaJourney: "Explore my journey",
      ctaContact: "Get in touch",
    },
    about: {
      eyebrow: "// about",
      title: "A bit about me",
      role: "Current role",
      location: "Location",
      focus: "Focus",
      focusValue: "Protheus · ADVPL / TLPP · Web",
    },
    experience: {
      eyebrow: "// journey",
      title: "Professional experience",
      current: "Current",
    },
    projects: {
      eyebrow: "// projects",
      title: "Projects",
      subtitle: "Projects I've built — live and ready to explore.",
      access: "Open",
      online: "online",
    },
    skills: {
      eyebrow: "// stack",
      title: "Technical skills",
      subtitle: "Tools and technologies I work with day to day.",
      specialty: "specialty",
    },
    education: {
      eyebrow: "// education",
      title: "Education",
    },
    contact: {
      eyebrow: "// contact",
      title: "Let's talk",
      subtitle: "Pick whichever channel you prefer to get in touch.",
    },
  },
} as const;

export type UiStrings = (typeof ui)[Lang];
