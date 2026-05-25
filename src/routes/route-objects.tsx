import { lazy, Suspense } from 'react';
import { Navigate, type RouteObject } from 'react-router-dom';
import { AppShell, AuthLayout, RootLayout } from '@/layouts';
import LoadingSplashPage from '@/pages/loading-splash-page';
import { urls } from '@/routes/urls';

const DashboardPage = lazy(() => import('@/pages/dashboard/dashboard-page'));
const SaasDashboardPage = lazy(() => import('@/pages/dashboards/saas-dashboard-page'));
const ProjectDashboardPage = lazy(() => import('@/pages/dashboards/project-dashboard-page'));
const SettingsPage = lazy(() => import('@/pages/settings/settings-page'));
const ProfilePage = lazy(() => import('@/pages/profile/profile-page'));
const PricingPage = lazy(() => import('@/pages/pricing/pricing-page'));
const UpgradePage = lazy(() => import('@/pages/upgrade-page'));

const LoginPage = lazy(() => import('@/pages/auth/login-page'));
const RegisterPage = lazy(() => import('@/pages/auth/register-page'));
const ForgotPasswordPage = lazy(() => import('@/pages/auth/forgot-password-page'));

const LandingPage = lazy(() => import('@/pages/landing/landing-page'));

const AnalyticsPage = lazy(() => import('@/pages/pages/saas/analytics-page'));
const MembersPage = lazy(() => import('@/pages/pages/saas/members-page'));
const MemberDetailPage = lazy(() => import('@/pages/pages/saas/member-detail-page'));
const CalendarPage = lazy(() => import('@/pages/pages/saas/calendar-page'));

const KanbanPage = lazy(() => import('@/pages/pages/project/kanban-page'));
const ProjectsListPage = lazy(() => import('@/pages/pages/project/projects-list-page'));
const ProjectDetailPage = lazy(() => import('@/pages/pages/project/project-detail-page'));
const TasksCalendarPage = lazy(() => import('@/pages/pages/project/tasks-calendar-page'));

const AboutPage = lazy(() => import('@/pages/pages/marketing/about-page'));
const ContactPage = lazy(() => import('@/pages/pages/marketing/contact-page'));

const NotFoundPage = lazy(() => import('@/pages/errors/not-found-page'));
const ServerErrorPage = lazy(() => import('@/pages/errors/server-error-page'));
const ForbiddenPage = lazy(() => import('@/pages/errors/forbidden-page'));
const MaintenancePage = lazy(() => import('@/pages/errors/maintenance-page'));

const TokensColorsPage = lazy(() => import('@/pages/ui/tokens/colors-page'));
const TokensPresetsPage = lazy(() => import('@/pages/ui/tokens/presets-page'));
const UiButtonPage = lazy(() => import('@/pages/ui/components/button-page'));
const UiInputPage = lazy(() => import('@/pages/ui/components/input-page'));
const UiFormPage = lazy(() => import('@/pages/ui/components/form-page'));
const UiCardPage = lazy(() => import('@/pages/ui/components/card-page'));
const UiBadgePage = lazy(() => import('@/pages/ui/components/badge-page'));
const UiDialogPage = lazy(() => import('@/pages/ui/components/dialog-page'));
const UiToastPage = lazy(() => import('@/pages/ui/components/toast-page'));
const UiTooltipPage = lazy(() => import('@/pages/ui/components/tooltip-page'));
const UiTablePage = lazy(() => import('@/pages/ui/components/table-page'));
const UiTabsPage = lazy(() => import('@/pages/ui/components/tabs-page'));
const UiDropdownMenuPage = lazy(() => import('@/pages/ui/components/dropdown-menu-page'));
const UiFeedbackExamplesPage = lazy(() => import('@/pages/ui/category/feedback-category-page'));
const UiLayoutExamplesPage = lazy(() => import('@/pages/ui/category/layout-category-page'));

function withSuspense(node: React.ReactNode): React.ReactNode {
  return <Suspense fallback={<LoadingSplashPage />}>{node}</Suspense>;
}

