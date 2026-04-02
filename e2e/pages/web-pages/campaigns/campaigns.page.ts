import { Page, expect } from '@playwright/test'
import { LanguagesEnum } from '../../../data/enums/languages.enum'
import { bgLocalizationCampaigns, enLocalizationCampaigns } from '../../../data/localization'
import { SLUG_REGEX } from '../../../utils/helpers'
import { HomePage } from '../home.page'

export class CampaignsPage extends HomePage {
  constructor(page: Page) {
    super(page)
  }

  // New PaymentDrawer selectors (replaces InlineDonation)
  private readonly paymentDrawer = '[data-testid="payment-drawer"]'
  private readonly paymentDrawerDonateButton = '[data-testid="payment-drawer-donate-button"]'
  private readonly filterButtonsCommonSelector = 'ul button.CampaignFilter-filterButtons'
  // private readonly campaignContainerItem = ".MuiGrid-container .MuiGrid-item";
  private readonly cardActions = '.MuiCardActions-root'
  private readonly cardActionButtons = this.cardActions + ' a'
  // Main headings
  private readonly bgMainCampaignsHeading = bgLocalizationCampaigns.campaigns
  private readonly enMainCampaignsHeading = enLocalizationCampaigns.campaigns
  private readonly bgSupportCauseTodayHeading = bgLocalizationCampaigns.cta['support-cause-today']
  private readonly enSupportCauseTodayHeading = enLocalizationCampaigns.cta['support-cause-today']
  private readonly bgLearnMoreActionButtonText = bgLocalizationCampaigns.cta['learn-more']
  private readonly enLearnMoreActionButtonText = enLocalizationCampaigns.cta['learn-more']

  // Summary donors and wishes sections
  private readonly bgDonorsButtonText = bgLocalizationCampaigns.campaign['donors']
  private readonly enDonorsButtonText = enLocalizationCampaigns.campaign['donors']
  private readonly bgWishesButtonText = bgLocalizationCampaigns.campaign['wishes']
  private readonly enWishesButtonText = enLocalizationCampaigns.campaign['wishes']

  /**
   * Ovverride the method from the BasePage and add the specific selector for the Campaigns page as default
   */
  async checkPageUrlByRegExp(urlRegExpAsString?: string, timeoutParam = 10000): Promise<void> {
    await this.page.waitForTimeout(1000)
    await expect(this.page, 'The URL is not correct!').toHaveURL(
      new RegExp(urlRegExpAsString || `^(.*?)/(en/)?campaigns/${SLUG_REGEX}`),
      {
        timeout: timeoutParam,
      },
    )
  }

  /**
   * Click donation Support button in the PaymentDrawer
   */
  async clickDonationSupportButton(): Promise<void> {
    await this.clickElement(this.paymentDrawerDonateButton)
  }

  /**
   * Get filter buttons count on the Campaigns page
   */
  async getFilterButtonsCount(): Promise<number> {
    await this.waitForElementToBeReadyBySelector(this.filterButtonsCommonSelector)
    return this.getCountOfElementsBySelector(this.filterButtonsCommonSelector)
  }

  /**
   * Check if the main "Campaigns" page H1 heading is visible on the Campaigns page
   * @param {LanguagesEnum} language - the default value is BG
   */
  async isCampaignsHeadingVisible(language: LanguagesEnum = LanguagesEnum.BG): Promise<boolean> {
    return this.isH1HeadingVisible(
      language,
      this.bgMainCampaignsHeading,
      this.enMainCampaignsHeading,
    )
  }

  /**
   * Check if "Support cause today" page H6 heading is visible on the Campaigns page
   * @param {LanguagesEnum} language - the default value is BG
   */
  async isSupportCauseTodayHeadingVisible(
    language: LanguagesEnum = LanguagesEnum.BG,
  ): Promise<boolean> {
    return this.isH6HeadingVisible(
      language,
      this.bgSupportCauseTodayHeading,
      this.enSupportCauseTodayHeading,
    )
  }

  /**
   * Click card action button by its H5 heading
   * @param {string} heading
   * @param {string} action
   */
  async clickCampaignCardByIndex(index: number): Promise<void> {
    const cardActionButtonElement = this.page.locator(`[data-testid="campaign-card-${index}"]`)

    await this.clickElementByLocator(cardActionButtonElement)
  }

  /**
   * Click card action button by its H5 heading
   * @param {string} heading
   * @param {string} action
   */
  async clickCampaignCardButtonByIndex(
    index: number,
    language: LanguagesEnum = LanguagesEnum.BG,
  ): Promise<void> {
    let supportButtonText = ''
    if (language === LanguagesEnum.BG) {
      supportButtonText = this.bgLearnMoreActionButtonText
    } else if (language === LanguagesEnum.EN) {
      supportButtonText = this.enLearnMoreActionButtonText
    } else {
      throw new Error('Invalid language!')
    }
    const cardActionButtonElement = this.page
      .locator(`[data-testid="campaign-card-${index}"]`)
      .locator('../../..')
      .locator(this.cardActionButtons, { hasText: supportButtonText })
    await this.clickElementByLocator(cardActionButtonElement)
  }

  /**
   * Check if Donors section in campaing summary is visible on the Campaigns page
   * @param {LanguagesEnum} language - the default value is BG
   */
  async isDonorsSectionVisible(language: LanguagesEnum = LanguagesEnum.BG): Promise<boolean> {
    const donorsTab = this.page.getByTestId('summary-donors')
    return donorsTab.isVisible()
  }

  /**
   * Check if Wishes section in campaing summary is visible on the Campaigns page
   * @param {LanguagesEnum} language - the default value is BG
   */
  async isWishesSectionVisible(language: LanguagesEnum = LanguagesEnum.BG): Promise<boolean> {
    const wishesTab = this.page.getByTestId('summary-wishes')
    return wishesTab.isVisible()
  }
}
