import { Link } from 'react-router-dom';
import { FolderOpen, Plus, Users } from 'lucide-react';
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
} from '@/components/ui';
import { PageHeader } from '@/components/patterns';
import { urls } from '@/routes/urls';

interface Project {
  id: string;
  name: string;
  description: string;
  progress: number;
  members: string[];
  tasksDone: number;
  tasksTotal: number;
  status: 'active' | 'paused' | 'completed';
}

const PROJECTS: Project[] = [
  {
    id: 'proj-1',
    name: 'TailTheme 3.0 launch',
    description: 'Q2 roadmap — ship nested nav, new theming tokens, and docs revamp.',
    progress: 68,
    members: ['AL', 'HT', 'MA', 'PR'],
    tasksDone: 34,
    tasksTotal: 50,
    status: 'active',
  },
  {
    id: 'proj-2',
    name: 'Marketing website refresh',
    description: 'New landing, pricing, and blog templates using the shared AppShell.',
    progress: 42,
    members: ['AL', 'MA'],
    tasksDone: 17,
    tasksTotal: 40,
    status: 'active',
  },
  {
    id: 'proj-3',
    name: 'Billing platform',
    description: 'Invoicing + subscription management across finance theme pages.',
    progress: 100,
    members: ['PR', 'HT'],
    tasksDone: 22,
    tasksTotal: 22,
    status: 'completed',
  },
  {
    id: 'proj-4',
    name: 'Mobile companion app',
    description: 'Paused pending research outcomes from the UX team.',
    progress: 22,
    members: ['AL', 'PR'],
    tasksDone: 5,
    tasksTotal: 23,
    status: 'paused',
  },
];

const statusVariant: Record<Project['status'], 'default' | 'secondary' | 'outline'> = {
  active: 'default',
  paused: 'outline',
  completed: 'secondary',
};

export default function ProjectsListPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Projects"
        description="All active, paused, and completed projects."
        actions={
          <Button>
            <Plus className="h-4 w-4" /> New project
          </Button>
        }
      />
      <div className="grid gap-4 md:grid-cols-2">
        {PROJECTS.map((p) => (
          <Card key={p.id}>
            <CardHeader>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-muted">
                    <FolderOpen className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <CardTitle className="text-base">
                      <Link
                        className="hover:underline"
                        to={urls.app.pages.project.projectDetail(p.id)}
                      >
                        {p.name}
                      </Link>
                    </CardTitle>
                    <CardDescription>{p.description}</CardDescription>
                  </div>
                </div>
                <Badge variant={statusVariant[p.status]} className="capitalize">
                  {p.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Progress</span>
                  <span>{p.progress}%</span>
                </div>
                <Progress value={p.progress} />
              </div>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <div className="flex -space-x-2">
                    {p.members.map((m, i) => (
                      <Avatar key={m + i} className="h-6 w-6 ring-2 ring-background">
                        <AvatarFallback className="text-[10px]">{m}</AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                </div>
                <span>
                  {p.tasksDone}/{p.tasksTotal} tasks
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
