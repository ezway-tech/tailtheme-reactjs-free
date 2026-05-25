import type { LucideIcon } from 'lucide-react';
import {
  Boxes,
  Briefcase,
  Car,
  Compass,
  FolderKanban,
  Gauge,
  GraduationCap,
  HeartPulse,
  Layers,
  Palette,
  Rss,
  ShoppingBag,
  Wallet,
} from 'lucide-react';
import { PRO_DEMO_URL } from '@/config';
import { urls } from '@/routes/urls';

/** Join hosted Pro origin with an in-app path for deep links. */
export function proDemoUrl(path: string): string {
  const base = PRO_DEMO_URL.replace(/\/$/, '');
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}

export interface NavNode {
  id: string;
  labelKey: string;
  fallback: string;
  icon?: LucideIcon;
  to?: string;
  children?: NavNode[];
  end?: boolean;
  /** Numeric badge on branches (Free included pages only). */
  badge?: number;
  /** Opens `PRO_DEMO_URL` in a new tab; branch shows a “Pro” pill instead of a count. */
  proOnly?: boolean;
}

export interface FlatNavLeaf {
  id: string;
  labelKey: string;
  fallback: string;
  to: string;
  end?: boolean;
  icon?: LucideIcon;
}

function proLeaf(id: string, labelKey: string, fallback: string, path: string): NavNode {
  return {
    id,
    labelKey,
    fallback,
    proOnly: true,
    to: proDemoUrl(path),
  };
}

function proBranch(
  id: string,
  labelKey: string,
  fallback: string,
  icon: LucideIcon,
  children: NavNode[],
): NavNode {
  return {
    id,
    labelKey,
    fallback,
    icon,
    proOnly: true,
    children: children.map((c) => ({ ...c, proOnly: true })),
  };
}

/** Included sample verticals (Free). */
const FREE_PAGES: NavNode[] = [
  {
    id: 'saas',
    labelKey: 'nav.themes.saas',
    fallback: 'SaaS',
    icon: Briefcase,
    children: [
      {
        id: 'saas.analytics',
        labelKey: 'nav.saas.analytics',
        fallback: 'Analytics',
        to: urls.app.pages.saas.analytics,
      },
      {
        id: 'saas.members',
        labelKey: 'nav.saas.members',
        fallback: 'Members',
        to: urls.app.pages.saas.members,
      },
      {
        id: 'saas.calendar',
        labelKey: 'nav.saas.calendar',
        fallback: 'Calendar',
        to: urls.app.pages.saas.calendar,
      },
    ],
  },
  {
    id: 'project',
    labelKey: 'nav.themes.project',
    fallback: 'Project',
    icon: FolderKanban,
    children: [
      {
        id: 'project.kanban',
        labelKey: 'nav.project.kanban',
        fallback: 'Kanban',
        to: urls.app.pages.project.kanban,
      },
      {
        id: 'project.projects',
        labelKey: 'nav.project.projects',
        fallback: 'Projects',
        to: urls.app.pages.project.projects,
      },
      {
        id: 'project.tasks',
        labelKey: 'nav.project.tasks',
        fallback: 'Tasks',
        to: urls.app.pages.project.tasks,
      },
    ],
  },
];

