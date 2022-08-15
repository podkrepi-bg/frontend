import { test, expect } from '@playwright/test'

test('test anonymous donation on staging - custom amount', async ({ page }) => {
  // Go to https://dev.podkrepi.bg/
  await page.goto('https://dev.podkrepi.bg/')

  // Click text=Училище за деца с нарушено зрение гр. Варна - стая за ерготерапия
  await page
    .locator('text=Училище за деца с нарушено зрение гр. Варна - стая за ерготерапия')
    .click()
  await expect(page).toHaveURL(
    'https://dev.podkrepi.bg/campaigns/uchilishe-za-deca-s-narusheno-zrenie-gr-varna-staya-za-ergoterapiya',
  )

  // Click button:has-text("Подкрепи")
  await page.locator('button:has-text("Подкрепи")').click()

  await expect(page).toHaveURL(
    'https://dev.podkrepi.bg/campaigns/donation/uchilishe-za-deca-s-narusheno-zrenie-gr-varna-staya-za-ergoterapiya',
  )

  // Click label:has-text("Друга сума")
  await page.locator('label:has-text("Друга сума")').click()

  // Click input[name="otherAmount"]
  await page.locator('input[name="otherAmount"]').click()

  // Fill input[name="otherAmount"]
  await page.locator('input[name="otherAmount"]').fill('7.50')

  // Check input[name="cardIncludeFees"]
  await page.locator('input[name="cardIncludeFees"]').check()

  // Click text=8,11 лв.
  await page.locator('text=8,11 лв.').click()

  // Click text=0,61 лв.
  await page.locator('text=0,61 лв.').click()

  // Click text=7,50 лв.
  await page.locator('text=7,50 лв.').click()

  // Click text=Напред
  await page.locator('text=Напред').click()

  // Click text=Дарете анонимно
  await page.locator('text=Дарете анонимно').click()

  // Click input[name="personsEmail"]
  await page.locator('input[name="personsEmail"]').click()

  // Fill input[name="personsEmail"]
  await page.locator('input[name="personsEmail"]').fill('test@example.com')

  // Click text=Напред
  await page.locator('text=Напред').click()

  // Click textarea[name="message"]
  await page.locator('textarea[name="message"]').click()

  // Fill textarea[name="message"]
  await page.locator('textarea[name="message"]').fill('e2e tester 2')

  // Click text=Премини към плащане
  await page.locator('text=Премини към плащане').click()

  await page.waitForURL((url) =>
    url.toString().startsWith('https://checkout.stripe.com/pay/cs_test_'),
  )

  await expect(page.url()).toContain('https://checkout.stripe.com/pay/cs_test_')

  // Click [placeholder="\31 234 1234 1234 1234"]
  await page.locator('[placeholder="\\31 234 1234 1234 1234"]').click()

  // Fill [placeholder="\31 234 1234 1234 1234"]
  await page.locator('[placeholder="\\31 234 1234 1234 1234"]').fill('4242 4242 4242 4242')

  // Click [placeholder="MM \/ YY"]
  await page.locator('[placeholder="MM \\/ YY"]').click()

  // Fill [placeholder="MM \/ YY"]
  await page.locator('[placeholder="MM \\/ YY"]').fill('04 / 242')

  // Click [placeholder="CVC"]
  await page.locator('[placeholder="CVC"]').click()

  // Fill [placeholder="CVC"]
  await page.locator('[placeholder="CVC"]').fill('424')

  // Click input[name="billingName"]
  await page.locator('input[name="billingName"]').click()

  // Fill input[name="billingName"]
  await page.locator('input[name="billingName"]').fill('tester')

  // Click [data-testid="hosted-payment-submit-button"]
  await page.locator('[data-testid="hosted-payment-submit-button"]').click()

  await page.waitForURL(
    'https://dev.podkrepi.bg/campaigns/donation/uchilishe-za-deca-s-narusheno-zrenie-gr-varna-staya-za-ergoterapiya?success=true',
  )

  // Click text=Благодарим за доверието и подкрепата!
  await page.locator('text=Благодарим за доверието и подкрепата!').click()
})
