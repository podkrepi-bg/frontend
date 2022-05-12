import React from 'react'
import { useTranslation } from 'next-i18next'
import { Button, ButtonProps } from '@mui/material'

import { useCopyToClipboard } from 'common/util/useCopyToClipboard'
import { AlertStore } from 'stores/AlertStore'

export type CopyTextButtonProps = {
  text: string
  label: string
} & ButtonProps

export const CopyTextButton = ({ text, label, ...props }: CopyTextButtonProps) => {
  const { t } = useTranslation()
  const [status, copyUrl] = useCopyToClipboard(text, 1000)
  const active = status === 'copied' ? 'inherit' : 'primary'
  return (
    <Button
      onClick={() => {
        AlertStore.show(t('common:alerts.message-copy'), 'success')
        copyUrl()
      }}
      color={active}
      size="small"
      variant="contained"
      {...props}>
      {t(label)}
    </Button>
  )
}
