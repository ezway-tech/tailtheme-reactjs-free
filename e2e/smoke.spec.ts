import { test, expect } from '@playwright/test';

test.describe('Public smoke', () => {
  test('landing page loads', async ({ page }) => {
    await page.goto('/landing');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });

  test('login page loads', async ({ page }) => {
    await page.goto('/auth/login');
    await expect(page.getByRole('heading', { name: /welcome back/i })).toBeVisible();
  });
});

test.describe('App smoke', () => {
  test('dashboard loads', async ({ page }) => {
    await page.goto('/app/dashboard');
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
  });

  test('saas analytics loads', async ({ page }) => {
    await page.goto('/app/pages/saas/analytics');
    await expect(page.getByRole('heading', { name: 'Analytics' })).toBeVisible();
  });

  test('project kanban loads', async ({ page }) => {
    await page.goto('/app/pages/project/kanban');
    await expect(page.getByRole('heading', { name: /kanban board/i })).toBeVisible();
  });
});
