import {test} from '@playwright/test';
import OrderComputerFlow from "../../test-flows/computer/OrderComputerFlow";
import StandardComputerComponent from '../../models/components/computer/StandardComputerComponent';

test('Test Cheap ComputerComponent', async ({page}) => {
    await page.goto('https://demowebshop.tricentis.com/build-your-own-computer');
    const computerFlow: OrderComputerFlow = new OrderComputerFlow(page, StandardComputerComponent);
    await computerFlow.buildCompSpecAndAddToCart();
})