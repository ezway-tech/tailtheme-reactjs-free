export type SampleMemberRole = 'Owner' | 'Admin' | 'Editor' | 'Viewer';
export type SampleMemberStatus = 'active' | 'invited' | 'suspended';

export interface SampleMember {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: SampleMemberRole;
  status: SampleMemberStatus;
  lastActive: string;
  joinedAt: string;
  department: string;
}

export const sampleMembers: SampleMember[] = [
  {
    id: 'u-1',
    name: 'Alex Nguyen',
    email: 'alex@tailtheme.dev',
    avatar: 'https://i.pravatar.cc/64?img=1',
    role: 'Owner',
    status: 'active',
    lastActive: '2m ago',
    joinedAt: 'Jan 2024',
    department: 'Engineering',
  },
  {
    id: 'u-2',
    name: 'Maria Garcia',
    email: 'maria@tailtheme.dev',
    avatar: 'https://i.pravatar.cc/64?img=5',
    role: 'Admin',
    status: 'active',
    lastActive: '1h ago',
    joinedAt: 'Mar 2024',
    department: 'Product',
  },
  {
    id: 'u-3',
    name: 'Hiro Tanaka',
    email: 'hiro@tailtheme.dev',
    avatar: 'https://i.pravatar.cc/64?img=3',
    role: 'Editor',
    status: 'active',
    lastActive: '3h ago',
    joinedAt: 'Jun 2024',
    department: 'Design',
  },
  {
    id: 'u-4',
    name: 'Priya Patel',
    email: 'priya@tailtheme.dev',
    avatar: 'https://i.pravatar.cc/64?img=10',
    role: 'Editor',
    status: 'active',
    lastActive: 'yesterday',
    joinedAt: 'Aug 2024',
    department: 'Marketing',
  },
  {
    id: 'u-5',
    name: 'Sam Taylor',
    email: 'sam@acme.co',
    avatar: 'https://i.pravatar.cc/64?img=14',
    role: 'Viewer',
    status: 'invited',
    lastActive: '—',
    joinedAt: 'Apr 2026',
    department: 'External',
  },
  {
    id: 'u-6',
    name: 'Chen Wei',
    email: 'chen@acme.co',
    avatar: 'https://i.pravatar.cc/64?img=20',
    role: 'Viewer',
    status: 'suspended',
    lastActive: '2w ago',
    joinedAt: 'Nov 2025',
    department: 'Support',
  },
];

export function getSampleMember(id: string): SampleMember | undefined {
  return sampleMembers.find((m) => m.id === id);
}
