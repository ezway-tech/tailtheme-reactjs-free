import {
  Badge,
  Button,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
  tableBodyRowClassName,
} from '@/components/ui';
import { motion } from 'motion/react';
import { ShowcaseSection } from '@/components/showcase/showcase-section';
import { DURATION, EASE, STAGGER } from '@/lib/motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const ROWS = [
  {
    id: 'u-1',
    name: 'Alice Nguyen',
    email: 'alice@tailtheme.dev',
    role: 'Admin',
    status: 'active' as const,
    amount: 1240,
  },
  {
    id: 'u-2',
    name: 'Bob Tran',
    email: 'bob@tailtheme.dev',
    role: 'Member',
    status: 'invited' as const,
    amount: 420,
  },
  {
    id: 'u-3',
    name: 'Chi Le',
    email: 'chi@tailtheme.dev',
    role: 'Member',
    status: 'active' as const,
    amount: 780,
  },
  {
    id: 'u-4',
    name: 'Dung Vo',
    email: 'dung@tailtheme.dev',
    role: 'Viewer',
    status: 'disabled' as const,
    amount: 0,
  },
];

const STATUS_MAP = {
  active: { variant: 'success' as const, label: 'Active' },
  invited: { variant: 'outline' as const, label: 'Invited' },
  disabled: { variant: 'secondary' as const, label: 'Disabled' },
};

function StaggeredRows() {
  const reduced = useReducedMotion();
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Role</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {ROWS.map((row, idx) => {
          const rowContent = (
            <>
              <TableCell className="font-medium">{row.name}</TableCell>
              <TableCell>{row.role}</TableCell>
              <TableCell className="text-right tabular-nums">
                ${row.amount.toLocaleString()}
              </TableCell>
            </>
          );
          if (reduced) {
            return <TableRow key={row.id}>{rowContent}</TableRow>;
          }
          return (
            <motion.tr
              key={row.id}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: DURATION.sm,
                ease: EASE.out,
                delay: idx * STAGGER.tight,
              }}
              className={tableBodyRowClassName}
            >
              {rowContent}
            </motion.tr>
          );
        })}
      </TableBody>
    </Table>
  );
}

export function PrimitivesTab() {
  const total = ROWS.reduce((s, r) => s + r.amount, 0);
  return (
    <div className="space-y-6">
      <ShowcaseSection
        block
        title="Basic"
        code={`<Table>
  <TableHeader>
    <TableRow><TableHead>Name</TableHead>…</TableRow>
  </TableHeader>
  <TableBody>
    <TableRow><TableCell>…</TableCell></TableRow>
  </TableBody>
</Table>`}
      >
        <Table>
          <TableCaption>A list of your recent members.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ROWS.map((row) => {
              const s = STATUS_MAP[row.status];
              return (
                <TableRow key={row.id}>
                  <TableCell className="font-medium">{row.name}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.role}</TableCell>
                  <TableCell>
                    <Badge variant={s.variant}>{s.label}</Badge>
                  </TableCell>
                  <TableCell className="text-right tabular-nums">
                    ${row.amount.toLocaleString()}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={4}>Total</TableCell>
              <TableCell className="text-right tabular-nums">${total.toLocaleString()}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </ShowcaseSection>

      <ShowcaseSection
        block
        title="With row actions"
        description="Add a trailing cell with buttons. Keep actions visible, avoid hidden hover-only actions for accessibility."
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="w-20 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ROWS.slice(0, 2).map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.role}</TableCell>
                <TableCell className="text-right">
                  <Button size="sm" variant="ghost">
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ShowcaseSection>

      <ShowcaseSection
        block
        title="Motion"
        description="Stagger rows in on mount using <motion.tr/> and the STAGGER.tight token. Use initial={false} after the first render to skip the effect on sort/filter."
      >
        <StaggeredRows />
      </ShowcaseSection>
    </div>
  );
}
