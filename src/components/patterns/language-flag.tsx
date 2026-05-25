import { FR, US, VN } from 'country-flag-icons/react/3x2';
import type { SupportedLanguage } from '@/i18n';
import { cn } from '@/lib/cn';

const flagSizeClassName = {
  sm: 'h-4 w-6',
  md: 'h-5 w-7',
  lg: 'h-6 w-8',
} as const;

/** ISO icons from `country-flag-icons`. Use `GB` instead of `US` for British English if needed. */
const LANGUAGE_FLAG = {
  en: US,
  vi: VN,
  fr: FR,
} as const;

type LanguageFlagProps = {
  language: SupportedLanguage;
  size?: keyof typeof flagSizeClassName;
  className?: string;
};

/**
 * Country flag via [`country-flag-icons`](https://www.npmjs.com/package/country-flag-icons) (MIT).
 * Add a locale in `SUPPORTED_LANGUAGES` and map its code here to the matching export.
 */
export function LanguageFlag({ language, size = 'md', className }: LanguageFlagProps) {
  const Flag = LANGUAGE_FLAG[language];
  return (
    <Flag
      aria-hidden
      className={cn(
        'shrink-0 overflow-hidden rounded-[3px] border border-black/10 shadow-sm',
        flagSizeClassName[size],
        className,
      )}
    />
  );
}