/** Pro vertical teasers — same labels as the full template; click opens hosted Pro. */
const PRO_PAGE_TEASERS: NavNode[] = [
  proBranch('edu', 'nav.themes.edu', 'Edu', GraduationCap, [
    proLeaf('edu.courses', 'nav.edu.courses', 'Courses', '/app/pages/edu/courses'),
    proLeaf('edu.leaderboard', 'nav.edu.leaderboard', 'Leaderboard', '/app/pages/edu/leaderboard'),
    proLeaf('edu.quiz', 'nav.edu.quiz', 'Quiz', '/app/pages/edu/quiz'),
    proLeaf(
      'edu.certificates',
      'nav.edu.certificates',
      'Certificates',
      '/app/pages/edu/certificates',
    ),
  ]),
  proBranch('ecommerce', 'nav.themes.ecommerce', 'E-commerce', ShoppingBag, [
    proLeaf(
      'ec.storefront',
      'nav.ecommerce.storefront',
      'Storefront',
      '/app/pages/ecommerce/storefront',
    ),
    proLeaf('ec.checkout', 'nav.ecommerce.checkout', 'Checkout', '/app/pages/ecommerce/checkout'),
    proLeaf('ec.orders', 'nav.ecommerce.orders', 'Orders', '/app/pages/ecommerce/orders'),
    proLeaf(
      'ec.inventory',
      'nav.ecommerce.inventory',
      'Inventory',
      '/app/pages/ecommerce/inventory',
    ),
  ]),
  proBranch('crm', 'nav.themes.crm', 'CRM', Briefcase, [
    proLeaf('crm.pipeline', 'nav.crm.pipeline', 'Pipeline', '/app/pages/crm/pipeline'),
    proLeaf('crm.deals', 'nav.crm.deals', 'Deals', '/app/pages/crm/deals'),
    proLeaf('crm.contacts', 'nav.crm.contacts', 'Contacts', '/app/pages/crm/contacts'),
    proLeaf('crm.activities', 'nav.crm.activities', 'Activities', '/app/pages/crm/activities'),
  ]),
  proBranch('health', 'nav.themes.health', 'Healthcare', HeartPulse, [
    proLeaf(
      'he.appointments',
      'nav.health.appointments',
      'Appointments',
      '/app/pages/health/appointments',
    ),
    proLeaf('he.patients', 'nav.health.patients', 'Patients', '/app/pages/health/patients'),
    proLeaf('he.telehealth', 'nav.health.telehealth', 'Telehealth', '/app/pages/health/telehealth'),
    proLeaf('he.portal', 'nav.health.portal', 'Patient portal', '/app/pages/health/portal'),
  ]),
  proBranch('finance', 'nav.themes.finance', 'Finance', Wallet, [
    proLeaf('fi.wallet', 'nav.finance.wallet', 'Wallet', '/app/pages/finance/wallet'),
    proLeaf(
      'fi.transactions',
      'nav.finance.transactions',
      'Transactions',
      '/app/pages/finance/transactions',
    ),
    proLeaf('fi.portfolio', 'nav.finance.portfolio', 'Portfolio', '/app/pages/finance/portfolio'),
    proLeaf('fi.cards', 'nav.finance.cards', 'Cards', '/app/pages/finance/cards'),
  ]),
  proBranch('social', 'nav.themes.social', 'Social', Rss, [
    proLeaf('so.feed', 'nav.social.feed', 'Feed', '/app/pages/social/feed'),
    proLeaf('so.messages', 'nav.social.messages', 'Messages', '/app/pages/social/messages'),
    proLeaf('so.groups', 'nav.social.groups', 'Groups', '/app/pages/social/groups'),
    proLeaf('so.events', 'nav.social.events', 'Events', '/app/pages/social/events'),
  ]),
  proBranch('marketing', 'nav.themes.marketing', 'Marketing', Compass, [
    proLeaf(
      'mk.landing',
      'nav.marketing.landing',
      'Landing builder',
      '/app/pages/marketing/landing',
    ),
    proLeaf(
      'mk.pricing',
      'nav.marketing.pricing',
      'Pricing blocks',
      '/app/pages/marketing/pricing',
    ),
    proLeaf('mk.blog', 'nav.marketing.blog', 'Blog', '/app/pages/marketing/blog'),
    proLeaf('mk.features', 'nav.marketing.features', 'Features', '/app/pages/marketing/features'),
  ]),
  proBranch('vehicle', 'nav.themes.vehicle', 'Vehicle', Car, [
    proLeaf('vh.listing', 'nav.vehicle.listing', 'Listing', '/app/pages/vehicle/listing'),
    proLeaf('vh.booking', 'nav.vehicle.booking', 'Booking', '/app/pages/vehicle/booking'),
    proLeaf('vh.map', 'nav.vehicle.map', 'Map search', '/app/pages/vehicle/map'),
    proLeaf('vh.compare', 'nav.vehicle.compare', 'Compare', '/app/pages/vehicle/compare'),
  ]),
];

export const PAGES_TREE: NavNode[] = [...FREE_PAGES, ...PRO_PAGE_TEASERS];

