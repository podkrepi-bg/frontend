import { expect, Page } from '@playwright/test'

// TODO: Refactor this page. It is not needed in general, because there are easier ways to check this.
/**
 * @param page The page to get the clipboard text from.
 * @param textToCheck The text to check for in the clipboard.
 * @description This is a workaround for clipboard testing until playwright supports it.
 * @see
 * https://github.com/microsoft/playwright/issues/15860
 * https://github.com/microsoft/playwright/issues/13097
 * */
export const expectCopied = async (page: Page, textToCheck: string) => {
  const isMac = await page.evaluate(() => navigator.platform.toUpperCase().indexOf('MAC') >= 0)
  const modifier = isMac ? 'Meta' : 'Control'
  const context = page.context()
  const newPage = await context.newPage()
  await newPage.setContent(`<div id="clipboard-tester-div" contenteditable></div>`)
  await newPage.focus('#clipboard-tester-div')
  await newPage.keyboard.press(`${modifier}+KeyV`)
  expect(
    await newPage.evaluate(() => document.querySelector('#clipboard-tester-div')?.textContent),
  ).toBe(textToCheck)
}

/**
 * @description
 * - (?:-[a-z0-9]+)* matches the characters - and a-z0-9 between one and unlimited times, as many times as possible, giving back as needed (greedy) and does not remember the match
 * - $ asserts position at the end of the string
 */
export const SLUG_REGEX = `[a-z0-9]+(?:-[a-z0-9]+)*$`
