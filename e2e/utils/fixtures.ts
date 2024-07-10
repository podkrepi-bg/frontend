import { test as base } from '@playwright/test'
import dotenv from 'dotenv'

dotenv.config({path: '../.env.local'})
dotenv.config({path: '../.env'})

const email = process.env.PODKREPI_EMAIL!
const password = process.env.PODKREPI_PASSWORD!

export const test = base.extend({
  storageState: async ({ browser, baseURL }, use) => {
    const page = await browser.newPage()
    await page.goto(`${baseURL}/login`)

    await page.locator('[name=email]').fill(email)
    await page.locator('[name=password]').fill(password)

    await page.locator('[type=submit]').click()
    await page.waitForURL((url) => !url.pathname.includes('login'))

    const state = await page.context().storageState()

    await page.close()

    use(state)
  },
})

/** export the expect for consistency i.e. to be able to do `import { test, expect } from '../utils/fixtures'` */
export { expect } from 'playwright/test'
