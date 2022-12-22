import { expect, Page, test } from '@playwright/test'
import { HomePage } from '../../pages/web-pages/home.page'

// This spec contains smoke E2E tests for the Home page
test.describe('Homepage smoke tests - BG language version', async () => {
  let page: Page
  let homepage: HomePage

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage()
    homepage = new HomePage(page)
  })

  test.beforeEach(async () => {
    await homepage.navigateToEnvHomepage()
  })

  test.afterAll(async () => {
    await page.close()
  })

  test('Check if "How we work" heading heading is visible', async () => {
    expect(
      await homepage.isHowWeWorkHeadingVisible(),
      '"How we work" heading is not visible.',
    ).toBeTruthy()
  })

  test('Check if "Who is behind Podkrepi" heading is visible', async () => {
    expect(
      await homepage.isTeamSectionHeadingVisible(),
      '"Who is behind Podkrepi" heading is not visible.',
    ).toBeTruthy()
  })

  test('Check if "Join Podkrepi" heading is visible', async () => {
    expect(
      await homepage.isJoinPodkrepiSectionHeadingVisible(),
      '"Join Podkrepi" heading is not visible.',
    ).toBeTruthy()
  })

  test('Check if "FAQ" heading is visible', async () => {
    expect(
      await homepage.isFaqSectionHeadingVisible(),
      '"FAQ" heading is not visible.',
    ).toBeTruthy()
  })

  test('Check if "What is Podkrepi" FAQ list item is visible', async () => {
    await homepage.clickWhatIsPodkrepiFaqListQuestion()
    expect(
      await homepage.isPodkrepiFaqListAnswerVisible(),
      '"What is Podkrepi" FAQ list item is not visible.',
    )
  })
})
