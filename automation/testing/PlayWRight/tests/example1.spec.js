import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://leetcode.com/');

  // Expect a title "to contain" a substring.
  await page.getByRole('img', { name: 'Leetcode' }).click();
});

test('get started link', async ({ page }) => {

  // Click the get started link.
   
  await page.goto('https://leetcode.com/');
  await page.getByRole('link', { name: 'Create Account' }).click();
  await page.waitForSelector('#initial-loading', { state: 'detached' }).catch(() => {});


  await page.getByRole('textbox', { name: 'Username' }).click();
  await page.getByRole('textbox', { name: 'Username'}).fill("Phani");
  await page.getByRole('textbox', { name: 'Password', exact: true }).click();
  await page.getByRole('textbox', { name: 'Confirm password' }).click();
  await page.getByRole('textbox', { name: 'E-mail address' }).click();
  await page.getByRole('button', { name: 'Sign Up' }).click();

  // Expects page to have a heading with the name of Installation.
  
});