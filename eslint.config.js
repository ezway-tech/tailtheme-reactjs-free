import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import checkFile from 'eslint-plugin-check-file';

/** ESLint 9 flat config — aligned with TailTheme Pro (Vite + React 19 + TypeScript). */
export default tseslint.config(
  {
    ignores: [
      '.git/**',
      'dist/**',
      'node_modules/**',
      'coverage/**',
      'playwright-report/**',
      'test-results/**',
    ],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  reactHooks.configs.flat.recommended,
  reactRefresh.configs.vite,
  prettierRecommended,
  {
    files: [
      'src/layouts/**/*.{ts,tsx}',
      'src/pages/**/*.{ts,tsx}',
      'src/components/**/*.{ts,tsx}',
      'src/routes/**/*.{ts,tsx}',
      'src/providers/**/*.{ts,tsx}',
      'src/lib/**/*.{ts,tsx}',
      'src/mocks/**/*.{ts,tsx}',
      'src/i18n/**/*.{ts,tsx}',
    ],
    plugins: { 'check-file': checkFile },
    rules: {
      'check-file/filename-naming-convention': [
        'error',
        {
          'src/layouts/**/*.{ts,tsx}': 'KEBAB_CASE',
          'src/pages/**/*.{ts,tsx}': 'KEBAB_CASE',
          'src/components/**/*.{ts,tsx}': 'KEBAB_CASE',
          'src/routes/**/*.{ts,tsx}': 'KEBAB_CASE',
          'src/providers/**/*.{ts,tsx}': 'KEBAB_CASE',
          'src/lib/**/*.{ts,tsx}': 'KEBAB_CASE',
          'src/mocks/**/*.{ts,tsx}': 'KEBAB_CASE',
          'src/i18n/**/*.{ts,tsx}': 'KEBAB_CASE',
        },
        {
          ignoreMiddleExtensions: true,
        },
      ],
      'check-file/folder-naming-convention': [
        'error',
        {
          'src/layouts/**/': 'KEBAB_CASE',
          'src/pages/**/': 'KEBAB_CASE',
          'src/components/**/': 'KEBAB_CASE',
          'src/routes/**/': 'KEBAB_CASE',
          'src/providers/**/': 'KEBAB_CASE',
          'src/lib/**/': 'KEBAB_CASE',
          'src/mocks/**/': 'KEBAB_CASE',
          'src/i18n/**/': 'KEBAB_CASE',
        },
      ],
    },
  },
  {
    files: ['src/**/__tests__/**/*.{ts,tsx}'],
    rules: {
      'check-file/folder-naming-convention': 'off',
    },
  },
  {
    files: [
      'src/components/ui/**/*.{ts,tsx}',
      'src/components/patterns/**/*.{ts,tsx}',
      'src/test/**/*.{ts,tsx}',
      'src/routes/**/*.{ts,tsx}',
      'src/hooks/**/*.{ts,tsx}',
      'src/providers/**/*.{ts,tsx}',
      'src/lib/**/*.{ts,tsx}',
    ],
    rules: {
      'react-refresh/only-export-components': 'off',
    },
  },
  {
    files: [
      'src/components/motion/**/*.{ts,tsx}',
      'src/components/patterns/command-palette.tsx',
      'src/layouts/app-shell.tsx',
      'src/pages/ui/tokens/colors-page.tsx',
    ],
    rules: {
      'react-hooks/set-state-in-effect': 'off',
    },
  },
);
