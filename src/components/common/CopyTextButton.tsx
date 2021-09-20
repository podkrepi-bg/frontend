import React from 'react'
import { useTranslation } from 'next-i18next'
import { Button, ButtonProps } from '@material-ui/core'

import { useCopyToClipboard } from 'common/util/useCopyToClipboard'

export type CopyTextButtonProps = {
  text: string
  label: string
} & ButtonProps

export const CopyTextButton = ({ text, label, ...props }: CopyTextButtonProps) => {
  const { t } = useTranslation()
  const [status, copyUrl] = useCopyToClipboard(text, 1000)
  const active = status === 'copied' ? 'primary' : 'default'
  return (
    <Button onClick={copyUrl} color={active} size="small" variant="contained" {...props}>
      {t(label)}
    </Button>
  )
}
