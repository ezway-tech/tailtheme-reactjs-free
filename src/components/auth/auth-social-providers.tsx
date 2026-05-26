import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui';
import {
  type AuthOAuthProviderId,
  type AuthOAuthProviderPreset,
  resolveAuthOAuthProviders,
} from '@/components/auth/auth-provider-icons';
import { urls } from '@/routes/urls';
import { setAuthSession } from '@/lib/auth-session';
import { cn } from '@/lib/utils';

type AuthIntent = 'signin' | 'signup';

interface AuthSocialProvidersProps {
  intent?: AuthIntent;
  /**
   * Explicit provider list (wins over `preset`). Example:
   * `providerIds={['google', 'apple', 'github']}`
   */
  providerIds?: readonly AuthOAuthProviderId[];
  /** Named bundle from `AUTH_OAUTH_PROVIDER_PRESETS` in `auth-provider-icons.tsx`. */
  preset?: AuthOAuthProviderPreset;
  /** Stack provider buttons in one column (use inside narrow split-form columns). */
  stackProviders?: boolean;
  /** When true, label reads as the primary path (OAuth before email/password). */
  oauthFirst?: boolean;
}

function providerGridClass(count: number, stackProviders: boolean): string {
  if (stackProviders) return 'grid grid-cols-1 gap-2';
  if (count <= 3) return 'grid grid-cols-1 gap-2 sm:grid-cols-3';
  if (count === 4) return 'grid grid-cols-1 gap-2 sm:grid-cols-2';
  return 'grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3';
}

export function AuthSocialProviders({
  providerIds,
  preset = 'default',
  stackProviders = false,
  oauthFirst = false,
}: AuthSocialProvidersProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const providers = resolveAuthOAuthProviders({ providerIds, preset });

  const heading = oauthFirst
    ? t('pages.auth.socialLabelOauthFirst', 'Continue with')
    : t('pages.auth.socialLabel', 'Or continue with');

  return (
    <div className="space-y-2">
      <p className="text-center text-xs uppercase tracking-wide text-muted-foreground">{heading}</p>
      <div className={cn(providerGridClass(providers.length, stackProviders))}>
        {providers.map((provider) => (
          <Button
            key={provider.id}
            type="button"
            variant="outline"
            className="w-full"
            onClick={() => {
              setAuthSession();
              navigate(urls.app.dashboard);
            }}
          >
            <provider.Icon className="h-4 w-4 shrink-0" />
            <span>{provider.label}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}
