import { useParams } from 'react-router-dom';
import { Activity, CheckCircle2, Circle, Clock, Target, TrendingUp } from 'lucide-react';
import {
  Avatar,
  AvatarFallback,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Progress,
  Separator,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui';
import { PageHeader } from '@/components/patterns';

const MILESTONES = [
  { id: 'm-1', label: 'Discovery & research', done: true, due: 'Feb 14' },
  { id: 'm-2', label: 'Design system tokens', done: true, due: 'Mar 07' },
  { id: 'm-3', label: 'AppShell nested nav', done: true, due: 'Mar 22' },
  { id: 'm-4', label: 'Theme pages rollout', done: false, due: 'Apr 30' },
  { id: 'm-5', label: 'Docs + marketing site', done: false, due: 'May 21' },
];

const ACTIVITY = [
  { id: 'a-1', who: 'Alex Nguyen', what: 'merged #482 "Nested sidebar"', when: '2h ago' },
  { id: 'a-2', who: 'Hiro Tanaka', what: 'closed 3 tasks in sprint 12', when: 'yesterday' },
  { id: 'a-3', who: 'Maria Garcia', what: 'published the theming guide', when: '2d ago' },
];

export default function ProjectDetailPage() {
  const { id = 'proj-1' } = useParams<{ id: string }>();

  return (
    <div className="space-y-6">
      <PageHeader
        title="TailTheme 3.0 launch"
        description={`Project ID: ${id} · 68% complete · due May 21`}
        actions={<Button>Edit project</Button>}
      />

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center gap-3 space-y-0">
            <Target className="h-4 w-4 text-muted-foreground" />
            <CardTitle className="text-sm font-medium">Progress</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            <p className="text-2xl font-semibold">68%</p>
            <Progress value={68} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center gap-3 space-y-0">
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
            <CardTitle className="text-sm font-medium">Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">34 / 50</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center gap-3 space-y-0">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <CardTitle className="text-sm font-medium">Days left</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">29</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center gap-3 space-y-0">
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
            <CardTitle className="text-sm font-medium">Velocity</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">12.4</p>
            <p className="text-xs text-muted-foreground">avg pts/week</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="milestones">Milestones</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="grid gap-4 md:grid-cols-3">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Summary</CardTitle>
              <CardDescription>Scope, goals, and guardrails</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>
                Unify navigation by moving PAGES, UI ELEMENTS, and DOCS under a single AppShell
                layout. Deliver ~30 themed sample pages, individual primitive docs, and keep
                auth/error/fullscreen layouts.
              </p>
              <p>
                Success criteria: WCAG AA, zero legacy route regressions, and a typecheck/lint/test
                pipeline kept green throughout the rollout.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Team</CardTitle>
              <CardDescription>Core contributors</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {['Alex Nguyen', 'Hiro Tanaka', 'Maria Garcia', 'Priya Patel'].map((name) => (
                  <li key={name} className="flex items-center gap-3 text-sm">
                    <Avatar className="h-7 w-7">
                      <AvatarFallback>{name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <span>{name}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="milestones">
          <Card>
            <CardContent className="divide-y divide-border p-0">
              {MILESTONES.map((m) => (
                <div key={m.id} className="flex items-center gap-3 p-4">
                  {m.done ? (
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  ) : (
                    <Circle className="h-5 w-5 text-muted-foreground" />
                  )}
                  <div className="flex-1">
                    <p
                      className={
                        m.done
                          ? 'text-sm font-medium line-through text-muted-foreground'
                          : 'text-sm font-medium'
                      }
                    >
                      {m.label}
                    </p>
                  </div>
                  <Badge variant="outline">{m.due}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity">
          <Card>
            <CardContent className="p-0">
              <ul className="divide-y divide-border">
                {ACTIVITY.map((a) => (
                  <li key={a.id} className="flex items-center gap-3 p-4">
                    <Activity className="h-4 w-4 text-muted-foreground" />
                    <div className="flex-1 text-sm">
                      <span className="font-medium">{a.who}</span>{' '}
                      <span className="text-muted-foreground">{a.what}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{a.when}</span>
                  </li>
                ))}
              </ul>
              <Separator />
              <div className="p-3 text-center">
                <Button variant="ghost" size="sm">
                  Load more
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
