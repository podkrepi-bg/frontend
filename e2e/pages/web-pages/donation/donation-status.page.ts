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

  // -> Navigation links <-
  private readonly bgDonationsLinkText = bgLocalizationDonationFlow.status.success.link.donations
  private readonly enDonationsLinkText = enLocalizationDonationFlow.status.success.link.donations

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

  /**
   * Click the "View your donations" link on the success status page
   */
  async clickViewDonationsProfileLink(
    language: LanguagesEnum = LanguagesEnum.BG,
  ): Promise<void> {
    // Ensure the success status page is fully loaded before clicking the link
    const successTitle =
      language === LanguagesEnum.BG ? this.bgSuccessTitle : this.enSuccessTitle
    await this.page.getByText(successTitle).waitFor({ state: 'visible', timeout: 15000 })

    const linkText =
      language === LanguagesEnum.BG ? this.bgDonationsLinkText : this.enDonationsLinkText
    const link = this.page.getByText(linkText, { exact: true })
    await link.waitFor({ state: 'visible', timeout: 10000 })
    await link.click()
    await this.page.waitForLoadState()
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
