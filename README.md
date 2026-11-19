# Signup Automation – Authorized Partner

Automates the full signup flow of https://authorized-partner.vercel.app/ using **Playwright** with **JavaScript** and the **Page Object Model**.

## Tech used
- Node.js 18 or higher
- Playwright Test 1.48+ (comes with its own Chromium browser, no separate driver needed)

## How to run
```bash
npm install
npx playwright install chromium
npm test              # run in background
npm run test:headed   # run with the browser visible
npm run report        # open the test report
```

## Project structure
```
pages/SignupPage.js                    -> Page Object: one method per signup step
tests/signup_automation_script.spec.js -> The test that runs the whole flow
utils/email.js                         -> Creates a temp email and reads the OTP
test-data/document.pdf                 -> File used for the document upload
```

## Steps automated
1. Accept terms and conditions
2. Fill account details (name, email, phone, password)
3. Enter the email OTP (read automatically)
4. Fill agency details
5. Fill professional experience
6. Fill verification details, upload document, submit

## Test data
- A new temporary email is created on every run using the free mail.tm API, so the OTP is read automatically with no manual step.
- Phone number, agency name and registration number change every run, so the test can be run again and again.
- Password: `Test@12345`

## Results
- HTML report: `playwright-report/`
- Screenshots and video: `test-results/`
