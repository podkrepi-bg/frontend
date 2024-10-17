import { test, expect, Page } from '@playwright/test'
import { HeaderPage } from '../../../pages/web-pages/header.page'
import { HomePage } from '../../../pages/web-pages/home.page'
import { CampaignsPage } from '../../../pages/web-pages/campaigns/campaigns.page'
import { DonationPage } from '../../../pages/web-pages/donation/donation.page'
import { DonationRegions } from '../../../data/enums/donation-regions.enum'
import { enLocalizationDonationFlow } from '../../../data/localization'
import {
  DonationFormAuthState,
  DonationFormPaymentMethod,
} from '../../../../src/components/client/donation-flow/helpers/types'
import { DonationStatusPage } from '../../../pages/web-pages/donation/donation-status.page'
import { LanguagesEnum } from '../../../data/enums/languages.enum'

// This spec contains E2E tests related to anonymous donation flow - custom amount
// The tests are dependent, the whole describe should be runned

test.use({ locale: 'en-US' })
test.describe.serial(
  'Anonymous contributor is able to donate fixed amount - EN language version',
  async () => {
    let page: Page
    let homepage: HomePage
    let headerPage: HeaderPage
    let campaignsPage: CampaignsPage
    let donationPage: DonationPage
    let statusPage: DonationStatusPage
    // Localization texts
    const paymentMode = enLocalizationDonationFlow.step['payment-mode'].fields['one-time']
    const bgCardIncludeFeesText =
      enLocalizationDonationFlow.step['payment-method'].field['include-fees'].label

    test.beforeAll(async ({ browser }) => {
      page = await browser.newPage()
      homepage = new HomePage(page)
      headerPage = new HeaderPage(page)
      campaignsPage = new CampaignsPage(page)
      donationPage = new DonationPage(page)
      statusPage = new DonationStatusPage(page)
      // For local executions use method navigateToLocalhostHomepage();
      // await homepage.navigateToLocalhostHomepage();
      await homepage.navigateToEnvHomepage()
      await headerPage.changeLanguageToBe(LanguagesEnum.EN)
    })

    test.afterAll(async () => {
      await page.close()
    })

    test('Particular campaign can be opened through the Campaign page', async () => {
      await headerPage.clickDonateHeaderNavButton(LanguagesEnum.EN)
      await campaignsPage.clickCampaignCardByIndex(0)
      // We move from the common Campaigns page to the particular campain page
      // check if the url is changed only based on the url pattern http://localhost:3040/campaigns/{slug-based-regexp}
      expect(
        await campaignsPage.checkPageUrlByRegExp(),
        'The url is not changed after clicking on the campaign card.',
      )
    })

    test('The total charge, fee tax and donation amount are visible on the Campaign page', async () => {
      await campaignsPage.clickDonationSupportButton()
      await donationPage.checkPageUrlByRegExp()
      await donationPage.selectRadioButtonByLabelText(['10'])
      await donationPage.selectRadioButtonByLabelText([paymentMode])
      await donationPage.selectPaymentMethod(DonationFormPaymentMethod.CARD, LanguagesEnum.EN)
      await donationPage.setDonationRegionFromTheDropdown(DonationRegions.EUROPE)
      await donationPage.selectCheckboxByLabelText([bgCardIncludeFeesText])
    })

    test('The total charge, fee tax and donation amount are recalculated correctly when the donation amount is changed', async () => {
      await donationPage.selectRadioButtonByLabelText(['20'])
      await donationPage.checkTotalAmount(20.75, LanguagesEnum.EN)
    })

    test('Fill in the stripe card form', async () => {
      await donationPage.fillCardForm({
        fail: false,
      })
    })

    test('The user is able to fill in e-mail for anonymous donation', async () => {
      await donationPage.selectAuthentication(DonationFormAuthState.NOREGISTER, LanguagesEnum.EN)
    })

    test('The user can submit the form', async () => {
      await donationPage.checkPrivacyCheckbox(LanguagesEnum.EN)
      await donationPage.submitForm(LanguagesEnum.EN)
    })

    test('The user is redirected to succes page', async () => {
      await statusPage.checkPageUrlByRegExp()
      expect(await statusPage.isSucceededStatusTitleDisplayed(LanguagesEnum.EN)).toBe(true)
    })
  },
)
