import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, MailCheck } from 'lucide-react';
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
} from '@/components/ui';
import { AuthFormBrand } from '@/components/auth/auth-form-brand';
import { urls } from '@/routes/urls';

const schema = z.object({ email: z.string().email() });

type Values = z.infer<typeof schema>;

export default function ForgotPasswordPage() {
  const { t } = useTranslation();
  const [sent, setSent] = useState(false);
  const form = useForm<Values>({ resolver: zodResolver(schema), defaultValues: { email: '' } });

  return (
    <Card>
      <CardHeader className="space-y-1 text-center">
        <AuthFormBrand className="pb-2" />
        <CardTitle className="text-2xl">{t('pages.forgot.title', 'Reset your password')}</CardTitle>
        <CardDescription>
          {t('pages.forgot.subtitle', "Enter your email and we'll send you a reset link.")}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {sent ? (
          <div className="flex flex-col items-center gap-3 rounded-md border border-success-border bg-success-bg p-4 text-center">
            <MailCheck className="h-10 w-10 text-success-text" />
            <p className="text-sm text-success-text">
              {t('pages.forgot.sent', 'Check your inbox for the reset link.')}
            </p>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(() => setSent(true))} className="space-y-4">
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
              <Button type="submit" className="w-full">
                {t('actions:submit', 'Send reset link')}
              </Button>
            </form>
          </Form>
        )}
        <Link
          to={urls.auth.login}
          className="flex items-center justify-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          {t('pages.forgot.backToLogin', 'Back to login')}
        </Link>
      </CardContent>
    </Card>
  );
}
