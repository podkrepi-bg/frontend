import { Page, expect } from '@playwright/test'
import { LanguagesEnum } from '../../../data/enums/languages.enum'
import { bgLocalizationDonationFlow, enLocalizationDonationFlow } from '../../../data/localization'
import { SLUG_REGEX } from '../../../utils/helpers'
import { CampaignsPage } from '../campaigns/campaigns.page'
export class DonationStatusPage extends CampaignsPage {
  constructor(page: Page) {
    super(page)
  }

  // -> Status titles <-
  private readonly bgSuccessTitle = bgLocalizationDonationFlow.status.success.title
  private readonly enSuccessTitle = enLocalizationDonationFlow.status.success.title

  // -> Wish form <-
  private readonly wishSendText = bgLocalizationDonationFlow.status.success.wish.send

  async checkPageUrlByRegExp(urlRegExpAsString?: string, timeoutParam = 10000): Promise<void> {
    await expect(this.page, 'The URL is not correct!').toHaveURL(
      new RegExp(urlRegExpAsString || `^(.*?)/campaigns/donation/${SLUG_REGEX}/status?.+$`, 'g'),
      {
        timeout: timeoutParam,
      },
    )
  }

  async isSucceededStatusTitleDisplayed(
    language: LanguagesEnum = LanguagesEnum.BG,
  ): Promise<boolean> {
    return this.isH4HeadingVisible(language, this.bgSuccessTitle, this.enSuccessTitle)
  }

  async submitWishForm(): Promise<void> {
    const wishAreaLocator = await this.page.locator('textarea[name="wish"]')
    await this.waitForElementToBeReadyByLocator(wishAreaLocator)
    await wishAreaLocator.fill('e2e_test_wish')
    const buttonLocator = await this.page.locator('button[type="submit"]', {
      hasText: this.wishSendText,
    })
    await this.clickElementByLocator(buttonLocator)
  }
}
