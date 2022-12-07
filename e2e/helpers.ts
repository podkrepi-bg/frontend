import { expect, Page } from '@playwright/test'

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
