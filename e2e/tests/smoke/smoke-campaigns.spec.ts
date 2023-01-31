import { test, expect, Page } from '@playwright/test'

import { CampaignsPage } from '../../pages/web-pages/campaigns/campaigns.page'
import { DonationPage } from '../../pages/web-pages/campaigns/donation.page'
import { HeaderPage } from '../../pages/web-pages/header.page'
import { HomePage } from '../../pages/web-pages/home.page'

// This spec contains smoke E2E tests for the Campaigns page
// The tests are dependent, the whole describe should be runned
test.describe('Campaigns page smoke tests - BG language version', async () => {
  let page: Page
  let homepage: HomePage
  let headerPage: HeaderPage
  let campaignsPage: CampaignsPage
  let donationPage: DonationPage

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage()
    homepage = new HomePage(page)
    headerPage = new HeaderPage(page)
    campaignsPage = new CampaignsPage(page)
    donationPage = new DonationPage(page)

    await homepage.navigateToEnvHomepage()
    await headerPage.clickCampaignsHeaderNavButton()
  })

  test.afterAll(async () => {
    await page.close()
  })

  test('The main page headers are visible', async () => {
    expect
      .soft(
        await campaignsPage.isCampaignsHeadingVisible(),
        'The main Campaigns heading is not visible.',
      )
      .toBeTruthy()
    expect(
      await campaignsPage.isSupportCauseTodayHeadingVisible(),
      'The Support Cause Today heading is not visible.',
    ).toBeTruthy()
  })

  test('Filter buttons count is correct', async () => {
    expect(
      await campaignsPage.getFilterButtonsCount(),
      'Filter buttons count is not correct!',
    ).toEqual(12)
  })

  test('Support Now action button navigates to the Donation page for particular campaign', async () => {
    await campaignsPage.clickCampaignCardButtonByIndex(0)
    await donationPage.checkPageUrlByRegExp()
    expect
      .soft(await donationPage.isSelectAmountStepActive(), 'Select Amount step is not active.')
      .toBeTruthy()
  })
})
