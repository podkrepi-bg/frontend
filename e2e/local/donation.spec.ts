import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3040/', { waitUntil: 'networkidle' })
  await page.locator('text="Подкрепете сега"').first().click()
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

//This test will not pass since the keycloak is not yet working in the e2e tests

// test.describe('logged in user donation flow', () => {
//   test('choosing a predefined value and donate', async ({ page }) => {
//     // Choose a predefined value from the radio buttons
//     await page.locator('input[value="card"]').check()
//     await page.locator('input[value="500"]').check()

//     // Click checkbox to cover the tax by stripe
//     await page.locator('input[name="cardIncludeFees"]').check()
//     await page.locator('button:has-text("Напред")').click()

//     await expect(page.locator('text=Вече сте влезли във Вашия профил')).toBeDefined()
//     await page.locator('button:has-text("Напред")').click()

//     await page.fill('textarea', 'Test message')
//     await page.locator('button:has-text("Премини към плащане")').click()

//     await page.waitForURL((url) => url.host === 'checkout.stripe.com')

//     await expect(page.locator('text=BGN 5.00')).toBeDefined()
//     await page.locator('input[name="email"]').fill('admin@podkrepi.bg')
//     await page.locator('input[name="cardNumber"]').fill('4242424242424242')
//     await page.locator('input[name="cardExpiry"]').fill('0424')
//     await page.locator('input[name="cardCvc"]').fill('123')
//     await page.locator('input[name="billingName"]').fill('John Doe')
//     await page.locator('select[name="billingCountry"]').selectOption('BG')

//     await page.locator('button[data-testid="hosted-payment-submit-button"]').click()

//     await page.waitForURL((url) => url.searchParams.get('success') === 'true')

//     await expect(page.locator('text=Благодарим за доверието и подкрепата!')).toBeDefined()
//   })
// })

test.describe('anonymous user donation flow', () => {
  test('choosing a custom value and continuing', async ({ page }) => {
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
})
