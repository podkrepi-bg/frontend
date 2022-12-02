import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/')
  await page.locator('button[data-testid="jumbotron-donate-button"]').click()
  await page.waitForURL('/campaigns')
})

test.describe('campaigns page', () => {
  test('test rendering and defaults', async ({ page }) => {
    expect(page.locator('text=Кампании')).toBeDefined()
    expect(page.locator('text=Подкрепете кауза днес!')).toBeDefined()
  })
  test('click donate button of active campaign', async ({ page }) => {
    await page.locator('button:has-text("Подкрепете сега"):not([disabled])').first().click()
    await page.waitForURL((url) => url.pathname.includes('/campaigns/donation'))
    expect(page.locator('text=Как желаете да дарите?')).toBeDefined()
    expect(page.locator('text=Карта')).toBeDefined()
    expect(page.locator('text=5 лв.')).toBeDefined()
  })
  test('successful campaign has a disabled donate button', async ({ page }) => {
    expect(page.locator('button:has-text("Подкрепете сега"):is([disabled])')).toBeDefined()
  })
  test('click show more button leads to campaign details', async ({ page }) => {
    await page.locator('text="Вижте повече"').first().click()
    await page.waitForURL((url) => url.pathname.includes('/campaigns/'))
    expect(page.locator('text=Сподели')).toBeDefined()
  })
})