export const UI_TREE: NavNode[] = [
  {
    id: 'tokens',
    labelKey: 'nav.ui.tokens',
    fallback: 'Styling tokens',
    icon: Palette,
    children: [
      {
        id: 'tk.colors',
        labelKey: 'nav.ui.tk.colors',
        fallback: 'Colors',
        to: urls.app.ui.tokens.colors,
      },
      {
        id: 'tk.presets',
        labelKey: 'nav.ui.tk.presets',
        fallback: 'Theme presets',
        to: urls.app.ui.tokens.presets,
      },
      proLeaf('tk.typography', 'nav.ui.tk.typography', 'Typography', '/app/ui/tokens/typography'),
      proLeaf('tk.spacing', 'nav.ui.tk.spacing', 'Spacing', '/app/ui/tokens/spacing'),
    ],
  },
  {
    id: 'components',
    labelKey: 'nav.ui.components',
    fallback: 'Core components',
    icon: Boxes,
    children: [
      {
        id: 'c.button',
        labelKey: 'nav.ui.c.button',
        fallback: 'Button',
        to: urls.app.ui.components.button,
      },
      {
        id: 'c.input',
        labelKey: 'nav.ui.c.input',
        fallback: 'Input & Textarea',
        to: urls.app.ui.components.input,
      },
      {
        id: 'c.form',
        labelKey: 'nav.ui.c.form',
        fallback: 'Form',
        to: urls.app.ui.components.form,
      },
      {
        id: 'c.card',
        labelKey: 'nav.ui.c.card',
        fallback: 'Card',
        to: urls.app.ui.components.card,
      },
      {
        id: 'c.badge',
        labelKey: 'nav.ui.c.badge',
        fallback: 'Badge & Avatar',
        to: urls.app.ui.components.badge,
      },
      {
        id: 'c.dialog',
        labelKey: 'nav.ui.c.dialog',
        fallback: 'Dialog / Drawer',
        to: urls.app.ui.components.dialog,
      },
      {
        id: 'c.tabs',
        labelKey: 'nav.ui.c.tabs',
        fallback: 'Tabs & Accordion',
        to: urls.app.ui.components.tabs,
      },
      {
        id: 'c.toast',
        labelKey: 'nav.ui.c.toast',
        fallback: 'Toast & Alert',
        to: urls.app.ui.components.toast,
      },
      {
        id: 'c.table',
        labelKey: 'nav.ui.c.table',
        fallback: 'Table',
        to: urls.app.ui.components.table,
      },
      proLeaf('c.charts', 'nav.ui.c.charts', 'Charts', '/app/ui/components/charts'),
      proLeaf(
        'c.richInputs',
        'nav.ui.c.richInputs',
        'Rich inputs',
        '/app/ui/components/rich-inputs',
      ),
      proLeaf(
        'c.fileUpload',
        'nav.ui.c.fileUpload',
        'File upload',
        '/app/ui/components/file-upload',
      ),
    ],
  },
  {
    id: 'examples',
    labelKey: 'nav.ui.examples',
    fallback: 'Example components',
    icon: Layers,
    children: [
      {
        id: 'ex.feedback',
        labelKey: 'nav.ui.ex.feedback',
        fallback: 'Feedback',
        to: urls.app.ui.examples.feedback,
      },
      {
        id: 'ex.layout',
        labelKey: 'nav.ui.ex.layout',
        fallback: 'Layout',
        to: urls.app.ui.examples.layout,
      },
      proLeaf('ex.patterns', 'nav.ui.ex.patterns', 'Patterns', '/app/ui/examples/patterns'),
      proLeaf(
        'ex.marketingBlocks',
        'nav.ui.ex.marketingBlocks',
        'Marketing blocks',
        '/app/ui/examples/marketing-blocks',
      ),
      proLeaf(
        'ex.pageTransitions',
        'nav.ui.ex.pageTransitions',
        'Page transitions',
        '/app/ui/examples/page-transitions',
      ),
    ],
  },
];

function proDashboard(id: string, labelKey: string, fallback: string, path: string): NavNode {
  return {
    id,
    labelKey,
    fallback,
    proOnly: true,
    to: proDemoUrl(path),
  };
}

export const TOP_TREE: NavNode[] = [
  {
    id: 'dashboards',
    labelKey: 'nav.dashboards.group',
    fallback: 'Dashboards',
    icon: Gauge,
    children: [
      {
        id: 'dashboards.overview',
        labelKey: 'nav.dashboards.overview',
        fallback: 'Overview',
        to: urls.app.dashboard,
        end: true,
      },
      {
        id: 'dashboards.saas',
        labelKey: 'nav.dashboards.saas',
        fallback: 'SaaS',
        to: urls.app.dashboards.saas,
      },
      {
        id: 'dashboards.project',
        labelKey: 'nav.dashboards.project',
        fallback: 'Project',
        to: urls.app.dashboards.project,
      },
      proDashboard('dashboards.edu', 'nav.dashboards.edu', 'Edu', '/app/dashboards/edu'),
      proDashboard(
        'dashboards.ecommerce',
        'nav.dashboards.ecommerce',
        'E-commerce',
        '/app/dashboards/ecommerce',
      ),
      proDashboard(
        'dashboards.finance',
        'nav.dashboards.finance',
        'Finance',
        '/app/dashboards/finance',
      ),
      proDashboard(
        'dashboards.health',
        'nav.dashboards.health',
        'Healthcare',
        '/app/dashboards/health',
      ),
      proDashboard(
        'dashboards.social',
        'nav.dashboards.social',
        'Social',
        '/app/dashboards/social',
      ),
      proDashboard(
        'dashboards.marketing',
        'nav.dashboards.marketing',
        'Marketing',
        '/app/dashboards/marketing',
      ),
      proDashboard(
        'dashboards.vehicle',
        'nav.dashboards.vehicle',
        'Vehicle',
        '/app/dashboards/vehicle',
      ),
      proDashboard('dashboards.crm', 'nav.dashboards.crm', 'CRM', '/app/dashboards/crm'),
    ],
  },
];

export function flattenNavLeaves(tree: NavNode[], parentIcon?: LucideIcon): FlatNavLeaf[] {
  return tree.flatMap((node) => {
    const icon = node.icon ?? parentIcon;
    if (node.children?.length) {
      return flattenNavLeaves(node.children, icon);
    }
    if (node.to) {
      return [
        {
          id: node.id,
          labelKey: node.labelKey,
          fallback: node.fallback,
          to: node.to,
          end: node.end,
          icon,
        },
      ];
    }
    return [];
  });
}

export function nodeMatchesPath(node: NavNode, pathname: string): boolean {
  if (node.proOnly) return false;
  if (node.to) {
    if (node.end) return pathname === node.to;
    return pathname === node.to || pathname.startsWith(`${node.to}/`);
  }
  return (node.children ?? []).some((child) => nodeMatchesPath(child, pathname));
}
