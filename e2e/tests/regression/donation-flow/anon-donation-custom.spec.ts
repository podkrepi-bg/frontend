import { test, expect, Page } from '@playwright/test'
import { HeaderPage } from '../../../pages/web-pages/header.page'
import { HomePage } from '../../../pages/web-pages/home.page'
import { CampaignsPage } from '../../../pages/web-pages/campaigns/campaigns.page'
import { DonationPage } from '../../../pages/web-pages/campaigns/donation.page'
import { DonationRegions } from '../../../data/enums/donation-regions.enum'
import { bgLocalizationDonationFlow } from '../../../data/localization'
import { DonationFormPaymentMethod } from 'components/donation-flow/helpers/types'

// This spec contains E2E tests related to anonymous donation flow - custom amount
// The tests are dependent, the whole describe should be runned
test.describe.skip(
  'Anonymous contributor is able to donate custom amount - BG language version',
  async () => {
    let page: Page
    let homepage: HomePage
    let headerPage: HeaderPage
    let campaignsPage: CampaignsPage
    let donationPage: DonationPage
    // Localization texts
    const otherAmountText = bgLocalizationDonationFlow.step.amount.field['other-amount'].label
    const bgCardIncludeFeesText =
      bgLocalizationDonationFlow.step['payment-method'].field['include-fees'].label

    test.beforeAll(async ({ browser }) => {
      page = await browser.newPage()
      homepage = new HomePage(page)
      headerPage = new HeaderPage(page)
      campaignsPage = new CampaignsPage(page)
      donationPage = new DonationPage(page)
      // For local executions use method navigateToLocalhostHomepage();
      // await homepage.navigateToLocalhostHomepage();
      await homepage.navigateToEnvHomepage()
    })

    test.afterAll(async () => {
      await page.close()
    })

    test('Particular campaign can be opened through the Campaign page', async () => {
      await headerPage.clickDonateHeaderNavButton()
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
      expect
        .soft(await donationPage.isSelectAmountStepActive(), 'Select Amount step is not active.')
        .toBeTruthy()
      await donationPage.selectRadioButtonByLabelText([otherAmountText])
      await donationPage.fillOtherAmountInputField('7.50')
      await donationPage.selectPaymentMethod(DonationFormPaymentMethod.CARD)
      await donationPage.setDonationRegionFromTheDropdown(DonationRegions.EUROPE)
      await donationPage.selectCheckboxByLabelText([bgCardIncludeFeesText])
    })

    test('The total charge, fee tax and donation amount are recalculated correctly when the donation amount is changed', async () => {
      await donationPage.fillOtherAmountInputField('12.90')
      await donationPage.checkTotalAmount(12.9)
    })

    test('The user is able to fill in e-mail for anonymous donation', async () => {
      return
    })
  },
)
