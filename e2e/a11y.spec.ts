import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const A11Y_ROUTES = [
  { name: 'landing', path: '/landing' },
  { name: 'login', path: '/auth/login' },
  { name: 'dashboard', path: '/app/dashboard' },
  { name: 'saas-analytics', path: '/app/pages/saas/analytics' },
] as const;

for (const { name, path } of A11Y_ROUTES) {
  test(`no serious/critical a11y violations on ${name}`, async ({ page }) => {
    await page.goto(path);
    await page.waitForLoadState('networkidle');

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    const blocking = results.violations.filter(
      (v) => v.impact === 'critical' || v.impact === 'serious',
    );

    expect(
      blocking,
      blocking.map((v) => `${v.id}: ${v.help} (${v.nodes.length} nodes)`).join('\n'),
    ).toEqual([]);
  });
}
