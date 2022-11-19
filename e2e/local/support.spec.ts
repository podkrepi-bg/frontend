import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3040/')
})

test('test support page', async ({ page }) => {
  // Click text=Станете доброволец >> nth=0
  await page.locator('text=Станете доброволец').first().click()

  await page.waitForURL('http://localhost:3040/support')
  // Click h1:has-text("Станете доброволец")
  await expect(page.locator('h1:has-text("Станете доброволец")')).toBeVisible()

  // Click text=Как искате да ни подкрепите?
  await expect(page.locator('text=Как искате да ни подкрепите?')).toBeVisible()

  // Click text=Включете се в организацията като:
  await expect(page.locator('text=Включете се в организацията като:')).toBeVisible()

  // Check input[name="roles\.benefactor"]
  await page.locator('input[name="roles\\.benefactor"]').check()

  // Check input[name="roles\.associationMember"]
  await page.locator('input[name="roles\\.associationMember"]').check()

  // Click text=Напред
  await page.locator('text=Напред').click()

  // Click text=В каква роля искате да ни подкрепите?
  await expect(page.locator('text=В каква роля искате да ни подкрепите?')).toBeVisible()

  // Click text=Назад
  await page.locator('text=Назад').click()

  // Click text=Как искате да ни подкрепите?
  await expect(page.locator('text=Как искате да ни подкрепите?')).toBeVisible()

  // Click text=Напред
  await page.locator('text=Напред').click()

  // Check input[name="benefactor\.campaignBenefactor"]
  await page.locator('input[name="benefactor\\.campaignBenefactor"]').check()

  // Click text=Дарител в бъдещи кампании
  await expect(page.locator('text=Дарител в бъдещи кампании')).toBeVisible()

  // Click text=Моля, изберете си роля
  // await page.locator('text=Моля, изберете си роля').click()

  // Click text=Дарител в бъдещи кампании
  // await page.locator('text=Дарител в бъдещи кампании').click()

  // Click text=Напред
  await page.locator('text=Напред').click()

  // Click text=Изпратете
  // Formik seems to have problems validating in webkit and chromium on the first click for some reason
  await page.locator('text=Изпратете').click()
  await page.locator('text=Изпратете').click()

  expect(await page.locator('text=Задължително поле').count()).toBe(4)

  // Click text=Моля, приемете oбщите условия
  await expect(page.locator('text=Моля, приемете oбщите условия')).toBeVisible()

  // Click text=Моля, приемете политиката за защита на личните данни
  await expect(
    page.locator('text=Моля, приемете политиката за защита на личните данни'),
  ).toBeVisible()

  // Click input[name="person\.firstName"]
  await page.locator('input[name="person\\.firstName"]').click()

  // Fill input[name="person\.firstName"]
  await page.locator('input[name="person\\.firstName"]').fill('test')

  // Click input[name="person\.lastName"]
  await page.locator('input[name="person\\.lastName"]').click()

  // Fill input[name="person\.lastName"]
  await page.locator('input[name="person\\.lastName"]').fill('test')

  // Click input[name="person\.email"]
  await page.locator('input[name="person\\.email"]').click()

  // Fill input[name="person\.email"]
  await page.locator('input[name="person\\.email"]').fill('test@test.com')

  // Click input[name="person\.phone"]
  await page.locator('input[name="person\\.phone"]').click()

  // Fill input[name="person\.phone"]
  await page.locator('input[name="person\\.phone"]').fill('0987654321')

  // Click textarea[name="person\.comment"]
  await page.locator('textarea[name="person\\.comment"]').click()

  // Fill textarea[name="person\.comment"]
  await page.locator('textarea[name="person\\.comment"]').fill('test test test')

  // Check input[name="person\.terms"]
  await page.locator('input[name="person\\.terms"]').check()

  // Check input[name="person\.gdpr"]
  await page.locator('input[name="person\\.gdpr"]').check()

  // Check input[name="person\.newsletter"]
  await page.locator('input[name="person\\.newsletter"]').check()

  // Click text=Изпратете
  await page.locator('text=Изпратете').click()

  // Click text=Благодарим Ви, че ни подкрепихте!
  await expect(page.locator('text=Благодарим Ви, че ни подкрепихте!')).toBeVisible()

  // Click text=Очаквайте представител на Подкрепи.бг да се свърже с Вас на посочения имейл адре
  await page
    .locator(
      'text=Очаквайте представител на Подкрепи.бг да се свърже с Вас на посочения имейл адрес',
    )
    .click()
})
