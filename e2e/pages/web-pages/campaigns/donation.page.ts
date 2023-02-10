import { Page, expect } from '@playwright/test'
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
  private readonly otherAmountInputField = ".MuiCollapse-entered input[name='otherAmount']"
  private readonly allAmountsSelector = '.MuiBox-root strong'
  private readonly regionsDropdownRootElement = '.MuiInputBase-root .MuiSelect-select'
  private readonly regionsMenuList = '#menu-cardRegion ul.MuiMenu-list li'
  // Section labels
  private readonly bgSelectAmountSectionText = bgLocalizationDonationFlow.step.amount.title
  private readonly enSelectAmountSectionText = enLocalizationDonationFlow.step.amount.title
  private readonly bgPaymentMethodSectionText =
    bgLocalizationDonationFlow.step['payment-method'].title
  private readonly enPaymentMethodSectionText =
    enLocalizationDonationFlow.step['payment-method'].title
  private readonly bgAuthenticationSectionText =
    bgLocalizationDonationFlow.step.authentication.title
  private readonly enAuthenticationSectionText =
    enLocalizationDonationFlow.step.authentication.title
  // TODO Add these three IDs into the component (if possible) and update the test methods
  private readonly donationAmount = this.allAmountsSelector + ' #donationAmount'
  private readonly feeAmount = this.allAmountsSelector + ' #feeAmount'
  private readonly totalChargedAmount = this.allAmountsSelector + ' #totalChargedAmount'

  private readonly inputRootSelector = '.MuiInputBase-root'

  // -> Send a wish section <-
  // Section labels
  private readonly sendAWishField = this.inputRootSelector + " textarea[name='wish']"
  private readonly bgSendAWishSectionText = bgLocalizationDonationFlow.status.success.wish.title
  private readonly enSendAWishSectionText = enLocalizationDonationFlow.status.success.wish.title

  // -> Payment <-
  // Section labels
  private readonly bgSuccessfulDonationTitle = bgLocalizationDonationFlow.status.success.title
  private readonly enSuccessfulDonationTitle = enLocalizationDonationFlow.status.success.title

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
   * Get Total charged amounts as text
   */
  async getTotalChargedAmountsAsText(): Promise<string | null> {
    const donationAmount = this.page.locator(this.allAmountsSelector).nth(0)
    return this.getTextOfElementByLocator(donationAmount)
    // TODO Uncomment when the IDs are added
    // return this.getTextOfElementBySelector(this.totalChargedAmount);
  }

  /**
   * Get Fee amounts as text
   */
  async getFeeAmountsAsText(): Promise<string | null> {
    const donationAmount = this.page.locator(this.allAmountsSelector).nth(1)
    return this.getTextOfElementByLocator(donationAmount)
  }

  /**
   * Get Donation amounts as text
   */
  async getDonationAmountsAsText(): Promise<string | null> {
    const donationAmount = this.page.locator(this.allAmountsSelector).nth(2)
    return this.getTextOfElementByLocator(donationAmount)
    // TODO Uncomment when the IDs are added
    // return this.getTextOfElementBySelector(this.donationAmount);
  }

  /**
   * Fill Send a wish input field
   * @param {string} wishText
   */
  async fillSendAWishField(wishText: string): Promise<void> {
    await this.setInputFieldBySelector(this.sendAWishField, wishText)
  }

  /**
   * Is "We thank you for your help and trust!" title visible
   * @param {LanguagesEnum} language - the default value is BG
   */
  async isSuccessfulDonationTitleVisible(
    language: LanguagesEnum = LanguagesEnum.BG,
  ): Promise<boolean> {
    return this.isH4HeadingVisible(
      language,
      this.bgSuccessfulDonationTitle,
      this.enSuccessfulDonationTitle,
    )
  }
}
