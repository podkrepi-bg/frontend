/**
 * @jest-environment jsdom
 */
import React from 'react'
import { render, fireEvent, waitFor } from '../test-utils'
import { CopyTextButton, CopyTextButtonProps } from 'components/common/CopyTextButton'

describe('CopyTextButton', () => {
  Object.assign(navigator, {
    clipboard: { writeText: jest.fn(() => Promise.resolve()) },
  })
  let expectedProps: CopyTextButtonProps

  beforeEach(() => {
    expectedProps = {
      text: 'Copy',
      label: 'support:cta.copy-number',
    }
  })

  test('should render label', () => {
    const { getByText } = render(<CopyTextButton {...expectedProps} />, {})
    const label = getByText(expectedProps.label)

    expect(label).toBeVisible()
  })

  test('should copy text to clipboard on call', async () => {
    const { getByText } = render(<CopyTextButton {...expectedProps} />, {})
    const copyButton = getByText('support:cta.copy-number')

    fireEvent.click(copyButton)

    await waitFor(() => expect(navigator.clipboard.writeText).toHaveBeenCalledTimes(1))
    await waitFor(() =>
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(expectedProps.text),
    )
  })
})
