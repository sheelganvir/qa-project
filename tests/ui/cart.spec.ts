import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.getByTestId('username').fill('standard_user');
  await page.getByTestId('password').fill('secret_sauce');
  await page.getByTestId('login-button').click();
});

test('TC04 add backpack to cart', { tag: ['@sanity', '@regression'] }, async ({ page }) => {
  await page.getByTestId('add-to-cart-sauce-labs-backpack').click();
  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
});