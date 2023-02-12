import { test, expect, Page } from '@playwright/test'
import { HeaderPage } from '../../../pages/web-pages/header.page'
import { HomePage } from '../../../pages/web-pages/home.page'
import { CampaignsPage } from '../../../pages/web-pages/campaigns/campaigns.page'
import { enLocalizationDonationFlow } from '../../../data/localization'
import { DonationPage } from '../../../pages/web-pages/donation/donation.page'
import { DonationRegions } from '../../../data/enums/donation-regions.enum'
import { LanguagesEnum } from '../../../data/enums/languages.enum'

// This spec contains E2E tests related to anonymous donation flow - fixed amount
// The tests are dependent, the whole describe should be runned
test.describe.skip(
  'Anonymous contributor is able to donate fixed amount - EN language version',
  async () => {
    let page: Page
    let homepage: HomePage
    let headerPage: HeaderPage
    let campaignsPage: CampaignsPage
    let donationPage: DonationPage
    // Localization texts
    const enCardIncludeFeesText =
      enLocalizationDonationFlow.step['payment-method'].alert['card-fee']

    test.beforeAll(async ({ browser }) => {
      page = await browser.newPage()
      homepage = new HomePage(page)
      headerPage = new HeaderPage(page)
      campaignsPage = new CampaignsPage(page)
      donationPage = new DonationPage(page)
      // For local executions use method navigateToLocalhostHomepage();
      // await homepage.navigateToLocalhostHomepage();
      await homepage.navigateToEnvHomepage()
      await headerPage.changeanguageHeaderButtonToBe(LanguagesEnum.EN)
    })

    test.afterAll(async () => {
      await page.close()
    })

    test('Particular campaign can be opened through the Campaign page', async () => {
      await headerPage.clickDonateHeaderNavButton()
      await campaignsPage.clickCampaignCardByIndex(0)
      // We move from the common Campaigns page to the particular campain page
      // check if the url is changed only based on the url pattern http://localhost:3040/campaigns/{slug-based-regexp}
      // expect to not break

      expect(
        await campaignsPage.checkPageUrlByRegExp(),
        'The url is not changed after clicking on the campaign card.',
      )
    })

    test('The total charge, fee tax and donation amount are visible on the Campaign page', async () => {
      await campaignsPage.clickDonationSupportButton()
      await donationPage.checkPageUrlByRegExp()
      expect
        .soft(
          await donationPage.isSelectAmountStepActive(LanguagesEnum.EN),
          'Select Amount step is not active.',
        )
        .toBeTruthy()
      await donationPage.selectRadioButtonByLabelText(['10'])
      await donationPage.setDonationRegionFromTheDropdown(DonationRegions.EUROPE)
      await donationPage.selectCheckboxByLabelText([enCardIncludeFeesText])
    })

    test('The total charge, fee tax and donation amount are recalculated correctly when the donation amount is changed', async () => {
      await donationPage.selectRadioButtonByLabelText(['20'])
    })
  },
)
