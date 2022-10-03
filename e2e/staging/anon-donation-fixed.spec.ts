import { test, expect } from '@playwright/test'

test('test anonymous donation on staging - fixed amount', async ({ page }) => {
  // Go to https://dev.podkrepi.bg/
  await page.goto('https://dev.podkrepi.bg/')

  // Click text=Дарете сега >> nth=0
  await page.locator('text=Дарете сега').first().click()
  await expect(page).toHaveURL(
    'https://dev.podkrepi.bg/campaigns/donation/krizisen-centur-za-postradali-ot-nasilie-shans-za-nov-zhivot',
  )

  // Click label:has-text("10 лв.")
  await page.locator('label:has-text("10 лв.")').click()

  // Click text=Искам да покрия таксите за плащане с карта издадена в:
  await page.locator('text=Искам да покрия таксата за карта издадена в:').click()

  // Click text=10,65 лв.
  await page.locator('text=10,65 лв.').click()

  // Click text=0,65 лв. >> nth=1
  await page.locator('text=0,65 лв.').nth(1).click()

  // Click text=10,00 лв.
  await page.locator('text=10,00 лв.').click()

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
  await page.locator('textarea[name="message"]').fill('e2e test')

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
  await page.locator('[placeholder="CVC"]').fill('4242')

  // Click [data-testid="hosted-payment-submit-button"]
  await page.locator('[data-testid="hosted-payment-submit-button"]').click()

  // Fill input[name="billingName"]
  await page.locator('input[name="billingName"]').fill('e2e tester')

  // Click [data-testid="hosted-payment-submit-button"]
  await page.locator('[data-testid="hosted-payment-submit-button"]').click()

  // Go to https://dev.podkrepi.bg/campaigns/donation/krizisen-centur-za-postradali-ot-nasilie-shans-za-nov-zhivot?success=true
  await page.goto(
    'https://dev.podkrepi.bg/campaigns/donation/krizisen-centur-za-postradali-ot-nasilie-shans-za-nov-zhivot?success=true',
  )

  // Click text=Благодарим за доверието и подкрепата!
  await expect(page.locator('text=Благодарим за доверието и подкрепата!')).toBeDefined()
})
