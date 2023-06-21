import { Page, expect } from '@playwright/test'
import { LanguagesEnum } from '../../../data/enums/languages.enum'
import { bgLocalizationCampaigns, enLocalizationCampaigns } from '../../../data/localization'
import { SLUG_REGEX } from '../../../utils/helpers'
import { HomePage } from '../home.page'

export class CampaignsPage extends HomePage {
  constructor(page: Page) {
    super(page)
  }

  private readonly donationGrid = '.InlineDonation-inlineDonationWrapper'
  private readonly donationSupportButton = this.donationGrid + ' a button'
  private readonly filterButtonsCommonSelector = 'ul button.CampaignFilter-filterButtons'
  // private readonly campaignContainerItem = ".MuiGrid-container .MuiGrid-item";
  private readonly cardActions = '.MuiCardActions-root'
  private readonly cardActionButtons = this.cardActions + ' button'
  // Main headings
  private readonly bgMainCampaignsHeading = bgLocalizationCampaigns.campaigns
  private readonly enMainCampaignsHeading = enLocalizationCampaigns.campaigns
  private readonly bgSupportCauseTodayHeading = bgLocalizationCampaigns.cta['support-cause-today']
  private readonly enSupportCauseTodayHeading = enLocalizationCampaigns.cta['support-cause-today']
  private readonly bgSupportNowActionButtonText = bgLocalizationCampaigns.cta['support-now']
  private readonly enSupportNowActionButtonText = enLocalizationCampaigns.cta['support-now']

  async checkPageUrlByRegExp(urlRegExpAsString?: string, timeoutParam = 10000): Promise<void> {
    await this.page.waitForTimeout(1000)
    await expect(this.page, 'The URL is not correct!').toHaveURL(
      new RegExp(urlRegExpAsString || `^(.*?)/campaigns/${SLUG_REGEX}`),
      {
        timeout: timeoutParam,
      },
    )
  }

  /**
   * Click donation Support button into the donation grid container
   */
  async clickDonationSupportButton(): Promise<void> {
    await this.clickElement(this.donationSupportButton)
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
      supportButtonText = this.bgSupportNowActionButtonText
    } else if (language === LanguagesEnum.EN) {
      supportButtonText = this.enSupportNowActionButtonText
    } else {
      throw new Error('Invalid language!')
    }
    const cardActionButtonElement = this.page
      .locator(`[data-testid="campaign-card-${index}"]`)
      .locator('../../..')
      .locator(this.cardActionButtons, { hasText: supportButtonText })
    await this.clickElementByLocator(cardActionButtonElement)
  }
}
