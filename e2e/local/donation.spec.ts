import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3040/campaigns/donation/temporibus-explicabo-aspernatur')
})

test('test rendering and defaults', async ({ page }) => {
  // Click text=Спешни кампании
  await expect(
    page.locator('label', { has: page.locator('text=Карта') }).locator('input[type="radio"]'),
  ).toBeChecked()
  await expect(
    page
      .locator('label', { has: page.locator('text=Банков превод') })
      .locator('input[type="radio"]'),
  ).not.toBeChecked()
})

test('choosing a predefined value and continuing', async ({ page }) => {
  // Click text=Спешни кампании
  // Click text=Спешни кампании
  await page
    .locator('[role="radiogroup"]')
    .locator('label', { has: page.locator('text=Друга сума') })
    .locator('input[type="radio"]')
    .check()

  // Choose a predefined value from the radio buttons
  await page
    .locator('[role="radiogroup"]')
    .locator('label', { has: page.locator('text=5 лв.') })
    .locator('input[type="radio"]')
    .check()

  // Click checbox to cover the tax by stripe
  await page.locator('input[name="cardIncludeFees"]').check()
  await page.locator('button:has-text("Напред")').click()
})

test('choosing a custom value and continuing', async ({ page }) => {
  // Click text=Спешни кампании
  await page
    .locator('[role="radiogroup"]')
    .locator('label', { has: page.locator('text=Друга сума') })
    .locator('input[type="radio"]')
    .check()

  // Choose a custom value
  await page
    .locator(
      // This selector is needed because MUI doubles the input field when using collapse animation
      'div.MuiCollapse-root:not(.MuiCollapse-hidden) input[name="otherAmount"][aria-invalid=false]',
    )
    .fill('100')

  // Click checbox to cover the tax by stripe
  await page.locator('input[name="cardIncludeFees"]').check()
  await page.locator('button:has-text("Напред")').click()
})
