import { Page } from "@playwright/test";
import ComputerDetailsPage, { ComputerComponentConstructor } from "../../models/pages/ComputerDetailsPage";
import ComputerEssentialComponent from "../../models/components/computer/ComputerEssentialComponent";
import ShoppingCartPage from "../../models/pages/ShoppingCartPage";
import CheckoutOptionsPage from "../../models/pages/CheckoutOptionsPage";
import defaultCheckoutUserData from "../../test-data/DefaultCheckoutUser.json";
import CheckoutPage from "../../models/pages/CheckoutPage";
import BillingAddressComponent from "../../models/components/checkout/BillingAddressComponent";
import ShippingAddressComponent from "../../models/components/checkout/ShippingAddressComponent";
import ShippingMethodComponent from "../../models/components/checkout/ShippingMethodComponent";

export default class OrderComputerFlow {

    private totalPrice: number;
    private productQuantity: number;
    constructor(
        private readonly page: Page,
        private readonly computerComponentClass: ComputerComponentConstructor<ComputerEssentialComponent>,
        private readonly computerData: any
    ) {
        this.page = page;
        this.computerComponentClass = computerComponentClass;
        this.computerData = computerData;
    }
    async buildCompSpecAndAddToCart(): Promise<void> {
        // Build comp spec
        const computerDetailsPage: ComputerDetailsPage = new ComputerDetailsPage(this.page);
        const computerComp = computerDetailsPage.computerComp(this.computerComponentClass);
        await computerComp.unselectDefaultOptions();
        const selectedProcessorText = await computerComp.selectProcessorType(this.computerData.processorType);
        const selectedRAMText = await computerComp.selectRAMType(this.computerData.ram);
        const selectedHDDText = await computerComp.selectHDDType(this.computerData.hdd);
        const selectedSoftwareText = await computerComp.selectSoftwareType(this.computerData.software);
        let additionalOsPrice = 0;
        if (this.computerData.os) {
            const selectedOSText = await computerComp.selectOSType(this.computerData.os);
            additionalOsPrice = this.extractAdditionalPrice(selectedOSText);
        }
        // Calculate current product's price
        const basePrice = await computerComp.getProductPrice();
        const additionalPrices =
            this.extractAdditionalPrice(selectedProcessorText)
            + this.extractAdditionalPrice(selectedRAMText)
            + this.extractAdditionalPrice(selectedHDDText)
            + this.extractAdditionalPrice(selectedSoftwareText)
            + additionalOsPrice;
        this.productQuantity = await computerComp.getProductQuantity();
        this.totalPrice = (basePrice + additionalPrices) * this.productQuantity;
        // Handle waiting add to cart
        await computerComp.clickOnAddToCartBtn();
        const barNotificationText = await computerDetailsPage.getBarNotificationText();
        if (!barNotificationText.startsWith("The product has been added")) {
            throw new Error('Failed to add product to cart');
        }

        // Navigate to the shopping cart
        await computerDetailsPage.headerComponent().clickOnShoppingCartLink();
    }

    public async verifyShoppingCart(): Promise<void> {
        // Will add assertion statements later
        const shoppingCartPage: ShoppingCartPage = new ShoppingCartPage(this.page);
        const cartItemRowComponentList = await shoppingCartPage.cartItemRowComponentList();
        const totalComponent = shoppingCartPage.totalComponent();
        for (let cartItemRowComponent of cartItemRowComponentList) {
            const unitPrice = await cartItemRowComponent.unitPrice();
            const quantity = await cartItemRowComponent.quantity();
            const subTotal = await cartItemRowComponent.subTotal();
            console.log(`unitPrice: ${unitPrice}, quantity: ${quantity},  subTotal: ${subTotal}`);
        }
        const priceCategories = await totalComponent.priceCategories();
        console.log(`priceCategories: ${JSON.stringify(priceCategories)}`);
    }

    public async agreeTOSAndCheckout(): Promise<void> {
        const shoppingCartPage: ShoppingCartPage = new ShoppingCartPage(this.page);
        await shoppingCartPage.totalComponent().acceptTOS();
        await shoppingCartPage.totalComponent().clickOnCheckoutBtn();

        // Exceptional case that the flow step is handling 2 pages
        const checkoutOptionsPage: CheckoutOptionsPage = new CheckoutOptionsPage(this.page);
        await checkoutOptionsPage.checkoutAsGuest();
    }

    public async inputBillingAddress(): Promise<void> {
        // Use the default data
        const {
            firstName, lastName, email, country, state, city, add1, zipCode, phoneNum
        } = defaultCheckoutUserData;
        const checkoutPage: CheckoutPage = new CheckoutPage(this.page);
        const billingAddressComponent: BillingAddressComponent = checkoutPage.billingAddressComponent();
        await billingAddressComponent.inputFirstname(firstName);
        await billingAddressComponent.inputLastname(lastName);
        await billingAddressComponent.inputEmailAddress(email);
        await billingAddressComponent.selectCountry(country);
        await billingAddressComponent.selectStateProvince(state);
        await billingAddressComponent.inputCity(city);
        await billingAddressComponent.inputAddress1(add1);
        await billingAddressComponent.inputZIPCode(zipCode);
        await billingAddressComponent.inputPhoneNum(phoneNum);
        await billingAddressComponent.clickOnContinueBtn();
    }

    public async inputShippingAddress(): Promise<void> {
        const checkoutPage: CheckoutPage = new CheckoutPage(this.page);
        const shippingAddressComponent: ShippingAddressComponent = checkoutPage.shippingAddressComponent();
        await shippingAddressComponent.clickOnContinueBtn();
    }

    public async selectShippingMethod(): Promise<void> {
        /*
        * 1. Randomly select a method: Math.floor(Math.random() * sizeOfIterableData) -> in-range random index
        * Ex:
        *   const randomIndex = Math.floor(Math.random() * myArray.length)
            console.log(randomIndex)
            console.log(myArray[randomIndex])
        * */
        const checkoutPage: CheckoutPage = new CheckoutPage(this.page);
        const shippingMethodComponent: ShippingMethodComponent = checkoutPage.shippingMethodComponent();
        await shippingMethodComponent.clickOnContinueBtn();
    }

    private extractAdditionalPrice(fullText: string): number {
        const regex = /\+\d+\.\d+/g;
        const matches = fullText.match(regex);
        if (matches) {
            return Number(matches[0].replace('+', ''));
        }
        return 0;
    }
}