export type NotificationKind = 'info' | 'success' | 'warning' | 'error';

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  kind: NotificationKind;
  /** ISO datetime */
  createdAt: string;
  read: boolean;
  href?: string;
}

export const sampleNotifications: NotificationItem[] = [
  {
    id: 'n-1',
    title: 'New course published',
    description: '"Advanced TypeScript" is now live. Enroll to start learning.',
    kind: 'success',
    createdAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    read: false,
    href: '/app/courses/1',
  },
  {
    id: 'n-2',
    title: 'Quiz reminder',
    description: 'Your midterm quiz closes tomorrow at 23:59.',
    kind: 'warning',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    read: false,
  },
  {
    id: 'n-3',
    title: 'Welcome to TailTheme',
    description: 'Customize your theme from the palette icon in the header.',
    kind: 'info',
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    read: true,
  },
  {
    id: 'n-4',
    title: 'Payment failed',
    description: 'Your last invoice did not process. Update your billing.',
    kind: 'error',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    read: true,
  },
];

export function formatRelative(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const minutes = Math.floor(diff / 60_000);
  if (minutes < 1) return 'just now';
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(iso).toLocaleDateString();
}
