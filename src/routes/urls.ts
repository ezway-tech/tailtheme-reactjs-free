const paramId = (id: string | number) => encodeURIComponent(String(id));

const pagesSaas = {
  root: '/app/pages/saas',
  analytics: '/app/pages/saas/analytics',
  members: '/app/pages/saas/members',
  memberDetail: (id: string | number) => `/app/pages/saas/members/${paramId(id)}`,
  calendar: '/app/pages/saas/calendar',
} as const;

const pagesProject = {
  root: '/app/pages/project',
  kanban: '/app/pages/project/kanban',
  projects: '/app/pages/project/projects',
  projectDetail: (id: string | number) => `/app/pages/project/projects/${paramId(id)}`,
  tasks: '/app/pages/project/tasks',
} as const;

const pagesMarketing = {
  root: '/app/pages/marketing',
  pricing: '/app/pages/marketing/pricing',
  about: '/app/pages/marketing/about',
  contact: '/app/pages/marketing/contact',
} as const;

const dashboards = {
  root: '/app/dashboards',
  overview: '/app/dashboard',
  saas: '/app/dashboards/saas',
  project: '/app/dashboards/project',
} as const;

const uiTokens = {
  root: '/app/ui/tokens',
  colors: '/app/ui/tokens/colors',
  presets: '/app/ui/tokens/presets',
} as const;

const uiComponents = {
  root: '/app/ui/components',
  button: '/app/ui/components/button',
  input: '/app/ui/components/input',
  form: '/app/ui/components/form',
  card: '/app/ui/components/card',
  badge: '/app/ui/components/badge',
  dialog: '/app/ui/components/dialog',
  toast: '/app/ui/components/toast',
  tooltip: '/app/ui/components/tooltip',
  table: '/app/ui/components/table',
  tabs: '/app/ui/components/tabs',
  dropdownMenu: '/app/ui/components/dropdown-menu',
} as const;

const uiExamples = {
  root: '/app/ui/examples',
  feedback: '/app/ui/examples/feedback',
  layout: '/app/ui/examples/layout',
} as const;

export const urls = {
  landing: '/landing',

  app: {
    root: '/app',
    dashboard: '/app/dashboard',
    dashboards,
    upgrade: '/app/upgrade',
    settings: '/app/settings',
    profile: '/app/profile',
    pricing: '/app/pages/marketing/pricing',
    ui: {
      root: '/app/ui',
      tokens: uiTokens,
      components: uiComponents,
      examples: uiExamples,
    },
    pages: {
      root: '/app/pages',
      saas: pagesSaas,
      project: pagesProject,
      marketing: pagesMarketing,
    },
  },

  auth: {
    root: '/auth',
    login: '/auth/login',
    register: '/auth/register',
    forgot: '/auth/forgot',
  },

  errors: {
    notFound: '/error/404',
    server: '/error/500',
    forbidden: '/error/403',
    maintenance: '/error/maintenance',
  },
} as const;
