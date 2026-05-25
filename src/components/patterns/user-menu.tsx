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
  toast,
} from '@/components/ui';
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

/**
 * Header avatar dropdown with quick links to profile/settings and a mock
 * logout action. Pass `user` prop to override the fixtures.
 */
export function UserMenu({ user = DEFAULT_USER }: { user?: UserMenuUser }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const initials = user.name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
  return (
    <DropdownMenu>
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
      <DropdownMenuContent align="end" className="w-60 p-2">
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
          onClick={() => toast.info(t('user.loggedOut', 'Logged out (demo)'))}
        >
          <LogOut className="h-4 w-4" />
          {t('user.logout', 'Log out')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
