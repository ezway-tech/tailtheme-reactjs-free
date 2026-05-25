import * as React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { DayPicker, type DayPickerProps } from 'react-day-picker';
import { cn } from '@/lib/cn';
import { buttonVariants } from './button';

export type CalendarProps = DayPickerProps & {
  hideNextButton?: boolean;
  hidePreviousButton?: boolean;
};

/**
 * Calendar primitive built on `react-day-picker` v9. Use directly or compose in a `DatePicker`.
 */
export function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  hideNextButton = false,
  hidePreviousButton = false,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('p-3', className)}
      classNames={{
        months: 'flex flex-col sm:flex-row gap-4',
        month: 'flex flex-col gap-4',
        month_caption: 'flex justify-center pt-1 relative items-center',
        caption_label: 'text-sm font-medium text-foreground',
        nav: 'flex items-center justify-between absolute inset-x-1 top-1',
        button_previous: cn(
          buttonVariants({ variant: 'outline', size: 'icon' }),
          'size-7 bg-transparent p-0 opacity-60 hover:opacity-100',
          hidePreviousButton && 'hidden',
        ),
        button_next: cn(
          buttonVariants({ variant: 'outline', size: 'icon' }),
          'size-7 bg-transparent p-0 opacity-60 hover:opacity-100',
          hideNextButton && 'hidden',
        ),
        month_grid: 'w-full border-collapse space-y-1',
        weekdays: 'flex',
        weekday: 'text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]',
        week: 'flex w-full mt-2',
        day: cn(
          'relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent',
        ),
        day_button: cn(
          buttonVariants({ variant: 'ghost', size: 'icon' }),
          'size-8 p-0 font-normal aria-selected:opacity-100',
        ),
        range_start:
          'day-range-start aria-selected:bg-primary aria-selected:text-primary-foreground',
        range_end: 'day-range-end aria-selected:bg-primary aria-selected:text-primary-foreground',
        selected:
          'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
        today: 'bg-accent text-accent-foreground',
        outside: 'day-outside text-muted-foreground aria-selected:text-muted-foreground',
        disabled: 'text-muted-foreground opacity-50',
        range_middle: 'aria-selected:bg-accent aria-selected:text-accent-foreground',
        hidden: 'invisible',
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation, ...rest }) =>
          orientation === 'left' ? (
            <ChevronLeft className="h-4 w-4" {...rest} />
          ) : (
            <ChevronRight className="h-4 w-4" {...rest} />
          ),
      }}
      {...props}
    />
  );
}
Calendar.displayName = 'Calendar';
