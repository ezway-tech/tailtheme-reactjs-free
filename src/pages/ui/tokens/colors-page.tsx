import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { PageHeader } from '@/components/patterns';
import { ColorSwatch, ShowcaseSection } from '@/components/showcase';
import { usePreferences } from '@/hooks/usePreferences';
import { cn } from '@/lib/cn';
import {
  contrastRatio,
  gradeContrast,
  parseColor,
  resolveCssVarColor,
  rgbToHex,
  type ContrastGrade,
} from '@/lib/contrast';
import { TAILWIND_PALETTES } from '@/lib/tailwind-palettes';

interface BrandTokenRow {
  className: string;
  label: string;
  description?: string;
}

const BRAND_TOKENS: BrandTokenRow[] = [
  {
    className: 'bg-brand text-brand-foreground',
    label: 'bg-brand',
    description: 'Primary brand fill',
  },
  {
    className: 'bg-brand-hover text-brand-foreground',
    label: 'bg-brand-hover',
    description: 'Hover/active brand state',
  },
  {
    className: 'bg-background text-text-brand',
    label: 'text-text-brand',
    description: 'Accessible brand text / links (WCAG AA)',
  },
  {
    className: 'bg-surface text-foreground border border-border',
    label: 'bg-surface',
    description: 'Elevated panel surface',
  },
];

const SEMANTIC_TOKENS: BrandTokenRow[] = [
  { className: 'bg-background text-foreground border border-border', label: 'background' },
  { className: 'bg-card text-card-foreground border border-border', label: 'card' },
  { className: 'bg-popover text-popover-foreground border border-border', label: 'popover' },
  { className: 'bg-primary text-primary-foreground', label: 'primary' },
  { className: 'bg-secondary text-secondary-foreground', label: 'secondary' },
  { className: 'bg-muted text-muted-foreground', label: 'muted' },
  { className: 'bg-accent text-accent-foreground', label: 'accent' },
  { className: 'bg-destructive text-destructive-foreground', label: 'destructive' },
];

const STATUS_FAMILIES: BrandTokenRow[] = [
  {
    className: 'bg-success-bg text-success-text border border-success-border',
    label: 'success-*',
    description: 'Success status family',
  },
  {
    className: 'bg-danger-bg text-danger-text border border-danger-border',
    label: 'danger-*',
    description: 'Destructive status family',
  },
];

interface StatusRamp {
  id: string;
  label: string;
  hslSource: 'preference' | 'static';
  /** When `static`, render this hsl directly. */
  hsl?: string;
  /** When `preference`, pluck the matching key from preferences. */
  prefKey?: 'primaryHsl' | 'accentHsl';
  /** Hue / saturation override for derived ramps that aren't tied to preferences. */
  baseHue?: number;
  baseSaturation?: number;
}

const STATUS_RAMPS: StatusRamp[] = [
  { id: 'primary', label: 'Primary', hslSource: 'preference', prefKey: 'primaryHsl' },
  { id: 'accent', label: 'Accent', hslSource: 'preference', prefKey: 'accentHsl' },
  { id: 'success', label: 'Success', hslSource: 'static', baseHue: 142, baseSaturation: 70 },
  { id: 'warning', label: 'Warning', hslSource: 'static', baseHue: 38, baseSaturation: 92 },
  { id: 'info', label: 'Info', hslSource: 'static', baseHue: 200, baseSaturation: 84 },
  { id: 'danger', label: 'Danger', hslSource: 'static', baseHue: 0, baseSaturation: 78 },
];

const LIGHTNESS_CURVE = [97, 93, 86, 75, 62, 48, 38, 30, 24, 18, 12];
const SHADE_LABELS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

interface GradientRecipe {
  id: string;
  label: string;
  description: string;
  background: string;
  textTone: 'light' | 'dark';
}

