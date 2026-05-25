import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import vi from './locales/vi.json';
import fr from './locales/fr.json';

const STORAGE_KEY = 'i18nextLng';
export const SUPPORTED_LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'vi', label: 'Tiếng Việt' },
  { code: 'fr', label: 'Français' },
] as const;

export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number]['code'];

function initialLanguage(): SupportedLanguage {
  if (typeof window === 'undefined') return 'en';
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === 'en' || stored === 'vi' || stored === 'fr') return stored;
  const nav = window.navigator?.language?.toLowerCase() ?? '';
  if (nav.startsWith('fr')) return 'fr';
  if (nav.startsWith('vi')) return 'vi';
  if (nav.startsWith('en')) return 'en';
  return 'en';
}

export const resources = {
  en: {
    common: en.common,
    actions: en.actions,
    form: en.form,
  },
  vi: {
    common: vi.common,
    actions: vi.actions,
    form: vi.form,
  },
  fr: {
    common: fr.common,
    actions: fr.actions,
    form: fr.form,
  },
} as const;

void i18n.use(initReactI18next).init({
  lng: initialLanguage(),
  fallbackLng: 'en',
  supportedLngs: SUPPORTED_LANGUAGES.map((l) => l.code),
  ns: ['common', 'actions', 'form'],
  defaultNS: 'common',
  resources,
  interpolation: { escapeValue: false },
});

export function persistLanguage(lng: string): void {
  if (SUPPORTED_LANGUAGES.some((l) => l.code === lng)) {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, lng);
    }
  }
}

export default i18n;
