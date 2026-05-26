import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Separator,
} from '@/components/ui';
import { AuthFormBrand } from '@/components/auth/auth-form-brand';
import { AuthSocialProviders } from '@/components/auth/auth-social-providers';
import { urls } from '@/routes/urls';
import { setAuthSession } from '@/lib/auth-session';

type RegisterValues = { name: string; email: string; password: string; confirm: string };

export default function RegisterPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const form = useForm<RegisterValues>({
    defaultValues: { name: '', email: '', password: '', confirm: '' },
  });

  const goToDashboard = () => {
    setAuthSession();
    navigate(urls.app.dashboard);
  };

  return (
    <Card>
      <CardHeader className="space-y-1 text-center">
        <AuthFormBrand className="pb-2" />
        <CardTitle className="text-2xl">{t('pages.register.title', 'Create an account')}</CardTitle>
        <CardDescription>
          {t('pages.register.subtitle', 'Join thousands of learners today.')}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <AuthSocialProviders intent="signup" oauthFirst />
        <Separator />
        <Form {...form}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              goToDashboard();
            }}
            className="space-y-3"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full name</FormLabel>
                  <FormControl>
                    <Input placeholder="Jane Doe" autoComplete="name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" autoComplete="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" autoComplete="new-password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm password</FormLabel>
                  <FormControl>
                    <Input type="password" autoComplete="new-password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              {t('actions:continue', 'Create account')}
            </Button>
          </form>
        </Form>
        <Separator />
        <p className="text-center text-sm text-muted-foreground">
          {t('pages.register.haveAccount', 'Already have an account?')}{' '}
          <Link to={urls.auth.login} className="font-medium text-primary hover:underline">
            {t('pages.register.signIn', 'Sign in')}
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
