import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
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
import { SPRING } from '@/lib/motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { urls } from '@/routes/urls';
import { AuthFormBrand } from '@/components/auth/auth-form-brand';
import { AuthSocialProviders } from '@/components/auth/auth-social-providers';
import { setAuthSession } from '@/lib/auth-session';

type LoginValues = { email: string; password: string };

export default function LoginPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const reduced = useReducedMotion();
  const form = useForm<LoginValues>({
    defaultValues: { email: '', password: '' },
  });

  const goToDashboard = () => {
    setAuthSession();
    navigate(urls.app.dashboard);
  };

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, scale: 0.96, y: 8 }}
      animate={reduced ? undefined : { opacity: 1, scale: 1, y: 0 }}
      transition={SPRING.soft}
    >
      <Card>
        <CardHeader className="space-y-1 text-center">
          <AuthFormBrand className="pb-2" />
          <CardTitle className="text-2xl">{t('pages.login.title', 'Welcome back')}</CardTitle>
          <CardDescription>
            {t('pages.login.subtitle', 'Sign in to continue your learning journey.')}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <AuthSocialProviders intent="signin" oauthFirst />
          <Separator />
          <Form {...form}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                goToDashboard();
              }}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="you@example.com"
                        autoComplete="email"
                        {...field}
                      />
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
                    <div className="flex items-center justify-between">
                      <FormLabel>Password</FormLabel>
                      <Link
                        to={urls.auth.forgot}
                        className="text-xs text-primary underline-offset-4 hover:underline"
                      >
                        {t('pages.login.forgotPassword', 'Forgot password?')}
                      </Link>
                    </div>
                    <FormControl>
                      <Input type="password" autoComplete="current-password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                {t('actions:submit', 'Sign in')}
              </Button>
            </form>
          </Form>
          <Separator />
          <p className="text-center text-sm text-muted-foreground">
            {t('pages.login.noAccount', "Don't have an account?")}{' '}
            <Link to={urls.auth.register} className="font-medium text-primary hover:underline">
              {t('pages.login.signUp', 'Sign up')}
            </Link>
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
