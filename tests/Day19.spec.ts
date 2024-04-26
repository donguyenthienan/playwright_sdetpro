import {test} from '@playwright/test';
import {chromium, Browser, Page, BrowserContext} from 'playwright'

test('Login Test - XPATH', async ({page}) => {
    await page.goto("https://the-internet.herokuapp.com")
    //Explicit wait
    const footerLinkEle = await page.waitForSelector('//a[contains(text(),"Elemental_teo")]', {timeout: 10000})
    await footerLinkEle.click()
})

test('Login Test - CSS', async ({page}) => {
    await page.goto("https://the-internet.herokuapp.com")
    //Explicit wait
    const footerLinkEle = await page.locator('a:has-text("Elemental")')
    await footerLinkEle.click()
})

test('Link Text - Filtering', async ({page}) => {
    await page.goto("https://the-internet.herokuapp.com")
    //Explicit wait
    const footerLinkEle = await page.locator('a').filter({hasText: 'Elemental'})
    await footerLinkEle.scrollIntoViewIfNeeded()
    await footerLinkEle.click()
})

test('Multiple matching', async ({page}) => {
    await page.goto("https://the-internet.herokuapp.com")
    //Explicit wait
    const footerLinkEles = await page.locator('a').elementHandles()
    // const footerLinkEles = await page.$$('a')

    await footerLinkEles[10].click()
})

test('Handle login form', async ({page}) => {
    //Navigate to login form
    await page.goto("https://the-internet.herokuapp.com")
    await page.locator('a').filter({hasText: 'Form Authentication'}).click()
    await page.waitForLoadState('domcontentloaded')

    // Form interaction
    await page.locator('#username').fill('teo@sth.com')
    await page.locator('#password').fill('teo@sth.com')
    await page.locator('button[type=submit]').click()
    await page.waitForLoadState('domcontentloaded')
})

test('Element - get text', async ({page}) => {
    //Navigate to login form
    await page.goto("https://the-internet.herokuapp.com")
    await page.locator('a').filter({hasText: 'Form Authentication'}).click()
    await page.waitForLoadState('domcontentloaded')

    // Form interaction
    await page.locator('#username').fill('teo@sth.com')
    await page.locator('#password').fill('teo@sth.com')
    await page.locator('button[type=submit]').click()
    await page.waitForLoadState('domcontentloaded')

    //Get text
    const textContent = await page.locator('h4').textContent() //get only visible text
    const innerText = await page.locator('h4').innerText() // get both visible and invisible text
})