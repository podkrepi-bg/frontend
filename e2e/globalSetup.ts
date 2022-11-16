import { chromium, FullConfig } from '@playwright/test'
import { AuthPage } from './AuthPage'

async function globalSetup(config: FullConfig) {
  const [project] = config.projects
  const { storageState, baseURL } = project.use
  console.log('globalSetup', { storageState, baseURL })
  const browser = await chromium.launch()
  const page = await browser.newPage()
  const auth = new AuthPage(page, baseURL)
  await auth.login()
  await page.context().storageState({
    path: storageState as string,
  })
  await browser.close()
}

export default globalSetup
