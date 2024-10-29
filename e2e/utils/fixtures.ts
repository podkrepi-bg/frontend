import { test, test as base } from '@playwright/test'
import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'

dotenv.config({ path: '../.env.local' })
dotenv.config({ path: '../.env' })

const adminEmail = process.env.PODKREPI_EMAIL!
const password = process.env.PODKREPI_PASSWORD!

const testExtendFn = (useThisEmail: string = adminEmail) =>
  base.extend({
    storageState: async ({ browser, baseURL }, use) => {
      const id = useThisEmail.replace(/\W/, '')
      const fileName = path.resolve(test.info().project.outputDir, `.auth/${id}.json`)

      if (fs.existsSync(fileName)) {
        // Reuse existing authentication state if any.
        await use(fileName)
        return
      }
      const page = await browser.newPage()
      await page.goto(`${baseURL}/login`)

      await page.locator('[name=email]').fill(useThisEmail)
      await page.locator('[name=password]').fill(password)

      await page.locator('[type=submit]').click()
      await page.waitForURL((url) => !url.pathname.includes('login'))

      await page.context().storageState({ path: fileName })

      await page.close()

      await use(fileName)
    },
  })

export const adminTest = testExtendFn(adminEmail)

export const giverTest = testExtendFn('giver@podkrepi.bg')

/** export the expect for consistency i.e. to be able to do `import { test, expect } from '../utils/fixtures'` */
export { expect } from 'playwright/test'
