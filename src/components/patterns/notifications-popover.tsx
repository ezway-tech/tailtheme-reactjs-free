import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AlertCircle, Bell, CheckCircle2, Info, TriangleAlert } from 'lucide-react';
import {
  Badge,
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  ScrollArea,
} from '@/components/ui';
import {
  formatRelative,
  sampleNotifications,
  type NotificationItem,
  type NotificationKind,
} from '@/mocks/fixtures/notifications';
import { cn } from '@/lib/cn';
import {
  headerFloatingPanelWidthClassName,
  useHeaderFloatingPanel,
} from '@/lib/header-floating-panel';
import { MotionList, MotionListItem } from '@/components/motion';

const KIND_ICON: Record<NotificationKind, React.ComponentType<{ className?: string }>> = {
  info: Info,
  success: CheckCircle2,
  warning: TriangleAlert,
  error: AlertCircle,
};

const KIND_TONE: Record<NotificationKind, string> = {
  info: 'text-info',
  success: 'text-success-text',
  warning: 'text-amber-600 dark:text-amber-400',
  error: 'text-danger-text',
};

/**
 * Header popover listing recent notifications with read/unread state.
 * Uses `src/mocks/fixtures/notifications.ts` as the seed data.
 */
export function NotificationsPopover() {
  const { t } = useTranslation();
  const { align, sideOffset, collisionPadding, isMobile } = useHeaderFloatingPanel();
  const [items, setItems] = useState<NotificationItem[]>(sampleNotifications);
  const unreadCount = items.filter((n) => !n.read).length;

  const markAllRead = () => setItems((list) => list.map((n) => ({ ...n, read: true })));
  const markOneRead = (id: string) =>
    setItems((list) => list.map((n) => (n.id === id ? { ...n, read: true } : n)));

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative h-9 w-9 hover:bg-muted"
          aria-label={t('notifications.title', 'Notifications')}
        >
          <Bell className="h-4 w-4" />
          {unreadCount > 0 ? (
            <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-semibold text-destructive-foreground">
              {unreadCount}
            </span>
          ) : null}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align={align}
        sideOffset={sideOffset}
        collisionPadding={collisionPadding}
        className={cn('p-0', headerFloatingPanelWidthClassName(isMobile, 'w-[22rem] sm:w-96'))}
      >
        <div className="flex items-center justify-between gap-3 border-b border-input px-4 py-3.5">
          <div className="flex min-w-0 items-center gap-2.5">
            <span className="text-sm font-semibold text-foreground">
              {t('notifications.title', 'Notifications')}
            </span>
            {unreadCount > 0 ? (
              <Badge variant="secondary" className="h-6 px-2 text-xs">
                {unreadCount} {t('notifications.new', 'new')}
              </Badge>
            ) : null}
          </div>
          <Button
            variant="outline"
            size="sm"
            className="h-8 shrink-0 px-3 text-xs"
            onClick={markAllRead}
            disabled={unreadCount === 0}
          >
            {t('notifications.markAllRead', 'Mark all read')}
          </Button>
        </div>
        <ScrollArea className="h-[22rem]">
          {items.length === 0 ? (
            <div className="px-4 py-10 text-center text-sm text-muted-foreground">
              {t('notifications.empty', 'You are all caught up.')}
            </div>
          ) : (
            <MotionList stagger="tight" className="divide-y divide-input">
              {items.map((n) => {
                const Icon = KIND_ICON[n.kind];
                return (
                  <MotionListItem key={n.id}>
                    <button
                      type="button"
                      onClick={() => markOneRead(n.id)}
                      className="flex w-full items-start gap-3 px-4 py-3.5 text-left transition-colors hover:bg-muted/60"
                    >
                      <span
                        className={cn(
                          'mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-input bg-muted/40',
                          KIND_TONE[n.kind],
                        )}
                      >
                        <Icon className="h-4 w-4" />
                      </span>
                      <div className="min-w-0 flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <span
                            className={cn(
                              'truncate text-sm',
                              n.read
                                ? 'font-normal text-foreground'
                                : 'font-semibold text-foreground',
                            )}
                          >
                            {n.title}
                          </span>
                          {!n.read ? (
                            <span className="h-2 w-2 shrink-0 rounded-full bg-primary" />
                          ) : null}
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          {n.description}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatRelative(n.createdAt)}
                        </p>
                      </div>
                    </button>
                  </MotionListItem>
                );
              })}
            </MotionList>
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
