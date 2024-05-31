const { defineConfig, devices } = require('@playwright/test')

module.exports = defineConfig({
    testDir: './tests',
    projects: [
        {
            name: 'chromium',
            use: {...devices['Desktop Chrome']}
        },
    ],
    reporter: [['html', { outputFolder: 'my-report' }]],
    retries: process.env.CI ? 2 : 1,
    use: {
        trace: 'on-first-retry',
        video: 'on-first-retry',
        screenshot:'only-on-failure',
        actionTimeout: 10000 //Implicit wait
    }
})