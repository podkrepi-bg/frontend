import { Page } from '@playwright/test'
import { expect, giverTest as test } from '../../../utils/fixtures'
import { ProfilePage } from '../../../pages/web-pages/profile/profile.page'

// This spec contains E2E tests related to cancelling a monthly subscription donation
// It relies on the giver user already having an active subscription
// (created by monthly-donation-authenticated.spec.ts)
test.describe.serial(
  'Authenticated user is able to cancel a monthly subscription donation - BG',
  async () => {
    let page: Page
    let profilePage: ProfilePage

    test.use({ locale: 'bg-BG' })

    test.beforeAll(async ({ browser, storageState, baseURL }) => {
      const context = await browser.newContext({ storageState, baseURL: baseURL || undefined })
      page = await context.newPage()
      profilePage = new ProfilePage(page)
    })

    test.afterAll(async () => {
      await page.close()
    })

    test('Navigate to recurring donations and verify active donation exists', async () => {
      await profilePage.navigateToRecurringDonations()
      expect(await profilePage.isRecurringDonationVisible()).toBe(true)
      expect(await profilePage.isActiveDonationVisible()).toBe(true)
    })

    test('Click cancel on an active recurring donation', async () => {
      await profilePage.clickCancelButtonForFirstActiveDonation()
    })

    test('Confirm the cancellation in the dialog', async () => {
      await profilePage.confirmCancellation()
    })

    test('Verify the donation status is changed to cancelled', async () => {
      // After confirming cancellation, verify the active donation is no longer active
      // Uses Playwright's auto-retrying expect to handle grid re-renders after mutation
      await profilePage.verifyNoActiveDonations()
    })
  },
)
