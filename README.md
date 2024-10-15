
# PetClinic QA Automation

This project uses Playwright for automated testing along with Allure for generating detailed reports.

## Getting Started

### Prerequisites

1. **Node.js**: Make sure you have [Node.js](https://nodejs.org/) installed (version 18 or higher).
2. **Playwright Browsers**: Playwright requires browser binaries. You can install them by running the following command:

   ```bash
   npx playwright install
   ```

3. **Allure Commandline**: Install the Allure command-line tool to generate and view test reports. You can install it globally via npm:

   ```bash
   npm install -g allure-commandline
   ```

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Hlulani/petclinic-qa-automation.git
   cd petclinic-qa-automation
   ```

2. Install the required dependencies:

   ```bash
   npm install
   ```


### Running Tests

You can run tests using Playwright with various browsers, both headlessly or in headed mode. Below are the available scripts:

#### 1. Run All Tests (Chromium by default):

```bash
npm run test
```

This runs the tests with the Chromium browser in debug mode.

#### 2. Run Tests in Specific Browsers

You can run the tests in different browsers (Firefox, Chromium, WebKit) using the following commands:

- **Firefox**:
  
  ```bash
  npm run test:firefox
  ```

- **Chromium**:
  
  ```bash
  npm run test:chromium
  ```

- **WebKit**:
  
  ```bash
  npm run test:webkit
  ```

#### 3. Run Tests with Specific Reporters

You can run tests and output the results in different formats such as HTML, JSON, or Allure using these commands:

- **HTML Report**:

  ```bash
  npm run test:reporter:html
  ```

- **JSON Report**:

  ```bash
  npm run test:reporter:json
  ```

- **Allure Report**:

  ```bash
  npm run test:reporter:allure
  ```

### Allure Reporting

After running the tests with the Allure reporter, you can generate and open the Allure report using the following commands:

#### 1. Generate Allure Report

```bash
npm run test:allure:generate
```

This will generate the Allure report in the `./allure-report` directory.

#### 2. Open Allure Report

```bash
npm run test:allure:open
```

This will start a web server and open the Allure report in your default browser.

### Linting

You can run ESLint to check for any linting issues in your code:

```bash
npm run lint
```

This will run ESLint on all JavaScript files in the project and highlight any errors or warnings.

### Playwright Configuration

The Playwright configuration file (`playwright.config.js`) contains settings for browser devices, test timeouts, retries, parallelism, and reporting.

Key configurations:

- **Timeout**: 30 seconds per test.
- **Retries**: 1 retry on failure.
- **Browsers**: Chromium, Firefox, Mobile Chrome (Pixel 5), WebKit (Safari).
- **Reporting**: Uses Allure and Line reporters.
- **Screenshots**: Captured only on failure.
- **Videos**: Retained only on failure.
- **Tracing**: Enabled on the first retry.

### Running Tests in CI

### CI/CD Pipeline

This project has Git Workflow installed for automated test execution in a continuous integration/continuous deployment (CI/CD) pipeline.

I have added a JSON file containing a list of emails that are acceptable by the system for registration tests. If a job fails during the registration happy path test, it is recommended to re-run the job to ensure that a previously used email is not being used again.

Please note, since this project is for an interview, I acknowledge that in a real-world scenario, we would likely use test users that could potentially be whitelisted, avoiding such issues.


### Project Structure

- `tests/`: Contains the test files.
- `fixtures/`: Contains any test fixtures or utilities.
- `pages/`: Implements Page Object Models (POM) for structured interaction with the UI.
- `test-results/`: Stores test result artifacts, such as videos, screenshots, and traces.
- `allure-report/`: Directory where Allure test results are stored.


----
### Test Cases
For documenting the test cases, I am using Testmo. Currently, I am utilizing a 20-day trial, which anyone can sign up for. Testmo is a comprehensive tool for managing test cases, reporting, and integrating with various testing frameworks.

You can view and manage the test cases here: [Tesmo (https://hlulanixkontron.testmo.net/repositories/1?group_id=1)]

To sign up for a trial of Testmo, visit their website and start your own free trial for 20 days.

---
