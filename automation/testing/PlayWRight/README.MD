Playwright Test Suite for W3Schools

This repository contains an end-to-end test suite written using Playwright for testing the functionality of the W3Schools website. The tests validate critical aspects of the site, including status codes, UI interactions, login workflows, search functionality, and page content verification. Additionally, it includes tests for debugging, such as capturing screenshots and tracing.

Table of Contents

Overview

Tests Included

Status Code Checks

UI Interactions

Login Flow

Text Verification

Search Functionality

Pagination and Learning Flow

Screenshots & Trace Collection

Multiple Credentials Login

Setup

Run the Tests

Screenshots and Tracing

Contributing

License

Overview

This test suite provides a set of automated tests designed to ensure that the W3Schools website functions correctly across different interactions. Using Playwright, a modern automation library, these tests simulate user behavior and validate the responsiveness and correctness of elements on the site.

Tests cover various scenarios such as checking status codes, verifying UI elements (like logos, links, and buttons), performing search functionality, validating text content, simulating logins, and capturing detailed traces for debugging.

Tests Included
1. Status Code Checks

Purpose: Verifies the HTTP status codes for valid and invalid URLs.

Tests:

Check 200 OK Status: Ensures that the main W3Schools homepage loads with a 200 OK status code.

Check 404 Not Found: Tests a non-existing URL (https://www.w3schools.com/shh jhb hj) to ensure the page returns a 404 error.

2. UI Interactions

Purpose: Validates UI element interactions such as visibility and clickability.

Tests:

Logo Visibility: Ensures the "Home" link and "Learn to Code" heading are visible after clicking on the homepage logo.

Dropdown Menus: Verifies that the dropdown buttons for "Tutorials", "References", "Exercises", and "Certificates" are visible and clickable.

Sign In: Simulates logging in with a user account, filling in the email and password fields, and clicking the sign-in button.

3. Login Flow

Purpose: Tests the login functionality using different user credentials.

Test:

Login: Simulates the process of logging in with predefined credentials. Ensures that after logging in, the user is redirected to the homepage.

4. Text Verification

Purpose: Verifies that specific text content appears as expected on the website.

Tests:

HTML Heading and Subheading: Ensures the page contains the correct heading ("HTML") and subheading ("With the world's largest web developer site").

Custom Viewport: Verifies text content on the homepage when the viewport is resized to 800x720 pixels.

5. Search Functionality

Purpose: Tests the search bar to ensure it returns the correct results.

Test:

Search for Java Tutorial: Simulates typing "java" into the search field and clicking on the "JAVA Tutorial" link in the search results.

6. Pagination and Learning Flow

Purpose: Tests the flow of the tutorial, checking the next page navigation and user interaction.

Test:

Study Java Tutorial: Follows the tutorial for Java, clicking through the "Next" links multiple times and verifying the URL changes. Then, it clicks on "Try it Yourself" to open an interactive editor. In the editor, it simulates typing and running code.

7. Screenshots & Trace Collection

Purpose: Captures screenshots and generates a trace for debugging purposes.

Test:

Capture Screenshots: Takes screenshots of the homepage and specific UI elements like the "Learn to Code" header.

Generate Trace: Captures a detailed trace of the interactions, which can be analyzed for debugging. The trace is saved as a trace.zip file.

8. Multiple Credentials Login

Purpose: Tests logging in with multiple sets of credentials to verify the functionality for different users.

Test:

Login with Multiple Credentials: Automates the login process for a list of users and verifies successful login by checking the URL after each login.

Setup

To get started, you'll need to set up the Playwright testing framework.

1. Install Playwright

If you don’t have Playwright installed yet, you can install it by running the following command:

npm install @playwright/test


This will install the Playwright package and the required browser binaries.

2. Install Dependencies

You can install the required dependencies using npm:

npm install

Run the Tests

After setting up the repository, you can run the tests using the Playwright test runner. To execute the tests, run the following command in your terminal:

npx playwright test


This command will run all the test cases sequentially, interacting with the W3Schools website and verifying that the functionality is working as expected.

Running Specific Tests

If you want to run specific tests, you can specify the test file or test name. For example, to run only the login tests:

npx playwright test login.spec.ts


Or run a single test by its name:

npx playwright test -g "Login with multiple credentials"

Screenshots and Tracing

Playwright allows you to capture screenshots during test execution. The following files will be generated:

screenshot.png: Screenshot of the homepage.

header-screenshot.png: Screenshot of the "Learn to Code" header.

In addition, Playwright can generate a trace file for debugging:

trace.zip: A ZIP file containing detailed traces of the test execution, including network requests, screenshots, and snapshots.

These files will be stored in the root directory of your project.

Contributing

Contributions are welcome! If you find any issues with the tests or want to suggest improvements, feel free to open an issue or submit a pull request.

Steps to Contribute:

Fork the repository.

Create a new branch.

Add your changes or tests.

Push your branch and submit a pull request.

License

This project is licensed under the MIT License.