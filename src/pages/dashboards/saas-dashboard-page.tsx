import * as React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  Download,
  Headphones,
  LineChartIcon,
  Users,
} from 'lucide-react';
import {
  Cell,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui';
import { PageHeader } from '@/components/patterns';
import { cn } from '@/lib/cn';
import { urls } from '@/routes/urls';

function tooltipStyleDark(): React.CSSProperties {
  return {
    background: '#18181b',
    border: '1px solid #3f3f46',
    borderRadius: '0.5rem',
    fontSize: '0.75rem',
    color: '#fafafa',
  };
}

function tooltipStyle(): React.CSSProperties {
  return {
    background: 'hsl(var(--color-card-hsl, 0 0% 100%))',
    border: '1px solid hsl(var(--color-border-hsl, 220 13% 91%))',
    borderRadius: '0.5rem',
    fontSize: '0.75rem',
  };
}

const SERIES_GROWTH = [
  { m: 'Jan', mrr: 38, churn: 2.9 },
  { m: 'Feb', mrr: 40, churn: 2.7 },
  { m: 'Mar', mrr: 43, churn: 2.5 },
  { m: 'Apr', mrr: 46, churn: 2.4 },
  { m: 'May', mrr: 47, churn: 2.3 },
  { m: 'Jun', mrr: 48.9, churn: 2.1 },
];

const PLANS_PIE = [
  { plan: 'Starter', value: 32 },
  { plan: 'Pro', value: 48 },
  { plan: 'Enterprise', value: 20 },
];

const PIE_COLORS = ['#60a5fa', '#fb923c', '#22d3ee'];

const ACCOUNTS_TOP = [
  { name: 'Northwind LMS', seats: 120, revenue: '$8.9k/mo' },
  { name: 'Acme Robotics', seats: 64, revenue: '$4.2k/mo' },
  { name: 'Globex HQ', seats: 38, revenue: '$2.4k/mo' },
];

const AUDIT = [
  { who: 'Alex Nguyen', action: 'Changed billing email', at: '12m ago' },
  { who: 'Maria Garcia', action: 'Provisioned SSO', at: '2h ago' },
  { who: 'Aisha Khan', action: 'Exported reports', at: '4h ago' },
];

const TICKETS = [
  { id: 'SUP-1042', subject: 'Webhook retries spike on EU edge', owner: 'Ops', pri: 'P1' },
  { id: 'SUP-1043', subject: 'Invoice PDF missing VAT line', owner: 'Billing', pri: 'P2' },
  { id: 'SUP-1044', subject: 'SCIM provisioning delay', owner: 'Eng', pri: 'P3' },
];

const KPIN = [
  { label: 'MRR', value: '$48.9k', delta: '+12.8%', up: true, caption: 'vs last month' },
  { label: 'Active users', value: '14.4k', delta: '+4.2%', up: true, caption: '28d avg' },
  { label: 'Sign-ups', value: '1,204', delta: '−1.8%', up: false, caption: 'trials started' },
  { label: 'Churn', value: '2.1%', delta: '−0.3pp', up: true, caption: 'rev. churn (good)' },
];

export default function SaasDashboardPage() {
  const { t } = useTranslation();

  return (
    <div data-dash="saas" className="flex flex-col gap-8">
      <PageHeader
        title={t('pages.dashboards.saas.title', 'SaaS')}
        description={
          <span className="inline-flex items-center gap-2">
            <Activity className="h-4 w-4 text-primary" aria-hidden />
            {t('pages.dashboards.saas.subtitle', 'Subscription health & support load.')}
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

      {/* Control-plane band: KPIs + embedded growth chart */}
      <section
        className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6 text-zinc-100 shadow-inner dark:border-zinc-700 lg:p-8"
        aria-labelledby="saas-band-heading"
      >
        <h2
          id="saas-band-heading"
          className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500"
        >
          {t('saasDash.opsBand', 'Fleet metrics')}
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {KPIN.map((row) => (
            <div
              key={row.label}
              className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 backdrop-blur-sm"
            >
              <p className="text-[11px] font-medium uppercase tracking-wide text-zinc-500">
                {row.label}
              </p>
              <p className="mt-2 font-mono text-2xl font-semibold tabular-nums tracking-tight">
                {row.value}
              </p>
              <p className="mt-1 flex items-center gap-1 text-xs text-zinc-400">
                {row.up ? (
                  <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-emerald-400" aria-hidden />
                ) : (
                  <ArrowDownRight className="h-3.5 w-3.5 shrink-0 text-rose-400" aria-hidden />
                )}
                <span className={row.up ? 'text-emerald-400' : 'text-rose-400'}>{row.delta}</span>
                <span className="text-zinc-500">· {row.caption}</span>
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 h-64 border-t border-white/10 pt-6">
          <p className="mb-4 text-xs text-zinc-500">
            {t('saasDash.bandChartTitle', 'MRR vs churn (same surface)')}
          </p>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={SERIES_GROWTH}>
              <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" />
              <XAxis
                dataKey="m"
                tick={{ fill: '#a1a1aa', fontSize: 11 }}
                axisLine={{ stroke: '#52525b' }}
              />
              <YAxis
                yAxisId="left"
                tick={{ fill: '#a1a1aa', fontSize: 11 }}
                axisLine={{ stroke: '#52525b' }}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                tick={{ fill: '#a1a1aa', fontSize: 11 }}
                axisLine={{ stroke: '#52525b' }}
              />
              <Tooltip contentStyle={tooltipStyleDark()} />
              <Legend wrapperStyle={{ color: '#d4d4d8', fontSize: 11 }} />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="mrr"
                name="MRR (k$)"
                stroke="#60a5fa"
                strokeWidth={2}
                dot={false}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="churn"
                name="Churn %"
                stroke="#fb923c"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>{t('saasDash.mrrChurnLight', 'Detail view')}</CardTitle>
            <CardDescription>
              {t('saasDash.mrrChurnDup', 'Light theme chart for screenshots')}
            </CardDescription>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={SERIES_GROWTH}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(var(--color-border-hsl, 220 13% 91%))"
                />
                <XAxis dataKey="m" fontSize={11} stroke="currentColor" />
                <YAxis yAxisId="left" fontSize={11} stroke="currentColor" />
                <YAxis yAxisId="right" orientation="right" fontSize={11} stroke="currentColor" />
                <Tooltip contentStyle={tooltipStyle()} />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="mrr"
                  name="MRR (k$)"
                  stroke="var(--color-primary)"
                  strokeWidth={2}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="churn"
                  name="Churn %"
                  stroke="var(--color-accent)"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('saasDash.plans', 'Plan distribution')}</CardTitle>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={PLANS_PIE}
                  dataKey="value"
                  nameKey="plan"
                  innerRadius={40}
                  outerRadius={70}
                >
                  {PLANS_PIE.map((_, i) => (
                    <Cell key={PLANS_PIE[i]?.plan} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={tooltipStyle()} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{t('saasDash.topAccounts', 'Top accounts')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {ACCOUNTS_TOP.map((a) => (
              <div key={a.name} className="flex items-center justify-between gap-2 text-sm">
                <div>
                  <div className="font-medium">{a.name}</div>
                  <div className="text-xs text-muted-foreground">{a.seats} seats</div>
                </div>
                <span className="font-mono text-xs tabular-nums">{a.revenue}</span>
              </div>
            ))}
            <Button variant="outline" className="w-full" asChild>
              <Link to={urls.app.pages.saas.members}>{t('saasDash.members', 'Members')}</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="font-mono text-sm">
          <CardHeader>
            <CardTitle className="font-sans">{t('saasDash.audit', 'Audit log')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 font-sans">
            {AUDIT.map((row) => (
              <div key={row.action} className="flex justify-between gap-2 text-sm">
                <div>
                  <div className="font-medium">{row.who}</div>
                  <div className="text-xs text-muted-foreground">{row.action}</div>
                </div>
                <span className="shrink-0 rounded bg-muted px-2 py-0.5 text-xs">{row.at}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="tickets">
        <TabsList>
          <TabsTrigger value="tickets">{t('saasDash.support', 'Incidents')}</TabsTrigger>
          <TabsTrigger value="funnel">Funnel</TabsTrigger>
          <TabsTrigger value="retention">Retention</TabsTrigger>
        </TabsList>
        <TabsContent value="tickets">
          <Card>
            <CardContent>
              <Table framed={false}>
                <TableHeader>
                  <TableRow className="bg-muted/50 hover:bg-muted/50">
                    <TableHead className="w-[100px]">ID</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Owner</TableHead>
                    <TableHead className="w-[72px]">Pri</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {TICKETS.map((x, i) => (
                    <TableRow key={x.id} className={cn(i % 2 === 1 && 'bg-muted/30')}>
                      <TableCell className="font-mono text-xs text-primary">{x.id}</TableCell>
                      <TableCell className="max-w-[min(520px,60vw)]">{x.subject}</TableCell>
                      <TableCell className="text-muted-foreground">{x.owner}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            x.pri === 'P1' ? 'danger' : x.pri === 'P2' ? 'warning' : 'outline'
                          }
                          className="font-mono"
                        >
                          {x.pri}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="funnel" className="text-sm text-muted-foreground">
          Funnel placeholder — wire to your product analytics.
        </TabsContent>
        <TabsContent value="retention" className="text-sm text-muted-foreground">
          Cohort placeholder — wire to warehouse.
        </TabsContent>
      </Tabs>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-dashed p-4">
          <BarChart3 className="mb-2 h-5 w-5 text-muted-foreground" />
          <CardTitle className="mb-3 text-base font-normal">Analytics</CardTitle>
          <Button variant="outline" className="w-full" asChild>
            <Link to={urls.app.pages.saas.analytics}>Open</Link>
          </Button>
        </Card>
        <Card className="border-dashed p-4">
          <Users className="mb-2 h-5 w-5 text-muted-foreground" />
          <CardTitle className="mb-3 text-base font-normal">Members</CardTitle>
          <Button variant="outline" className="w-full" asChild>
            <Link to={urls.app.pages.saas.members}>Manage</Link>
          </Button>
        </Card>
        <Card className="border-dashed p-4">
          <Headphones className="mb-2 h-5 w-5 text-muted-foreground" />
          <CardTitle className="mb-3 text-base font-normal">Data</CardTitle>
          <Button variant="outline" className="w-full" asChild>
            <Link to={urls.app.pages.saas.members}>Members</Link>
          </Button>
        </Card>
        <Card className="border-dashed p-4">
          <LineChartIcon className="mb-2 h-5 w-5 text-muted-foreground" />
          <CardTitle className="mb-3 text-base font-normal">Settings</CardTitle>
          <Button variant="outline" className="w-full" asChild>
            <Link to={urls.app.settings}>Settings</Link>
          </Button>
        </Card>
      </div>
    </div>
  );
}
