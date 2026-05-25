import { useMemo } from 'react';
import { endOfDay, endOfMonth, startOfDay, startOfMonth, subDays } from 'date-fns';
import type { DateRange } from 'react-day-picker';

export type DateRangePresetId = 'today' | 'yesterday' | 'last7' | 'last30' | 'thisMonth' | 'custom';

export interface DateRangePreset {
  id: DateRangePresetId;
  label: string;
}

const PRESET_LABELS: Record<Exclude<DateRangePresetId, 'custom'>, string> = {
  today: 'Today',
  yesterday: 'Yesterday',
  last7: 'Last 7 days',
  last30: 'Last 30 days',
  thisMonth: 'This month',
};

/**
 * Preset date ranges for filter bars and {@link DateRangePicker}.
 * Returns stable preset metadata and a resolver for each id.
 */
export function useDateRangePresets() {
  const presets = useMemo<DateRangePreset[]>(
    () => [
      { id: 'today', label: PRESET_LABELS.today },
      { id: 'yesterday', label: PRESET_LABELS.yesterday },
      { id: 'last7', label: PRESET_LABELS.last7 },
      { id: 'last30', label: PRESET_LABELS.last30 },
      { id: 'thisMonth', label: PRESET_LABELS.thisMonth },
      { id: 'custom', label: 'Custom' },
    ],
    [],
  );

  const getRange = useMemo(
    () =>
      (id: DateRangePresetId): DateRange | undefined => {
        const now = new Date();
        switch (id) {
          case 'today':
            return { from: startOfDay(now), to: endOfDay(now) };
          case 'yesterday': {
            const day = subDays(now, 1);
            return { from: startOfDay(day), to: endOfDay(day) };
          }
          case 'last7':
            return { from: startOfDay(subDays(now, 6)), to: endOfDay(now) };
          case 'last30':
            return { from: startOfDay(subDays(now, 29)), to: endOfDay(now) };
          case 'thisMonth':
            return { from: startOfMonth(now), to: endOfMonth(now) };
          case 'custom':
            return undefined;
          default:
            return undefined;
        }
      },
    [],
  );

  return { presets, getRange };
}
