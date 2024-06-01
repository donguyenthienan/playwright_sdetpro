import ComputerEssentialComponent from "./ComputerEssentialComponent";
import {Locator} from "@playwright/test";
import {selector} from "../SelectorDecorator";

@selector(".product-essential")
export default class StandardComputerComponent extends ComputerEssentialComponent {

    private productAttrSel = 'select[id^="product_attribute"]';

    constructor(component: Locator) {
        super(component);
    }

    async selectProcessorType(type: string): Promise<void> {
        const PROCESSOR_DROP_DOWN_INDEX = 0;
        const allDropdown: Locator[] = await this.component.locator(this.productAttrSel).all();
        await this.selectOption(allDropdown[PROCESSOR_DROP_DOWN_INDEX], type);
    }

    async selectRAMType(type: string): Promise<void> {
        const RAM_DROP_DOWN_INDEX = 1;
        const allDropdown: Locator[] = await this.component.locator(this.productAttrSel).all();
        await this.selectOption(allDropdown[RAM_DROP_DOWN_INDEX], type);
    }

    private async selectOption(dropdown: Locator, type: string): Promise<void> {
        // Loop all the options then search for the  option that starts with the type value
        const allOptions = await dropdown.locator('option').all();
        let optionIndex = 0;
        for (const option of allOptions) {
            const optionText = await option.textContent();
            if (optionText.startsWith(type)) {
                optionIndex = allOptions.indexOf(option);
                break;
            }
        }
        await dropdown.selectOption({index: optionIndex});
    }

}