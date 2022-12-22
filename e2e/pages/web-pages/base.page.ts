import { expect, Locator, Page } from '@playwright/test'
import { ClickOptions, LocatorOptions } from '../../utils/types'

// Here we define all base methods, which are inherited into the other pages
export class BasePage {
  protected page: Page

  constructor(page: Page) {
    this.page = page
  }

  private readonly checkboxLabelSelector = 'label.MuiFormControlLabel-root'
  private readonly checkboxLabelXpath = "//label[contains(@class, 'MuiFormControlLabel-root')]"
  private readonly activeHorizontalStepSelector = '.MuiStepLabel-labelContainer span.Mui-active'

  /**
   * Wait for element by PW Locator to be attached to the DOM tree
   * @param {Locator} elementLocator
   * @param {number} timeoutParam - the default is 10sec
   */
  async waitForElementToBePresentedByLocator(
    elementLocator: Locator,
    timeoutParam = 10000,
  ): Promise<void> {
    await elementLocator.last().waitFor({ state: 'attached', timeout: timeoutParam })
  }

  /**
   * Wait for element by PW Locator to be visible on the DOM tree
   * @param {Locator} elementLocator
   * @param {number} timeoutParam - the default value is 10sec
   */
  async waitForElementToBeReadyByLocator(
    elementLocator: Locator,
    timeoutParam = 10000,
  ): Promise<void> {
    await elementLocator.first().waitFor({ state: 'visible', timeout: timeoutParam })
  }

  /**
   * Wait for element by CSS Selector to be attached to the DOM tree
   * @param {string} elementSelector
   * @param {LocatorOptions} options
   * @param {number} timeoutParam - the default is 10sec
   */
  async waitForElementToBePresentedBySelector(
    elementSelector: string,
    options?: LocatorOptions,
    timeoutParam = 10000,
  ): Promise<void> {
    let elementLocator: Locator
    if (options) {
      elementLocator = this.page.locator(elementSelector, options)
    } else {
      elementLocator = this.page.locator(elementSelector)
    }
    await elementLocator.first().waitFor({ state: 'attached', timeout: timeoutParam })
  }

  /**
   * Wait for element by CSS Selector to be visible on the DOM tree
   * @param {string} elementSelector
   * @param {LocatorOptions} options
   * @param {number} timeoutParam
   */
  async waitForElementToBeReadyBySelector(
    elementSelector: string,
    options?: LocatorOptions,
    timeoutParam = 10000,
  ): Promise<void> {
    if (options) {
      await this.page
        .locator(elementSelector, options)
        .first()
        .waitFor({ state: 'visible', timeout: timeoutParam })
    } else {
      await this.page
        .locator(elementSelector)
        .first()
        .waitFor({ state: 'visible', timeout: timeoutParam })
    }
  }

  /**
   * Click web element by CSS Selector
   * @param {string} elementSelector
   * @param {LocatorOptions} elementOptions
   * @param {ClickOptions} clickOptions
   */
  async clickElement(
    elementSelector: string,
    elementOptions?: LocatorOptions,
    clickOptions?: ClickOptions,
  ): Promise<void> {
    if (elementOptions) {
      const firstElement = this.page.locator(elementSelector, elementOptions).first()
      const lastElement = this.page.locator(elementSelector, elementOptions).last()
      await this.waitForElementToBePresentedByLocator(lastElement)
      await firstElement.click(clickOptions)
    } else {
      const lastElement = this.page.locator(elementSelector, elementOptions).last()
      await this.waitForElementToBePresentedByLocator(lastElement)
      await this.page.click(elementSelector, clickOptions)
    }
  }

  /**
   * Click web element by Locator
   * @param {Locator} elementLocator
   */
  async clickElementByLocator(elementLocator: Locator): Promise<void> {
    const firstElement = elementLocator.first()
    await this.waitForElementToBePresentedByLocator(firstElement)
    await firstElement.click()
  }

