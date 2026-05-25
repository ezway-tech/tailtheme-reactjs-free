import * as React from 'react';
import { cn } from '@/lib/cn';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export interface TypewriterProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'> {
  /** A single string or an array of strings to cycle through. */
  text: string | string[];
  /** Milliseconds between each character when typing forward. */
  typingSpeed?: number;
  /** Milliseconds between each character when deleting. */
  deletingSpeed?: number;
  /** Pause time after a phrase is fully typed (ms). */
  pauseDuration?: number;
  /** Show a blinking caret after the text. */
  showCaret?: boolean;
  /** Delete & retype phrases when an array is supplied. */
  loop?: boolean;
}

/**
 * Type out one or more strings character-by-character. Falls back to the
 * final string when reduced motion is requested.
 */
export function Typewriter({
  text,
  typingSpeed = 60,
  deletingSpeed = 30,
  pauseDuration = 1400,
  showCaret = true,
  loop = true,
  className,
  ...rest
}: TypewriterProps) {
  const phrases = React.useMemo(() => (Array.isArray(text) ? text : [text]), [text]);
  const reduced = useReducedMotion();
  const [phraseIdx, setPhraseIdx] = React.useState(0);
  const [display, setDisplay] = React.useState('');
  const [phase, setPhase] = React.useState<'typing' | 'pausing' | 'deleting'>('typing');

  React.useEffect(() => {
    if (reduced) {
      setDisplay(phrases[phrases.length - 1] ?? '');
      return undefined;
    }

    const current = phrases[phraseIdx] ?? '';

    if (phase === 'typing') {
      if (display.length === current.length) {
        if (phrases.length === 1 && !loop) return undefined;
        const id = window.setTimeout(() => setPhase('pausing'), pauseDuration);
        return () => window.clearTimeout(id);
      }
      const id = window.setTimeout(
        () => setDisplay(current.slice(0, display.length + 1)),
        typingSpeed,
      );
      return () => window.clearTimeout(id);
    }

    if (phase === 'pausing') {
      const id = window.setTimeout(() => setPhase('deleting'), pauseDuration);
      return () => window.clearTimeout(id);
    }

    if (display.length === 0) {
      setPhase('typing');
      setPhraseIdx((idx) => (idx + 1) % phrases.length);
      return undefined;
    }
    const id = window.setTimeout(
      () => setDisplay(current.slice(0, display.length - 1)),
      deletingSpeed,
    );
    return () => window.clearTimeout(id);
  }, [
    reduced,
    phrases,
    phraseIdx,
    phase,
    display,
    typingSpeed,
    deletingSpeed,
    pauseDuration,
    loop,
  ]);

  return (
    <span className={cn('inline-flex items-baseline', className)} {...rest}>
      <span aria-live="polite">{display}</span>
      {showCaret && (
        <span
          aria-hidden
          className={cn(
            'ml-0.5 inline-block w-0.5 self-stretch bg-current',
            !reduced && 'animate-pulse',
          )}
          style={{ minHeight: '1em' }}
        />
      )}
    </span>
  );
}
