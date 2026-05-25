import { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Input,
  Label,
} from '@/components/ui';
import { PageHeader } from '@/components/patterns';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const EVENTS: Record<string, string[]> = {
  '2026-05-19': ['Team standup', 'Design review'],
  '2026-05-22': ['Sprint planning'],
};

function buildMonthCells(year: number, month: number) {
  const first = new Date(year, month, 1);
  const startPad = first.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = Array.from({ length: startPad }, () => null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

export default function CalendarPage() {
  const [month, setMonth] = useState(4);
  const [year] = useState(2026);
  const [open, setOpen] = useState(false);
  const cells = buildMonthCells(year, month);

  const keyFor = (day: number) =>
    `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Calendar"
        description="Month view with event modal — wire to your scheduling API."
        actions={
          <Button size="sm" onClick={() => setOpen(true)}>
            <Plus className="h-4 w-4" /> New event
          </Button>
        }
      />
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle>
            {new Date(year, month).toLocaleString('default', { month: 'long', year: 'numeric' })}
          </CardTitle>
          <div className="flex gap-1">
            <Button
              variant="outline"
              size="icon"
              aria-label="Previous month"
              onClick={() => setMonth((m) => (m === 0 ? 11 : m - 1))}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              aria-label="Next month"
              onClick={() => setMonth((m) => (m === 11 ? 0 : m + 1))}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-muted-foreground">
            {DAYS.map((d) => (
              <div key={d} className="py-2">
                {d}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {cells.map((day, i) => {
              if (day === null) return <div key={`e-${i}`} className="min-h-20" />;
              const events = EVENTS[keyFor(day)];
              return (
                <div
                  key={`d-${day}`}
                  className="min-h-20 rounded-md border border-border p-1 text-left text-xs"
                >
                  <span className="font-medium">{day}</span>
                  {events?.map((ev) => (
                    <p key={ev} className="mt-1 truncate rounded bg-primary/10 px-1 text-[10px]">
                      {ev}
                    </p>
                  ))}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New event</DialogTitle>
            <DialogDescription>
              Demo modal — connect to Google Calendar or Cal.com.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div className="space-y-1.5">
              <Label htmlFor="ev-title">Title</Label>
              <Input id="ev-title" placeholder="Team sync" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setOpen(false)}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
