import * as React from 'react';
import { Check, Copy } from 'lucide-react';
import { cn } from '@/lib/cn';

export interface ColorSwatchProps {
  /** Display label (e.g. token name or class name). Click-to-copies this value by default. */
  label: string;
  /** Optional secondary line — usually a hex / rgb / hsl readout. */
  hint?: React.ReactNode;
  /** Tailwind / inline classes that paint the swatch. Either set this or pass `style.backgroundColor`. */
  swatchClassName?: string;
  /** Inline style for the swatch surface — useful when painting via a CSS variable. */
  swatchStyle?: React.CSSProperties;
  /** Value placed on the clipboard when the user clicks the swatch. Defaults to `label`. */
  copyValue?: string;
  /** Tone of label text — light swatches need dark text and vice versa. */
  contrast?: 'light' | 'dark';
  /** Square or wide pill. Defaults to `square`. */
  shape?: 'square' | 'pill';
  /** Render a smaller swatch — handy for dense palette ramps. */
  size?: 'sm' | 'md';
}

/**
 * Click-to-copy color tile used across token & palette galleries.
 * Renders a colored surface, the token / class name, and an optional hex hint.
 */
export function ColorSwatch({
  label,
  hint,
  swatchClassName,
  swatchStyle,
  copyValue,
  contrast = 'dark',
  shape = 'square',
  size = 'md',
}: ColorSwatchProps) {
  const [copied, setCopied] = React.useState(false);
  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const value = copyValue ?? label;

  React.useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const onCopy = React.useCallback(async () => {
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(value);
      }
    } catch {
      // best-effort — clipboard may be unavailable in iframes / older browsers.
    }
    setCopied(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 1200);
  }, [value]);

  const dim =
    shape === 'pill'
      ? size === 'sm'
        ? 'h-6 w-full min-w-[3.5rem]'
        : 'h-8 w-full min-w-[4rem]'
      : size === 'sm'
        ? 'h-10 w-10'
        : 'h-14 w-full min-w-[4rem]';

  const tone = contrast === 'light' ? 'text-white' : 'text-zinc-900';

  return (
    <button
      type="button"
      onClick={onCopy}
      title={`Copy ${value}`}
      className={cn(
        'group relative flex flex-col items-stretch gap-1 rounded-md text-left outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
      )}
    >
      <span
        className={cn(
          'flex items-end justify-between rounded-md p-1.5 shadow-sm ring-1 ring-inset ring-black/5 transition-transform group-hover:scale-[1.02]',
          dim,
          swatchClassName,
        )}
        style={swatchStyle}
      >
        <span
          className={cn(
            'invisible flex h-5 w-5 items-center justify-center rounded bg-black/30 backdrop-blur-sm group-hover:visible',
            tone,
          )}
        >
          {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
        </span>
      </span>
      {(label || hint) && (
        <span className="flex flex-col leading-tight">
          {label ? <code className="text-[11px] font-medium text-foreground">{label}</code> : null}
          {hint ? <span className="text-[10px] text-muted-foreground">{hint}</span> : null}
        </span>
      )}
    </button>
  );
}
