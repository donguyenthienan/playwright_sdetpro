import {test} from '@playwright/test';
import {chromium, Browser, Page, BrowserContext} from 'playwright'

test('Login Test', async ({page}) => {
    // const browser: Browser = await chromium.launch()
    // const context: BrowserContext = await browser.newContext()
    // const page: Page = await browser.newPage()
    await page.goto("https://playwright.dev")
    const elem = await page.locator('thienan')
    await elem.click()
    // await browser.close()
})