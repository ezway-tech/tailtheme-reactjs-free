import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/cn';

/**
 * Single-element textarea (no native resize grip, or autoResize).
 * Border radius lives on the element; safe because there is no resize handle clash.
 */
export const textareaVariants = cva(
  'flex w-full rounded-md border bg-card px-3 py-2 text-sm text-foreground shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'border-input focus-visible:ring-ring',
        error: 'border-danger-border bg-danger-bg text-danger-text focus-visible:ring-danger',
      },
      resize: {
        none: 'resize-none',
        y: 'resize-y',
        both: 'resize',
      },
    },
    defaultVariants: { variant: 'default', resize: 'y' },
  },
);

/** Outer shell when native resize is enabled — clips the grip so it follows rounded corners. */
const textareaShellVariants = cva(
  'relative flex w-full overflow-hidden rounded-md border bg-card shadow-sm transition-colors focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-background',
  {
    variants: {
      variant: {
        default: 'border-input focus-within:ring-ring',
        error: 'border-danger-border focus-within:ring-danger',
      },
    },
    defaultVariants: { variant: 'default' },
  },
);

/** Inner field: square corners; radius comes from the clipping shell (fixes resize grip vs border-radius). */
const textareaFieldVariants = cva(
  'flex min-h-0 w-full rounded-none border-0 bg-transparent px-3 py-2 text-sm text-foreground shadow-none outline-none transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: '',
        error: 'bg-danger-bg text-danger-text',
      },
      resize: {
        none: 'resize-none',
        y: 'resize-y',
        both: 'resize',
      },
    },
    defaultVariants: { variant: 'default', resize: 'y' },
  },
);

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>, VariantProps<typeof textareaVariants> {
  /** Grow to fit content up to `maxRows`. When true, `resize` is forced to `none`. */
  autoResize?: boolean;
  maxRows?: number;
}

function adjustHeight(el: HTMLTextAreaElement, maxRows: number): void {
  el.style.height = 'auto';
  const lineHeight = parseFloat(window.getComputedStyle(el).lineHeight) || 20;
  const max = lineHeight * maxRows;
  el.style.height = `${Math.min(el.scrollHeight, max)}px`;
  el.style.overflowY = el.scrollHeight > max ? 'auto' : 'hidden';
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      variant,
      resize,
      autoResize,
      maxRows = 8,
      rows = 3,
      onChange,
      value,
      defaultValue,
      disabled,
      ...props
    },
    ref,
  ) => {
    const innerRef = React.useRef<HTMLTextAreaElement | null>(null);
    React.useImperativeHandle(ref, () => innerRef.current as HTMLTextAreaElement, []);

    React.useEffect(() => {
      if (autoResize && innerRef.current) adjustHeight(innerRef.current, maxRows);
    }, [autoResize, maxRows, value, defaultValue]);

    const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = (event) => {
      if (autoResize && innerRef.current) adjustHeight(innerRef.current, maxRows);
      onChange?.(event);
    };

    const effectiveResize = autoResize ? 'none' : resize;
    const useResizeShell = effectiveResize !== 'none';

    const textareaProps = {
      ...props,
      rows,
      value,
      defaultValue,
      disabled,
      onChange: handleChange,
    };

    if (!useResizeShell) {
      return (
        <textarea
          ref={innerRef}
          className={cn(textareaVariants({ variant, resize: effectiveResize }), className)}
          {...textareaProps}
        />
      );
    }

    return (
      <div className={cn(textareaShellVariants({ variant }))}>
        <textarea
          ref={innerRef}
          className={cn(
            textareaFieldVariants({ variant, resize: effectiveResize }),
            className,
            'rounded-none',
          )}
          {...textareaProps}
        />
      </div>
    );
  },
);
Textarea.displayName = 'Textarea';
