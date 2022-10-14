import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('https://dev.podkrepi.bg/')
})

test('test homepage on staging', async ({ page }) => {
  // Go to http://dev.podkrepi.bg/

  // Click text=Спешни кампании
  await page.locator('text=Спешни кампании').click()

  // Click text=Как работи Подкрепи.бг?
  await page.locator('text=Как работи Подкрепи.бг?').click()

  // Click text=Кой стои зад Подкрепи.бг?
  await page.locator('text=Кой стои зад Подкрепи.бг?').click()

  // Click text=Присъединете се към Подкрепи.бг
  await page.locator('text=Присъединете се към Подкрепи.бг').click()

  // Click h2:has-text("Често задавани въпроси")
  await page.locator('h2:has-text("Често задавани въпроси")').click()

  // Click text=Какво е Подкрепи.бг?
  await page.locator('text=Какво е Подкрепи.бг?').click()

  // Click text=Ние сме общност от доброволци, обединени от идеята да създаваме устойчиви решения за развитието на дарителството в България.
  await page
    .locator(
      'text=Ние сме общност от доброволци, обединени от идеята да създаваме устойчиви решения за развитието на дарителството в България. ',
    )
    .click()
  // Click text=Какво е „безкомпромисна прозрачност”?
  await page.locator('text=Какво е „безкомпромисна прозрачност”?').click()

  // Click text=Нашето разбиране за „безкомпромисна прозрачност” е:
  await page.locator('text=Нашето разбиране за „безкомпромисна прозрачност” е:').click()

  // Click text=Какви са технологичните ви предимства?
  await page.locator('text=Какви са технологичните ви предимства?').click()

  // Click text=Използваме модерни решения и технологии за подсигуряване на платформата – React, Next.js като frontend, PostgreSQL като база данни, а цялостната инфраструктура се управлява на принципа на Infrastructure-as-Codе.
  await page
    .locator(
      'text=Използваме модерни решения и технологии за подсигуряване на платформата – React, Next.js като frontend, PostgreSQL като база данни, а цялостната инфраструктура се управлява на принципа на Infrastructure-as-Codе.',
    )
    .click()

  // Click text=Какво представляват „устойчивите решения”?
  await page.locator('text=Какво представляват „устойчивите решения”?').click()

  // Click text=Една африканска поговорка гласи „Ако искаш да стигнеш бързо, тръгни сам, ако искаш да стигнеш далеч, вървете заедно”.
  await page
    .locator(
      'text=Една африканска поговорка гласи „Ако искаш да стигнеш бързо, тръгни сам, ако искаш да стигнеш далеч, вървете заедно”.',
    )
    .click()

  // Click text=Какво представляват „устойчивите решения”?
  await page.locator('text=Как се финансира Подкрепи.бг?').click()

  // Click text=Подкрепи.бг НЕ удържа комисиони или такси за дейността си от събраните средства за кампаниите.
  await page
    .locator(
      'text=Подкрепи.бг НЕ удържа комисиони или такси за дейността си от събраните средства за кампаниите.',
    )
    .click()

  // Click text=Вижте всички >> nth=1
  await page.locator('text=Вижте всички').nth(1).click()
  await expect(page).toHaveURL('https://dev.podkrepi.bg/faq')
})
