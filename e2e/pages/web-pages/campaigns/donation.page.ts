import { Page, expect } from '@playwright/test'
import {
  DonationFormAuthState,
  DonationFormPaymentMethod,
} from 'components/donation-flow/helpers/types'
import { stripeFormData } from '../../../data/donation-test.data'
import { DonationRegions } from '../../../data/enums/donation-regions.enum'
import { LanguagesEnum } from '../../../data/enums/languages.enum'
import { bgLocalizationDonationFlow, enLocalizationDonationFlow } from '../../../data/localization'
import { SLUG_REGEX } from '../../../utils/helpers'
import { CampaignsPage } from './campaigns.page'
export class DonationPage extends CampaignsPage {
  constructor(page: Page) {
    super(page)
  }

  // -> Select amount section <-
  private readonly bgSelectAmountSectionText = bgLocalizationDonationFlow.step.amount.title
  private readonly enSelectAmountSectionText = enLocalizationDonationFlow.step.amount.title
  private readonly otherAmountInputField = ".MuiCollapse-entered input[name='otherAmount']"

  // -> Payment method section <-
  private readonly regionsDropdownRootElement = '.MuiInputBase-root .MuiSelect-select'
  private readonly regionsMenuList = '#menu-cardRegion ul.MuiMenu-list li'
  private readonly bgBankTransferText =
    bgLocalizationDonationFlow.step['payment-method'].field.method.bank
  private readonly bgCardText = bgLocalizationDonationFlow.step['payment-method'].field.method.card

  // -> Authentication section <-
  private readonly bgLoginText = bgLocalizationDonationFlow.step.authentication.login.label
  private readonly bgRegisterText = bgLocalizationDonationFlow.step.authentication.register.label
  private readonly bgNoRegitserText =
    bgLocalizationDonationFlow.step.authentication.noregister.label

  // -> Summary section <-
  private readonly totalAmountSelector = '[data-testid="total-amount"]'
  private readonly bgSubmitButtonText = bgLocalizationDonationFlow.action.submit

  async checkPageUrlByRegExp(urlRegExpAsString?: string, timeoutParam = 10000): Promise<void> {
    await this.page.waitForTimeout(1000)
    await expect(this.page, 'The URL is not correct!').toHaveURL(
      new RegExp(urlRegExpAsString || `^(.*?)/campaigns/donation/${SLUG_REGEX}`),
      {
        timeout: timeoutParam,
      },
    )
  }

  /**
   * Is "Select amount" step active
   */
  async isSelectAmountStepActive(language: LanguagesEnum = LanguagesEnum.BG): Promise<boolean> {
    if (language === LanguagesEnum.BG) {
      return this.isStepActiveByLabelText(this.bgSelectAmountSectionText)
    } else if (language === LanguagesEnum.EN) {
      return this.isStepActiveByLabelText(this.enSelectAmountSectionText)
    } else {
      throw new Error('Language not found!')
    }
  }

  /**
   * Fill in the desired amount of money for donation into the Other Amount input field
   * @param {string} amountMoney
   */
  async fillOtherAmountInputField(amountMoney: string): Promise<void> {
    await this.waitForElementToBePresentedBySelector(this.otherAmountInputField)
    await this.setInputFieldBySelector(this.otherAmountInputField, amountMoney)
  }

  /**
   * Set donation region from the dropdown menu
   * @param {string} desiredRegion
   */
  async setDonationRegionFromTheDropdown(desiredRegion: DonationRegions): Promise<void> {
    await this.clickElement(this.regionsDropdownRootElement)
    await this.clickElement(this.regionsMenuList + `[data-value=${desiredRegion}]`)
  }

  /**
   * Select payment method
   * @param {DonationFormPaymentMethod} method
   */
  async selectPaymentMethod(method: DonationFormPaymentMethod): Promise<void> {
    if (method === DonationFormPaymentMethod.BANK) {
      await this.clickElement(`label:has-text(${this.bgBankTransferText})`)
    } else if (method === DonationFormPaymentMethod.CARD) {
      await this.clickElement(`label:has-text(${this.bgCardText})`)
    } else {
      throw new Error('Payment method not found!')
    }
  }

  /**
   * Fill in the Stripe form with the test card data
   */
  async fillCardForm(): Promise<void> {
    const baseLocator = this.page.locator('[data-testid="stripe-payment-form"]')
    const emailField = baseLocator.locator('input[name="email"]')
    const cardNumberField = baseLocator.locator('input[name="number"]')
    const cardExpiryField = baseLocator.locator('input[name="expiry"]')
    const cvcField = baseLocator.locator('input[name="cvc"]')
    const countrySelect = baseLocator.locator('input[name="country"]')
    emailField.fill(stripeFormData.email)
    cardNumberField.fill(stripeFormData.cardNumber)
    cardExpiryField.fill(stripeFormData.expiryDate)
    cvcField.fill(stripeFormData.cvc)
    countrySelect.fill(stripeFormData.country)
  }

  /**
   *  Select authentication method
   * @param {DonationFormAuthState} auth
   */
  async selectAuthentication(auth: DonationFormAuthState): Promise<void> {
    if (auth === DonationFormAuthState.LOGIN) {
      await this.clickElement(`span.MuiFormControlLabel-label:has-text(${this.bgLoginText})`)
    } else if (auth === DonationFormAuthState.REGISTER) {
      await this.clickElement(`span.MuiFormControlLabel-label:has-text(${this.bgRegisterText})`)
    } else if (auth === DonationFormAuthState.NOREGISTER) {
      await this.clickElement(`span.MuiFormControlLabel-label:has-text(${this.bgNoRegitserText})`)
    }
  }

  /**
   * Set donation region from the radio cards
   * @param {number} amount
   */
  async checkTotalAmount(amount: number): Promise<void> {
    const totalAmount = await this.page.locator(this.totalAmountSelector).textContent()
    expect(totalAmount).toBe(`${amount} лв.`)
  }

  async checkPrivacyCheckbox(): Promise<void> {
    this.page.locator('[data-testid="privacy-checkbox"]').check()
  }

  async submitForm(): Promise<void> {
    const button = this.page.locator(`button:has-text("${this.bgSubmitButtonText}")`)
    button.click()
  }
}
