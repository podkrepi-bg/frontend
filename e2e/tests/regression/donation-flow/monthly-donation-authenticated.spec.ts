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
// for an already authenticated user (giver)
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

    test('Particular campaign can be opened through the Campaign page', async () => {
      await headerPage.clickDonateHeaderNavButton(LanguagesEnum.BG)
      await campaignsPage.clickCampaignCardByIndex(0)
      expect(
        await campaignsPage.checkPageUrlByRegExp(),
        'The url is not changed after clicking on the campaign card.',
      )
    })

    test('Open donation form and select amount with monthly payment mode', async () => {
      await campaignsPage.clickDonationSupportButton()
      await donationPage.checkPageUrlByRegExp()
      await donationPage.selectRadioButtonByLabelText(['10'])
      await donationPage.selectPaymentMode('subscription')
    })

    test('Fill in the Stripe card form', async () => {
      await donationPage.setDonationRegionFromTheDropdown(DonationRegions.EUROPE)
      await donationPage.fillCardForm({ fail: false })
    })

    test('Verify user is already authenticated and submit the form', async () => {
      await donationPage.waitForAuthenticatedState()
      await donationPage.checkPrivacyCheckbox()
      await donationPage.submitForm()
      // Wait for Stripe to process the SetupIntent and redirect
      await page.waitForURL(/\/status/, { timeout: 60000 })
    })

    test('The user is redirected to the success status page', async () => {
      await statusPage.checkPageUrlByRegExp(undefined, 10000)
      expect(await statusPage.isSucceededStatusTitleDisplayed()).toBe(true)
    })

    test('Navigate to profile and verify recurring donation exists', async () => {
      await statusPage.clickViewDonationsProfileLink()
      await profilePage.navigateToRecurringDonations()
      expect(await profilePage.isRecurringDonationVisible()).toBe(true)
    })
  },
)
