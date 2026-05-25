import { useTranslation } from 'react-i18next';
import { Laptop, Moon, Sun } from 'lucide-react';
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui';
import { useTheme } from '@/hooks/useTheme';

/**
 * Header dropdown that exposes Light / Dark / System theme options.
 * Reflects the current resolved theme on the trigger icon.
 */
export function ThemeMenu() {
  const { t } = useTranslation();
  const { theme, setTheme, resolvedTheme } = useTheme();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label={t('common:theme.label', 'Theme')}
          className="h-9 w-9 hover:bg-muted"
        >
          {resolvedTheme === 'dark' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{t('common:theme.label', 'Theme')}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => setTheme('light')}>
          <Sun className="h-4 w-4" />
          {t('common:theme.light', 'Light')}
          {theme === 'light' ? <span className="ml-auto">•</span> : null}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>
          <Moon className="h-4 w-4" />
          {t('common:theme.dark', 'Dark')}
          {theme === 'dark' ? <span className="ml-auto">•</span> : null}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')}>
          <Laptop className="h-4 w-4" />
          {t('common:theme.system', 'System')}
          {theme === 'system' ? <span className="ml-auto">•</span> : null}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