const GRADIENTS: GradientRecipe[] = [
  {
    id: 'brand-accent',
    label: 'Brand → Accent',
    description: 'Hero band combining the live brand and accent variables.',
    background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%)',
    textTone: 'light',
  },
  {
    id: 'sky-indigo',
    label: 'Sky → Indigo',
    description: 'Soft cool gradient for marketing surfaces.',
    background: 'linear-gradient(135deg, #38bdf8 0%, #6366f1 100%)',
    textTone: 'light',
  },
  {
    id: 'rose-orange',
    label: 'Rose → Orange',
    description: 'Vibrant warm gradient for promotional banners.',
    background: 'linear-gradient(135deg, #f43f5e 0%, #f97316 100%)',
    textTone: 'light',
  },
  {
    id: 'emerald-cyan',
    label: 'Emerald → Cyan',
    description: 'Fresh status gradient for success / saved states.',
    background: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)',
    textTone: 'light',
  },
  {
    id: 'midnight',
    label: 'Midnight',
    description: 'Deep navy gradient for dark hero sections.',
    background: 'linear-gradient(180deg, #0f172a 0%, #1e293b 100%)',
    textTone: 'light',
  },
  {
    id: 'sunset',
    label: 'Sunset radial',
    description: 'Radial blend ideal for splash backdrops.',
    background: 'radial-gradient(circle at 30% 20%, #fde68a 0%, #fb7185 45%, #6366f1 100%)',
    textTone: 'light',
  },
  {
    id: 'mint-fade',
    label: 'Mint fade',
    description: 'Subtle pastel gradient for cards and panels.',
    background: 'linear-gradient(180deg, #ecfdf5 0%, #cffafe 100%)',
    textTone: 'dark',
  },
  {
    id: 'mono-paper',
    label: 'Mono paper',
    description: 'Neutral diagonal for editorial layouts.',
    background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
    textTone: 'dark',
  },
];

interface ContrastTokenChoice {
  id: string;
  label: string;
  /** CSS variable name (without `var()`). */
  cssVar: string;
}

const CONTRAST_TOKENS: ContrastTokenChoice[] = [
  { id: 'foreground', label: 'foreground', cssVar: '--color-foreground' },
  { id: 'background', label: 'background', cssVar: '--color-background' },
  { id: 'card', label: 'card', cssVar: '--color-card' },
  { id: 'card-foreground', label: 'card-foreground', cssVar: '--color-card-foreground' },
  { id: 'muted', label: 'muted', cssVar: '--color-muted' },
  { id: 'muted-foreground', label: 'muted-foreground', cssVar: '--color-muted-foreground' },
  { id: 'primary', label: 'primary', cssVar: '--color-primary' },
  { id: 'primary-foreground', label: 'primary-foreground', cssVar: '--color-primary-foreground' },
  { id: 'accent', label: 'accent', cssVar: '--color-accent' },
  { id: 'accent-foreground', label: 'accent-foreground', cssVar: '--color-accent-foreground' },
  { id: 'destructive', label: 'destructive', cssVar: '--color-destructive' },
  {
    id: 'destructive-foreground',
    label: 'destructive-foreground',
    cssVar: '--color-destructive-foreground',
  },
];

function parseHslTriple(value: string): { h: number; s: number; l: number } | null {
  const match = /^\s*([\d.]+)\s+([\d.]+)%\s+([\d.]+)%\s*$/.exec(value);
  if (!match) return null;
  return { h: Number(match[1]), s: Number(match[2]), l: Number(match[3]) };
}

function hslString(h: number, s: number, l: number): string {
  return `hsl(${h} ${s}% ${l}%)`;
}

interface RampShade {
  shade: number;
  hsl: string;
  contrast: 'light' | 'dark';
}

function buildRamp(hue: number, saturation: number): RampShade[] {
  return LIGHTNESS_CURVE.map((l, i) => ({
    shade: SHADE_LABELS[i],
    hsl: hslString(hue, saturation, l),
    contrast: l < 55 ? 'light' : 'dark',
  }));
}

function CompactSwatch({
  className,
  label,
  description,
}: {
  className?: string;
  label: string;
  description?: string;
}) {
  return (
    <div className="flex flex-col items-stretch gap-1.5">
      <div
        className={cn('flex h-16 w-32 items-end justify-start rounded-md p-2 shadow-sm', className)}
      >
        <code className="rounded bg-black/20 px-1 py-0.5 text-[10px] backdrop-blur">{label}</code>
      </div>
      {description ? <p className="max-w-32 text-xs text-muted-foreground">{description}</p> : null}
    </div>
  );
}

function GradeBadge({ grade }: { grade: ContrastGrade }) {
  const tone =
    grade === 'AAA'
      ? 'bg-emerald-100 text-emerald-800 ring-emerald-200 dark:bg-emerald-500/15 dark:text-emerald-200 dark:ring-emerald-500/30'
      : grade === 'AA'
        ? 'bg-sky-100 text-sky-800 ring-sky-200 dark:bg-sky-500/15 dark:text-sky-200 dark:ring-sky-500/30'
        : grade === 'AA Large'
          ? 'bg-amber-100 text-amber-800 ring-amber-200 dark:bg-amber-500/15 dark:text-amber-200 dark:ring-amber-500/30'
          : 'bg-rose-100 text-rose-800 ring-rose-200 dark:bg-rose-500/15 dark:text-rose-200 dark:ring-rose-500/30';
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide ring-1',
        tone,
      )}
    >
      {grade}
    </span>
  );
}

