import { ArrowDownRight, ArrowUpRight, Download } from 'lucide-react';
import {
  Badge,
  Button,
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
import { Reveal, StaggerGrid } from '@/components/motion';
import { motion } from 'motion/react';
import { DURATION, EASE, STAGGER } from '@/lib/motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/cn';

const KPIS = [
  { label: 'MRR', value: '$48,920', change: 12.8, up: true },
  { label: 'Active users', value: '14,382', change: 4.2, up: true },
  { label: 'Sign-ups', value: '1,204', change: -1.8, up: false },
  { label: 'Churn', value: '2.1%', change: -0.3, up: true },
];

const SPARK = [28, 32, 30, 44, 48, 52, 51, 58, 63, 65, 70, 74, 72, 78];

const TOP_COUNTRIES = [
  { name: 'United States', share: 42 },
  { name: 'Germany', share: 14 },
  { name: 'Japan', share: 11 },
  { name: 'Vietnam', share: 8 },
  { name: 'Brazil', share: 6 },
];

const CHANNELS = [
  { source: 'Organic search', visits: 48210, conv: 3.6 },
  { source: 'Direct', visits: 22140, conv: 4.8 },
  { source: 'Referral', visits: 11892, conv: 2.7 },
  { source: 'Social', visits: 8342, conv: 1.9 },
  { source: 'Email', visits: 4021, conv: 6.3 },
];

export default function AnalyticsPage() {
  const reduced = useReducedMotion();
  const max = Math.max(...SPARK);
  return (
    <div className="space-y-6">
      <PageHeader
        title="Analytics"
        description="Product and growth metrics across the last 30 days."
        actions={
          <div className="flex gap-2">
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
            <Button variant="outline">
              <Download className="h-4 w-4" /> Export
            </Button>
          </div>
        }
      />

      <StaggerGrid className="grid gap-4 md:grid-cols-2 xl:grid-cols-4" stagger="normal">
        {KPIS.map((k) => (
          <Card key={k.label}>
            <CardHeader className="pb-2">
              <CardDescription>{k.label}</CardDescription>
              <CardTitle className="text-2xl">{k.value}</CardTitle>
            </CardHeader>
            <CardContent>
              <Badge variant={k.up ? 'default' : 'danger'} className="gap-1">
                {k.up ? (
                  <ArrowUpRight className="h-3 w-3" />
                ) : (
                  <ArrowDownRight className="h-3 w-3" />
                )}
                {Math.abs(k.change)}%
              </Badge>
            </CardContent>
          </Card>
        ))}
      </StaggerGrid>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Active users</CardTitle>
            <CardDescription>Daily, last 14 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex h-48 items-end gap-1">
              {SPARK.map((v, i) => (
                <motion.div
                  key={i}
                  className="flex-1 rounded-t bg-primary/70 transition-colors hover:bg-primary"
                  initial={reduced ? false : { scaleY: 0 }}
                  animate={reduced ? undefined : { scaleY: 1 }}
                  transition={{
                    duration: DURATION.md,
                    delay: i * STAGGER.tight,
                    ease: EASE.out,
                  }}
                  style={{ height: `${(v / max) * 100}%`, transformOrigin: 'bottom' }}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top countries</CardTitle>
            <CardDescription>By active users</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {TOP_COUNTRIES.map((c, i) => (
              <Reveal key={c.name} delay={i * STAGGER.tight} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span>{c.name}</span>
                  <span className="text-muted-foreground">{c.share}%</span>
                </div>
                <Progress value={c.share} />
              </Reveal>
            ))}
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="channels">
        <TabsList>
          <TabsTrigger value="channels">Channels</TabsTrigger>
          <TabsTrigger value="funnel">Funnel</TabsTrigger>
          <TabsTrigger value="retention">Retention</TabsTrigger>
        </TabsList>
        <TabsContent value="channels">
          <Card>
            <CardContent>
              <Table framed={false}>
                <TableHeader>
                  <TableRow>
                    <TableHead>Source</TableHead>
                    <TableHead className="text-right">Visits</TableHead>
                    <TableHead className="text-right">Conv.</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {CHANNELS.map((c) => (
                    <TableRow key={c.source}>
                      <TableCell className="font-medium">{c.source}</TableCell>
                      <TableCell className="text-right font-mono">
                        {c.visits.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <span
                          className={cn(c.conv >= 3 ? 'text-green-600' : 'text-muted-foreground')}
                        >
                          {c.conv}%
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="funnel" className="text-sm text-muted-foreground">
          Funnel placeholder — wire to your analytics provider.
        </TabsContent>
        <TabsContent value="retention" className="text-sm text-muted-foreground">
          Retention cohort placeholder.
        </TabsContent>
      </Tabs>
    </div>
  );
}
