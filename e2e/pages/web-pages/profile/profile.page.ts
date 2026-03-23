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
    await this.waitForElementToBePresentedByLocator(activeRow)
    const cancelButton = activeRow.locator('button').first()
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
  async isDonationStatusCancelled(
    language: LanguagesEnum = LanguagesEnum.BG,
    timeoutParam = 15000,
  ): Promise<boolean> {
    const cancelledStatus =
      language === LanguagesEnum.BG ? this.bgCancelledStatus : this.enCancelledStatus
    // Target the status cell content directly — MUI DataGrid renders cell text
    // inside div[role="cell"] elements, and row-level hasText may not match
    // due to virtualization or nested element structure
    const cancelledCell = this.page.locator('[data-field="status"]', {
      hasText: cancelledStatus,
    })
    return this.isElementVisibleByLocatorWithTimeout(cancelledCell, timeoutParam)
  }
}
