import * as React from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/cn';
import { Button } from './button';
import { Calendar } from './calendar';
import { Popover, PopoverContent, PopoverTrigger } from './popover';

export interface DatePickerProps {
  value?: Date;
  defaultValue?: Date;
  onChange?: (date: Date | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  /** date-fns format string. Defaults to `PPP`. */
  formatStr?: string;
}

/**
 * Controlled-or-uncontrolled single-date picker: Button trigger + Calendar inside a Popover.
 */
export function DatePicker({
  value,
  defaultValue,
  onChange,
  placeholder = 'Pick a date',
  disabled,
  className,
  formatStr = 'PPP',
}: DatePickerProps) {
  const [internal, setInternal] = React.useState<Date | undefined>(defaultValue);
  const isControlled = value !== undefined;
  const current = isControlled ? value : internal;

  const handleSelect = (next: Date | undefined) => {
    if (!isControlled) setInternal(next);
    onChange?.(next);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          disabled={disabled}
          className={cn(
            'w-[240px] justify-start text-left font-normal',
            !current && 'text-muted-foreground',
            className,
          )}
        >
          <CalendarIcon className="h-4 w-4" />
          {current ? format(current, formatStr) : placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar mode="single" selected={current} onSelect={handleSelect} />
      </PopoverContent>
    </Popover>
  );
}
DatePicker.displayName = 'DatePicker';
