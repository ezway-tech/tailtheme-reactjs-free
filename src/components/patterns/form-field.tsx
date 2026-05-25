import * as React from 'react';
import { cn } from '@/lib/cn';
import { Input, type InputProps } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export interface FormFieldPatternProps extends InputProps {
  label: React.ReactNode;
  description?: React.ReactNode;
  error?: React.ReactNode;
  required?: boolean;
  /** Class applied to the outer wrapper. */
  rowClassName?: string;
}

/**
 * Label + Input + Description + Error, all wired with `id` + `aria-describedby` + `aria-invalid`.
 * Use inside or outside react-hook-form — the component is controlled by props only.
 */
export const FormField = React.forwardRef<HTMLInputElement, FormFieldPatternProps>(
  (
    {
      label,
      description,
      error,
      required,
      id: idProp,
      rowClassName,
      className,
      variant,
      ...inputProps
    },
    ref,
  ) => {
    const reactId = React.useId();
    const id = idProp ?? reactId;
    const descriptionId = description ? `${id}-description` : undefined;
    const errorId = error ? `${id}-error` : undefined;
    const describedBy = [descriptionId, errorId].filter(Boolean).join(' ') || undefined;

    return (
      <div className={cn('space-y-1.5', rowClassName)}>
        <Label htmlFor={id} required={required}>
          {label}
        </Label>
        <Input
          ref={ref}
          id={id}
          aria-invalid={Boolean(error) || undefined}
          aria-describedby={describedBy}
          variant={error ? 'error' : variant}
          className={className}
          {...inputProps}
        />
        {description ? (
          <p id={descriptionId} className="text-xs text-muted-foreground">
            {description}
          </p>
        ) : null}
        {error ? (
          <p id={errorId} className="text-xs font-medium text-danger-text">
            {error}
          </p>
        ) : null}
      </div>
    );
  },
);
FormField.displayName = 'PatternFormField';
