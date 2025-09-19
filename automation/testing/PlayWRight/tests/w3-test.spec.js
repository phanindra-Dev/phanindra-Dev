import { test, expect } from '@playwright/test';

test('Check 200 OK status code', async ({ page }) => {
  const response = await page.goto('https://www.w3schools.com/');
  expect(response?.status()).toBe(200);
});

test('Check 404 Not Found status code', async ({ page }) => {
  const response = await page.goto('https://www.w3schools.com/shh jhb hj');
  expect(response?.status()).toBe(404);
});


test(' has logo ',async({page}) => {
    await page.goto('https://www.w3schools.com/');
    await page.getByRole('link',{name : 'Home link'}).click();
    await expect(page.getByRole('heading', { name: 'Learn to Code' })).toBeVisible();
});

test( ' login ',async({page})=>{
    await page.goto('https://www.w3schools.com');
    const signin = page.getByRole('button', { name: 'Sign in to your account' });
    await signin.click();
    await page.getByRole('textbox', { name: 'Email' }).click();
    await page.getByRole('textbox', { name: 'Email' }).fill('phanindrajaychand0@gmail.com');

    await expect(page.getByRole('textbox', { name: 'Email' })).toHaveValue('phanindrajaychand0@gmail.com');
    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill('Hello@panda123');
    await page.getByRole('button', { name: 'Sign In', exact: true }).click();
});


test('drop Down', async ({ page }) => {
    await page.goto('https://www.w3schools.com/');
    
    const tutorialsButton = page.getByRole('button', { name: 'Tutorials' });
    await expect(tutorialsButton).toBeVisible();
    await tutorialsButton.click();

    const referencesButton = page.getByRole('button', { name: 'References' });
    await expect(referencesButton).toBeVisible();
    await referencesButton.click();

    const exercisesButton = page.getByRole('button', { name: 'Exercises' });
    await expect(exercisesButton).toBeVisible();
    await exercisesButton.click();

    const certificatesButton = page.getByRole('button', { name: 'Certificates' });
    await expect(certificatesButton).toBeVisible();
    await certificatesButton.click();
});

test(' search ',async({page})=>{
    await page.goto('https://www.w3schools.com/');
    await page.getByRole('textbox', { name: 'Search field' }).click();
    await page.getByRole('textbox', { name: 'Search field' }).fill('java');

    await page.getByRole('link', { name: 'JAVA Tutorial', exact: true }).click();
});


test(' study ',async({page})=>{
    await page.goto('https://www.w3schools.com/');
    await page.getByRole('textbox', { name: 'Search field' }).click();
    await page.getByRole('textbox', { name: 'Search field' }).fill('java');
    await page.getByRole('link', { name: 'JAVA Tutorial', exact: true }).click();
    await page.getByRole('link', { name: 'Start learning Java now »' }).click();

    await expect(page).toHaveURL('https://www.w3schools.com/java/java_intro.asp');    

    await page.getByRole('link', { name: 'Next ❯' }).first().click();
    await page.getByRole('link', { name: 'Next ❯' }).first().click();
    await page.getByRole('link', { name: 'Next ❯' }).first().click();
    await page.getByRole('link', { name: 'Next ❯' }).first().click();
    await page.getByRole('link', { name: 'Next ❯' }).first().click();
    
  await page.getByRole('link', { name: 'Next ❯' }).first().click();
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Try it Yourself »' }).first().click();
  const page1 = await page1Promise;
  await page1.getByText('"Hello World"', { exact: true }).click();
  for(let i=0;i<7;i++){
    await page1.getByRole('textbox').press('ArrowRight');
  }
  for(let i=0;i<12;i++){
    await page1.getByRole('textbox').press('Backspace');
  }
  await page1.getByRole('textbox').press('CapsLock');
  await page1.getByRole('textbox').fill('Phani');
  await page1.getByRole('button', { name: 'Run ❯' }).click();
});

test('Text verification', async ({ page }) => {
    await page.goto('https://www.w3schools.com/');

    const heading = page.locator('h1', { hasText: 'HTML' });
    await expect(heading).toHaveText('HTML');

    const subheading = page.locator('h3', { hasText: "With the world's largest web developer site." });
    await expect(subheading).toHaveText("With the world's largest web developer site.", { trim: true });
    
});

test('Text verification with custom viewport', async ({ page }) => {
  await page.setViewportSize({ width: 800, height: 720 });

  await page.goto('https://www.w3schools.com/');

  const heading = page.locator('h1', { hasText: 'HTML' });
  await expect(heading).toHaveText('HTML');

  const subheading = page.locator('h3', { hasText: "With the world's largest web developer site."});
  await expect(subheading).toHaveText("With the world's largest web developer site.", { trim: true }); 
});

test('Filter all that contain Learn', async ({ page }) => {
  await page.goto('https://www.w3schools.com/');

  const links = await page.$$('a');

  const filteredLinks = await Promise.all(
    links.map(async (link) => {
      const text = await link.textContent();
      return text && text.includes('Learn') ? link : null;
    })
  );

  const finalLinks = filteredLinks.filter(Boolean);
  let count = 0;
  for (const link of finalLinks) {
    const text = await link.textContent();
    count++;
    console.log('Matched link:', text?.trim());
  }
  console.log(count);
  
});

test('Login with multiple credentials', async ({ page }) => {
  const credentials = [
    { username: 'phanindrajaychand0@gmail.com', password: 'Hello@panda123' },
    { username: 'testuser@example.com', password: 'Password123' },
    { username: 'john.doe@example.com', password: 'Doe@2025' }
  ];

  for (const { username, password } of credentials) {
    await page.goto('https://www.w3schools.com');
    
    const signin = page.getByRole('button', { name: 'Sign in to your account' });
    await signin.click();

    const emailField = page.getByRole('textbox', { name: 'Email' });
    await emailField.click();
    await emailField.fill(username);

    await expect(emailField).toHaveValue(username);

    const passwordField = page.getByRole('textbox', { name: 'Password' });
    await passwordField.click();
    await passwordField.fill(password);

    const signInButton = page.getByRole('button', { name: 'Sign In', exact: true });
    await signInButton.click();

    
    await expect(page).toHaveURL('https://www.w3schools.com/'); 

    console.log(`Logged in with: ${username}`);
  }
});

test('Screenshots and Trace', async ({ page, context }) => {
  await context.tracing.start({ screenshots: true, snapshots: true });

  await page.goto('https://www.w3schools.com/');

  await page.screenshot({ path: 'screenshot.png' });
  
  await page.locator('h1.learntocodeh1').screenshot({ path: 'header-screenshot.png' });

  const jsLink = await page.getByRole('link', { name: 'Learn JavaScript' }).first();
  await jsLink.click();

  await context.tracing.stop({ path: 'trace.zip' });
});
