import type { ComponentType, SVGProps } from 'react';

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

export type AuthOAuthProviderIcon = ComponentType<SVGProps<SVGSVGElement>>;

export interface AuthOAuthProviderDefinition {
  id: AuthOAuthProviderId;
  label: string;
  Icon: AuthOAuthProviderIcon;
}

/** Demo SVG marks for OAuth-style buttons (not official brand asset packs). */
function GoogleIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M21.35 12.23c0-.76-.07-1.49-.2-2.2H12v4.16h5.23a4.46 4.46 0 0 1-1.94 2.93v2.43h3.14c1.84-1.7 2.92-4.2 2.92-7.32Z"
        fill="#4285F4"
      />
      <path
        d="M12 21.7c2.62 0 4.83-.86 6.44-2.35l-3.14-2.43c-.87.58-1.98.92-3.3.92-2.53 0-4.67-1.71-5.43-4.01H3.33v2.51A9.72 9.72 0 0 0 12 21.7Z"
        fill="#34A853"
      />
      <path
        d="M6.57 13.83a5.82 5.82 0 0 1 0-3.67V7.65H3.33a9.72 9.72 0 0 0 0 8.69l3.24-2.51Z"
        fill="#FBBC05"
      />
      <path
        d="M12 6.15c1.42 0 2.7.49 3.7 1.45l2.76-2.77C16.82 3.3 14.62 2.3 12 2.3a9.72 9.72 0 0 0-8.67 5.35l3.24 2.5C7.33 7.87 9.47 6.15 12 6.15Z"
        fill="#EA4335"
      />
    </svg>
  );
}

function GitHubIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.25.82-.57v-2.2c-3.34.73-4.04-1.42-4.04-1.42-.54-1.4-1.34-1.77-1.34-1.77-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.85 2.8 1.31 3.49 1 .1-.79.42-1.32.75-1.62-2.66-.3-5.46-1.36-5.46-6.04 0-1.33.46-2.4 1.23-3.25-.13-.3-.54-1.54.11-3.2 0 0 1-.33 3.3 1.24A11.35 11.35 0 0 1 12 6.56c1.02.01 2.05.14 3 .41 2.29-1.57 3.29-1.24 3.29-1.24.66 1.66.25 2.9.12 3.2.76.85 1.23 1.92 1.23 3.25 0 4.69-2.8 5.74-5.48 6.03.43.38.82 1.1.82 2.24v3.33c0 .32.22.69.83.57A12 12 0 0 0 12 .5Z" />
    </svg>
  );
}

function MicrosoftIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <rect x="3" y="3" width="8.5" height="8.5" fill="#F25022" />
      <rect x="12.5" y="3" width="8.5" height="8.5" fill="#7FBA00" />
      <rect x="3" y="12.5" width="8.5" height="8.5" fill="#00A4EF" />
      <rect x="12.5" y="12.5" width="8.5" height="8.5" fill="#FFB900" />
    </svg>
  );
}

function AppleIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
    </svg>
  );
}

function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M24 12.07C24 5.41 18.63 0 12 0S0 5.4 0 12.07c0 6.02 4.39 11.02 10.13 11.91v-8.4H7.08v-3.5h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.95h-1.51c-1.49 0-1.95.93-1.95 1.88v2.26h3.32l-.53 3.5h-2.79v8.4C19.61 23.09 24 18.09 24 12.07z"
        fill="#1877F2"
      />
      <path
        d="M16.67 15.57l.53-3.5h-3.32v-2.26c0-.95.46-1.88 1.95-1.88h1.51V5.98s-1.37-.24-2.68-.24c-2.74 0-4.53 1.67-4.53 4.69v2.77H7.08v3.5h3.05v8.4a12.2 12.2 0 0 0 3.74 0v-8.4h2.8z"
        fill="#fff"
      />
    </svg>
  );
}

function LinkedInIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0z"
        fill="#0A66C2"
      />
    </svg>
  );
}

function XIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M18.9 2.25h3.68l-8.04 9.19L24 21.75h-7.41l-5.8-7.58-6.63 7.58H.96l8.6-9.83L0 2.25h7.59l5.24 6.93 6.07-6.93zm-1.29 17.52h2.04L6.49 4.41H4.3l13.31 15.36z" />
    </svg>
  );
}

function DiscordIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M20.32 4.37A19.8 19.8 0 0 0 15.55 3c-.2.36-.43.85-.59 1.23a18.27 18.27 0 0 0-5.92 0C8.88 3.85 8.65 3.36 8.45 3a19.73 19.73 0 0 0-4.77 1.37C2.55 8.22 1.96 11.95 2.22 15.63a19.9 19.9 0 0 0 4.86 2.48c.39-.53.74-1.09 1.04-1.68-.57-.21-1.12-.47-1.64-.77.14-.1.27-.21.4-.31 3.13 1.46 6.52 1.46 9.62 0 .13.11.26.22.4.31-.52.3-1.07.56-1.64.77.3.59.65 1.15 1.04 1.68a19.87 19.87 0 0 0 4.86-2.48c.35-4.2-.6-7.87-2.54-11.26zM9.68 13.78c-.94 0-1.72-.87-1.72-1.94s.75-1.94 1.72-1.94 1.73.87 1.72 1.94-.75 1.94-1.72 1.94zm4.64 0c-.94 0-1.72-.87-1.72-1.94s.75-1.94 1.72-1.94 1.73.87 1.72 1.94-.75 1.94-1.72 1.94z"
        fill="#5865F2"
      />
    </svg>
  );
}

function SlackIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M5.04 15.58a2.07 2.07 0 1 1-4.14 0 2.07 2.07 0 0 1 4.14 0zm1.66-2.07c0-1.14.93-2.07 2.07-2.07h2.07V8.44a2.07 2.07 0 0 0-4.14 0v2.07H5.7zm8.28 1.66a2.07 2.07 0 1 1 0-4.14h2.07V8.44a2.07 2.07 0 0 0-4.14 0v2.07h2.07zm-1.66 8.28a2.07 2.07 0 1 1-4.14 0 2.07 2.07 0 0 1 4.14 0zm-2.07-1.66c1.14 0 2.07.93 2.07 2.07v2.07a2.07 2.07 0 0 0 4.14 0v-2.07h-2.07c0-1.14-.93-2.07-2.07-2.07h-2.07zm8.28-1.66a2.07 2.07 0 1 1 0 4.14h-2.07v2.07a2.07 2.07 0 0 0 4.14 0v-2.07h2.07c0-1.14.93-2.07 2.07-2.07h2.07z"
        fill="#E01E5A"
      />
      <path
        d="M18.96 8.42a2.07 2.07 0 1 1 4.14 0 2.07 2.07 0 0 1-4.14 0zm-1.66 2.07c0 1.14-.93 2.07-2.07 2.07h-2.07v2.07a2.07 2.07 0 0 0 4.14 0v-2.07h2.07c0-1.14.93-2.07 2.07-2.07h2.07z"
        fill="#36C5F0"
      />
      <path
        d="M8.42 5.04a2.07 2.07 0 1 1 0-4.14h2.07V0a2.07 2.07 0 0 0-4.14 0v2.07H8.42z"
        fill="#2EB67D"
      />
      <path
        d="M15.58 18.96a2.07 2.07 0 1 1 0 4.14h-2.07v2.07a2.07 2.07 0 0 0 4.14 0v-2.07h-2.07z"
        fill="#ECB22E"
      />
    </svg>
  );
}

function AmazonIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M14.26 17.87c-4.82 2.26-9.94 3.46-15.08 3.1-.6-.04-.67-.33-.14-.62 2.1-1.22 4.35-2.1 6.68-2.64-.98-1.16-1.55-2.64-1.44-4.2.18-2.7 2.5-4.86 5.2-4.86 2.9 0 5.25 2.35 5.25 5.25 0 3.28-2.88 5.95-6.47 5.95-1.2 0-2.32-.32-3.29-.88.4 1.48 1.52 2.6 3.01 2.95 2.98.68 6.1-.12 8.28-2.05z"
        fill="#FF9900"
      />
      <path
        d="M6.2 19.5c5.5.35 10.9-.9 15.5-3.35.3-.15.55.2.3.42-1.05.95-4.35 2.55-8.05 3.05-.35.05-.7.08-1.05.1-.25.02-.5.03-.75.03-.45 0-.9-.03-1.35-.08-.55-.06-1.1-.15-1.63-.28z"
        fill="#FF9900"
      />
    </svg>
  );
}

function GitLabIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="m23.6 9.2-.03-.08-3.37-8.74a.9.9 0 0 0-.84-.55H4.7a.9.9 0 0 0-.84.55L.5 9.12l-.03.08a6.28 6.28 0 0 0 2.17 7.25l.03.03 9.33 6.4.03.02.03-.02 9.33-6.4.03-.03a6.28 6.28 0 0 0 2.17-7.25zM12 18.1 4.94 13.2 12 4.9l7.06 8.3L12 18.1z"
        fill="#FC6D26"
      />
      <path d="M12 18.1 4.94 13.2 2.7 9.37h6.65L12 4.9l2.65 4.47h6.65L12 18.1z" fill="#E24329" />
      <path d="M12 18.1 4.94 13.2 7.18 9.37H12v8.73z" fill="#FC6D26" />
      <path d="M12 18.1l7.06-4.9-2.24-3.83H12v8.73z" fill="#FCA326" />
    </svg>
  );
}

function BitbucketIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M.78 3.14h22.44c.43 0 .78.4.68.82L20.9 20.1a.94.94 0 0 1-.9.68H3.98a.94.94 0 0 1-.9-.68L.1 3.96a.78.78 0 0 1 .68-.82z"
        fill="#2684FF"
      />
      <path
        d="M16.28 8.58H7.72l.9 5.38h6.76l-.9-5.38zM14.1 16.2H9.9l.45 2.7h3.3l-.45-2.7z"
        fill="#fff"
      />
    </svg>
  );
}

function SpotifyIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.52 17.35c-.22.36-.68.48-1.04.26-2.85-1.74-6.44-2.14-10.67-1.17-.41.09-.81-.17-.9-.58-.09-.41.17-.81.58-.9 4.56-1.04 8.53-.58 11.74 1.32.36.22.48.68.29 1.07zm1.47-3.27c-.27.44-.84.58-1.28.31-3.26-2-8.24-2.58-12.1-1.41-.49.15-1.01-.13-1.16-.62-.15-.49.13-1.01.62-1.16 4.42-1.34 9.88-.68 13.56 1.62.44.27.58.84.36 1.26zm.13-3.41C14.19 8.66 8.33 8.46 4.86 9.67c-.59.18-1.21-.15-1.39-.74-.18-.59.15-1.21.74-1.39 3.92-1.19 10.4-.96 14.14 1.56.53.32.7 1 .38 1.53-.32.53-1 .7-1.53.38z"
        fill="#1DB954"
      />
    </svg>
  );
}

function TwitchIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M2.15 0 1 4.6v14.25h5.5V24l3.85-3.85h5.77L22.4 12V0H2.15zm19.25 11.17-4.62 4.62H9.88l-3.27 3.27v-3.27H4.6V2.15h16.8v8.02z"
        fill="#9146FF"
      />
      <path d="M15.55 5.77v6.46h2.3V5.77h-2.3zm-5.77 0v6.46h2.3V5.77H9.78z" fill="#fff" />
    </svg>
  );
}

/** Full catalog — pick ids via `providerIds` or `preset` on `AuthSocialProviders`. */
export const AUTH_OAUTH_PROVIDER_CATALOG: Record<AuthOAuthProviderId, AuthOAuthProviderDefinition> =
  {
    google: { id: 'google', label: 'Google', Icon: GoogleIcon },
    github: { id: 'github', label: 'GitHub', Icon: GitHubIcon },
    microsoft: { id: 'microsoft', label: 'Microsoft', Icon: MicrosoftIcon },
    apple: { id: 'apple', label: 'Apple', Icon: AppleIcon },
    facebook: { id: 'facebook', label: 'Facebook', Icon: FacebookIcon },
    linkedin: { id: 'linkedin', label: 'LinkedIn', Icon: LinkedInIcon },
    x: { id: 'x', label: 'X', Icon: XIcon },
    discord: { id: 'discord', label: 'Discord', Icon: DiscordIcon },
    slack: { id: 'slack', label: 'Slack', Icon: SlackIcon },
    amazon: { id: 'amazon', label: 'Amazon', Icon: AmazonIcon },
    gitlab: { id: 'gitlab', label: 'GitLab', Icon: GitLabIcon },
    bitbucket: { id: 'bitbucket', label: 'Bitbucket', Icon: BitbucketIcon },
    spotify: { id: 'spotify', label: 'Spotify', Icon: SpotifyIcon },
    twitch: { id: 'twitch', label: 'Twitch', Icon: TwitchIcon },
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
