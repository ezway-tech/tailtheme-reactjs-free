import * as React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  ArrowUpRight,
  Briefcase,
  CheckCircle2,
  Compass,
  Download,
  FolderKanban,
  Palette,
  ShoppingBag,
  Sparkles,
  TicketIcon,
  Users,
} from 'lucide-react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {
  Avatar,
  AvatarFallback,
  Badge,
  Button,
  Calendar,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Progress,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  StatCard,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui';
import { PageHeader } from '@/components/patterns';
import { GradientText, Reveal, StaggerGrid } from '@/components/motion';
import { sampleCourses, sampleNotifications, sampleOrders, sampleUsers } from '@/mocks/fixtures';
import { formatRelative } from '@/mocks/fixtures/notifications';
import { PRESET_PALETTES } from '@/config';
import { cn } from '@/lib/cn';
import { urls } from '@/routes/urls';

const ENGAGEMENT_SERIES = [
  { label: 'W1', learn: 9200, comm: 3100 },
  { label: 'W2', learn: 10100, comm: 3800 },
  { label: 'W3', learn: 11200, comm: 4020 },
  { label: 'W4', learn: 10800, comm: 3900 },
  { label: 'W5', learn: 12400, comm: 4500 },
  { label: 'W6', learn: 11800, comm: 4200 },
];

const TOP_COUNTRIES = [
  { name: 'United States', share: 42 },
  { name: 'Germany', share: 14 },
  { name: 'Japan', share: 11 },
  { name: 'Vietnam', share: 8 },
  { name: 'Brazil', share: 6 },
];

const KPIS_SPOTLIGHT = {
  label: 'Active learners',
  value: '1,248',
  caption: 'vs last period',
  delta: '+8.2%',
  trend: 'up' as const,
  sparkline: [1100, 1150, 1180, 1220, 1210, 1248],
  icon: Users,
};

const KPIS_REST = [
  {
    label: 'GMV (30d)',
    value: '$284k',
    caption: 'Storefront',
    delta: '+14.6%',
    trend: 'up' as const,
    sparkline: [210, 240, 255, 260, 270, 284],
    icon: ShoppingBag,
  },
  {
    label: 'MRR',
    value: '$48.9k',
    caption: 'SaaS',
    delta: '+12.8%',
    trend: 'up' as const,
    sparkline: [38, 40, 42, 45, 47, 49],
    icon: Briefcase,
  },
  {
    label: 'Open tickets',
    value: '23',
    caption: 'P1 / SLA',
    delta: '−12%',
    trend: 'down' as const,
    sparkline: [41, 35, 32, 28, 25, 23],
    icon: TicketIcon,
  },
  {
    label: 'Active projects',
    value: '18',
    caption: '12 on track',
    delta: '+2',
    trend: 'up' as const,
    sparkline: [14, 15, 16, 16, 17, 18],
    icon: FolderKanban,
  },
];

const RECENT_ACTIVITY = [
  {
    actor: sampleUsers[0]?.name ?? 'Alex Nguyen',
    domain: 'Edu',
    detail: `Completed quiz · ${sampleCourses[0]?.title ?? 'Course'}`,
    status: 'success',
    time: sampleNotifications[1]?.createdAt ?? new Date().toISOString(),
  },
  {
    actor: sampleOrders[2]?.customer ?? 'Hiro Tanaka',
    domain: 'E‑commerce',
    detail: `${sampleOrders[2]?.id ?? 'ORD'} · Paid · $360`,
    status: 'paid',
    time: sampleOrders[2]?.placedAt ?? '2026-04-17',
  },
  {
    actor: sampleUsers[1]?.name ?? 'Maria Garcia',
    domain: 'SaaS',
    detail: 'Invited collaborator to workspace',
    status: 'info',
    time: sampleNotifications[3]?.createdAt ?? new Date().toISOString(),
  },
  {
    actor: sampleUsers[3]?.name ?? 'Priya Patel',
    domain: 'Finance',
    detail: 'Invoice ORD‑1045 marked pending',
    status: 'warning',
    time: sampleOrders[3]?.placedAt ?? '2026-04-19',
  },
];

