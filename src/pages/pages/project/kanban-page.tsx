import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { MessageSquare, MoreHorizontal, Paperclip, Plus } from 'lucide-react';
import {
  Avatar,
  AvatarFallback,
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
} from '@/components/ui';
import { PageHeader } from '@/components/patterns';
import { SPRING } from '@/lib/motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

type Status = 'todo' | 'in-progress' | 'review' | 'done';

interface Task {
  id: string;
  title: string;
  status: Status;
  labels: string[];
  assignees: string[];
  comments: number;
  attachments: number;
}

const INITIAL_TASKS: Task[] = [
  {
    id: 'k-1',
    title: 'Design onboarding illustrations',
    status: 'todo',
    labels: ['design'],
    assignees: ['AL'],
    comments: 2,
    attachments: 1,
  },
  {
    id: 'k-2',
    title: 'Spec out notifications API',
    status: 'todo',
    labels: ['backend'],
    assignees: ['HT', 'MA'],
    comments: 0,
    attachments: 0,
  },
  {
    id: 'k-3',
    title: 'Refactor table toolbar',
    status: 'in-progress',
    labels: ['frontend', 'tech-debt'],
    assignees: ['PR'],
    comments: 5,
    attachments: 0,
  },
  {
    id: 'k-4',
    title: 'Wire up AppShell nested sidebar',
    status: 'in-progress',
    labels: ['frontend'],
    assignees: ['AL'],
    comments: 12,
    attachments: 3,
  },
  {
    id: 'k-5',
    title: 'Publish theming docs update',
    status: 'review',
    labels: ['docs'],
    assignees: ['MA'],
    comments: 3,
    attachments: 0,
  },
  {
    id: 'k-6',
    title: 'Audit WCAG contrasts',
    status: 'review',
    labels: ['a11y'],
    assignees: ['HT'],
    comments: 1,
    attachments: 2,
  },
  {
    id: 'k-7',
    title: 'Release v2.3.0',
    status: 'done',
    labels: ['release'],
    assignees: ['PR', 'AL'],
    comments: 8,
    attachments: 1,
  },
];

const COLUMNS: Array<{ id: Status; title: string }> = [
  { id: 'todo', title: 'To do' },
  { id: 'in-progress', title: 'In progress' },
  { id: 'review', title: 'In review' },
  { id: 'done', title: 'Done' },
];

function nextStatus(s: Status): Status {
  const i = COLUMNS.findIndex((c) => c.id === s);
  return COLUMNS[Math.min(COLUMNS.length - 1, i + 1)]!.id;
}

export default function KanbanPage() {
  const reduced = useReducedMotion();
  const [tasks, setTasks] = useState(INITIAL_TASKS);

  const advance = (id: string) =>
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, status: nextStatus(t.status) } : t)));

  return (
    <div className="space-y-6">
      <PageHeader
        title="Kanban board"
        description="Click or drag a card to move it to the next column."
        actions={
          <Button>
            <Plus className="h-4 w-4" /> New task
          </Button>
        }
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {COLUMNS.map((col) => {
          const columnTasks = tasks.filter((t) => t.status === col.id);
          return (
            <section key={col.id} className="rounded-lg bg-muted/50 p-3">
              <header className="mb-3 flex items-center justify-between">
                <h2 className="text-sm font-semibold">
                  {col.title}
                  <motion.span
                    key={columnTasks.length}
                    initial={reduced ? false : { scale: 0.7 }}
                    animate={reduced ? undefined : { scale: 1 }}
                    transition={SPRING.press}
                    className="ml-2 inline-block text-xs font-normal text-muted-foreground"
                  >
                    {columnTasks.length}
                  </motion.span>
                </h2>
                <Button size="icon" variant="ghost" aria-label="Add task">
                  <Plus className="h-4 w-4" />
                </Button>
              </header>
              <div className="min-h-[60px] space-y-2">
                <AnimatePresence initial={false}>
                  {columnTasks.map((t) => {
                    const card = (
                      <Card className="cursor-grab active:cursor-grabbing">
                        <CardHeader className="pb-2">
                          <div className="flex items-start justify-between gap-2">
                            <p className="text-sm font-medium">{t.title}</p>
                            <Button size="icon" variant="ghost" aria-label="More">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-2 text-xs text-muted-foreground">
                          <div className="flex flex-wrap gap-1">
                            {t.labels.map((l) => (
                              <Badge key={l} variant="outline" className="text-[10px]">
                                {l}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex -space-x-2">
                              {t.assignees.map((a, i) => (
                                <Avatar key={a + i} className="h-6 w-6 ring-2 ring-background">
                                  <AvatarFallback className="text-[10px]">{a}</AvatarFallback>
                                </Avatar>
                              ))}
                            </div>
                            <div className="flex items-center gap-3">
                              {t.comments > 0 ? (
                                <span className="flex items-center gap-1">
                                  <MessageSquare className="h-3.5 w-3.5" /> {t.comments}
                                </span>
                              ) : null}
                              {t.attachments > 0 ? (
                                <span className="flex items-center gap-1">
                                  <Paperclip className="h-3.5 w-3.5" /> {t.attachments}
                                </span>
                              ) : null}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );

                    if (reduced) {
                      return (
                        <button
                          type="button"
                          key={t.id}
                          onClick={() => advance(t.id)}
                          className="block w-full text-left"
                        >
                          {card}
                        </button>
                      );
                    }

                    return (
                      <motion.div
                        key={t.id}
                        layout
                        drag
                        dragSnapToOrigin
                        dragElastic={0.1}
                        dragMomentum={false}
                        whileDrag={{
                          scale: 1.03,
                          zIndex: 10,
                          boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                        }}
                        onDragEnd={(_, info) => {
                          if (Math.abs(info.offset.x) > 120 || Math.abs(info.offset.y) > 60) {
                            advance(t.id);
                          }
                        }}
                        onTap={() => advance(t.id)}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={SPRING.layout}
                      >
                        {card}
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
