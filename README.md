# Playwright AI-Powered Test Automation Framework

This repository contains an advanced test automation framework built with Playwright and TypeScript for end-to-end testing of https://practicesoftwaretesting.com. It includes a robust set of features designed for reliability, maintainability, and innovative failure analysis.

## Features

- **Page Object Model (POM):** The framework is structured using the Page Object Model to create a clean, maintainable, and reusable test codebase.
- **Cross-Browser Testing:** Tests are configured to run across major browsers (Chromium, Firefox, WebKit) to ensure wide application compatibility.
- **CI/CD Integration:** Includes a pre-configured GitHub Actions workflow for continuous integration, automatically running tests on pushes and pull requests to the `main` branch.
- **Advanced Failure Reporting:** Generates detailed HTML reports, screenshots, and video recordings for failed tests to simplify debugging.
- **AI-Powered Failure Analysis:** A unique, custom Playwright reporter that uses a local AI model (via Ollama) to analyze test failures and provide a root cause analysis, saving significant debugging time.

## Tech Stack

- **Framework:** [Playwright](https://playwright.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Test Data Generation:** [@faker-js/faker](https://fakerjs.dev/)
- **Environment Variables:** [dotenv](https://github.com/motdotla/dotenv)
- **CI/CD:** [GitHub Actions](https://github.com/features/actions)
- **AI Integration:** [Ollama](https://ollama.ai/)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/) (LTS version recommended)
- [Git](https://git-scm.com/)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/Inderbir001/practiceSoftwareTesting.git
    cd practiceSoftwareTesting
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Install Playwright browsers:**
    ```bash
    npx playwright install --with-deps
    ```

## Running the Tests

To run the entire test suite, use the following command:

```bash
npx playwright test
```

You can also run tests in specific browsers or in headed mode:

- **Run on a specific browser:**

  ```bash
  npx playwright test --project=chromium
  ```

- **Run in headed mode:**
  ```bash
  npx playwright test --headed
  ```

After the test run is complete, an HTML report will be generated in the `playwright-report` directory.

## AI Failure Analysis

This project includes a custom reporter that sends failed test information to a local Ollama instance for analysis.

### How it Works

1.  When a test fails, the reporter collects the error message and stack trace.
2.  It sends this information in a carefully crafted prompt to a running Ollama instance.
3.  The AI's response, containing a root cause analysis and a suggested fix, is printed directly to the console.

### Configuration

1.  **Install and run Ollama:** Follow the instructions on the [Ollama website](https://ollama.ai/) to set it up on your local machine.

2.  **Pull the model:** This project is configured to use the `qwen2.5-coder:7b` model.

    ```bash
    ollama pull qwen2.5-coder:7b
    ```

3.  **Enable the AI Reporter:** The reporter is controlled by an environment variable. To enable it, create a `.env` file in the root of the project:
    ```
    AI_ENABLED=true
    ```

When you run the tests with this variable set, you will see the AI analysis in the terminal output for any failed tests.
