import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link } from 'react-router-dom';
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
  toast,
} from '@/components/ui';
import { AuthSocialProviders } from '@/components/auth/auth-social-providers';
import { urls } from '@/routes/urls';

const schema = z
  .object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(8),
    confirm: z.string().min(8),
  })
  .refine((v) => v.password === v.confirm, {
    path: ['confirm'],
    message: 'Passwords do not match',
  });

type RegisterValues = z.infer<typeof schema>;

export default function RegisterPage() {
  const { t } = useTranslation();
  const form = useForm<RegisterValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', email: '', password: '', confirm: '' },
  });

  const onSubmit = (values: RegisterValues) => {
    toast.success(`Account created for ${values.email} (demo)`);
    form.reset();
  };

  return (
    <Card>
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl">{t('pages.register.title', 'Create an account')}</CardTitle>
        <CardDescription>
          {t('pages.register.subtitle', 'Join thousands of learners today.')}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <AuthSocialProviders intent="signup" oauthFirst />
        <Separator />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
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
