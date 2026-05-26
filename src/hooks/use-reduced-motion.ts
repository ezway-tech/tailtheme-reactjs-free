import type { MotionIntensity } from './use-preferences';

export interface MotionPrefs {
  /** No app-wide reduced-motion toggle; always full motion for primitives using this hook. */
  reduced: boolean;
  /** Always `'standard'` when {@link MotionPrefs.reduced} is false. */
  intensity: MotionIntensity;
  /** True when decorative motion runs at full strength. */
  expressive: boolean;
}

const FULL_MOTION_PREFS: MotionPrefs = {
  reduced: false,
  intensity: 'standard',
  expressive: true,
};

/**
 * Stable prefs for motion primitives (Reveal, MotionList, …). Route enter/exit stays opt-in via
 * `handle.pageTransition`. Kept so existing call sites keep working without a theme preference.
 */
export function useMotionPrefs(): MotionPrefs {
  return FULL_MOTION_PREFS;
}

/** Backwards-compatible — always `false` (no reduced-motion gating from app prefs). */
export function useReducedMotion(): boolean {
  return false;
}
