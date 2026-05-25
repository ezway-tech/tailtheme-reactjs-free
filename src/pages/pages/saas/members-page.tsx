import { Link } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { MoreHorizontal, Plus, Search } from 'lucide-react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Input,
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
} from '@/components/ui';
import { PageHeader } from '@/components/patterns';
import { sampleMembers, type SampleMember } from '@/mocks/fixtures';
import { urls } from '@/routes/urls';

const statusStyle: Record<
  SampleMember['status'],
  { variant: 'default' | 'secondary' | 'danger'; label: string }
> = {
  active: { variant: 'default', label: 'Active' },
  invited: { variant: 'secondary', label: 'Invited' },
  suspended: { variant: 'danger', label: 'Suspended' },
};

export default function MembersPage() {
  const [q, setQ] = useState('');
  const [role, setRole] = useState('all');

  const rows = useMemo(
    () =>
      sampleMembers.filter((m) => {
        const needle = q.trim().toLowerCase();
        const matchesSearch =
          !needle ||
          m.name.toLowerCase().includes(needle) ||
          m.email.toLowerCase().includes(needle);
        const matchesRole = role === 'all' || m.role === role;
        return matchesSearch && matchesRole;
      }),
    [q, role],
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Members"
        description="Workspace collaborators and their access levels."
        actions={
          <Button>
            <Plus className="h-4 w-4" /> Invite member
          </Button>
        }
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            className="pl-8"
            placeholder="Search by name or email…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
        <Select value={role} onValueChange={setRole}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All roles</SelectItem>
            <SelectItem value="Owner">Owner</SelectItem>
            <SelectItem value="Admin">Admin</SelectItem>
            <SelectItem value="Editor">Editor</SelectItem>
            <SelectItem value="Viewer">Viewer</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Member</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Last active</TableHead>
            <TableHead className="w-12" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((m) => {
            const s = statusStyle[m.status];
            return (
              <TableRow key={m.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={m.avatar} alt={m.name} />
                      <AvatarFallback>
                        {m.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <Link
                        to={urls.app.pages.saas.memberDetail(m.id)}
                        className="font-medium hover:text-text-brand"
                      >
                        {m.name}
                      </Link>
                      <p className="text-xs text-muted-foreground">{m.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{m.role}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={s.variant}>{s.label}</Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">{m.lastActive}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="icon" variant="ghost" aria-label="Actions">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Change role</DropdownMenuItem>
                      <DropdownMenuItem>Resend invite</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">Remove</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
