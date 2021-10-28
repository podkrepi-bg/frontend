import React from 'react'
import { useTranslation } from 'next-i18next'
import { Theme } from '@mui/material/styles'
import makeStyles from '@mui/styles/makeStyles'
import createStyles from '@mui/styles/createStyles'
import { Button, ButtonProps, CircularProgress, CircularProgressProps } from '@mui/material'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: { minWidth: theme.spacing(12) },
  }),
)

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
  const classes = useStyles()
  const { t } = useTranslation()
  const guessColor = props.color === 'primary' ? 'secondary' : 'primary'
  const progressColor = loadingColor ? loadingColor : guessColor
  return (
    <Button
      type="submit"
      color="primary"
      variant="contained"
      disabled={loading}
      className={classes.root}
      {...props}>
      {loading ? <CircularProgress color={progressColor} size="1.5rem" /> : t(label)}
    </Button>
  )
}
