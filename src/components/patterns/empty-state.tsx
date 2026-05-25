/**
 * `EmptyState` was promoted to a first-class UI primitive. This module is
 * kept so existing `import { EmptyState } from '@/components/patterns'`
 * call sites continue to work — both the legacy `action`/`icon` shape and
 * the new variants are supported by the underlying component.
 */
export { EmptyState } from '@/components/ui/empty-state';
export type { EmptyStateProps, EmptyStateVariant } from '@/components/ui/empty-state';
