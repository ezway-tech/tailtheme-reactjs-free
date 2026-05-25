import * as React from 'react';
import { cn } from '@/lib/cn';

/** Row hover/selection styles for `<TableRow>` and animated `<motion.tr>`. */
export const tableBodyRowClassName =
  'transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted';

/** Shared horizontal/vertical padding for `<TableHead>` and `<TableCell>`. */
export const tableCellPaddingClassName =
  'px-4 py-3 first:pl-5 last:pr-5 [&:has([role=checkbox])]:pr-0';

/** Bordered card surface for data tables on `background` pages. */
export const tableFrameClassName =
  'overflow-hidden rounded-md border border-border bg-card shadow-sm';

export interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
  /** Applied to the overflow wrapper around `<table>` (use for max-height scroll regions). */
  wrapperClassName?: string;
  /**
   * Card frame (border, `bg-card`, shadow) on the table wrapper.
   * Use `false` when the table sits inside a `Card`.
   * @default true
   */
  framed?: boolean;
}

export const Table = React.forwardRef<HTMLTableElement, TableProps>(
  ({ className, wrapperClassName, framed = true, ...props }, ref) => (
    <div
      className={cn(
        'relative w-full overflow-auto',
        framed && tableFrameClassName,
        wrapperClassName,
      )}
    >
      <table ref={ref} className={cn('w-full caption-bottom text-sm', className)} {...props} />
    </div>
  ),
);
Table.displayName = 'Table';

export const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead
    ref={ref}
    className={cn('border-b border-border bg-muted [&_tr]:border-0', className)}
    {...props}
  />
));
TableHeader.displayName = 'TableHeader';

export const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn(
      'bg-card [&_tr]:border-b [&_tr]:border-border [&_tr:last-child]:border-b-0 [&_tr:nth-child(even)]:bg-muted/20',
      className,
    )}
    {...props}
  />
));
TableBody.displayName = 'TableBody';

export const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn('border-t border-border/50 bg-muted/30 font-medium [&>tr]:border-0', className)}
    {...props}
  />
));
TableFooter.displayName = 'TableFooter';

export const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr ref={ref} className={cn('border-0', tableBodyRowClassName, className)} {...props} />
));
TableRow.displayName = 'TableRow';

export const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      'h-11 text-left align-middle font-medium text-foreground/80',
      tableCellPaddingClassName,
      className,
    )}
    {...props}
  />
));
TableHead.displayName = 'TableHead';

export const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td ref={ref} className={cn('align-middle', tableCellPaddingClassName, className)} {...props} />
));
TableCell.displayName = 'TableCell';

export const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption ref={ref} className={cn('mt-4 text-sm text-muted-foreground', className)} {...props} />
));
TableCaption.displayName = 'TableCaption';
