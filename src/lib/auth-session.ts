/** localStorage key for the demo auth session (template preview only). */
const STORAGE_KEY = 'tailtheme-auth-session:v1';

export interface AuthSessionUser {
  name: string;
  email: string;
}

const DEFAULT_SESSION_USER: AuthSessionUser = {
  name: 'Alex Nguyen',
  email: 'alex@tailtheme.test',
};

/** Persist a demo session after sign-in. Does not trigger React updates by itself. */
export function setAuthSession(user: Partial<AuthSessionUser> = {}): void {
  if (typeof window === 'undefined') return;
  try {
    const payload: AuthSessionUser = {
      name: user.name ?? DEFAULT_SESSION_USER.name,
      email: user.email ?? DEFAULT_SESSION_USER.email,
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch {
    // Private browsing / quota — demo flow still navigates.
  }
}

/** Remove the demo session (call after UI teardown, before redirect). */
export function clearAuthSession(): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}

/** Read session user for display; returns null when signed out. */
export function readAuthSessionUser(): AuthSessionUser | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<AuthSessionUser>;
    if (typeof parsed.name !== 'string' || typeof parsed.email !== 'string') return null;
    return { name: parsed.name, email: parsed.email };
  } catch {
    return null;
  }
}

export function isAuthSessionActive(): boolean {
  return readAuthSessionUser() !== null;
}
