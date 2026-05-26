import { useCallback, useEffect, useRef, useState } from 'react';

export interface UseControllableStateParams<T> {
  /** Controlled value. When defined, the hook acts as controlled. */
  value?: T;
  /** Uncontrolled initial value. */
  defaultValue?: T;
  /** Fires whenever the value changes (controlled or uncontrolled). */
  onChange?: (value: T) => void;
}

/**
 * Normalize controlled + uncontrolled patterns into a single [value, setValue] pair.
 * Mirrors Radix UI's `useControllableState` semantics but without the shared dep.
 */
export function useControllableState<T>({
  value,
  defaultValue,
  onChange,
}: UseControllableStateParams<T>): [T | undefined, (next: T) => void] {
  const [uncontrolled, setUncontrolled] = useState<T | undefined>(defaultValue);
  const isControlled = value !== undefined;
  const current = isControlled ? value : uncontrolled;

  const onChangeRef = useRef(onChange);
  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  const setValue = useCallback(
    (next: T) => {
      if (!isControlled) setUncontrolled(next);
      onChangeRef.current?.(next);
    },
    [isControlled],
  );

  return [current, setValue];
}
