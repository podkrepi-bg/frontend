import React from 'react'
import { useTranslation } from 'next-i18next'
import { Button, ButtonProps, CircularProgress, CircularProgressProps } from '@mui/material'

export type SubmitButtonProps = {
  loading?: boolean
  label?: string
  loadingColor?: CircularProgressProps['color']
} & ButtonProps

export default function SubmitButton({
  label = 'Submit',
  loading = false,
  loadingColor,
  ...props
}: SubmitButtonProps) {
  const { t } = useTranslation()
  const guessColor = props.color === 'primary' ? 'secondary' : 'primary'
  const progressColor = loadingColor ? loadingColor : guessColor
  return (
    <Button
      type="submit"
      color="primary"
      variant="contained"
      disabled={loading}
      sx={(theme) => ({ minWidth: theme.spacing(12) })}
      {...props}>
      {loading ? <CircularProgress color={progressColor} size="1.5rem" /> : t(label)}
    </Button>
  )
}
