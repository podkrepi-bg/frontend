import { Page } from '@playwright/test'
import { expect, giverTest as test } from '../../../utils/fixtures'
import { HeaderPage } from '../../../pages/web-pages/header.page'
import { HomePage } from '../../../pages/web-pages/home.page'
import { CampaignsPage } from '../../../pages/web-pages/campaigns/campaigns.page'
import { DonationPage } from '../../../pages/web-pages/donation/donation.page'
import { DonationStatusPage } from '../../../pages/web-pages/donation/donation-status.page'
import { ProfilePage } from '../../../pages/web-pages/profile/profile.page'
import { LanguagesEnum } from '../../../data/enums/languages.enum'
import { DonationRegions } from '../../../data/enums/donation-regions.enum'

// This spec contains E2E tests related to monthly subscription donation flow
// for an already authenticated user (giver), including cancellation
test.describe.serial(
  'Authenticated user is able to create a monthly subscription donation - BG',
  async () => {
    let page: Page
    let homepage: HomePage
    let headerPage: HeaderPage
    let campaignsPage: CampaignsPage
    let donationPage: DonationPage
    let statusPage: DonationStatusPage
    let profilePage: ProfilePage

    test.use({ locale: 'bg-BG' })

    test.beforeAll(async ({ browser, storageState, baseURL }) => {
      const context = await browser.newContext({ storageState, baseURL: baseURL || undefined })
      page = await context.newPage()
      homepage = new HomePage(page)
      headerPage = new HeaderPage(page)
      campaignsPage = new CampaignsPage(page)
      donationPage = new DonationPage(page)
      statusPage = new DonationStatusPage(page)
      profilePage = new ProfilePage(page)
      await homepage.navigateToEnvHomepage()
      await headerPage.changeLanguageToBe(LanguagesEnum.BG)
    })

    test.afterAll(async () => {
      await page.close()
    })

    test('Create a monthly subscription donation', async () => {
      await headerPage.clickDonateHeaderNavButton(LanguagesEnum.BG)
      await campaignsPage.clickCampaignCardByIndex(0)
      expect(
        await campaignsPage.checkPageUrlByRegExp(),
        'The url is not changed after clicking on the campaign card.',
      )

      await campaignsPage.clickDonationSupportButton()
      await donationPage.checkPageUrlByRegExp()
      await donationPage.selectRadioButtonByLabelText(['10'])
      await donationPage.selectPaymentMode('subscription')

      await donationPage.setDonationRegionFromTheDropdown(DonationRegions.EUROPE)
      await donationPage.fillCardForm({ fail: false })

      await donationPage.waitForAuthenticatedState()

      await donationPage.checkPrivacyCheckbox()
      await donationPage.submitForm()
      // Wait for Stripe to process the SetupIntent and redirect
      await page.waitForURL(/\/status/, { timeout: 90000 })

      await statusPage.checkPageUrlByRegExp(undefined, 10000)
      expect(await statusPage.isSucceededStatusTitleDisplayed()).toBe(true)
    })

    test('Recurring donation appears in the profile', async () => {
      await statusPage.clickViewDonationsProfileLink()
      await profilePage.navigateToRecurringDonations()
      // Poll for the row to appear instead of a fixed sleep — the Stripe
      // webhook → backend persist timing varies in CI.
      await expect
        .poll(() => profilePage.isRecurringDonationVisible(), { timeout: 30000 })
        .toBe(true)
    })

    test('Cancel the recurring donation', async () => {
      expect(await profilePage.isActiveDonationVisible()).toBe(true)
      await profilePage.clickCancelButtonForFirstActiveDonation()
      await profilePage.confirmCancellation()
      await profilePage.verifyNoActiveDonations()
    })
  },
)
