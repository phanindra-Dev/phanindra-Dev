import { test, expect } from '@playwright/test';

// 01 - First test with assertion
test('First test with assertion', async ({ page }) => {
  await page.goto('https://www.w3schools.com/');
  await expect(page).toHaveTitle(/W3Schools Online Web Tutorials/);
});

// 02 - Web element interaction
test('Web element interaction', async ({ page }) => {
  await page.goto('https://www.w3schools.com/');

  // Wait for and interact with the "Try it Yourself" button
  const tryItButton = await page.getByRole('button', { name: 'Try it Yourself' }).first();
  await expect(tryItButton).toBeVisible();
  await tryItButton.click();

  // Fill the search field and click on the "Learn JavaScript" link
  const searchBox = await page.getByRole('textbox', { name: 'Search field' });
  await searchBox.fill('JavaScript');
  const jsLink = await page.getByRole('link', { name: 'Learn JavaScript' }).first();
  await expect(jsLink).toBeVisible();
  await jsLink.click();

  // Assert that the URL contains the word "javascript"
  await expect(page).toHaveURL(/javascript/);
});

// 03 - Text verification
test('Text verification', async ({ page }) => {
  await page.goto('https://www.w3schools.com/');

  // Verify the main heading and part of the description text
  const heading = page.locator('h1');
  await expect(heading).toHaveText('W3Schools Online Web Tutorials');
  
  const paragraph = page.locator('p');
  await expect(paragraph).toHaveText(/the world's largest web development/);
});

// 04 - Viewport / Browser window
test('Viewport browser window', async ({ page }) => {
  // Test for 1920x1080 resolution
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto('https://www.w3schools.com/');
  const { width, height } = await page.viewportSize();
  expect(width).toBe(1920);
  expect(height).toBe(1080);

  // Test for mobile resolution 375x667
  await page.setViewportSize({ width: 375, height: 667 });
  const { width: newWidth, height: newHeight } = await page.viewportSize();
  expect(newWidth).toBe(375);
  expect(newHeight).toBe(667);
});

// 05 - Screenshots, Videos, and Trace
test('Screenshots, Videos, and Trace', async ({ page, context }) => {
  await context.tracing.start({ screenshots: true, snapshots: true });

  await page.goto('https://www.w3schools.com/');

  // Take screenshots of the page and a specific header
  await page.screenshot({ path: 'screenshot.png' });
  await page.locator('h1').screenshot({ path: 'header-screenshot.png' });

  // Click on the "Learn JavaScript" link and save a video of the session
  const jsLink = await page.getByRole('link', { name: 'Learn JavaScript' }).first();
  await jsLink.click();
  await page.video().saveAs('test-video.mp4');

  // Stop tracing and save the trace file
  await context.tracing.stop({ path: 'trace.zip' });
});

// 06 - Codegen record and play
test('Codegen record and play', async ({ page }) => {
  await page.goto('https://www.w3schools.com/');

  // Fill the search field with 'JavaScript' and click on "Learn JavaScript"
  const searchBox = await page.getByRole('textbox', { name: 'Search field' });
  await searchBox.fill('JavaScript');
  const jsLink = await page.getByRole('link', { name: 'Learn JavaScript' }).first();
  await jsLink.click();

  // Assert that the URL contains the word "javascript"
  await expect(page).toHaveURL(/javascript/);
});

// 07 - Handle Alerts (JavaScript Alerts)
test('Handle Alerts', async ({ page }) => {
  await page.goto('https://www.w3schools.com/js/tryit.asp?filename=tryjs_alert');

  // Wait for alert and confirm the message
  page.on('dialog', async dialog => {
    expect(dialog.message()).toBe('I am an alert box!');
    await dialog.accept();
  });

  // Click the button inside the iframe to trigger the alert
  const iframeButton = page.frameLocator('iframe').locator('button');
  await iframeButton.click();

  // Wait a short period to ensure alert is handled properly
  await page.waitForTimeout(500);
});

// 08 - DOM interaction with Playwright
test('DOM interaction with Playwright', async ({ page }) => {
  await page.goto('https://www.w3schools.com/');

  // Ensure the main heading text is correct
  const heading = page.locator('h1');
  await expect(heading).toHaveText('W3Schools Online Web Tutorials');
});
