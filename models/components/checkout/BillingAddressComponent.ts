import {selector} from "../SelectorDecorator";
import {Locator} from "@playwright/test";

@selector("#opc-billing")
export default class BillingAddressComponent {

    protected component: Locator;
    private readonly firstNameSel = '#BillingNewAddress_FirstName';
    private readonly lastNameSel = '#BillingNewAddress_LastName';
    private readonly emailAddressSel = '#BillingNewAddress_Email';
    private readonly countryDropdownSelectorSel = '#BillingNewAddress_CountryId';
    private readonly stateProvinceDropdownSel = '#BillingNewAddress_StateProvinceId';
    private readonly citySel = '#BillingNewAddress_City';
    private readonly add1Sel = '#BillingNewAddress_Address1';
    private readonly zipCodeSel = '#BillingNewAddress_ZipPostalCode';
    private readonly phoneNumSel = '#BillingNewAddress_PhoneNumber';
    private readonly continueBtnSel = 'input[value="Continue"]';

    protected constructor(component: Locator) {
        this.component = component;
    }

    public async inputFirstname(firstname: string): Promise<void> {
        await this.component.locator(this.firstNameSel).fill(firstname);
    }

    public async inputLastname(lastname: string): Promise<void> {
        await this.component.locator(this.lastNameSel).fill(lastname);
    }

    public async inputEmailAddress(emailAddress: string): Promise<void> {
        await this.component.locator(this.emailAddressSel).fill(emailAddress);
    }

    public async selectCountry(country: string): Promise<void> {
        await this.component.locator(this.countryDropdownSelectorSel).selectOption({label: country});
    }

    public async selectStateProvince(stateProvince: string): Promise<void> {
        await this.component.locator(this.stateProvinceDropdownSel).selectOption({label: stateProvince});
    }

    public async inputCity(cityName: string): Promise<void> {
        await this.component.locator(this.citySel).fill(cityName);
    }

    public async inputAddress1(address1: string): Promise<void> {
        await this.component.locator(this.add1Sel).fill(address1);
    }

    public async inputZIPCode(zipCode: string): Promise<void> {
        await this.component.locator(this.zipCodeSel).fill(zipCode);
    }

    public async inputPhoneNum(phoneNum: string): Promise<void> {
        await this.component.locator(this.phoneNumSel).fill(phoneNum);
    }

    public async clickOnContinueBtn(): Promise<void> {
        await this.component.locator(this.continueBtnSel).click();
        await this.component.locator(this.continueBtnSel).waitFor({state: "hidden", timeout: 5 * 1000});
    }

}