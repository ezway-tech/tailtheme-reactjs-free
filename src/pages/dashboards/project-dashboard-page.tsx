import * as React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AlarmClockCheck, Columns3, Download, Layers, ListTodo, Zap } from 'lucide-react';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {
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
  ScrollArea,
} from '@/components/ui';
import { PageHeader } from '@/components/patterns';
import { Reveal } from '@/components/motion';
import { cn } from '@/lib/cn';
import { urls } from '@/routes/urls';

function tooltipStyle(): React.CSSProperties {
  return {
    background: 'hsl(var(--color-card-hsl, 0 0% 100%))',
    border: '1px solid hsl(var(--color-border-hsl, 220 13% 91%))',
    borderRadius: '0.5rem',
    fontSize: '0.75rem',
  };
}

const BURNDOWN = [
  { d: 'Apr 01', planned: 45, remaining: 42 },
  { d: 'Apr 06', planned: 40, remaining: 36 },
  { d: 'Apr 12', planned: 28, remaining: 30 },
  { d: 'Apr 18', planned: 16, remaining: 18 },
  { d: 'Apr 28', planned: 8, remaining: 6 },
];

const TEAM_LOAD = [
  { name: 'Alex', pct: 88 },
  { name: 'Priya', pct: 64 },
  { name: 'Hiro', pct: 52 },
];

const KAN_COLS = [
  {
    title: 'To do',
    items: ['Spec reviews', 'Chase assets', 'Design QA prep'],
  },
  {
    title: 'In progress',
    items: ['Dash polish', 'E2E tests', 'API stubs'],
    accent: true,
  },
  {
    title: 'Done',
    items: ['Routing map', 'i18n sweep'],
  },
];

const FEED = [
  { who: 'Alex', action: 'moved OPS-412 to QA', ts: '1h ago' },
  { who: 'Maria', action: 'commented on OPS-389', ts: '3h ago' },
];

const KPIS_ROW = [
  { label: 'Projects', value: '18', hint: '+2 sprint', icon: Layers },
  { label: 'Open tasks', value: '286', hint: '−32 wk', icon: ListTodo },
  { label: 'On-time %', value: '88%', hint: '+5 sprint', icon: AlarmClockCheck },
  { label: 'Velocity', value: '34', hint: 'pts/wk', icon: Zap },
];

