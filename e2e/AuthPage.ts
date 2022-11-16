import { Page } from '@playwright/test'

const credentials = {
  username: process.env.USERNAME ?? 'admin@podkrepi.bg',
  password: process.env.PASSWORD ?? '$ecurePa33',
}

export class AuthPage {
  page: Page
  constructor(page: Page) {
    this.page = page
  }

  async _submitLoginForm() {
    await this.page.click('input[type="email"]')
    await this.page.fill('input[type="email"]', credentials.username)
    await this.page.click('input[type="password"]')
    await this.page.fill('input[type="password"]', credentials.password)
    await this.page.click('text="Вход"')
  }

  async login() {
    await Promise.all([this.page.goto('/login'), this.page.waitForNavigation()])

    await this._submitLoginForm()

    // if there's a redirect back to main page
    await this.page.waitForURL('/profile', { waitUntil: 'networkidle' })
  }
}