  /**
   * Is element visible on the page by CSS Selector with timeout
   * @param {string} elementSelector
   * @param {any} options
   * @param {number} timeoutParam - the default value is 10sec
   */
  async isElementVisibleBySelectorWithTimeout(
    elementSelector: string,
    options: LocatorOptions | null = null,
    timeoutParam = 10000,
  ): Promise<boolean> {
    let elementLocator: Locator
    if (options) {
      elementLocator = this.page.locator(elementSelector, options).first()
    } else {
      elementLocator = this.page.locator(elementSelector).first()
    }
    try {
      await elementLocator.first().waitFor({ state: 'visible', timeout: timeoutParam })
    } catch (e) {
      return false
    }
    return true
  }

  /**
   * Is element visible on the page by Locator with timeout
   * @param {Locator} elementLocator
   * @param {number} timeoutParam - the default value is 10sec
   */
  async isElementVisibleByLocatorWithTimeout(
    elementLocator: Locator,
    timeoutParam = 10000,
  ): Promise<boolean> {
    try {
      await elementLocator.waitFor({ state: 'visible', timeout: timeoutParam })
    } catch (e) {
      return false
    }
    return true
  }

  /**
   * Get text of an element by CSS Selector
   * @param {string} elementSelector
   * @param {any} options
   */
  async getTextOfElementBySelector(
    elementSelector: string,
    options?: LocatorOptions,
  ): Promise<string | null> {
    let elementLocator: Locator = this.page.locator(elementSelector)
    if (options) {
      elementLocator = this.page.locator(elementSelector, options)
    }
    await this.page.waitForTimeout(500)
    await this.waitForElementToBePresentedByLocator(elementLocator)
    return elementLocator.innerText()
  }

  /**
   * Get text of an element by Locator
   * @param {Locator} elementLocator
   */
  async getTextOfElementByLocator(elementLocator: Locator): Promise<string | null> {
    await this.page.waitForTimeout(500)
    await this.waitForElementToBePresentedByLocator(elementLocator)
    return elementLocator.innerText()
  }

  /**
   * Scroll to element center by CSS Selector
   * @param {string} elementSelector
   * @param {any} options
   */
  async scrollToElementCenterBySelector(
    elementSelector: string,
    options?: LocatorOptions,
  ): Promise<void> {
    let element: Locator = this.page.locator(elementSelector)
    if (options) {
      element = this.page.locator(elementSelector, options)
    }
    await this.waitForElementToBePresentedByLocator(element.first())
    await element.first().scrollIntoViewIfNeeded()
  }

  /**
   * Scroll to element center by Locator
   * @param {Locator} elementLocator
   */
  async scrollToElementCenterByLocator(elementLocator: Locator): Promise<void> {
    await this.waitForElementToBePresentedByLocator(elementLocator.first())
    await elementLocator.first().scrollIntoViewIfNeeded()
  }

  /**
   * Navigate to URL and wait for load state
   * @param {string} url
   */
  async navigateToUrl(url: string): Promise<void> {
    await this.page.goto(url)
    await this.page.waitForLoadState()
  }

  /**
   * Get specific attribute from an element by CSS Selector
   * @param {string} elementSelector
   * @param {string} attributeName
   * @param {any} options
   */
  async getAttributeBySelector(
    elementSelector: string,
    attributeName: string,
    options?: LocatorOptions,
  ): Promise<string | null> {
    if (options) {
      const webElement: Locator = this.page.locator(elementSelector, options)
      await webElement.last().waitFor({ state: 'attached' })
      return webElement.getAttribute(attributeName)
    } else {
      return this.page.getAttribute(elementSelector, attributeName)
    }
  }

  /**
   * Get specific attribute from an element by Locator
   * @param {Locator} elementLocator
   * @param {string} attributeName
   * @param {number} timeoutParam
   */
  async getAttributeByLocator(
    elementLocator: Locator,
    attributeName: string,
    timeoutParam: number,
  ): Promise<string | null> {
    await this.waitForElementToBePresentedByLocator(elementLocator)
    return elementLocator.getAttribute(attributeName, { timeout: timeoutParam })
  }

