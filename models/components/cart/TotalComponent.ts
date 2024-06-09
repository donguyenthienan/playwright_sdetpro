import {selector} from "../SelectorDecorator";
import {Locator} from "@playwright/test";

@selector(".cart-footer .totals")
export default class TotalComponent {
    protected component: Locator;

    private priceTableRowSel = 'table tr';
    private priceTypeSel = '.cart-total-left span';
    private priceValueSel = '.cart-total-right .product-price';

    protected constructor(component: Locator) {
        this.component = component;
    }

    public async priceCategories(): Promise<any> {
        let priceCategories = {};
        const priceTableRowElems = await this.component.locator(this.priceTableRowSel).all();
        for (let tableRowEle of priceTableRowElems) {
            const priceTypeText = await tableRowEle.locator(this.priceTypeSel).innerText();
            const priceValueText = await tableRowEle.locator(this.priceValueSel).innerText();
            priceCategories[priceTypeText] = Number(priceValueText);
        }
        return priceCategories;
    }

}