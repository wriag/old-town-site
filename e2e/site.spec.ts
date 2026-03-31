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

test('hero renders headline and CTAs', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1')).toContainText("Old Town Doesn't Need Another Study");
  await expect(page.locator('a[href="#proposal"]').first()).toBeVisible();
  await expect(page.locator('a[href="#paper"]').first()).toBeVisible();
});

test('problem section shows tax stats and table', async ({ page }) => {
  await page.goto('/');
  const section = page.locator('#problem');
  await expect(section).toBeVisible();
  await expect(section.locator('text=5.6%')).toBeVisible();
  await expect(section.locator('th:has-text("Authority")')).toBeVisible();
  await expect(section.locator('td:has-text("2.6%")')).toBeVisible();
});

test('proposal section shows what changes and what stays', async ({ page }) => {
  await page.goto('/');
  const section = page.locator('#proposal');
  await expect(section).toBeVisible();
  await expect(section.locator('text=What Changes')).toBeVisible();
  await expect(section.locator('text=What Stays')).toBeVisible();
  await expect(section.locator('text=10-year commitment')).toBeVisible();
});

test('why it works shows three country cards', async ({ page }) => {
  await page.goto('/');
  const section = page.locator('#why');
  await expect(section).toBeVisible();
  await expect(section.locator('text=Ireland')).toBeVisible();
  await expect(section.locator('h3:has-text("Nordic")')).toBeVisible();
  await expect(section.locator('text=Estonia')).toBeVisible();
});

test('FAQ: first item is open by default', async ({ page }) => {
  await page.goto('/');
  const section = page.locator('#faq');
  await expect(section).toBeVisible();
  const firstTrigger = section.locator('button[role="button"]').first();
  await expect(firstTrigger).toHaveAttribute('aria-expanded', 'true');
});

test('FAQ: clicking closed item opens it', async ({ page }) => {
  await page.goto('/');
  const section = page.locator('#faq');
  const secondTrigger = section.locator('button[role="button"]').nth(1);
  await expect(secondTrigger).toHaveAttribute('aria-expanded', 'false');
  await secondTrigger.click();
  await expect(secondTrigger).toHaveAttribute('aria-expanded', 'true');
});
