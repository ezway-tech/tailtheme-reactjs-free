import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Mail, Shield } from 'lucide-react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui';
import { PageHeader } from '@/components/patterns';
import { getSampleMember } from '@/mocks/fixtures';
import { urls } from '@/routes/urls';

const DEMO_ACTIVITY = [
  {
    id: '1',
    actorName: 'System',
    verb: 'signed in',
    target: 'Chrome on macOS',
    timestamp: new Date(Date.now() - 2 * 60_000),
  },
  {
    id: '2',
    actorName: 'Billing',
    verb: 'updated',
    target: 'payment method',
    timestamp: new Date(Date.now() - 86_400_000),
  },
  {
    id: '3',
    actorName: 'Admin',
    verb: 'invited',
    target: 'sam@acme.co',
    timestamp: new Date(Date.now() - 3 * 86_400_000),
  },
];

export default function MemberDetailPage() {
  const { id = '' } = useParams<{ id: string }>();
  const member = getSampleMember(id);

  if (!member) {
    return (
      <div className="space-y-4">
        <p className="text-muted-foreground">Member not found.</p>
        <Button asChild variant="outline">
          <Link to={urls.app.pages.saas.members}>Back to members</Link>
        </Button>
      </div>
    );
  }

  const statusVariant =
    member.status === 'active' ? 'default' : member.status === 'invited' ? 'secondary' : 'danger';

  return (
    <div className="space-y-6">
      <Button asChild variant="ghost" size="sm" className="-ml-2 w-fit">
        <Link to={urls.app.pages.saas.members}>
          <ArrowLeft className="h-4 w-4" /> Members
        </Link>
      </Button>

      <PageHeader
        title={member.name}
        description={member.email}
        actions={
          <>
            <Button variant="outline" size="sm">
              <Mail className="h-4 w-4" /> Email
            </Button>
            <Button size="sm">
              <Shield className="h-4 w-4" /> Edit role
            </Button>
          </>
        }
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader>
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={member.avatar} alt="" />
                <AvatarFallback>
                  {member.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-base">{member.role}</CardTitle>
                <CardDescription>{member.department}</CardDescription>
                <Badge variant={statusVariant} className="mt-2 capitalize">
                  {member.status}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Joined</span>
              <span>{member.joinedAt}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Last active</span>
              <span>{member.lastActive}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Permissions</CardTitle>
            <CardDescription>Effective access for this workspace member.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table framed={false}>
              <TableHeader>
                <TableRow>
                  <TableHead>Resource</TableHead>
                  <TableHead>Read</TableHead>
                  <TableHead>Write</TableHead>
                  <TableHead>Admin</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {['Projects', 'Billing', 'API keys', 'Members'].map((resource) => (
                  <TableRow key={resource}>
                    <TableCell>{resource}</TableCell>
                    <TableCell>✓</TableCell>
                    <TableCell>{member.role === 'Viewer' ? '—' : '✓'}</TableCell>
                    <TableCell>
                      {member.role === 'Owner' || member.role === 'Admin' ? '✓' : '—'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Recent activity</h2>
        <p className="text-sm text-muted-foreground">Audit events for this member (demo data).</p>
        <ul className="space-y-3 rounded-lg border border-input bg-card p-4 shadow-sm">
          {DEMO_ACTIVITY.map((entry) => (
            <li key={entry.id} className="text-sm text-foreground">
              <span className="font-medium">{entry.actorName}</span> {entry.verb}{' '}
              <span className="text-muted-foreground">{entry.target}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
