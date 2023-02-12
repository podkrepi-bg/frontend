import { Page, expect } from '@playwright/test'
import {
  DonationFormAuthState,
  DonationFormPaymentMethod,
} from 'components/donation-flow/helpers/types'
import {
  stripeSuccessFormData,
  stripeErrorNoBalanceFormData,
} from '../../../data/donation-test.data'
import { DonationRegions } from '../../../data/enums/donation-regions.enum'
import { LanguagesEnum } from '../../../data/enums/languages.enum'
import {
  bgLocalizationDonationFlow,
  bgLocalizationValidation,
  enLocalizationDonationFlow,
} from '../../../data/localization'
import { SLUG_REGEX } from '../../../utils/helpers'
import { CampaignsPage } from '../campaigns/campaigns.page'
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
  private readonly privacyCheckboxText =
    bgLocalizationValidation['informed-agree-with'] + ' ' + bgLocalizationValidation.gdpr
  private readonly bgStripeErrorNoBalanceText = 'Картата Ви не разполага с достатъчно средства.'

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
      await this.page
        .getByText(this.bgBankTransferText, {
          exact: true,
        })
        .click()
    } else if (method === DonationFormPaymentMethod.CARD) {
      await this.page
        .getByText(this.bgCardText, {
          exact: true,
        })
        .click()
    } else {
      throw new Error('Payment method not found!')
    }
  }

  /**
   * Fill in the Stripe form with the test card data
   */
  async fillCardForm(options: { fail?: boolean }): Promise<void> {
    const data = options.fail ? stripeErrorNoBalanceFormData : stripeSuccessFormData
    const baseEmailLocator = this.page
      .locator('[data-testid="stripe-payment-form"]')
      .frameLocator('iframe')
      .first()
    const baseCardPaymentLocator = this.page
      .locator('[data-testid="stripe-payment-form"]')
      .frameLocator('iframe')
      .last()
    const emailField = baseEmailLocator.locator('input[name="email"]')
    const cardNumberField = baseCardPaymentLocator.locator('input[name="number"]')
    const cardExpiryField = baseCardPaymentLocator.locator('input[name="expiry"]')
    const cvcField = baseCardPaymentLocator.locator('input[name="cvc"]')
    const countrySelect = baseCardPaymentLocator.locator('select[name="country"]')
    await emailField.fill(data.email)
    await cardNumberField.fill(data.cardNumber)
    await cardExpiryField.fill(data.expiryDate)
    await cvcField.fill(data.cvc)
    await countrySelect.selectOption(data.country)
  }

  /**
   * Fill in email field on a NOREGISTER authentication step
   */
  async fillEmailField(): Promise<void> {
    const emailField = this.page.locator('.MuiInputBase-root>input[name="email"]')
    await emailField.fill(stripeSuccessFormData.email)
  }

  /**
   * Set donation region from the radio cards
   * @param {number} amount
   */
  async hasPaymentErrorMessage(): Promise<boolean> {
    const errorMessage = this.page.getByText(this.bgStripeErrorNoBalanceText)
    return errorMessage.isVisible()
  }

  /**
   *  Select authentication method
   * @param {DonationFormAuthState} auth
   */
  async selectAuthentication(auth: DonationFormAuthState): Promise<void> {
    const baseLocator = this.page.locator('span.MuiFormControlLabel-label')
    if (auth === DonationFormAuthState.LOGIN) {
      await baseLocator
        .getByText(this.bgLoginText, {
          exact: true,
        })
        .click()
    } else if (auth === DonationFormAuthState.REGISTER) {
      await baseLocator.getByText(this.bgRegisterText, {
        exact: true,
      })
    } else if (auth === DonationFormAuthState.NOREGISTER) {
      await baseLocator
        .getByText(this.bgNoRegitserText, {
          exact: true,
        })
        .click()
    }
  }

  /**
   * Set donation region from the radio cards
   * @param {number} amount
   */
  async checkTotalAmount(amount: number): Promise<void> {
    const totalAmount = await this.page.locator(this.totalAmountSelector).textContent()
    expect(totalAmount).toBe(`${amount.toLocaleString('BG')} лв.`)
  }

  async checkPrivacyCheckbox(): Promise<void> {
    await this.selectCheckboxByLabelText([this.privacyCheckboxText])
  }

  async submitForm(): Promise<void> {
    const button = this.page.locator(`button:has-text("${this.bgSubmitButtonText}")`)
    button.click()
  }
}
