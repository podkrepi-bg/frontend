import { Page, expect } from '@playwright/test'
import { LanguagesEnum } from '../../../data/enums/languages.enum'
import {
  bgLocalizationRecurringDonation,
  enLocalizationRecurringDonation,
} from '../../../data/localization'
import { BasePage } from '../base.page'

export class ProfilePage extends BasePage {
  constructor(page: Page) {
    super(page)
  }

  // -> Recurring donation statuses <-
  private readonly bgActiveStatus = bgLocalizationRecurringDonation.statuses.active
  private readonly enActiveStatus = enLocalizationRecurringDonation.statuses.active
  private readonly bgCancelledStatus = bgLocalizationRecurringDonation.statuses.canceled
  private readonly enCancelledStatus = enLocalizationRecurringDonation.statuses.canceled

  // -> Confirmation dialog texts <-
  private readonly bgConfirmButtonText = bgLocalizationRecurringDonation.cta.confirm
  private readonly enConfirmButtonText = enLocalizationRecurringDonation.cta.confirm

  // -> Selectors <-
  private readonly dataGridRowSelector = '.MuiDataGrid-row'

  /**
   * Navigate directly to the recurring donations profile page
   */
  async navigateToRecurringDonations(): Promise<void> {
    await this.navigateToUrl('/profile/recurring-donations')
  }

  /**
   * Check that the page URL matches the recurring donations profile page
   */
  async checkPageUrlByRegExp(timeoutParam = 10000): Promise<void> {
    await expect(this.page, 'The URL is not correct!').toHaveURL(
      /\/profile\/recurring-donations/,
      { timeout: timeoutParam },
    )
  }

  /**
   * Check if at least one recurring donation is visible in the DataGrid
   */
  async isRecurringDonationVisible(timeoutParam = 15000): Promise<boolean> {
    return this.isElementVisibleBySelectorWithTimeout(
      this.dataGridRowSelector,
      null,
      timeoutParam,
    )
  }

  /**
   * Wait for a recurring donation row to appear in the DataGrid.
   * Stripe webhook → backend persist is async, and React Query caches the
   * empty-rows response from the first fetch. Reload on each poll so a fresh
   * backend query runs; otherwise we'd poll stale client-side cache forever.
   */
  async waitForRecurringDonation(timeoutMs = 60000): Promise<void> {
    await expect
      .poll(
        async () => {
          await this.page.reload()
          return this.isRecurringDonationVisible(2000)
        },
        { timeout: timeoutMs, intervals: [2000, 3000, 5000] },
      )
      .toBe(true)
  }

  /**
   * Check if at least one active recurring donation is visible in the DataGrid
   */
  async isActiveDonationVisible(
    language: LanguagesEnum = LanguagesEnum.BG,
    timeoutParam = 15000,
  ): Promise<boolean> {
    const activeStatus =
      language === LanguagesEnum.BG ? this.bgActiveStatus : this.enActiveStatus
    const activeRow = this.page
      .locator(this.dataGridRowSelector, { hasText: activeStatus })
      .first()
    return this.isElementVisibleByLocatorWithTimeout(activeRow, timeoutParam)
  }

  /**
   * Click the cancel button on the first active recurring donation
   */
  async clickCancelButtonForFirstActiveDonation(
    language: LanguagesEnum = LanguagesEnum.BG,
  ): Promise<void> {
    const activeStatus =
      language === LanguagesEnum.BG ? this.bgActiveStatus : this.enActiveStatus
    // Find the first row with active status and click its cancel button
    const activeRow = this.page
      .locator(this.dataGridRowSelector, { hasText: activeStatus })
      .first()
    // Wait for the row to be fully visible (not just attached to DOM)
    await activeRow.waitFor({ state: 'visible', timeout: 15000 })
    const cancelButton = activeRow.locator('button').first()
    await cancelButton.waitFor({ state: 'visible', timeout: 5000 })
    await cancelButton.click()
  }

  /**
   * Confirm the cancellation in the confirmation dialog
   */
  async confirmCancellation(language: LanguagesEnum = LanguagesEnum.BG): Promise<void> {
    const confirmText =
      language === LanguagesEnum.BG ? this.bgConfirmButtonText : this.enConfirmButtonText
    const dialog = this.page.getByRole('dialog')
    await dialog.waitFor({ state: 'visible' })
    await dialog.getByText(confirmText, { exact: true }).click()
  }

  /**
   * Check if any recurring donation cell shows cancelled status
   */
  async verifyNoActiveDonations(
    language: LanguagesEnum = LanguagesEnum.BG,
    timeoutParam = 15000,
  ): Promise<void> {
    const activeStatus =
      language === LanguagesEnum.BG ? this.bgActiveStatus : this.enActiveStatus
    // After cancellation, verify no rows contain "Активно" anymore
    // Using Playwright's auto-retrying expect to handle grid re-renders
    await expect(
      this.page.locator(this.dataGridRowSelector, { hasText: activeStatus }),
    ).toHaveCount(0, { timeout: timeoutParam })
  }
}
