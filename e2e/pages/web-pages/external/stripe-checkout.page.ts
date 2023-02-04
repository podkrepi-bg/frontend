import { Page } from '@playwright/test'
import { BasePage } from '../base.page'

export class StripeCheckoutPage extends BasePage {
  constructor(page: Page) {
    super(page)
  }

  private readonly productSummaryTotalAmount = '#ProductSummary-totalAmount span'
  private readonly checkoutPaymentForm = '.CheckoutPaymentForm'
  private readonly emailReadonlyInputField = this.checkoutPaymentForm + ' .ReadOnlyFormField-title'
  private readonly cardNumberFieldSet = this.checkoutPaymentForm + ' #cardNumber-fieldset'
  private readonly cardNumberInputField = this.cardNumberFieldSet + ' #cardNumber'
  private readonly cardExpDateInputField = this.cardNumberFieldSet + ' #cardExpiry'
  private readonly cardCvcInputField = this.cardNumberFieldSet + ' #cardCvc'
  private readonly billingNameInputField = this.checkoutPaymentForm + ' #billingName'
  private readonly billingCountryDropdown = this.checkoutPaymentForm + ' #billingCountry'
  private readonly submitPayButton = this.checkoutPaymentForm + ' button.SubmitButton'

  /**
   * Get the total amount of the donation as text
   */
  async getTotalAmountText(): Promise<string | null> {
    return this.getTextOfElementBySelector(this.productSummaryTotalAmount)
  }

  /**
   * Get readonly e-mail text
   */
  async getReadonlyEmailText(): Promise<string | null> {
    return this.getTextOfElementBySelector(this.emailReadonlyInputField)
  }

  /**
   * Click Pay/Submit button
   * @param {LanguagesEnum} language
   */
  async clickPayButton(): Promise<void> {
    await this.clickElement(this.submitPayButton)
  }

  /**
   * Fill payment form all input fields
   * @param {Array<string>} paymentData
   */
  async fillPaymentForm(paymentData: Array<string>): Promise<void> {
    await this.setInputFieldBySelector(this.cardNumberInputField, paymentData[0], true, true)
    await this.setInputFieldBySelector(this.cardExpDateInputField, paymentData[1], true, true)
    await this.setInputFieldBySelector(this.cardCvcInputField, paymentData[2], true, true)
    await this.setInputFieldBySelector(this.billingNameInputField, paymentData[3], true, true)
    await this.selectDropdownOptionValue(this.billingCountryDropdown, paymentData[4])
    await this.clickPayButton()
  }
}
