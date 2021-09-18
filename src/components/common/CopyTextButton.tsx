import { useCopyToClipboard } from '../../common/util/useCopyToClipboard'
import { Button, ButtonProps } from '@material-ui/core'
import { useTranslation } from 'next-i18next'
import React from 'react'

export type CopyTextButtonProps = {
  text: string
  label: string
} & ButtonProps

export const CopyTextButton = ({ text, label, ...props }: CopyTextButtonProps) => {
  const { t } = useTranslation()
  const [_, copyUrl] = useCopyToClipboard(text)

  return (
    <Button onClick={copyUrl} variant="contained" {...props}>
      {t(label)}
    </Button>
  )
}
