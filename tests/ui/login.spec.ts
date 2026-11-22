import { test, expect } from '@playwright/test';

test.describe('Login', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('TC01 valid user can log in', { tag: ['@sanity', '@regression'] }, async ({ page }) => {
    await page.getByTestId('username').fill('standard_user');
    await page.getByTestId('password').fill('secret_sauce');
    await page.getByTestId('login-button').click();

    await expect(page).toHaveURL(/inventory\.html/);
    await expect(page.locator('.title')).toHaveText('Products');
  });

  test('TC02 locked out user sees error', { tag: '@regression' }, async ({ page }) => {
    await page.getByTestId('username').fill('locked_out_user');
    await page.getByTestId('password').fill('secret_sauce');
    await page.getByTestId('login-button').click();

    await expect(page.getByTestId('error')).toContainText('locked out');
  });

  test('TC03 wrong password shows error', { tag: '@regression' }, async ({ page }) => {
    await page.getByTestId('username').fill('standard_user');
    await page.getByTestId('password').fill('wrong123');
    await page.getByTestId('login-button').click();

    await expect(page.getByTestId('error')).toContainText('do not match');
  });
});