export default function ProjectDashboardPage() {
  const { t } = useTranslation();
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <div data-dash="project" className="flex flex-col gap-8">
      <PageHeader
        title={t('pages.dashboards.project.title', 'Project')}
        description={t('pages.dashboards.project.subtitle', 'Delivery pacing & teamwork.')}
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

      {/* Wide Kanban hero */}
      <section aria-labelledby="proj-kanban-heading">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2
              id="proj-kanban-heading"
              className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground"
            >
              {t('projDash.kanbanHeroEyebrow', 'Sprint board')}
            </h2>
            <p className="mt-1 text-lg font-semibold tracking-tight">
              {t('projDash.miniKanban', 'Sprint snapshot')}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {KPIS_ROW.map(({ label, value, hint, icon: Icon }) => (
              <div
                key={label}
                className="flex min-w-[140px] items-center gap-3 rounded-xl border border-border bg-card px-4 py-2 shadow-sm"
              >
                <Icon className="h-8 w-8 shrink-0 text-muted-foreground" aria-hidden />
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                    {label}
                  </p>
                  <p className="text-xl font-semibold tabular-nums leading-none">{value}</p>
                  <p className="text-[11px] text-muted-foreground">{hint}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Card className="overflow-hidden border-primary/15 bg-gradient-to-b from-muted/40 to-background">
          <CardContent className="p-4 sm:p-6">
            <div className="grid min-h-[min(360px,55vh)] gap-4 md:grid-cols-3 lg:min-h-[320px]">
              {KAN_COLS.map((col) => (
                <div
                  key={col.title}
                  className={cn(
                    'flex min-h-[260px] flex-col rounded-xl border p-4',
                    col.accent
                      ? 'border-primary/35 bg-muted/40 ring-1 ring-primary/15'
                      : 'border-border bg-card',
                  )}
                >
                  <div className="mb-4 flex items-center justify-between gap-2">
                    <span className="text-sm font-semibold">{col.title}</span>
                    <Badge variant="outline" className="font-mono">
                      {col.items.length}
                    </Badge>
                  </div>
                  <ScrollArea className="flex-1 pr-3">
                    <ul className="space-y-2.5 pb-2">
                      {col.items.map((it) => (
                        <li
                          key={it}
                          className="rounded-lg border border-border bg-background/80 px-3 py-3 text-sm shadow-sm"
                        >
                          {it}
                        </li>
                      ))}
                    </ul>
                  </ScrollArea>
                </div>
              ))}
            </div>
            <Button className="mt-6 w-full sm:w-auto" variant="outline" asChild>
              <Link to={urls.app.pages.project.kanban}>{t('projDash.board', 'Full board')}</Link>
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Secondary: burndown + calendar */}
      <div className="grid gap-6 xl:grid-cols-12">
        <Card className="xl:col-span-7">
          <CardHeader>
            <CardTitle>{t('projDash.burndown', 'Scope burndown')}</CardTitle>
            <CardDescription>
              {t('projDash.burndownSub', 'Ideal vs remaining — secondary focus')}
            </CardDescription>
          </CardHeader>
          <CardContent className="h-64 xl:h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={BURNDOWN}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(var(--color-border-hsl, 220 13% 91%))"
                />
                <XAxis dataKey="d" fontSize={11} stroke="currentColor" />
                <YAxis fontSize={11} stroke="currentColor" />
                <Tooltip contentStyle={tooltipStyle()} />
                <Line
                  type="monotone"
                  dataKey="planned"
                  stroke="var(--color-muted-foreground)"
                  strokeDasharray="4 4"
                  name="Ideal"
                />
                <Line
                  type="monotone"
                  dataKey="remaining"
                  stroke="var(--color-primary)"
                  strokeWidth={2}
                  name="Remaining pts"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="xl:col-span-5">
          <CardHeader>
            <CardTitle>{t('projDash.weekCal', 'This week')}</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center pb-6">
            <Calendar
              hideNextButton
              hidePreviousButton
              mode="single"
              selected={date}
              onSelect={setDate}
            />
          </CardContent>
        </Card>
      </div>

      {/* Large horizontal workload bars */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{t('projDash.load', 'Workload')}</CardTitle>
            <CardDescription>{t('projDash.loadSub', 'Team capacity bars')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {TEAM_LOAD.map((m, i) => (
              <Reveal key={m.name} delay={i * 0.04}>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{m.name}</span>
                    <span className="font-mono tabular-nums text-muted-foreground">
                      {m.pct}% cap
                    </span>
                  </div>
                  <Progress value={m.pct} className="h-4 [&>div]:rounded-full" />
                </div>
              </Reveal>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('projDash.feed', 'Activity')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {FEED.map((row) => (
              <div
                key={row.action}
                className="rounded-lg border border-dashed border-border px-4 py-3 text-sm"
              >
                <span className="font-medium">{row.who}</span>{' '}
                <span className="text-muted-foreground">{row.action}</span>
                <div className="mt-1 font-mono text-xs text-muted-foreground">{row.ts}</div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-dashed p-4">
          <Columns3 className="mb-2 h-5 w-5 text-muted-foreground" />
          <CardTitle className="mb-3 text-base font-normal">Kanban</CardTitle>
          <Button variant="outline" className="w-full" asChild>
            <Link to={urls.app.pages.project.kanban}>Board</Link>
          </Button>
        </Card>
        <Card className="border-dashed p-4">
          <Layers className="mb-2 h-5 w-5 text-muted-foreground" />
          <CardTitle className="mb-3 text-base font-normal">Projects</CardTitle>
          <Button variant="outline" className="w-full" asChild>
            <Link to={urls.app.pages.project.projects}>Portfolio</Link>
          </Button>
        </Card>
        <Card className="border-dashed p-4">
          <AlarmClockCheck className="mb-2 h-5 w-5 text-muted-foreground" />
          <CardTitle className="mb-3 text-base font-normal">Calendar</CardTitle>
          <Button variant="outline" className="w-full" asChild>
            <Link to={urls.app.pages.project.tasks}>Schedule</Link>
          </Button>
        </Card>
        <Card className="border-dashed p-4">
          <ListTodo className="mb-2 h-5 w-5 text-muted-foreground" />
          <CardTitle className="mb-3 text-base font-normal">Tasks</CardTitle>
          <Button variant="outline" className="w-full" asChild>
            <Link to={urls.app.pages.project.tasks}>List</Link>
          </Button>
        </Card>
      </div>
    </div>
  );
}
