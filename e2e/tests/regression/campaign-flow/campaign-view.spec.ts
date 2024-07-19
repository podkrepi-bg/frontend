import { test, expect, Page } from '@playwright/test'
import { HeaderPage } from '../../../pages/web-pages/header.page'
import { HomePage } from '../../../pages/web-pages/home.page'
import { CampaignsPage } from '../../../pages/web-pages/campaigns/campaigns.page'
import { DonationPage } from '../../../pages/web-pages/donation/donation.page'
import { StripeCheckoutPage } from '../../../pages/web-pages/external/stripe-checkout.page'
import { LanguagesEnum } from '../../../data/enums/languages.enum'

// This spec contains tests related campaign summary section and
// check summary 'Donors and Wishes' sections appearance and behavior.
test.describe.serial(
  'A contributor is able to see Donors and Wishes in campaign summary section',
  async () => {
    let page: Page
    let homepage: HomePage
    let headerPage: HeaderPage
    let campaignsPage: CampaignsPage
    let donationPage: DonationPage
    let stripeCheckoutPage: StripeCheckoutPage

    test.beforeAll(async ({ browser }) => {
      page = await browser.newPage()
      homepage = new HomePage(page)
      headerPage = new HeaderPage(page)
      campaignsPage = new CampaignsPage(page)
      donationPage = new DonationPage(page)
      stripeCheckoutPage = new StripeCheckoutPage(page)
      // For local executions use method navigateToLocalhostHomepage();
      // await homepage.navigateToLocalhostHomepage();
      await homepage.navigateToEnvHomepage()
      await headerPage.changeLanguageToBe(LanguagesEnum.BG)
    })

    test.afterAll(async () => {
      await page.close()
    })

    test('Particular campaign can be opened through the Campaign page', async () => {
      await headerPage.clickDonateHeaderNavButton(LanguagesEnum.EN)
      await campaignsPage.clickCampaignCardByIndex(0)

      expect(
        await campaignsPage.checkPageUrlByRegExp(),
        'The url is not changed after clicking on the campaign card.',
      )
    })

    test('Particular campaign summary contains Donors and Wishes sections', async () => {
      expect(campaignsPage.page.getByTestId('summary-donors')).toBeVisible()
      expect(campaignsPage.page.getByTestId('summary-wishes')).toBeVisible()

      await campaignsPage.page.getByTestId('summary-donors').click()
      expect(campaignsPage.page.getByTestId('summary-donors-wrapper')).toBeVisible()

      await campaignsPage.page.getByTestId('summary-wishes').click()
      expect(campaignsPage.page.getByTestId('summary-wishes-wrapper')).toBeVisible()
    })
  },
)
