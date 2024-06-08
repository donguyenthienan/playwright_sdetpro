import ComputerEssentialComponent from "./ComputerEssentialComponent";
import {Locator} from "@playwright/test";
import {selector} from "../SelectorDecorator";

@selector(".product-essential")
export default class StandardComputerComponent extends ComputerEssentialComponent {

    private productAttrSel = 'select[id^="product_attribute"]';

    constructor(component: Locator) {
        super(component);
    }

    async selectProcessorType(type: string): Promise<string> {
        const PROCESSOR_DROP_DOWN_INDEX = 0;
        const allDropdown: Locator[] = await this.component.locator(this.productAttrSel).all();
        return await this.selectOption(allDropdown[PROCESSOR_DROP_DOWN_INDEX], type);
    }

    async selectRAMType(type: string): Promise<string> {
        const RAM_DROP_DOWN_INDEX = 1;
        const allDropdown: Locator[] = await this.component.locator(this.productAttrSel).all();
        return await this.selectOption(allDropdown[RAM_DROP_DOWN_INDEX], type);
    }

    private async selectOption(dropdown: Locator, type: string): Promise<string> {
        // Loop all the options then search for the  option that starts with the type value
        const allOptions = await dropdown.locator('option').all();
        let optionIndex = undefined;
        let optionFullText = '';
        for (const option of allOptions) {
            optionFullText = await option.textContent();
            if (optionFullText.startsWith(type)) {
                optionIndex = allOptions.indexOf(option);
                break;
            }
        }
        if (optionIndex === undefined) {
            throw new Error(`There is no matching option for ${type}`);
        }
        await dropdown.selectOption({index: optionIndex});
        return optionFullText;
    }

}