  /**
   * Clear the input field of an element by CSS Selector
   * @param {string} elementSelector
   */
  async clearInputFieldBySelector(elementSelector: string): Promise<void> {
    await this.page.fill(elementSelector, '')
  }

  /**
   * Clear the input field of an element by Locator
   * @param {Locator} elementLocator
   */
  async clearInputFieldByLocator(elementLocator: Locator): Promise<void> {
    await elementLocator.fill('')
  }

  /**
   * Set a text value into an input field by CSS Selector
   * @param {string} elementSelector
   * @param {string | number} inputValueToFill
   * @param {boolean} clearBeforeInput - the default value is 'true'
   * @param {boolean} slowTyping - the default value is 'false'
   * @param {boolean} pressEnterKey - the default value is 'false'
   */
  async setInputFieldBySelector(
    elementSelector: string,
    inputValueToFill: string | number,
    clearBeforeInput = true,
    slowTyping = false,
    pressEnterKey = false,
  ): Promise<void> {
    await this.waitForElementToBePresentedBySelector(elementSelector)
    if (clearBeforeInput) {
      await this.clearInputFieldBySelector(elementSelector)
    }
    if (slowTyping) {
      await this.page.type(elementSelector, inputValueToFill.toString().trim(), { delay: 100 })
    } else {
      await this.page.type(elementSelector, inputValueToFill.toString().trim())
    }
    if (pressEnterKey) {
      await this.page.press(elementSelector, 'Enter')
    }
  }

  /**
   * Set a text value into an input field by Locator
   * TODO - the two methods for setting input fields need to be tested, it is possible no need updates
   * @param {Locator} elementSelector
   * @param {string | number} inputValueToFill
   * @param {boolean} clearBeforeInput - the default value is 'true'
   * @param {boolean} pressEnterKey - the default value is 'false'
   */
  async setInputFieldByLocator(
    elementLocator: Locator,
    inputValueToFill: string | number,
    clearBeforeInput = true,
    pressEnterKey = false,
  ): Promise<void> {
    await this.waitForElementToBePresentedByLocator(elementLocator)
    if (clearBeforeInput) {
      await this.clearInputFieldByLocator(elementLocator)
    }
    await elementLocator.type(inputValueToFill.toLocaleString().trim())
    if (pressEnterKey) {
      await elementLocator.press('Enter')
    }
  }

  /**
   * Select checkbox by its label text
   * @param {string} elementSelector
   * @param {Array<string>} labelText
   */
  async selectCheckboxSelectorByLabelText(
    elementSelector: string,
    labelText: Array<string>,
  ): Promise<void> {
    await this.waitForElementToBePresentedBySelector(elementSelector)
    for (const item of labelText) {
      const checkboxElementLocator = this.page
        .locator(elementSelector, { hasText: item })
        .locator("input[type='checkbox']")
      if (await this.isElementVisibleByLocatorWithTimeout(checkboxElementLocator)) {
        await checkboxElementLocator.check()
      } else {
        throw new Error('The checkbox element is not found!')
      }
    }
  }

  /**
   * Select radio button by its label text
   * @param {string} elementSelector
   * @param {Array<string>} labelText
   */
  async selectRadioButtonSelectorByLabelText(
    elementSelector: string,
    labelText: Array<string>,
  ): Promise<void> {
    await this.waitForElementToBePresentedBySelector(elementSelector)
    for (const item of labelText) {
      // Here we use Xpath because of the special symbol "&nbsp" in the English version
      const radioCheckboxElementLocator = this.page.locator(
        "(//input[@type='radio']/ancestor::label/p[contains(text(),'" + item + "')])[1]",
      )
      if (await this.isElementVisibleByLocatorWithTimeout(radioCheckboxElementLocator)) {
        await radioCheckboxElementLocator.click()
      } else {
        throw new Error('The checkbox element is not found!')
      }
    }
  }

