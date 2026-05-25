import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { X } from 'lucide-react';
import { cn } from '@/lib/cn';

export const inputVariants = cva(
  'flex w-full rounded-md border bg-card text-sm text-foreground shadow-sm transition-colors placeholder:text-muted-foreground file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'border-input focus-visible:ring-ring',
        error: 'border-danger-border bg-danger-bg text-danger-text focus-visible:ring-danger',
      },
      size: {
        sm: 'h-8 px-2.5 py-1 text-xs',
        default: 'h-9 px-3 py-1.5',
        lg: 'h-10 px-4 py-2',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  },
);

type NativeInputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>;

export interface InputProps extends NativeInputProps, VariantProps<typeof inputVariants> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  /** Show a clear (×) button when the input has a non-empty value. Uncontrolled-friendly. */
  clearable?: boolean;
  onClear?: () => void;
  /** Wrapper class. Use `className` to style the inner <input>. */
  wrapperClassName?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      wrapperClassName,
      variant,
      size,
      type = 'text',
      leftIcon,
      rightIcon,
      clearable,
      onClear,
      value,
      defaultValue,
      disabled,
      ...props
    },
    ref,
  ) => {
    const innerRef = React.useRef<HTMLInputElement | null>(null);
    React.useImperativeHandle(ref, () => innerRef.current as HTMLInputElement, []);

    const [hasValue, setHasValue] = React.useState<boolean>(() => {
      if (value !== undefined) return String(value).length > 0;
      if (defaultValue !== undefined) return String(defaultValue).length > 0;
      return false;
    });

    React.useEffect(() => {
      if (value !== undefined) setHasValue(String(value).length > 0);
    }, [value]);

    const hasAffix = Boolean(leftIcon || rightIcon || (clearable && hasValue));

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
      if (value === undefined) setHasValue(event.target.value.length > 0);
      props.onChange?.(event);
    };

    const handleClear = () => {
      const input = innerRef.current;
      if (input) {
        const setter = Object.getOwnPropertyDescriptor(
          window.HTMLInputElement.prototype,
          'value',
        )?.set;
        setter?.call(input, '');
        input.dispatchEvent(new Event('input', { bubbles: true }));
        input.focus();
      }
      setHasValue(false);
      onClear?.();
    };

    if (!hasAffix) {
      return (
        <input
          ref={innerRef}
          type={type}
          value={value}
          defaultValue={defaultValue}
          disabled={disabled}
          className={cn(inputVariants({ variant, size }), className)}
          {...props}
          onChange={handleChange}
        />
      );
    }

    return (
      <div
        className={cn(
          'relative flex w-full items-center',
          disabled && 'cursor-not-allowed opacity-50',
          wrapperClassName,
        )}
      >
        {leftIcon ? (
          <span
            className={cn(
              'pointer-events-none absolute inset-y-0 left-0 flex items-center text-muted-foreground',
              size === 'sm' ? 'pl-2' : 'pl-3',
            )}
            aria-hidden
          >
            {leftIcon}
          </span>
        ) : null}
        <input
          ref={innerRef}
          type={type}
          value={value}
          defaultValue={defaultValue}
          disabled={disabled}
          className={cn(
            inputVariants({ variant, size }),
            leftIcon && (size === 'sm' ? 'pl-8' : 'pl-9'),
            (rightIcon || (clearable && hasValue)) && (size === 'sm' ? 'pr-8' : 'pr-9'),
            className,
          )}
          {...props}
          onChange={handleChange}
        />
        {clearable && hasValue && !disabled ? (
          <button
            type="button"
            aria-label="Clear"
            onClick={handleClear}
            className={cn(
              'absolute inset-y-0 right-0 flex items-center px-2 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:text-foreground',
            )}
          >
            <X className="h-4 w-4" />
          </button>
        ) : rightIcon ? (
          <span
            className={cn(
              'pointer-events-none absolute inset-y-0 right-0 flex items-center text-muted-foreground',
              size === 'sm' ? 'pr-2' : 'pr-3',
            )}
            aria-hidden
          >
            {rightIcon}
          </span>
        ) : null}
      </div>
    );
  },
);
Input.displayName = 'Input';
