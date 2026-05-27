import { useCallback, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { LogOut, Settings, User as UserIcon } from 'lucide-react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui';
import { clearAuthSession, readAuthSessionUser } from '@/lib/auth-session';
import {
  HEADER_FLOATING_PANEL_MOBILE_QUERY,
  headerFloatingPanelWidthClassName,
} from '@/lib/header-floating-panel';
import { useMediaQuery } from '@/hooks/use-media-query';
import { cn } from '@/lib/cn';
import { urls } from '@/routes/urls';

export interface UserMenuUser {
  name: string;
  email: string;
  avatarUrl?: string;
}

const DEFAULT_USER: UserMenuUser = {
  name: 'Alex Nguyen',
  email: 'alex@tailtheme.test',
  avatarUrl: undefined,
};

/** Matches Radix dropdown `animate-out` duration in `dropdown-menu.tsx`. */
const MENU_CLOSE_MS = 150;

function resolveMenuUser(userProp?: UserMenuUser): UserMenuUser {
  if (userProp) return userProp;
  return readAuthSessionUser() ?? DEFAULT_USER;
}

/**
 * Header avatar dropdown with quick links to profile/settings and a mock
 * logout action. Pass `user` prop to override the fixtures.
 */
export function UserMenu({ user: userProp }: { user?: UserMenuUser }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(HEADER_FLOATING_PANEL_MOBILE_QUERY);
  const [open, setOpen] = useState(false);
  const logoutPendingRef = useRef(false);
  const [user] = useState(() => resolveMenuUser(userProp));

  const initials = user.name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const handleLogout = useCallback(() => {
    if (logoutPendingRef.current) return;
    logoutPendingRef.current = true;
    setOpen(false);

    window.setTimeout(() => {
      clearAuthSession();
      navigate(urls.auth.login);
    }, MENU_CLOSE_MS);
  }, [navigate]);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 rounded-full p-0 hover:bg-muted"
          aria-label={t('user.menu', 'Account menu')}
        >
          <Avatar className="h-9 w-9 border border-input shadow-sm">
            {user.avatarUrl ? <AvatarImage src={user.avatarUrl} alt={user.name} /> : null}
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        sideOffset={isMobile ? 10 : 4}
        collisionPadding={isMobile ? 16 : undefined}
        className={cn('p-2', headerFloatingPanelWidthClassName(isMobile, 'w-60'))}
      >
        <DropdownMenuLabel className="px-2 py-2.5">
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-semibold text-foreground">{user.name}</span>
            <span className="text-xs font-normal text-muted-foreground">{user.email}</span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="py-2.5" onClick={() => navigate(urls.app.profile)}>
          <UserIcon className="h-4 w-4" />
          {t('user.profile', 'Profile')}
        </DropdownMenuItem>
        <DropdownMenuItem className="py-2.5" onClick={() => navigate(urls.app.settings)}>
          <Settings className="h-4 w-4" />
          {t('user.settings', 'Settings')}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="py-2.5"
          onSelect={(event) => {
            event.preventDefault();
            handleLogout();
          }}
        >
          <LogOut className="h-4 w-4" />
          {t('user.logout', 'Log out')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
