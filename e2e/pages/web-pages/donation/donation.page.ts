import { Page, expect } from '@playwright/test'

import {
  DonationFormAuthState,
  DonationFormPaymentMethod,
  PaymentMode,
} from '../../../../src/components/client/donation-flow/helpers/types'
import {
  stripeSuccessFormData,
  stripeErrorNoBalanceFormData,
} from '../../../data/donation-test.data'
import { DonationRegions } from '../../../data/enums/donation-regions.enum'
import { LanguagesEnum } from '../../../data/enums/languages.enum'
import {
  bgLocalizationAuth,
  bgLocalizationDonationFlow,
  bgLocalizationValidation,
  enLocalizationAuth,
  enLocalizationDonationFlow,
  enLocalizationValidation,
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
  private readonly enBankTransferText =
    enLocalizationDonationFlow.step['payment-method'].field.method.bank
  private readonly bgCardText = bgLocalizationDonationFlow.step['payment-method'].field.method.card
  private readonly enCardText = enLocalizationDonationFlow.step['payment-method'].field.method.card
  // -> Payment mode section <-
  private readonly bgOneTimeModeText =
    bgLocalizationDonationFlow.step['payment-mode'].fields['one-time']
  private readonly enOneTimeModeText =
    enLocalizationDonationFlow.step['payment-mode'].fields['one-time']
  private readonly bgMonthlyModeText =
    bgLocalizationDonationFlow.step['payment-mode'].fields.monthly
  private readonly enMonthlyModeText =
    enLocalizationDonationFlow.step['payment-mode'].fields.monthly

  // -> Authentication section <-
  private readonly bgLoginText = bgLocalizationDonationFlow.step.authentication.login.label
  private readonly enLoginText = enLocalizationDonationFlow.step.authentication.login.label
  private readonly bgRegisterText = bgLocalizationDonationFlow.step.authentication.register.label
  private readonly enRegisterText = enLocalizationDonationFlow.step.authentication.register.label
  private readonly bgNoRegitserText =
    bgLocalizationDonationFlow.step.authentication.noregister.label
  private readonly enNoRegitserText =
    enLocalizationDonationFlow.step.authentication.noregister.label
  private readonly bgLoggedAsText = bgLocalizationDonationFlow.step.authentication['logged-as']
  private readonly enLoggedAsText = enLocalizationDonationFlow.step.authentication['logged-as']
  private readonly bgRegisterButtonText = bgLocalizationAuth.cta.register
  private readonly enRegisterButtonText = enLocalizationAuth.cta.register
  // -> Register form checkbox texts <-
  private readonly bgTermsCheckboxText =
    bgLocalizationValidation['agree-with'] + ' ' + bgLocalizationValidation['terms-and-conditions']
  private readonly enTermsCheckboxText =
    enLocalizationValidation['agree-with'] + ' ' + enLocalizationValidation['terms-and-conditions']

  // -> Summary section <-
  private readonly totalAmountSelector = '[data-testid="total-amount"]'
  private readonly bgSubmitButtonText = bgLocalizationDonationFlow.action.submit
  private readonly enSubmitButtonText = enLocalizationDonationFlow.action.submit
  private readonly bgStripeErrorNoBalanceText =
    'В картата ви няма достатъчно средства. Опитайте с друга.'

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
    // Wait for the MUI dropdown menu to render before targeting the specific item
    await this.page.locator('#menu-cardRegion').waitFor({ state: 'visible', timeout: 10000 })
    const menuItem = this.page.locator(this.regionsMenuList + `[data-value=${desiredRegion}]`)
    await menuItem.click()
    // Wait for the dropdown menu to close before proceeding
    await menuItem.waitFor({ state: 'hidden', timeout: 5000 })
  }

  /**
   * Select payment method
   * @param {DonationFormPaymentMethod} method
   */
  async selectPaymentMethod(
    method: DonationFormPaymentMethod,
    language: LanguagesEnum = LanguagesEnum.BG,
  ): Promise<void> {
    const cardText = language === LanguagesEnum.BG ? this.bgCardText : this.enCardText
    const bankText =
      language === LanguagesEnum.BG ? this.bgBankTransferText : this.enBankTransferText

    if (method === DonationFormPaymentMethod.BANK) {
      await this.page
        .getByText(bankText, {
          exact: true,
        })
        .click()
    } else if (method === DonationFormPaymentMethod.CARD) {
      await this.page
        .getByText(cardText, {
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
    const stripeForm = this.page.locator('[data-testid="stripe-payment-form"]')
    const baseEmailLocator = stripeForm.frameLocator('iframe').first()
    const baseCardPaymentLocator = stripeForm.frameLocator('iframe').last()
    const emailField = baseEmailLocator.locator('input[name="email"]')
    const nameField = this.page.locator('input[name="billingName"]')
    const cardNumberField = baseCardPaymentLocator.locator('input[name="number"]').first()
    const cardExpiryField = baseCardPaymentLocator.locator('input[name="expiry"]').first()
    const cvcField = baseCardPaymentLocator.locator('input[name="cvc"]').first()
    const countrySelect = baseCardPaymentLocator.locator('select[name="country"]').first()
    // Wait for the Stripe iframe email field to be ready, then skip if Stripe Link
    // has auto-filled and disabled it (happens for recognized/authenticated emails)
    await emailField.waitFor({ state: 'visible', timeout: 15000 })
    if (await emailField.isEnabled()) {
      await emailField.fill(data.email)
    }
    await nameField.fill(data.name)
    await cardNumberField.fill(data.cardNumber)
    await cardExpiryField.fill(data.expiryDate)
    await cvcField.fill(data.cvc)
    await countrySelect.selectOption(data.country)
  }

  /**
   * Set donation region from the radio cards
   * @param {number} amount
   */
  async hasPaymentErrorMessage(): Promise<boolean> {
    const errorAlert = await this.page.locator('strong.MuiTypography-root', {
      hasText: this.bgStripeErrorNoBalanceText,
    })
    await this.waitForElementToBePresentedByLocator(errorAlert)
    return errorAlert.isVisible()
  }

  /**
   *  Select authentication method
   * @param {DonationFormAuthState} auth
   */
  async selectAuthentication(
    auth: DonationFormAuthState,
    language: LanguagesEnum = LanguagesEnum.BG,
  ): Promise<void> {
    const loginText = language === 'BG' ? this.bgLoginText : this.enLoginText
    const registerText = language === 'BG' ? this.bgRegisterText : this.enRegisterText
    const noRegisterText = language === 'BG' ? this.bgNoRegitserText : this.enNoRegitserText

    let labelText: string
    if (auth === DonationFormAuthState.LOGIN) {
      labelText = loginText
    } else if (auth === DonationFormAuthState.REGISTER) {
      labelText = registerText
    } else {
      labelText = noRegisterText
    }

    const authSection = this.page.locator('#select-authentication-method')
    const radio = authSection.getByRole('radio', { name: labelText })
    await radio.waitFor({ state: 'visible', timeout: 10000 })
    await radio.click({ force: true })
  }

  /**
   * Check the total amount displayed in the donation summary
   * @param {number} amount - The expected amount in EUR
   */
  async checkTotalAmount(
    amount: number,
    language: LanguagesEnum = LanguagesEnum.BG,
  ): Promise<void> {
    const totalAmount = await this.page.locator(this.totalAmountSelector).first().textContent()
    const totalAmountSpaceFix = totalAmount?.replace(/\s/g, String.fromCharCode(160))

    // Format amount to match app's custom EUR formatting
    // BG locale: "121,96 евро", EN locale: "25.81 EUR"
    const locale = language === LanguagesEnum.BG ? 'bg-BG' : 'en-US'
    const formattedNumber = new Intl.NumberFormat(locale, {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount)

    const currencyLabel = language === LanguagesEnum.BG ? 'евро' : 'EUR'
    const expectedAmount = `${formattedNumber}${String.fromCharCode(160)}${currencyLabel}`

    expect(totalAmountSpaceFix).toEqual(expectedAmount)
  }

  async checkPrivacyCheckbox(): Promise<void> {
    // Use name-based selector and .click() instead of .check() to avoid
    // "Clicking the checkbox did not change its state" with Formik-controlled checkboxes
    const checkbox = this.page.locator('input[name="privacy"]')
    await checkbox.waitFor({ state: 'attached' })
    await checkbox.click({ force: true })
  }

  async submitForm(language: LanguagesEnum = LanguagesEnum.BG): Promise<void> {
    const submitButtonText = language === 'BG' ? this.bgSubmitButtonText : this.enSubmitButtonText
    console.log(submitButtonText)
    const button = this.page.locator(`button:has-text("${submitButtonText}")`).last()
    await button.click()
  }

  /**
   * Select payment mode (one-time or monthly/subscription)
   * @param {PaymentMode} mode
   * @param {LanguagesEnum} language
   */
  async selectPaymentMode(
    mode: PaymentMode,
    language: LanguagesEnum = LanguagesEnum.BG,
  ): Promise<void> {
    const oneTimeText =
      language === LanguagesEnum.BG ? this.bgOneTimeModeText : this.enOneTimeModeText
    const monthlyText =
      language === LanguagesEnum.BG ? this.bgMonthlyModeText : this.enMonthlyModeText

    if (mode === 'one-time') {
      await this.selectRadioButtonByLabelText([oneTimeText])
    } else if (mode === 'subscription') {
      await this.selectRadioButtonByLabelText([monthlyText])
    } else {
      throw new Error('Payment mode not found!')
    }
  }

  /**
   * Fill the inline login form and submit it
   * @param {string} email
   * @param {string} password
   * @param {LanguagesEnum} language
   */
  async fillInlineLoginForm(
    email: string,
    password: string,
    language: LanguagesEnum = LanguagesEnum.BG,
  ): Promise<void> {
    const emailField = this.page.locator('input[name="loginEmail"]')
    const passwordField = this.page.locator('input[name="loginPassword"]')
    const loginButtonText = language === LanguagesEnum.BG ? this.bgLoginText : this.enLoginText
    const loginButton = this.page.locator('button[type="button"]', {
      hasText: loginButtonText,
    })

    // Wait for the login form fields to be visible after accordion expands
    await emailField.waitFor({ state: 'visible', timeout: 15000 })
    await emailField.fill(email)
    await passwordField.fill(password)
    // Small delay to ensure Formik processes the field values before submission
    await this.page.waitForTimeout(500)
    await loginButton.first().click()
  }

  /**
   * Fill the inline register form and submit it
   * @param {object} data
   * @param {LanguagesEnum} language
   */
  async fillInlineRegisterForm(
    data: {
      firstName: string
      lastName: string
      email: string
      password: string
      confirmPassword: string
    },
    language: LanguagesEnum = LanguagesEnum.BG,
  ): Promise<void> {
    // Wait for the register form to be visible after Collapse expands
    await this.page.locator('input[name="registerFirstName"]').waitFor({ state: 'visible' })
    await this.page.locator('input[name="registerFirstName"]').fill(data.firstName)
    await this.page.locator('input[name="registerLastName"]').fill(data.lastName)
    await this.page.locator('input[name="registerEmail"]').fill(data.email)
    await this.page.locator('input[name="registerPassword"]').fill(data.password)
    await this.page.locator('input[name="registerConfirmPassword"]').fill(data.confirmPassword)

    // Check terms and GDPR checkboxes by name attribute
    // Using name-based selectors to avoid conflicts with the donation form's own privacy checkbox
    // which shares identical GDPR label text
    const termsCheckbox = this.page.locator('input[name="registerTerms"]')
    const gdprCheckbox = this.page.locator('input[name="registerGdpr"]')
    await termsCheckbox.check()
    await gdprCheckbox.check()

    // Click register button
    const registerButtonText =
      language === LanguagesEnum.BG ? this.bgRegisterButtonText : this.enRegisterButtonText
    const registerButton = this.page.locator('button[type="button"]', {
      hasText: registerButtonText,
    })
    await registerButton.click()
  }

  /**
   * Wait for the user to be shown as authenticated after inline login/register
   * @param {LanguagesEnum} language
   * @param {number} timeoutParam
   */
  async waitForAuthenticatedState(
    language: LanguagesEnum = LanguagesEnum.BG,
    timeoutParam = 30000,
  ): Promise<void> {
    const loggedAsText = language === LanguagesEnum.BG ? this.bgLoggedAsText : this.enLoggedAsText
    // Wait a moment for the form to detect the authenticated session
    await this.page.waitForTimeout(1000)
    const loggedAsLocator = this.page.getByText(loggedAsText)
    await loggedAsLocator.waitFor({ state: 'visible', timeout: timeoutParam })
  }
}
