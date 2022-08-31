import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('https://dev.podkrepi.bg/')
})

test('test homepage on staging', async ({ page }) => {
  // Go to http://dev.podkrepi.bg/

  // Click text=Текущи кампании
  await page.locator('text=Текущи кампании').click()

  // Click text=Как работи Подкрепи.бг?
  await page.locator('text=Как работи Подкрепи.бг?').click()

  // Click text=Кой стои зад Подкрепи.бг?
  await page.locator('text=Кой стои зад Подкрепи.бг?').click()

  // Click text=Какво ни обединява?
  await page.locator('text=Какво ни обединява?').click()

  // Click text=Искам да помогна на Подкрепи.бг
  await page.locator('text=Искам да помогна на Подкрепи.бг').click()

  // Click h2:has-text("Често задавани въпроси")
  await page.locator('h2:has-text("Често задавани въпроси")').click()

  // Click text=Какво представлява Подкрепи.бг?Подкрепи.бг е платформа за среща между хора, коит >> [data-testid="ExpandMoreIcon"]
  await page
    .locator(
      'text=Какво представлява Подкрепи.бг?Подкрепи.бг е платформа за среща между хора, коит >> [data-testid="ExpandMoreIcon"]',
    )
    .click()

  // Click text=Подкрепи.бг е платформа за среща между хора, които искат да съберат средства за
  await page
    .locator(
      'text=Подкрепи.бг е платформа за среща между хора, които искат да съберат средства за ',
    )
    .click()

  // Click text=Защо направихте нова платформа, когато вече има и други?
  await page.locator('text=Защо направихте нова платформа, когато вече има и други?').click()

  // Click text=Накратко - целта ни е да увеличим доверието на обществото в дарителските организ
  await page
    .locator(
      'text=Накратко - целта ни е да увеличим доверието на обществото в дарителските организ',
    )
    .click()

  // Click text=Как гарантирате прозрачност и какво значи “софтуер с отворен код”?
  await page
    .locator('text=Как гарантирате прозрачност и какво значи “софтуер с отворен код”?')
    .click()

  // Click text=Софтуер с отворен код е установена практика, при която всеки, без ограничение, м
  await page
    .locator(
      'text=Софтуер с отворен код е установена практика, при която всеки, без ограничение, м',
    )
    .click()

  // Click text=Вижте всички >> nth=1
  await page.locator('text=Вижте всички').nth(1).click()
  await expect(page).toHaveURL('https://dev.podkrepi.bg/faq')

  // Click text=Моделът ни на работа се основава на Принципите, които ни обединяват
  await page
    .locator('text=Моделът ни на работа се основава на Принципите, които ни обединяват')
    .click()
})
