import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://leetcode.com/');
  await page.getByRole('link', { name: 'Create Account' }).click();
  await page.getByRole('textbox', { name: 'Username' }).click();
  await page.getByRole('textbox', { name: 'Username' }).fill('phanindra');
  await page.getByRole('textbox', { name: 'Password', exact: true }).click();
  await page.getByRole('textbox', { name: 'Confirm password' }).click();
  await page.getByRole('textbox', { name: 'E-mail address' }).click();
});