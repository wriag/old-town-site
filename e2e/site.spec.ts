import { test, expect } from '@playwright/test';

test('page has correct title', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle('Old Town Free Enterprise District');
});

test('page has dark background', async ({ page }) => {
  await page.goto('/');
  const bg = await page.evaluate(() =>
    getComputedStyle(document.body).backgroundColor
  );
  // #0a0a0a = rgb(10, 10, 10)
  expect(bg).toBe('rgb(10, 10, 10)');
});
