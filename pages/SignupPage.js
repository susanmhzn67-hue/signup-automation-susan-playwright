class SignupPage {
  constructor(page) {
    this.page = page;
  }

  async open() {
    await this.page.goto('/register');
  }

  // Step 1: Terms and conditions
  async acceptTerms() {
    await this.page.getByRole('checkbox').check();
    await this.page.getByRole('button', { name: 'Continue' }).click();
  }

  // Step 2: Account setup
  async fillAccountDetails(user) {
    await this.page.getByLabel('First Name').fill(user.firstName);
    await this.page.getByLabel('Last Name').fill(user.lastName);
    await this.page.getByLabel('Email Address').fill(user.email);
    await this.page.getByLabel('Phone Number').fill(user.phone);
    await this.page.getByLabel('Password', { exact: true }).fill(user.password);
    await this.page.getByLabel('Confirm Password').fill(user.password);
    await this.page.getByRole('button', { name: 'Next' }).click();
  }

  // Step 3: Email OTP
  async enterOtp(otp) {
    await this.page.locator('input[autocomplete="one-time-code"]').pressSequentially(otp);
    await this.page.getByRole('button', { name: 'Verify Code' }).click();
  }

  // Step 4: Agency details
  async fillAgencyDetails(agency) {
    await this.page.getByLabel('Agency Name').fill(agency.name);
    await this.page.getByLabel('Role in Agency').fill(agency.role);
    await this.page.getByLabel('Email Address').fill(agency.email);
    await this.page.getByLabel('Website').fill(agency.website);
    await this.page.getByLabel('Address').fill(agency.address);
    await this.selectDropdown('Region of Operation', agency.region);
    await this.page.getByRole('button', { name: 'Next' }).click();
  }

  // Step 5: Professional experience
  async fillExperience(exp) {
    await this.selectDropdown('Years of Experience', exp.years);
    await this.page.getByLabel('Number of Students Recruited Annually').fill(exp.students);
    await this.page.getByLabel('Focus Area').fill(exp.focusArea);
    await this.page.getByLabel('Success Metrics').fill(exp.successRate);
    await this.page.getByLabel(exp.service).check();
    await this.page.getByRole('button', { name: 'Next' }).click();
  }

  // Step 6: Verification and preferences
  async fillVerification(info) {
    await this.page.getByLabel('Business Registration Number').fill(info.registrationNumber);
    await this.selectDropdown('Preferred Countries', info.country);
    await this.page.getByLabel(info.institutionType).check();
    await this.page.locator('input[type="file"]').setInputFiles(info.documentPath);
    await this.page.getByRole('button', { name: 'Submit' }).click();
  }

  // Helper: open a dropdown and pick an option
  async selectDropdown(label, option) {
    await this.page.getByLabel(label).click();
    await this.page.getByRole('option', { name: option }).click();
    await this.page.keyboard.press('Escape');
  }
}

module.exports = { SignupPage };
