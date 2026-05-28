import type { AuthOAuthProviderIcon } from '@/components/auth/auth-provider-icon-assets';
import { AUTH_OAUTH_PROVIDER_ICON_COMPONENTS } from '@/components/auth/auth-provider-icon-assets';

export type AuthOAuthProviderId =
  | 'google'
  | 'github'
  | 'microsoft'
  | 'apple'
  | 'facebook'
  | 'linkedin'
  | 'x'
  | 'discord'
  | 'slack'
  | 'amazon'
  | 'gitlab'
  | 'bitbucket'
  | 'spotify'
  | 'twitch';

export interface AuthOAuthProviderDefinition {
  id: AuthOAuthProviderId;
  label: string;
  Icon: AuthOAuthProviderIcon;
}

/** Full catalog — pick ids via `providerIds` or `preset` on `AuthSocialProviders`. */
export const AUTH_OAUTH_PROVIDER_CATALOG: Record<AuthOAuthProviderId, AuthOAuthProviderDefinition> =
  {
    google: { id: 'google', label: 'Google', Icon: AUTH_OAUTH_PROVIDER_ICON_COMPONENTS.google },
    github: { id: 'github', label: 'GitHub', Icon: AUTH_OAUTH_PROVIDER_ICON_COMPONENTS.github },
    microsoft: {
      id: 'microsoft',
      label: 'Microsoft',
      Icon: AUTH_OAUTH_PROVIDER_ICON_COMPONENTS.microsoft,
    },
    apple: { id: 'apple', label: 'Apple', Icon: AUTH_OAUTH_PROVIDER_ICON_COMPONENTS.apple },
    facebook: {
      id: 'facebook',
      label: 'Facebook',
      Icon: AUTH_OAUTH_PROVIDER_ICON_COMPONENTS.facebook,
    },
    linkedin: {
      id: 'linkedin',
      label: 'LinkedIn',
      Icon: AUTH_OAUTH_PROVIDER_ICON_COMPONENTS.linkedin,
    },
    x: { id: 'x', label: 'X', Icon: AUTH_OAUTH_PROVIDER_ICON_COMPONENTS.x },
    discord: { id: 'discord', label: 'Discord', Icon: AUTH_OAUTH_PROVIDER_ICON_COMPONENTS.discord },
    slack: { id: 'slack', label: 'Slack', Icon: AUTH_OAUTH_PROVIDER_ICON_COMPONENTS.slack },
    amazon: { id: 'amazon', label: 'Amazon', Icon: AUTH_OAUTH_PROVIDER_ICON_COMPONENTS.amazon },
    gitlab: { id: 'gitlab', label: 'GitLab', Icon: AUTH_OAUTH_PROVIDER_ICON_COMPONENTS.gitlab },
    bitbucket: {
      id: 'bitbucket',
      label: 'Bitbucket',
      Icon: AUTH_OAUTH_PROVIDER_ICON_COMPONENTS.bitbucket,
    },
    spotify: { id: 'spotify', label: 'Spotify', Icon: AUTH_OAUTH_PROVIDER_ICON_COMPONENTS.spotify },
    twitch: { id: 'twitch', label: 'Twitch', Icon: AUTH_OAUTH_PROVIDER_ICON_COMPONENTS.twitch },
  };

export const AUTH_OAUTH_PROVIDER_IDS = Object.keys(
  AUTH_OAUTH_PROVIDER_CATALOG,
) as AuthOAuthProviderId[];

/** Curated sets for common auth layouts (override with `providerIds`). */
export const AUTH_OAUTH_PROVIDER_PRESETS = {
  /** Default login/register — compact 3-up grid. */
  default: ['google', 'github', 'microsoft'] as const satisfies readonly AuthOAuthProviderId[],
  /** Extra consumer + work providers. */
  extended: [
    'google',
    'github',
    'microsoft',
    'apple',
    'facebook',
    'linkedin',
    'x',
    'discord',
  ] as const satisfies readonly AuthOAuthProviderId[],
  social: [
    'google',
    'apple',
    'facebook',
    'x',
    'discord',
    'twitch',
  ] as const satisfies readonly AuthOAuthProviderId[],
  developer: [
    'github',
    'gitlab',
    'bitbucket',
    'google',
    'microsoft',
  ] as const satisfies readonly AuthOAuthProviderId[],
  enterprise: [
    'microsoft',
    'google',
    'slack',
    'amazon',
    'linkedin',
    'github',
  ] as const satisfies readonly AuthOAuthProviderId[],
  all: AUTH_OAUTH_PROVIDER_IDS,
} as const;

export type AuthOAuthProviderPreset = keyof typeof AUTH_OAUTH_PROVIDER_PRESETS;

export function resolveAuthOAuthProviders(
  options: {
    providerIds?: readonly AuthOAuthProviderId[];
    preset?: AuthOAuthProviderPreset;
  } = {},
): AuthOAuthProviderDefinition[] {
  const ids = options.providerIds ?? AUTH_OAUTH_PROVIDER_PRESETS[options.preset ?? 'default'];
  const seen = new Set<AuthOAuthProviderId>();
  const resolved: AuthOAuthProviderDefinition[] = [];

  for (const id of ids) {
    if (seen.has(id)) continue;
    const provider = AUTH_OAUTH_PROVIDER_CATALOG[id];
    if (!provider) continue;
    seen.add(id);
    resolved.push(provider);
  }

  return resolved;
}
