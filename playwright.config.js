const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 180000,
  reporter: 'html',
  use: {
    baseURL: 'https://authorized-partner.vercel.app',
    screenshot: 'on',
    video: 'on',
  },
});