export const appRouteObjects: RouteObject[] = [
  {
    element: <RootLayout />,
    children: [
      { path: '/', element: <Navigate to={urls.app.dashboard} replace /> },
      { path: urls.landing, element: withSuspense(<LandingPage />) },

      {
        path: urls.app.root,
        element: <AppShell />,
        handle: { breadcrumb: 'App' },
        children: [
          { index: true, element: <Navigate to={urls.app.dashboard} replace /> },
          {
            path: 'dashboard',
            element: withSuspense(<DashboardPage />),
            handle: { breadcrumb: 'Dashboard' },
          },
          {
            path: 'upgrade',
            element: withSuspense(<UpgradePage />),
            handle: { breadcrumb: 'Upgrade' },
          },
          {
            path: 'settings',
            element: withSuspense(<SettingsPage />),
            handle: { breadcrumb: 'Settings' },
          },
          {
            path: 'profile',
            element: withSuspense(<ProfilePage />),
            handle: { breadcrumb: 'Profile' },
          },
          {
            path: 'dashboards',
            handle: { breadcrumb: 'Dashboards' },
            children: [
              { index: true, element: <Navigate to={urls.app.dashboard} replace /> },
              {
                path: 'saas',
                element: withSuspense(<SaasDashboardPage />),
                handle: { breadcrumb: 'SaaS dashboard' },
              },
              {
                path: 'project',
                element: withSuspense(<ProjectDashboardPage />),
                handle: { breadcrumb: 'Project dashboard' },
              },
            ],
          },
          {
            path: 'pages',
            handle: { breadcrumb: 'Pages' },
            children: [
              { index: true, element: <Navigate to={urls.app.pages.saas.analytics} replace /> },
              {
                path: 'saas',
                handle: { breadcrumb: 'SaaS' },
                children: [
                  { index: true, element: <Navigate to={urls.app.pages.saas.analytics} replace /> },
                  {
                    path: 'analytics',
                    element: withSuspense(<AnalyticsPage />),
                    handle: { breadcrumb: 'Analytics' },
                  },
                  {
                    path: 'members',
                    handle: { breadcrumb: 'Members' },
                    children: [
                      { index: true, element: withSuspense(<MembersPage />) },
                      {
                        path: ':id',
                        element: withSuspense(<MemberDetailPage />),
                        handle: { breadcrumb: 'Member' },
                      },
                    ],
                  },
                  {
                    path: 'calendar',
                    element: withSuspense(<CalendarPage />),
                    handle: { breadcrumb: 'Calendar' },
                  },
                ],
              },
              {
                path: 'project',
                handle: { breadcrumb: 'Project' },
                children: [
                  { index: true, element: <Navigate to={urls.app.pages.project.kanban} replace /> },
                  {
                    path: 'kanban',
                    element: withSuspense(<KanbanPage />),
                    handle: { breadcrumb: 'Kanban' },
                  },
                  {
                    path: 'projects',
                    handle: { breadcrumb: 'Projects' },
                    children: [
                      { index: true, element: withSuspense(<ProjectsListPage />) },
                      {
                        path: ':id',
                        element: withSuspense(<ProjectDetailPage />),
                        handle: { breadcrumb: 'Project' },
                      },
                    ],
                  },
                  {
                    path: 'tasks',
                    element: withSuspense(<TasksCalendarPage />),
                    handle: { breadcrumb: 'Tasks' },
                  },
                ],
              },
              {
                path: 'marketing',
                handle: { breadcrumb: 'Marketing' },
                children: [
                  {
                    index: true,
                    element: <Navigate to={urls.app.pages.marketing.about} replace />,
                  },
                  {
                    path: 'about',
                    element: withSuspense(<AboutPage />),
                    handle: { breadcrumb: 'About' },
                  },
                  {
                    path: 'contact',
                    element: withSuspense(<ContactPage />),
                    handle: { breadcrumb: 'Contact' },
                  },
                  {
                    path: 'pricing',
                    element: withSuspense(<PricingPage />),
                    handle: { breadcrumb: 'Pricing' },
                  },
                ],
              },
            ],
          },
          {
            path: 'ui',
            handle: { breadcrumb: 'UI Elements' },
            children: [
              { index: true, element: <Navigate to={urls.app.ui.tokens.colors} replace /> },
              {
                path: 'tokens',
                handle: { breadcrumb: 'Tokens' },
                children: [
                  { index: true, element: <Navigate to={urls.app.ui.tokens.colors} replace /> },
                  {
                    path: 'colors',
                    element: withSuspense(<TokensColorsPage />),
                    handle: { breadcrumb: 'Colors' },
                  },
                  {
                    path: 'presets',
                    element: withSuspense(<TokensPresetsPage />),
                    handle: { breadcrumb: 'Theme presets' },
                  },
                ],
              },
              {
                path: 'components',
                handle: { breadcrumb: 'Components' },
                children: [
                  {
                    index: true,
                    element: <Navigate to={urls.app.ui.components.button} replace />,
                  },
                  {
                    path: 'button',
                    element: withSuspense(<UiButtonPage />),
                    handle: { breadcrumb: 'Button' },
                  },
                  {
                    path: 'input',
                    element: withSuspense(<UiInputPage />),
                    handle: { breadcrumb: 'Input' },
                  },
                  {
                    path: 'form',
                    element: withSuspense(<UiFormPage />),
                    handle: { breadcrumb: 'Form' },
                  },
                  {
                    path: 'card',
                    element: withSuspense(<UiCardPage />),
                    handle: { breadcrumb: 'Card' },
                  },
                  {
                    path: 'badge',
                    element: withSuspense(<UiBadgePage />),
                    handle: { breadcrumb: 'Badge' },
                  },
                  {
                    path: 'dialog',
                    element: withSuspense(<UiDialogPage />),
                    handle: { breadcrumb: 'Dialog' },
                  },
                  {
                    path: 'tabs',
                    element: withSuspense(<UiTabsPage />),
                    handle: { breadcrumb: 'Tabs' },
                  },
                  {
                    path: 'toast',
                    element: withSuspense(<UiToastPage />),
                    handle: { breadcrumb: 'Toast' },
                  },
                  {
                    path: 'tooltip',
                    element: withSuspense(<UiTooltipPage />),
                    handle: { breadcrumb: 'Tooltip' },
                  },
                  {
                    path: 'table',
                    element: withSuspense(<UiTablePage />),
                    handle: { breadcrumb: 'Table' },
                  },
                  {
                    path: 'dropdown-menu',
                    element: withSuspense(<UiDropdownMenuPage />),
                    handle: { breadcrumb: 'Dropdown menu' },
                  },
                ],
              },
              {
                path: 'examples',
                handle: { breadcrumb: 'Examples' },
                children: [
                  {
                    index: true,
                    element: <Navigate to={urls.app.ui.examples.feedback} replace />,
                  },
                  {
                    path: 'feedback',
                    element: withSuspense(<UiFeedbackExamplesPage />),
                    handle: { breadcrumb: 'Feedback' },
                  },
                  {
                    path: 'layout',
                    element: withSuspense(<UiLayoutExamplesPage />),
                    handle: { breadcrumb: 'Layout' },
                  },
                ],
              },
            ],
          },
        ],
      },

      {
        path: urls.auth.root,
        element: <AuthLayout />,
        children: [
          { index: true, element: <Navigate to={urls.auth.login} replace /> },
          { path: 'login', element: withSuspense(<LoginPage />) },
          { path: 'register', element: withSuspense(<RegisterPage />) },
          { path: 'forgot', element: withSuspense(<ForgotPasswordPage />) },
        ],
      },

      { path: urls.errors.notFound, element: withSuspense(<NotFoundPage />) },
      { path: urls.errors.server, element: withSuspense(<ServerErrorPage />) },
      { path: urls.errors.forbidden, element: withSuspense(<ForbiddenPage />) },
      { path: urls.errors.maintenance, element: withSuspense(<MaintenancePage />) },
      { path: '*', element: withSuspense(<NotFoundPage />) },
    ],
  },
];
