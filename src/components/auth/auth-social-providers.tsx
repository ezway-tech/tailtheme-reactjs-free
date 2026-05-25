import type { ComponentType, SVGProps } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, toast } from '@/components/ui';

type AuthIntent = 'signin' | 'signup';

interface ProviderMeta {
  id: 'google' | 'github' | 'microsoft';
  label: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
}

const PROVIDERS: ProviderMeta[] = [
  { id: 'google', label: 'Google', Icon: GoogleIcon },
  { id: 'github', label: 'GitHub', Icon: GitHubIcon },
  { id: 'microsoft', label: 'Microsoft', Icon: MicrosoftIcon },
];

interface AuthSocialProvidersProps {
  intent: AuthIntent;
  /** Stack provider buttons in one column (use inside narrow split-form columns). */
  stackProviders?: boolean;
  /** When true, label reads as the primary path (OAuth before email/password). */
  oauthFirst?: boolean;
}

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

export function AuthSocialProviders({
  intent,
  stackProviders = false,
  oauthFirst = false,
}: AuthSocialProvidersProps) {
  const { t } = useTranslation();
  const actionLabel = intent === 'signin' ? 'Sign in' : 'Sign up';

  const handleProviderClick = (provider: ProviderMeta) => {
    toast.info(`${actionLabel} with ${provider.label} is coming soon (OAuth2 placeholder).`);
  };

  const gridClass = stackProviders
    ? 'grid grid-cols-1 gap-2'
    : 'grid grid-cols-1 gap-2 sm:grid-cols-3';

  const heading = oauthFirst
    ? t('pages.auth.socialLabelOauthFirst', 'Continue with')
    : t('pages.auth.socialLabel', 'Or continue with');

  return (
    <div className="space-y-2">
      <p className="text-center text-xs uppercase tracking-wide text-muted-foreground">{heading}</p>
      <div className={gridClass}>
        {PROVIDERS.map((provider) => (
          <Button
            key={provider.id}
            type="button"
            variant="outline"
            className="w-full"
            onClick={() => handleProviderClick(provider)}
          >
            <provider.Icon className="h-4 w-4" />
            <span>{provider.label}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}
