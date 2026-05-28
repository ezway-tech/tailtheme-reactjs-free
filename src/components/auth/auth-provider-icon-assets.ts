import googleIcon from '@/assets/svg/google.svg';
import githubIcon from '@/assets/svg/github.svg';
import microsoftIcon from '@/assets/svg/microsoft.svg';
import appleIcon from '@/assets/svg/apple.svg';
import facebookIcon from '@/assets/svg/facebook.svg';
import linkedinIcon from '@/assets/svg/linkedin.svg';
import xIcon from '@/assets/svg/x.svg';
import discordIcon from '@/assets/svg/discord.svg';
import slackIcon from '@/assets/svg/slack.svg';
import amazonIcon from '@/assets/svg/amazon.svg';
import gitlabIcon from '@/assets/svg/gitlab.svg';
import bitbucketIcon from '@/assets/svg/bitbucket.svg';
import spotifyIcon from '@/assets/svg/spotify.svg';
import twitchIcon from '@/assets/svg/twitch.svg';

export type AuthOAuthProviderIcon = string;

export const AUTH_OAUTH_PROVIDER_ICON_COMPONENTS = {
  google: googleIcon,
  github: githubIcon,
  microsoft: microsoftIcon,
  apple: appleIcon,
  facebook: facebookIcon,
  linkedin: linkedinIcon,
  x: xIcon,
  discord: discordIcon,
  slack: slackIcon,
  amazon: amazonIcon,
  gitlab: gitlabIcon,
  bitbucket: bitbucketIcon,
  spotify: spotifyIcon,
  twitch: twitchIcon,
} as const satisfies Record<string, AuthOAuthProviderIcon>;