function ContrastChecker() {
  const [fgId, setFgId] = React.useState('foreground');
  const [bgId, setBgId] = React.useState('background');
  const [snapshot, setSnapshot] = React.useState(0);
  const { preferences } = usePreferences();

  React.useEffect(() => {
    setSnapshot((n) => n + 1);
  }, [preferences.primaryHsl, preferences.accentHsl]);

  const fgChoice = CONTRAST_TOKENS.find((t) => t.id === fgId) ?? CONTRAST_TOKENS[0];
  const bgChoice = CONTRAST_TOKENS.find((t) => t.id === bgId) ?? CONTRAST_TOKENS[1];

  const fgRgb = React.useMemo(
    () => resolveCssVarColor(fgChoice.cssVar) ?? parseColor('#000000'),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [fgChoice.cssVar, snapshot],
  );
  const bgRgb = React.useMemo(
    () => resolveCssVarColor(bgChoice.cssVar) ?? parseColor('#ffffff'),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [bgChoice.cssVar, snapshot],
  );

  const ratio = fgRgb && bgRgb ? contrastRatio(fgRgb, bgRgb) : 1;
  const grade = gradeContrast(ratio);
  const fgHex = fgRgb ? rgbToHex(fgRgb) : '—';
  const bgHex = bgRgb ? rgbToHex(bgRgb) : '—';

  return (
    <div className="flex w-full flex-col gap-3">
      <div className="grid gap-3 md:grid-cols-2">
        <label className="flex flex-col gap-1 text-xs font-medium text-muted-foreground">
          Foreground token
          <select
            value={fgId}
            onChange={(e) => setFgId(e.target.value)}
            className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {CONTRAST_TOKENS.map((token) => (
              <option key={token.id} value={token.id}>
                {token.label}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1 text-xs font-medium text-muted-foreground">
          Background token
          <select
            value={bgId}
            onChange={(e) => setBgId(e.target.value)}
            className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {CONTRAST_TOKENS.map((token) => (
              <option key={token.id} value={token.id}>
                {token.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div
        className="rounded-md border border-border p-5 shadow-sm"
        style={{ background: `var(${bgChoice.cssVar})`, color: `var(${fgChoice.cssVar})` }}
      >
        <p className="text-2xl font-semibold leading-tight">The quick brown fox jumps over.</p>
        <p className="mt-1 text-sm opacity-90">
          Body sample at 16 px on the chosen background. Adjust tokens above to see live grading.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3 text-xs">
        <span className="rounded-md border border-border bg-muted/40 px-2 py-1 font-mono">
          fg {fgHex}
        </span>
        <span className="rounded-md border border-border bg-muted/40 px-2 py-1 font-mono">
          bg {bgHex}
        </span>
        <span className="rounded-md border border-border bg-muted/40 px-2 py-1 font-mono">
          ratio {ratio.toFixed(2)}:1
        </span>
        <GradeBadge grade={grade} />
        <span className="text-muted-foreground">
          AA needs ≥ 4.5 (normal), ≥ 3 (large bold). AAA needs ≥ 7.
        </span>
      </div>
    </div>
  );
}

function StatusRampRow({ ramp }: { ramp: StatusRamp }) {
  const { preferences } = usePreferences();
  const baseHsl = React.useMemo(() => {
    if (ramp.hslSource === 'preference' && ramp.prefKey) {
      return parseHslTriple(preferences[ramp.prefKey]);
    }
    return null;
  }, [ramp.hslSource, ramp.prefKey, preferences]);

  const hue = baseHsl ? baseHsl.h : (ramp.baseHue ?? 0);
  const saturation = baseHsl ? baseHsl.s : (ramp.baseSaturation ?? 70);
  const shades = React.useMemo(() => buildRamp(hue, saturation), [hue, saturation]);

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex items-baseline gap-2">
        <span className="text-sm font-semibold text-foreground">{ramp.label}</span>
        <span className="text-xs text-muted-foreground">
          h {Math.round(hue)}° · s {Math.round(saturation)}%
        </span>
      </div>
      <div className="grid grid-cols-11 gap-1.5">
        {shades.map((s) => (
          <ColorSwatch
            key={s.shade}
            label={String(s.shade)}
            hint={s.hsl.replace('hsl(', '').replace(')', '')}
            swatchStyle={{ backgroundColor: s.hsl }}
            copyValue={s.hsl}
            contrast={s.contrast}
            shape="pill"
            size="sm"
          />
        ))}
      </div>
    </div>
  );
}

function PaletteGalleryRow({ palette }: { palette: (typeof TAILWIND_PALETTES)[number] }) {
  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex items-baseline gap-2">
        <span className="text-sm font-semibold text-foreground">{palette.name}</span>
        <code className="text-[11px] text-muted-foreground">{palette.id}</code>
      </div>
      <div className="grid grid-cols-11 gap-1.5">
        {palette.shades.map((shade) => {
          const isLight = shade.shade <= 400;
          return (
            <ColorSwatch
              key={shade.shade}
              label={String(shade.shade)}
              hint={shade.hex}
              swatchStyle={{ backgroundColor: shade.hex }}
              copyValue={`bg-${palette.id}-${shade.shade}`}
              contrast={isLight ? 'dark' : 'light'}
              shape="pill"
              size="sm"
            />
          );
        })}
      </div>
    </div>
  );
}

function GradientCard({ gradient }: { gradient: GradientRecipe }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-lg border border-border shadow-sm">
      <div className="flex h-28 items-end p-3" style={{ background: gradient.background }}>
        <span
          className={cn(
            'rounded-md px-2 py-0.5 text-[11px] font-semibold backdrop-blur',
            gradient.textTone === 'light' ? 'bg-black/30 text-white' : 'bg-white/60 text-zinc-900',
          )}
        >
          {gradient.label}
        </span>
      </div>
      <div className="space-y-1 bg-card p-3">
        <p className="text-xs text-muted-foreground">{gradient.description}</p>
        <code className="block break-all text-[10px] text-muted-foreground">
          {gradient.background}
        </code>
      </div>
    </div>
  );
}

export default function ColorsPage() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('tokens.colors.title', 'Colors')}
        description={t(
          'tokens.colors.subtitle',
          'Brand, semantic, palette galleries, gradients and a live WCAG contrast checker — every swatch is click-to-copy.',
        )}
      />

      <ShowcaseSection
        title={t('tokens.colors.brand.title', 'Brand & semantic tokens')}
        description={t(
          'tokens.colors.brand.subtitle',
          'shadcn-style semantic palette plus TailTheme brand overrides — change globals.css or the Theme customizer to retheme.',
        )}
      >
        <div className="flex w-full flex-col gap-4">
          <div className="flex flex-wrap gap-3">
            {BRAND_TOKENS.map((item) => (
              <CompactSwatch key={item.label} {...item} />
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            {SEMANTIC_TOKENS.map((item) => (
              <CompactSwatch key={item.label} {...item} />
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            {STATUS_FAMILIES.map((item) => (
              <CompactSwatch key={item.label} {...item} />
            ))}
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title={t('tokens.colors.tailwind.title', 'Tailwind palette gallery')}
        description={t(
          'tokens.colors.tailwind.subtitle',
          '22 default palettes × 11 shades. Click any swatch to copy the corresponding `bg-<palette>-<shade>` class.',
        )}
      >
        <div className="flex w-full flex-col gap-5">
          {TAILWIND_PALETTES.map((palette) => (
            <PaletteGalleryRow key={palette.id} palette={palette} />
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title={t('tokens.colors.ramps.title', 'Status & data ramps')}
        description={t(
          'tokens.colors.ramps.subtitle',
          'Generated 50–950 ramps for the active brand/accent and the four status colors. Switch theme presets and the primary/accent ramps update live.',
        )}
      >
        <div className="flex w-full flex-col gap-5">
          {STATUS_RAMPS.map((ramp) => (
            <StatusRampRow key={ramp.id} ramp={ramp} />
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title={t('tokens.colors.gradients.title', 'Gradients lab')}
        description={t(
          'tokens.colors.gradients.subtitle',
          'Curated gradients for hero bands, marketing banners and editorial cards.',
        )}
      >
        <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {GRADIENTS.map((g) => (
            <GradientCard key={g.id} gradient={g} />
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title={t('tokens.colors.contrast.title', 'WCAG contrast checker')}
        description={t(
          'tokens.colors.contrast.subtitle',
          'Pick any two semantic tokens to evaluate the live contrast ratio against AA / AAA thresholds. Updates with every preset change and dark-mode toggle.',
        )}
      >
        <ContrastChecker />
      </ShowcaseSection>
    </div>
  );
}
