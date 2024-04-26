import {test} from '@playwright/test'

test('Handle dropdown', async ({page}) => {
    await page.goto('https://the-internet.herokuapp.com/dropdown')
    const dropdownEle = await page.locator('#dropdown')
    //Select dropdown option 1 - index
    dropdownEle.selectOption({index: 1})

    //Select dropdown option 2 - value
    dropdownEle.selectOption({value: '2'})
})

test('Handle iFrame', async ({page}) => {
    await page.goto('https://the-internet.herokuapp.com/iframe')
    // Target the iframe using frame locator
    const iframeEle = await page.frameLocator('iframe[id^=mce]')

    //Find edit text area in the iFrame
    const editTextAreaEle = await iframeEle.locator('body p')

    // Clear then input value
    await editTextAreaEle.click()
    await editTextAreaEle.clear()
    await editTextAreaEle.fill('new content')

    await page.waitForTimeout(2000)
})

test('Hover and narrowdown searching scope', async({page}) => {
    await page.goto('https://the-internet.herokuapp.com/hovers')

    //Find all figtures
    const allFigureEles = await page.locator('.figure').all()

    // Loop and narrow down searching scope
    for (const ele of allFigureEles) {
        const emgEle = await ele.locator('img')
        // Mouse hover
        await emgEle.hover()
        await page.waitForTimeout(1000)
    }
})

test('Checking element status and handle dynamic states', async ({page}) => {
    await page.goto('https://the-internet.herokuapp.com/dynamic_controls')

    //Locate 2 parent elements 
    const checkboxComp = await page.locator('#checkbox-example')
    const inputExampComp = await page.locator('#input-example')

    //Interact with the checkbox
    const checkboxEle = await checkboxComp.locator('#checkbox input')
    let isEnabled = await checkboxEle.isEnabled()
    let isSelected = await checkboxEle.isChecked()

    console.log(`Is checkbox enabled: ${isEnabled}`);
    console.log(`Is checkbox selected: ${isSelected}`);

    if(!isSelected){
        await checkboxEle.click()
    }

    isSelected = await checkboxEle.isChecked()

    if(!isSelected){
        await checkboxEle.click()
    }

    const removeBtnEle = await checkboxComp.locator('button')
    await removeBtnEle.click()
    await page.waitForSelector('#checkbox-example #checkbox input', {state: 'hidden', timeout: 5000})

    //Interact with the textbox
    const textboxEle = await inputExampComp.locator('input')
    const enableBtnEle = await inputExampComp.locator('button')
    isEnabled = await textboxEle.isEnabled()

    console.log(`Is textbox enabled: ${isEnabled}`);

    if(!isEnabled){
        await enableBtnEle.click()
    }
    isEnabled = await textboxEle.isEnabled()

    console.log(`Is textbox enabled: ${isEnabled}`);

    await textboxEle.fill('plaplapla')
})