  /**
   * Select radio button by its label text - pass Array<string>
   * @param {Array<string>} labelTextArray
   */
  async selectRadioButtonByLabelText(labelTextArray: Array<string>): Promise<void> {
    await this.selectRadioButtonSelectorByLabelText(this.checkboxLabelXpath, labelTextArray)
  }

  /**
   * Deselect checkbox by its label text
   * @param {string} elementSelector
   * @param {Array<string>} labelText
   */
  async deselectCheckboxSelectorByLabelText(
    elementSelector: string,
    labelTextArray: Array<string>,
  ): Promise<void> {
    await this.waitForElementToBePresentedBySelector(elementSelector)
    for (const item of labelTextArray) {
      const checkboxElementLocator = this.page
        .locator(elementSelector, { hasText: item })
        .locator("input[type='checkbox']")
      await checkboxElementLocator.uncheck()
    }
  }

  /**
   * Is checkbox selected by its label text
   * @param {string} elementSelector
   * @param {Array<string>} labelText
   */
  async isCheckboxSelectorCheckedByLabelText(
    elementSelector: string,
    labelText: string,
  ): Promise<boolean> {
    await this.waitForElementToBePresentedBySelector(elementSelector)
    return this.page.locator(elementSelector, { hasText: labelText }).isChecked()
  }

  /**
   * Is checkbox selected by its label text - pass one string
   * @param {string} labelText
   */
  async isCheckboxCheckedByLabelText(labelText: string): Promise<boolean> {
    await this.scrollToElementCenterBySelector(this.checkboxLabelSelector, { hasText: labelText })
    return this.isCheckboxSelectorCheckedByLabelText(this.checkboxLabelSelector, labelText)
  }

  /**
   * Select checkbox by its label text - pass Array<string>
   * @param {Array<string>} labelTextArray
   */
  async selectCheckboxByLabelText(labelTextArray: Array<string>): Promise<void> {
    await this.selectCheckboxSelectorByLabelText(this.checkboxLabelSelector, labelTextArray)
  }

  /**
   * Deselect checkbox by its label text - pass Array<string>
   * @param {Array<string>} labelTextArray
   */
  async deselectCheckboxByLabelText(labelTextArray: Array<string>): Promise<void> {
    await this.deselectCheckboxSelectorByLabelText(this.checkboxLabelSelector, labelTextArray)
  }

  /**
   * Check partial or complete page URL by string
   * @param {string} urlRegExpAsString
   * @param {number} timeoutParam - the default value is 10sec
   */
  // TODO Add poll
  async checkPageUrlByRegExp(urlRegExpAsString: string, timeoutParam = 10000): Promise<void> {
    await this.page.waitForTimeout(1000)
    await expect(this.page, 'The URL is not correct!').toHaveURL(new RegExp(urlRegExpAsString), {
      timeout: timeoutParam,
    })
  }

  /**
   * Get count of elements by selector
   * @param {string} elementSelector
   */
  async getCountOfElementsBySelector(elementSelector: string): Promise<number> {
    await this.waitForElementToBePresentedBySelector(elementSelector)
    return this.page.locator(elementSelector).count()
  }

  /**
   * Is Step active by text into Join Us horizontal stepper
   * TODO refactor for two languages
   * @param {string} roleText
   */
  async isStepActiveByLabelText(roleText: string): Promise<boolean> {
    return this.isElementVisibleBySelectorWithTimeout(this.activeHorizontalStepSelector, {
      hasText: roleText,
    })
  }

  /**
   * Select dropdown option value by CSS Selector
   * @param {string} dropdownSelector
   * @param {string | string[]} dropdownOptionStringOrArray
   */
  async selectDropdownOptionValue(
    dropdownSelector: string,
    dropdownOptionStringOrArray: string | string[],
  ): Promise<void> {
    await this.waitForElementToBeReadyBySelector(dropdownSelector, undefined, 2000)
    await this.page.selectOption(dropdownSelector, dropdownOptionStringOrArray)
  }
}
