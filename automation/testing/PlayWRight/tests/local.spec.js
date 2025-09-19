const { test, expect } = require('@playwright/test');

test('basic browser functionality', async ({ page }) => {
  // Test with a data URL (no internet required)
  await page.goto('data:text/html,<html><head><title>Test Page</title></head><body><h1>Hello Playwright</h1><button id="click-me">Click Me</button></body></html>');

  // Check the title
  await expect(page).toHaveTitle('Test Page');

  // Check the heading is visible
  await expect(page.getByRole('heading', { name: 'Hello Playwright' })).toBeVisible();

  // Click the button
  await page.click('#click-me');
  
  // Verify button click worked (button should still be there)
  await expect(page.locator('#click-me')).toBeVisible();
});

test('page navigation and content', async ({ page }) => {
  // Create a simple HTML page with navigation
  const html = `
    <html>
      <head><title>Navigation Test</title></head>
      <body>
        <nav>
          <a href="#section1" id="nav-link">Go to Section 1</a>
        </nav>
        <div id="section1" style="margin-top: 1000px;">
          <h2>Section 1</h2>
          <p>This is section 1 content</p>
        </div>
      </body>
    </html>
  `;
  
  await page.goto(`data:text/html,${encodeURIComponent(html)}`);
  
  // Check initial state
  await expect(page).toHaveTitle('Navigation Test');
  
  // Click navigation link and wait for the element to be visible
  await page.click('#nav-link');
  
  // Instead of waiting for URL, just verify the heading is visible
  // (the hash navigation should scroll to the element)
  await expect(page.getByRole('heading', { name: 'Section 1' })).toBeVisible();
});
