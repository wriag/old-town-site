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

test('nav is sticky and has all section links', async ({ page }) => {
  await page.goto('/');
  const nav = page.locator('nav');
  await expect(nav).toBeVisible();
  await expect(page.locator('nav a[href="#problem"]')).toBeVisible();
  await expect(page.locator('nav a[href="#proposal"]')).toBeVisible();
  await expect(page.locator('nav a[href="#why"]')).toBeVisible();
  await expect(page.locator('nav a[href="#faq"]')).toBeVisible();
  await expect(page.locator('nav a[href="#paper"]').first()).toBeVisible();
  await expect(page.locator('nav a[href="#press"]')).toBeVisible();
});

test('mobile nav opens and closes', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/');
  const hamburger = page.locator('button[aria-label="Open menu"]');
  await expect(hamburger).toBeVisible();
  await hamburger.click();
  await expect(page.locator('button[aria-label="Close menu"]')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.locator('button[aria-label="Open menu"]')).toBeVisible();
});
