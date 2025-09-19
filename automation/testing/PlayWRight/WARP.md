# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a Playwright end-to-end testing project. Playwright is a framework for Web Testing and Automation that allows testing across Chromium, Firefox, and WebKit with a single API.

## Architecture

### Key Components
- **`playwright.config.js`**: Main configuration file defining test settings, browser projects, and global options
- **`tests/`**: Contains all test files (`.spec.js` files)
- **Test Reports**: Generated in `playwright-report/` and `test-results/` directories
- **Browser Binaries**: Automatically managed by Playwright in system cache

### Test Structure
- Tests use the Page Object Model pattern when dealing with complex applications
- Each test file should focus on a specific feature or page
- Tests run in parallel by default across multiple workers
- Cross-browser testing is configured for Chromium, Firefox, and WebKit

## Commands

### Core Testing Commands
```bash
npm test                    # Run all tests headlessly
npm run test:headed         # Run tests with browser UI visible
npm run test:ui             # Launch Playwright Test UI for interactive testing
npm run test:debug          # Run tests in debug mode with breakpoints
npm run test:report         # Open the HTML test report
```

### Direct Playwright Commands
```bash
npx playwright test                                    # Run all tests
npx playwright test tests/example.spec.js            # Run specific test file
npx playwright test --project=chromium               # Run tests in specific browser
npx playwright test --grep "login"                   # Run tests matching pattern
npx playwright test --headed                         # Run with browser UI
npx playwright test --debug                          # Debug mode
npx playwright show-report                           # Show test report
npx playwright codegen                               # Generate test code by recording interactions
```

### Browser Management
```bash
npx playwright install                               # Install/update browser binaries
npx playwright install chromium                      # Install specific browser
npx playwright install-deps                          # Install system dependencies
```

## Development Workflow

### Writing Tests
1. Create new test files in the `tests/` directory with `.spec.js` extension
2. Import `{ test, expect }` from `@playwright/test`
3. Use `test()` function to define individual test cases
4. Use `page` fixture to interact with browser pages
5. Use `expect()` for assertions

### Test Organization
- Group related tests in the same file
- Use `test.describe()` to create test suites
- Use `test.beforeEach()` and `test.afterEach()` for setup/teardown
- Place reusable code in separate utility files or page object classes

### Configuration Customization
- Modify `playwright.config.js` to adjust:
  - Test directory location
  - Browser projects (add/remove browsers)
  - Base URL for application under test
  - Global timeout settings
  - Reporter configuration
  - Retry logic

### Debugging Tests
1. Use `npm run test:debug` to run in debug mode
2. Add `await page.pause()` in test code for manual debugging
3. Use browser developer tools when running headed tests
4. Check `test-results/` folder for screenshots and videos of failed tests
5. Use Playwright Inspector with `--debug` flag

### CI/CD Considerations
- Tests automatically retry twice on CI environments
- Parallel execution is disabled on CI for stability
- HTML reporter generates comprehensive test reports
- Failed test artifacts (screenshots, videos, traces) are preserved

## Project Structure

```
PlayWRight/
├── tests/                 # Test files (.spec.js)
├── playwright.config.js   # Main configuration
├── package.json           # Dependencies and scripts
├── playwright-report/     # Generated HTML reports
└── test-results/         # Test artifacts (screenshots, videos)
```

## Browser Support

This project is configured to test against:
- **Chromium** (Google Chrome engine)
- **Firefox** (Mozilla Firefox)
- **WebKit** (Safari engine)

Mobile viewports and additional browser channels can be enabled in the configuration as needed.