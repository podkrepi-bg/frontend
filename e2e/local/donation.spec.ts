import { test, expect } from '@playwright/test'
import { expectCopied } from '../helpers'

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3040/', { waitUntil: 'networkidle' })
  await page.locator('button:not([disabled]):has-text("Подкрепете сега")').first().click()
  await page.waitForURL((url) => url.pathname.includes('/campaigns/donation'))
})

test.describe('donation page init', () => {
  test('test rendering and defaults', async ({ page }) => {
    await expect(
      page.locator('label', { has: page.locator('text=Карта') }).locator('input[type="radio"]'),
    ).toBeChecked()
    await expect(
      page
        .locator('label', { has: page.locator('text=Банков превод') })
        .locator('input[type="radio"]'),
    ).not.toBeChecked()
  })
})

test.describe('anonymous user card donation flow', () => {
  test('choosing a predefined value and donating', async ({ page }) => {
    // Choose a predefined value from the radio buttons
    await page.locator('input[value="card"]').check()
    await page.locator('input[value="500"]').check()

    // Click checkbox to cover the tax by stripe
    await page.locator('input[name="cardIncludeFees"]').check()
    await page.locator('button:has-text("Напред")').click()

    await page.locator('text=Дарете анонимно').click()
    await page.locator('button:has-text("Напред")').click()

    await page.fill('textarea', 'е2е_tester')
    await page.locator('button:has-text("Премини към плащане")').click()

    await expect(page.locator('text=BGN 5.00')).toBeDefined()
    await page.locator('input[name="email"]').fill('anon_e2e_tester@podkrepi.bg')
    await page.locator('input[name="cardNumber"]').fill('4242424242424242')
    await page.locator('input[name="cardExpiry"]').fill('04 / 24')
    await page.locator('input[name="cardCvc"]').fill('123')
    await page.locator('input[name="billingName"]').fill('John Doe')
    await page.locator('select[name="billingCountry"]').selectOption('BG')

    await page.locator('button[data-testid="hosted-payment-submit-button"]').click()

    await page.waitForURL((url) => url.pathname.includes('/campaigns/donation'))

    expect(page.locator('text=Благодарим за доверието и подкрепата!')).toBeDefined()
  })

  test('choosing a custom value and donating', async ({ page }) => {
    // Choose a predefined value from the radio buttons
    await page.locator('input[value="card"]').check()
    await page.locator('input[value="other"]').check()
    // Need to take the first here because MUICollapse animations creates a copy
    await page.locator('input[name="otherAmount"]').first().type('6')

    // Click checkbox to cover the tax by stripe
    await page.locator('input[name="cardIncludeFees"]').check()
    await page.locator('button:has-text("Напред")').click()

    await page.locator('text=Дарете анонимно').click()
    await page.locator('button:has-text("Напред")').click()

    await page.fill('textarea', 'е2е_tester')
    await page.locator('button:has-text("Премини към плащане")').click()

    await expect(page.locator('text=BGN 6.58')).toBeDefined()
    await page.locator('input[name="email"]').fill('anon_e2e_tester@podkrepi.bg')
    await page.locator('input[name="cardNumber"]').fill('4242424242424242')
    await page.locator('input[name="cardExpiry"]').fill('0424')
    await page.locator('input[name="cardCvc"]').fill('123')
    await page.locator('input[name="billingName"]').fill('John Doe')
    await page.locator('select[name="billingCountry"]').selectOption('BG')

    await page.locator('button[data-testid="hosted-payment-submit-button"]').click()

    await page.waitForURL((url) => url.pathname.includes('/campaigns/donation'))
    expect(page.url().search('success=true')).not.toBe(-1)

    expect(page.locator('text=Благодарим за доверието и подкрепата!')).toBeDefined()
  })
})

test.describe('user bank transfer donation flow', () => {
  test('check copied values', async ({ page }) => {
    // Choose a predefined value from the radio buttons
    await page.locator('input[value="bank"]').check()
    expect(await page.locator('text="Копирай"').count()).toBe(4)

    if (page.context().browser()?.browserType().name() === 'chromium') {
      await page.context().grantPermissions(['clipboard-read', 'clipboard-write'])
      await page.locator('text="Копирай"').nth(0).click()
      await expectCopied(page, 'Сдружение Подкрепи БГ')
      await page.locator('text="Копирай"').nth(1).click()
      await expectCopied(page, 'Уникредит Булбанк')
      await page.locator('text="Копирай"').nth(2).click()
      await expectCopied(page, 'BG66UNCR70001524349032')
      await page.locator('text="Копирай"').nth(3).click()
      const reference = await page.locator('p[data-testid="payment-reference-field"]').innerText()
      await expectCopied(page, reference)
    }
  })
})
