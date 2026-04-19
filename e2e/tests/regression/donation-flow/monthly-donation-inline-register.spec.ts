import { test, expect, Page } from '@playwright/test'
import { HeaderPage } from '../../../pages/web-pages/header.page'
import { HomePage } from '../../../pages/web-pages/home.page'
import { CampaignsPage } from '../../../pages/web-pages/campaigns/campaigns.page'
import { DonationPage } from '../../../pages/web-pages/donation/donation.page'
import { DonationStatusPage } from '../../../pages/web-pages/donation/donation-status.page'
import { ProfilePage } from '../../../pages/web-pages/profile/profile.page'
import { LanguagesEnum } from '../../../data/enums/languages.enum'
import { DonationRegions } from '../../../data/enums/donation-regions.enum'
import {
  DonationFormAuthState,
} from '../../../../src/components/client/donation-flow/helpers/types'

// Generate unique registration data using timestamp to avoid email collisions
function generateUniqueRegisterData() {
  const timestamp = Date.now()
  return {
    firstName: 'E2eTest',
    lastName: 'Subscriber',
    email: `e2e_sub_test_${timestamp}@podkrepi.bg`,
    password: 'Test1234!@#',
    confirmPassword: 'Test1234!@#',
  }
}

// This spec contains E2E tests related to monthly subscription donation flow
// where the user registers via the inline registration form during the donation process
test.describe.serial(
  'User registers inline and creates a monthly subscription donation - BG',
  async () => {
    let page: Page
    let homepage: HomePage
    let headerPage: HeaderPage
    let campaignsPage: CampaignsPage
    let donationPage: DonationPage
    let statusPage: DonationStatusPage
    let profilePage: ProfilePage
    const registerData = generateUniqueRegisterData()

    test.use({ locale: 'bg-BG' })

    test.beforeAll(async ({ browser }) => {
      // Create a fresh context to isolate from other test suites' sessions
      const context = await browser.newContext()
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
      await page.context().close()
    })

    test('Create a monthly subscription donation via inline register', async () => {
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

      await donationPage.selectAuthentication(DonationFormAuthState.REGISTER)
      await donationPage.fillInlineRegisterForm(registerData)
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
      await profilePage.waitForRecurringDonation()
    })
  },
)
