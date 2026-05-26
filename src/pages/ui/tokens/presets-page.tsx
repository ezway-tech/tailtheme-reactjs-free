import { useTranslation } from 'react-i18next';
import { Check } from 'lucide-react';
import { PageHeader } from '@/components/patterns';
import { Button } from '@/components/ui';
import { ShowcaseSection } from '@/components/showcase';
import { PRESET_PALETTES } from '@/hooks/use-preferences';
import { usePreferences } from '@/hooks/use-preferences';
import { applyPresetToPreferences, isPresetActive, PRESET_CHANNEL_DOTS } from '@/lib/theme-presets';
import { cn } from '@/lib/cn';

export default function PresetsPage() {
  const { t } = useTranslation();
  const { preferences, setPreferences } = usePreferences();

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('tokens.presets.title', 'Theme presets')}
        description={t(
          'tokens.presets.subtitle',
          'Four curated presets included in TailTheme Free. Pro unlocks 16 presets plus the full theme customizer.',
        )}
      />

      <ShowcaseSection
        title={t('tokens.presets.gallery.title', 'Preset gallery')}
        description={t(
          'tokens.presets.gallery.subtitle',
          'Each card previews the eight HSL channels and a sample button. Click "Apply" to make it the active theme.',
        )}
      >
        <div className="grid w-full gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {PRESET_PALETTES.map((preset) => {
            const active = isPresetActive(preset, preferences);
            return (
              <article
                key={preset.id}
                className={cn(
                  'flex flex-col gap-3 rounded-lg border bg-card p-4 shadow-sm transition-colors',
                  active ? 'border-primary ring-1 ring-primary/40' : 'border-border',
                )}
              >
                <header className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-semibold text-foreground">{preset.name}</p>
                    <code className="text-[11px] text-muted-foreground">{preset.id}</code>
                  </div>
                  {active ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary">
                      <Check className="h-3 w-3" />
                      {t('tokens.presets.active', 'Active')}
                    </span>
                  ) : null}
                </header>

                <div
                  className="rounded-md p-3 text-xs ring-1 ring-black/5"
                  style={{
                    background: `linear-gradient(135deg, hsl(${preset.primaryHsl}) 0%, hsl(${preset.accentHsl}) 100%)`,
                    color: '#fff',
                  }}
                >
                  <p className="text-[11px] uppercase tracking-wide opacity-80">
                    {t('tokens.presets.preview.heroLabel', 'Hero band')}
                  </p>
                  <p className="text-sm font-semibold">{preset.name}</p>
                </div>

                <ul className="grid grid-cols-4 gap-1">
                  {PRESET_CHANNEL_DOTS.map((dot) => (
                    <li
                      key={dot.key}
                      className="flex flex-col items-center gap-1"
                      title={`${dot.label}: ${preset[dot.key]}`}
                    >
                      <span
                        className="block h-5 w-full rounded-sm ring-1 ring-inset ring-black/5"
                        style={{ background: `hsl(${preset[dot.key]})` }}
                      />
                      <span className="truncate text-[9px] uppercase tracking-wide text-muted-foreground">
                        {dot.label}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    className="inline-flex h-7 items-center rounded-md px-2.5 text-xs font-medium text-white shadow-sm transition-opacity hover:opacity-90"
                    style={{ backgroundColor: `hsl(${preset.primaryHsl})` }}
                  >
                    {t('tokens.presets.preview.button', 'Sample button')}
                  </button>
                  <span
                    className="inline-flex h-6 items-center rounded-full px-2 text-[10px] font-semibold uppercase tracking-wide"
                    style={{
                      backgroundColor: `hsl(${preset.successHsl} / 0.12)`,
                      color: `hsl(${preset.successHsl})`,
                    }}
                  >
                    success
                  </span>
                  <span
                    className="inline-flex h-6 items-center rounded-full px-2 text-[10px] font-semibold uppercase tracking-wide"
                    style={{
                      backgroundColor: `hsl(${preset.warningHsl} / 0.18)`,
                      color: `hsl(${preset.warningHsl})`,
                    }}
                  >
                    warning
                  </span>
                </div>

                <Button
                  variant={active ? 'outline' : 'default'}
                  size="sm"
                  className="mt-auto w-full"
                  disabled={active}
                  onClick={() => setPreferences(applyPresetToPreferences(preset))}
                >
                  {active
                    ? t('tokens.presets.applied', 'Applied')
                    : t('tokens.presets.apply', 'Apply')}
                </Button>
              </article>
            );
          })}
        </div>
      </ShowcaseSection>
    </div>
  );
}
