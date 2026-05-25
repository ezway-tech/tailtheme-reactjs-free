import * as React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/cn';

export interface ConfirmOptions {
  title: React.ReactNode;
  description?: React.ReactNode;
  confirmLabel?: React.ReactNode;
  cancelLabel?: React.ReactNode;
  /** Style the confirm button. */
  tone?: 'default' | 'danger';
}

export interface ConfirmDialogProps extends ConfirmOptions {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  onCancel?: () => void;
}

export function ConfirmDialog({
  open,
  onOpenChange,
  onConfirm,
  onCancel,
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  tone = 'default',
}: ConfirmDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          {description ? <AlertDialogDescription>{description}</AlertDialogDescription> : null}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>{cancelLabel}</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className={cn(
              tone === 'default' &&
                buttonVariants({ variant: 'default' }).replace('bg-destructive', 'bg-primary'),
            )}
          >
            {confirmLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

interface ConfirmRequest extends ConfirmOptions {
  resolve: (ok: boolean) => void;
}

interface ConfirmContextValue {
  confirm: (options: ConfirmOptions) => Promise<boolean>;
}

const ConfirmContext = React.createContext<ConfirmContextValue | null>(null);

export function ConfirmProvider({ children }: { children: React.ReactNode }) {
  const [request, setRequest] = React.useState<ConfirmRequest | null>(null);
  const open = request !== null;

  const confirm = React.useCallback(
    (options: ConfirmOptions) =>
      new Promise<boolean>((resolve) => {
        setRequest({ ...options, resolve });
      }),
    [],
  );

  const settle = React.useCallback(
    (value: boolean) => {
      request?.resolve(value);
      setRequest(null);
    },
    [request],
  );

  const value = React.useMemo<ConfirmContextValue>(() => ({ confirm }), [confirm]);

  return (
    <ConfirmContext.Provider value={value}>
      {children}
      {request ? (
        <ConfirmDialog
          open={open}
          onOpenChange={(next) => {
            if (!next) settle(false);
          }}
          onConfirm={() => settle(true)}
          onCancel={() => settle(false)}
          title={request.title}
          description={request.description}
          confirmLabel={request.confirmLabel}
          cancelLabel={request.cancelLabel}
          tone={request.tone}
        />
      ) : null}
    </ConfirmContext.Provider>
  );
}

/**
 * Imperatively ask the user to confirm an action. Returns a boolean.
 *
 * ```tsx
 * const confirm = useConfirm();
 * if (await confirm({ title: 'Delete item?', tone: 'danger' })) { ... }
 * ```
 */
export function useConfirm(): (options: ConfirmOptions) => Promise<boolean> {
  const ctx = React.useContext(ConfirmContext);
  if (!ctx) {
    throw new Error('useConfirm must be used inside <ConfirmProvider>');
  }
  return ctx.confirm;
}
