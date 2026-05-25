import { useTranslation } from 'react-i18next';
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui';
import i18n, { persistLanguage, SUPPORTED_LANGUAGES, type SupportedLanguage } from '@/i18n';
import { LanguageFlag } from './language-flag';

/**
 * Language switcher with SVG country flags. Persists selection to `localStorage` for reload.
 */
export function LanguageMenu() {
  const { t, i18n: i18nInstance } = useTranslation();
  const current = (i18nInstance.resolvedLanguage as SupportedLanguage | undefined) ?? 'en';

  const setLang = (lang: SupportedLanguage) => {
    void i18n.changeLanguage(lang);
    persistLanguage(lang);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label={t('common:language', 'Language')}
          className="h-9 w-9 hover:bg-muted"
        >
          <LanguageFlag language={current} size="md" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-60 p-2">
        <DropdownMenuLabel className="px-2 py-2 text-xs font-medium text-muted-foreground">
          {t('common:language', 'Language')}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {SUPPORTED_LANGUAGES.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            className="gap-3 px-2 py-2.5"
            onClick={() => setLang(lang.code)}
          >
            <LanguageFlag language={lang.code} size="lg" />
            <span className="flex-1 text-sm text-foreground">{lang.label}</span>
            {current === lang.code ? (
              <span className="text-xs font-semibold text-primary" aria-hidden>
                ✓
              </span>
            ) : null}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
