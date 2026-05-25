import { useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Badge, Button, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { PageHeader } from '@/components/patterns';
import { cn } from '@/lib/cn';

interface CalTask {
  day: number;
  label: string;
  tone: 'primary' | 'accent' | 'muted';
}

const TASKS: CalTask[] = [
  { day: 3, label: 'Kickoff sprint 13', tone: 'primary' },
  { day: 5, label: 'Design review', tone: 'accent' },
  { day: 8, label: 'Release v2.3.0', tone: 'primary' },
  { day: 12, label: 'Docs audit', tone: 'muted' },
  { day: 15, label: 'All-hands', tone: 'accent' },
  { day: 19, label: 'Customer call', tone: 'muted' },
  { day: 22, label: 'Pricing update', tone: 'primary' },
  { day: 22, label: 'Blog post', tone: 'muted' },
  { day: 28, label: 'Retro', tone: 'accent' },
];

const toneClass: Record<CalTask['tone'], string> = {
  primary: 'bg-primary/15 text-primary',
  accent: 'bg-accent/15 text-accent-foreground',
  muted: 'bg-muted text-muted-foreground',
};

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

function buildMonthGrid(year: number, monthIdx: number) {
  const first = new Date(year, monthIdx, 1);
  const daysInMonth = new Date(year, monthIdx + 1, 0).getDate();
  const startWeekday = (first.getDay() + 6) % 7; // Monday-first
  const cells: Array<{ day: number | null; inMonth: boolean }> = [];
  for (let i = 0; i < startWeekday; i += 1) cells.push({ day: null, inMonth: false });
  for (let d = 1; d <= daysInMonth; d += 1) cells.push({ day: d, inMonth: true });
  while (cells.length % 7 !== 0) cells.push({ day: null, inMonth: false });
  return cells;
}

export default function TasksCalendarPage() {
  const [cursor, setCursor] = useState(() => {
    const now = new Date();
    return { year: now.getFullYear(), month: now.getMonth() };
  });

  const grid = useMemo(() => buildMonthGrid(cursor.year, cursor.month), [cursor]);
  const monthLabel = new Date(cursor.year, cursor.month, 1).toLocaleDateString(undefined, {
    month: 'long',
    year: 'numeric',
  });

  const goPrev = () =>
    setCursor((c) =>
      c.month === 0 ? { year: c.year - 1, month: 11 } : { year: c.year, month: c.month - 1 },
    );
  const goNext = () =>
    setCursor((c) =>
      c.month === 11 ? { year: c.year + 1, month: 0 } : { year: c.year, month: c.month + 1 },
    );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Tasks calendar"
        description="Month view of upcoming deadlines and events."
        actions={
          <div className="flex items-center gap-1">
            <Button size="icon" variant="outline" onClick={goPrev} aria-label="Previous month">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() =>
                setCursor({ year: new Date().getFullYear(), month: new Date().getMonth() })
              }
            >
              Today
            </Button>
            <Button size="icon" variant="outline" onClick={goNext} aria-label="Next month">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        }
      />

      <Card>
        <CardHeader>
          <CardTitle>{monthLabel}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2 text-xs font-medium text-muted-foreground">
            {WEEKDAYS.map((w) => (
              <div key={w} className="pb-2">
                {w}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-2">
            {grid.map((cell, i) => {
              const dayTasks = cell.day ? TASKS.filter((t) => t.day === cell.day) : [];
              return (
                <div
                  key={i}
                  className={cn(
                    'min-h-24 rounded-md border border-border p-2 text-xs',
                    !cell.inMonth && 'bg-muted/30 opacity-60',
                  )}
                >
                  <div className="mb-1 flex items-center justify-between">
                    <span className="font-medium text-foreground">{cell.day ?? ''}</span>
                    {dayTasks.length > 1 ? (
                      <Badge variant="outline" className="text-[10px]">
                        {dayTasks.length}
                      </Badge>
                    ) : null}
                  </div>
                  <div className="space-y-1">
                    {dayTasks.map((t, j) => (
                      <div
                        key={j}
                        className={cn(
                          'truncate rounded px-1.5 py-0.5 text-[11px]',
                          toneClass[t.tone],
                        )}
                      >
                        {t.label}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
