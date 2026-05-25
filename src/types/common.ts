import type { ReactNode } from 'react';

/** Common "render anything" slot. */
export type Slottable = ReactNode;

/** Align props — useful for patterns with optional alignment. */
export type Align = 'start' | 'center' | 'end';

/** Semantic tone used across status-ish components (Alert, Badge, Toast…). */
export type Tone = 'info' | 'success' | 'warning' | 'danger' | 'neutral';

/** Status used for async UI (empty/loading/error/ready). */
export type AsyncStatus = 'idle' | 'loading' | 'success' | 'error';

/** Strict Omit that forbids removing keys not on the source type. */
export type StrictOmit<T, K extends keyof T> = Omit<T, K>;