const DOMAIN_GRID: {
  to: string;
  titleKey: string;
  descKey: string;
  icon: typeof Briefcase;
  masonryClass: string;
}[] = [
  {
    to: urls.app.dashboard,
    titleKey: 'nav.dashboards.overview',
    descKey: 'pages.dashboard.overviewCard',
    icon: Compass,
    masonryClass: 'col-span-full min-h-[200px] xl:col-span-5 xl:min-h-[240px]',
  },
  {
    to: urls.app.dashboards.saas,
    titleKey: 'pages.dashboards.saas.title',
    descKey: 'pages.dashboard.saasCard',
    icon: Briefcase,
    masonryClass: 'col-span-full xl:col-span-4',
  },
  {
    to: urls.app.dashboards.project,
    titleKey: 'pages.dashboards.project.title',
    descKey: 'pages.dashboard.projectCard',
    icon: FolderKanban,
    masonryClass: 'col-span-full xl:col-span-3',
  },
];

function tooltipStyle(): React.CSSProperties {
  return {
    background: 'hsl(var(--color-card-hsl, 0 0% 100%))',
    border: '1px solid hsl(var(--color-border-hsl, 220 13% 91%))',
    borderRadius: '0.5rem',
    fontSize: '0.75rem',
  };
}

export default function DashboardPage() {
  const { t } = useTranslation();
  const [calendarDate, setCalendarDate] = React.useState<Date | undefined>(new Date());

  return (
    <div data-dash="overview" className="relative flex flex-col gap-8">
      <PageHeader
        title={t('pages.dashboard.title', 'Dashboard')}
        description={
          <span className="flex flex-col gap-2">
            <span>
              {t('pages.dashboard.subtitle', 'Cross-domain overview of your TailTheme workspace.')}
            </span>
            <span className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Sparkles className="h-4 w-4 text-primary" aria-hidden />
              <GradientText className="text-sm font-semibold">
                {t('pages.dashboard.heroEyebrow', 'Unified pulse across demos')}
              </GradientText>
            </span>
          </span>
        }
        actions={
          <div className="flex flex-wrap gap-2">
            <Select defaultValue="30">
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">Last 7 days</SelectItem>
                <SelectItem value="30">Last 30 days</SelectItem>
                <SelectItem value="90">Last 90 days</SelectItem>
              </SelectContent>
            </Select>
            <Button type="button" variant="outline">
              <Download className="mr-2 h-4 w-4" /> Export
            </Button>
          </div>
        }
      />

      {/* Bento KPI row: spotlight (wide) + 4 tiles */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-12 xl:gap-5">
        <div className="sm:col-span-2 xl:col-span-5">
          <StatCard
            className="h-full overflow-hidden bg-gradient-to-br from-primary/[0.08] via-card to-accent/[0.06] shadow-md ring-1 ring-border/70"
            label={KPIS_SPOTLIGHT.label}
            value={KPIS_SPOTLIGHT.value}
            caption={KPIS_SPOTLIGHT.caption}
            delta={KPIS_SPOTLIGHT.delta}
            trend={KPIS_SPOTLIGHT.trend}
            icon={KPIS_SPOTLIGHT.icon}
            sparkline={KPIS_SPOTLIGHT.sparkline}
          />
        </div>
        <div className="sm:col-span-2 xl:col-span-7">
          <StaggerGrid className="grid gap-4 sm:grid-cols-2 xl:grid-cols-2" stagger="normal">
            {KPIS_REST.map((k) => (
              <StatCard key={k.label} {...k} />
            ))}
          </StaggerGrid>
        </div>
      </div>

      {/* Hero: 8/4 asymmetric — engagement + geography */}
      <div className="grid gap-4 lg:gap-6 xl:grid-cols-12">
        <Card className="relative overflow-hidden border-border/80 bg-card shadow-sm xl:col-span-8">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-[radial-gradient(ellipse_at_20%_-20%,color-mix(in_oklch,var(--color-primary)_18%,transparent),transparent)]"
          />
          <CardHeader className="relative">
            <CardTitle className="text-xl">
              {t('pages.dashboard.heroChart', 'Cross‑product engagement')}
            </CardTitle>
            <CardDescription>
              {t(
                'pages.dashboard.heroChartDesc',
                'Learning hours vs. commerce conversions (indexed)',
              )}
            </CardDescription>
          </CardHeader>
          <CardContent className="relative h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={ENGAGEMENT_SERIES}>
                <defs>
                  <linearGradient id="fillLearnOv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.55} />
                    <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(var(--color-border-hsl, 220 13% 91%))"
                />
                <XAxis dataKey="label" fontSize={12} stroke="currentColor" />
                <YAxis fontSize={12} stroke="currentColor" />
                <Tooltip contentStyle={tooltipStyle()} />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="learn"
                  name="Learning"
                  stroke="var(--color-primary)"
                  fill="url(#fillLearnOv)"
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="comm"
                  name="Commerce"
                  stroke="var(--color-accent)"
                  fill="none"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="xl:col-span-4 xl:border-l xl:border-primary/15 xl:shadow-[inset_1px_0_0_color-mix(in_oklch,var(--color-accent)_35%,transparent)]">
          <CardHeader>
            <CardTitle>{t('pages.dashboard.regionMix', 'Regional mix')}</CardTitle>
            <CardDescription>
              {t('pages.dashboard.regionMixDesc', 'Active users by geography')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {TOP_COUNTRIES.map((c, i) => (
              <Reveal key={c.name} delay={i * 0.035} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span>{c.name}</span>
                  <span className="tabular-nums text-muted-foreground">{c.share}%</span>
                </div>
                <Progress value={c.share} />
              </Reveal>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 xl:grid-cols-12">
        <Card className="xl:col-span-5">
          <CardHeader>
            <CardTitle>{t('pages.dashboard.continueLearning', 'Continue learning')}</CardTitle>
            <CardDescription>
              {t('pages.dashboard.pickUp', 'Pick up where you left off.')}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {sampleCourses.slice(0, 3).map((course) => (
              <Link
                key={course.id}
                to={urls.app.pages.saas.analytics}
                className="flex flex-col gap-2 rounded-md border border-border p-3 transition-colors hover:bg-muted/40"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="font-medium">{course.title}</div>
                    <div className="text-xs text-muted-foreground">
                      {course.instructor} · {course.lessons.length} lessons
                    </div>
                  </div>
                  <Badge variant="secondary">{course.level}</Badge>
                </div>
                <div className="flex items-center gap-3">
                  <Progress value={course.progress} className="flex-1" />
                  <span className="w-12 text-right text-xs tabular-nums text-muted-foreground">
                    {course.progress}%
                  </span>
                </div>
              </Link>
            ))}
          </CardContent>
        </Card>

        <Card className="xl:col-span-4">
          <CardHeader>
            <CardTitle>{t('pages.dashboard.topLearners', 'Top learners')}</CardTitle>
            <CardDescription>{t('pages.dashboard.thisWeek', 'This week')}</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="flex flex-col gap-3">
              {[...sampleUsers]
                .sort((a, b) => b.points - a.points)
                .slice(0, 6)
                .map((user, idx) => (
                  <li key={user.id} className="flex items-center gap-3">
                    <span className="w-5 text-sm font-semibold text-muted-foreground">
                      {idx + 1}
                    </span>
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>
                        {user.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')
                          .slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-medium">{user.name}</div>
                      <div className="text-xs text-muted-foreground">{user.streak} day streak</div>
                    </div>
                    <span className="text-sm font-semibold tabular-nums">
                      {user.points.toLocaleString()}
                    </span>
                  </li>
                ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="border-dashed xl:col-span-3">
          <CardHeader>
            <CardTitle>{t('pages.dashboard.today', 'Calendar')}</CardTitle>
            <CardDescription>{t('pages.dashboard.pickDate', 'Select a date')}</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Calendar
              hideNextButton
              hidePreviousButton
              mode="single"
              selected={calendarDate}
              onSelect={setCalendarDate}
            />
          </CardContent>
        </Card>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">
          {t('pages.dashboard.themeDashboards', 'Theme dashboards')}
        </h2>
        <p className="max-w-2xl text-sm text-muted-foreground">
          {t(
            'pages.dashboard.masonryLead',
            'Each tile jumps to a fully themed cockpit — sizing hints at breadth of that vertical.',
          )}
        </p>
        <div className="grid gap-4 sm:grid-cols-2 xl:auto-rows-auto xl:grid-cols-12">
          {DOMAIN_GRID.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.to} to={item.to} className={cn('block', item.masonryClass)}>
                <Card
                  className={cn(
                    'h-full bg-card/95 transition-all hover:z-10 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg',
                  )}
                >
                  <CardHeader className="flex flex-row items-start gap-4 space-y-0">
                    <span className="rounded-xl bg-muted/80 p-2.5 text-muted-foreground ring-1 ring-border/60">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <div className="min-w-0 flex-1">
                      <CardTitle className="text-base leading-snug">{t(item.titleKey)}</CardTitle>
                      <CardDescription className="mt-1.5 line-clamp-3">
                        {t(item.descKey, '')}
                      </CardDescription>
                    </div>
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-primary/70" aria-hidden />
                  </CardHeader>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      <Card>
        <CardHeader>
          <CardTitle>{t('pages.dashboard.recentActivity', 'Recent activity')}</CardTitle>
          <CardDescription>
            {t(
              'pages.dashboard.recentAcross',
              'Across learning, storefront, SaaS org, and billing',
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table framed={false}>
            <TableHeader>
              <TableRow>
                <TableHead>{t('pages.dashboard.actor', 'Who')}</TableHead>
                <TableHead>{t('pages.dashboard.domain', 'Domain')}</TableHead>
                <TableHead>{t('pages.dashboard.detail', 'Detail')}</TableHead>
                <TableHead>{t('pages.dashboard.status', 'Status')}</TableHead>
                <TableHead className="text-right">{t('pages.dashboard.when', 'When')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {RECENT_ACTIVITY.map((row, i) => (
                <TableRow key={`${row.actor}-${row.domain}-${i}`}>
                  <TableCell className="font-medium">{row.actor}</TableCell>
                  <TableCell>{row.domain}</TableCell>
                  <TableCell className="max-w-[min(420px,50vw)] text-muted-foreground">
                    {row.detail}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{row.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right text-xs tabular-nums text-muted-foreground">
                    {row.time.includes('T') ? formatRelative(row.time) : row.time}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="overflow-hidden border-muted">
        <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:space-y-0">
          <div className="space-y-1">
            <CardTitle>{t('pages.dashboard.presetsStrip', 'Theme presets')}</CardTitle>
            <CardDescription>
              {t(
                'pages.dashboard.presetsStripDesc',
                'Click to open presets — palettes tint charts and shell',
              )}
            </CardDescription>
          </div>
          <Button type="button" variant="outline" size="sm" asChild className="shrink-0">
            <Link to={urls.app.settings}>
              <Palette className="mr-2 h-4 w-4" /> Settings
            </Link>
          </Button>
        </CardHeader>
        <CardContent className="pb-5">
          <div className="-mx-1 flex snap-x snap-mandatory gap-2 overflow-x-auto pb-2 pt-1 [scrollbar-width:thin]">
            {PRESET_PALETTES.map((p) => (
              <Link
                key={p.id}
                to={urls.app.settings}
                className="snap-start shrink-0 rounded-full border border-border bg-muted/30 px-3 py-2 text-xs font-medium shadow-sm backdrop-blur-sm transition-colors hover:border-primary/40 hover:bg-muted/60 dark:hover:bg-muted/40"
              >
                <span
                  aria-hidden
                  className="mr-2 inline-block h-3 w-3 rounded-full border border-background align-middle shadow ring-2 ring-muted"
                  style={{ background: `hsl(${p.primaryHsl})` }}
                />
                {p.name}
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-wrap gap-2">
        <Badge variant="outline" className="gap-1.5 px-3 py-1">
          <CheckCircle2 className="h-3.5 w-3.5 text-success-text" aria-hidden /> API
        </Badge>
        <Badge variant="outline" className="gap-1.5 px-3 py-1">
          <CheckCircle2 className="h-3.5 w-3.5 text-success-text" aria-hidden /> CDN / assets
        </Badge>
        <Badge variant="outline" className="gap-1.5 px-3 py-1">
          <CheckCircle2 className="h-3.5 w-3.5 text-success-text" aria-hidden /> Notifications
        </Badge>
        <Badge variant="outline" className="gap-1.5 px-3 py-1">
          <CheckCircle2 className="h-3.5 w-3.5 text-success-text" aria-hidden /> Build pipeline
        </Badge>
      </div>
    </div>
  );
}
