/**
 * - All wait method in this spec is for debug purpose only, please do NOT apply in real project
 * - All comments in this spec is for training purpose only, please do NOT put comments for every single lines like this
 * 
 */

import { Page, test } from '@playwright/test';
import { scrollToBottom } from '../utils/PageHelper';
import { getAdParams } from '../utils/AdHelper';

const jsAlertUrl = 'https://the-internet.herokuapp.com/javascript_alerts';
const floatingMenuUrl = 'https://the-internet.herokuapp.com/floating_menu';


/**
 * Javascript Alert handling
 */
test('Handle JS Alert', async ({ page }) => {
    page.goto(jsAlertUrl);
    const jsAlertBtnEle = page.locator('[onclick="jsAlert()"]');

    // MUST define the event first
    page.on('dialog', async dialog => {
        await dialog.accept();
    });

    // Trigger the js alert
    await jsAlertBtnEle.click();

    // DEBUG purpose only
    await page.waitForTimeout(3000);
});

test('Handle JS Confirm', async ({ page }) => {
    page.goto(jsAlertUrl);
    const jsConfirmBtnEle = page.locator('[onclick="jsConfirm()"]');

    // MUST define the event first
    page.on('dialog', async dialog => {
        // Get the alert content
        console.log(`Alert content is: ${dialog.message()}`);

        // Dismiss/Cancel
        await dialog.dismiss();
    });

    // Trigger the js alert
    await jsConfirmBtnEle.click();

    // DEBUG purpose only
    await page.waitForTimeout(3000);
});

test('Handle JS Prompt', async ({ page }) => {
    page.goto(jsAlertUrl);
    const jsPromptBtnEle = page.locator('[onclick="jsPrompt()"]');

    // MUST define the event first
    page.on('dialog', async dialog => {
        // Get the alert content
        console.log(`Alert content is: ${dialog.message()}`);

        // Dismiss/Cancel
        await dialog.accept("I'm accepting the js prompt!!");
    });

    // Trigger the js alert
    await jsPromptBtnEle.click();

    // DEBUG purpose only
    await page.waitForTimeout(3000);
});

test('Handle JS Alert automatically', async ({ page }) => {
    page.goto(jsAlertUrl);
    const jsAlertBtnEle = page.locator('[onclick="jsAlert()"]');

    // Trigger the js alert
    await jsAlertBtnEle.click();

    // DEBUG purpose only
    await page.waitForTimeout(3000);
});


/**
 * 
 * JavaScript snippet execution
 */
test('Execute JS without parameters', async ({ page }) => {
    await page.goto(floatingMenuUrl);

    // Explore the hightlight function
    page.locator('h3').highlight();

    // Wait 2 secs
    await page.waitForTimeout(2000);

    // Scroll to bottom
    await page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight);
    });

    // Wait 2 secs
    await page.waitForTimeout(2000);

    // Scroll to top
    await page.evaluate(() => {
        window.scrollTo(0, 0);
    });

    // wait another 2 secs
    await page.waitForTimeout(2000);

});

test('Execute JS WITH parameters', async ({ page }) => {
    await page.goto(floatingMenuUrl);

    // Scroll to bottom
    await scrollToBottom(page, 1);

    // Wait 2 secs
    await page.waitForTimeout(2000);
});

test.only('Execute JS and return the value', async ({ page }) => {
    await page.goto('https://www.foodandwine.com/');
    await page.waitForSelector('div[id="leaderboard-flex-1"]', { timeout: 10000 });
    await scrollToBottom(page, 1);
    await page.waitForTimeout(1000);
    const returnAdsValues = await getAdParams(page, 'leaderboard-flex-1');
    console.log(returnAdsValues);
});