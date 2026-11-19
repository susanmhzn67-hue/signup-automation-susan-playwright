const { test, expect } = require('@playwright/test');
const { SignupPage } = require('../pages/SignupPage');
const { createInbox, getOtp } = require('../utils/email');

test('User can complete the full signup flow', async ({ page }) => {
  const signup = new SignupPage(page);
  const { email, token } = await createInbox();
  const id = Date.now().toString().slice(-6); // makes data unique each run

  await signup.open();
  await signup.acceptTerms();

  await signup.fillAccountDetails({
    firstName: 'Test',
    lastName: 'User',
    email: email,
    phone: '98' + Date.now().toString().slice(-8),
    password: 'Test@12345',
  });

  const otp = await getOtp(token);
  await signup.enterOtp(otp);

  await signup.fillAgencyDetails({
    name: 'Test Agency ' + id,
    role: 'Manager',
    email: `agency${id}@test.com`,
    website: 'https://www.testagency.com',
    address: 'Kathmandu, Nepal',
    region: 'Australia',
  });

  await signup.fillExperience({
    years: '2 years',
    students: '100',
    focusArea: 'Undergraduate admissions',
    successRate: '90',
    service: 'Career Counseling',
  });

  await signup.fillVerification({
    registrationNumber: 'REG' + id,
    country: 'Australia',
    institutionType: 'Universities',
    documentPath: 'test-data/document.pdf',
  });

  // After a successful signup the user leaves the register page
  await expect(page).not.toHaveURL(/register/, { timeout: 30000 });
});
