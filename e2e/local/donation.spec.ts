import { test, expect } from '@playwright/test'

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

test.describe('anonymous user donation flow', () => {
  test('choosing a predefined value and donating', async ({ page }) => {
    // Choose a predefined value from the radio buttons
    await page.locator('input[value="card"]').check()
    await page.locator('input[value="500"]').check()

    // Click checkbox to cover the tax by stripe
    await page.locator('input[name="cardIncludeFees"]').check()
    await page.locator('button:has-text("Напред")').click()

    page.locator('text=Дарете анонимно').click()
    await page.locator('button:has-text("Напред")').click()

    await page.fill('textarea', 'е2е_tester')
    await page.locator('button:has-text("Премини към плащане")').click()

    await expect(page.locator('text=BGN 5.00')).toBeDefined()
    await page.locator('input[name="email"]').fill('anon_e2e_tester@podkrepi.bg')
    await page.locator('input[name="cardNumber"]').fill('4242424242424242')
    await page.locator('input[name="cardExpiry"]').fill('0424')
    await page.locator('input[name="cardCvc"]').fill('123')
    await page.locator('input[name="billingName"]').fill('John Doe')
    await page.locator('select[name="billingCountry"]').selectOption('BG')

    await page.locator('button[data-testid="hosted-payment-submit-button"]').click()

    await page.waitForURL((url) => url.searchParams.get('success') === 'true')

    await expect(page.locator('text=Благодарим за доверието и подкрепата!')).toBeDefined()
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

    page.locator('text=Дарете анонимно').click()
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

    await page.waitForURL((url) => url.searchParams.get('success') === 'true')

    await expect(page.locator('text=Благодарим за доверието и подкрепата!')).toBeDefined()
  })
})
