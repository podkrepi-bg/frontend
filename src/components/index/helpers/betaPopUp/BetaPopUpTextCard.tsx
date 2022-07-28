import React from 'react'
import { Trans, useTranslation } from 'next-i18next'
import { Grid, Typography } from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

type BetaPopUpTextProps = {
  translationKey: string
}
export default function BetaPopUpTextCard({ translationKey }: BetaPopUpTextProps) {
  const { t } = useTranslation()

  return (
    <Grid item display="flex">
      <CheckCircleIcon sx={() => ({ height: '28px', color: '#00B0FF', marginRight: '10px' })} />
      <Typography
        sx={(theme) => ({
          marginBottom: '20px',
          lineHeight: '30px',
          fontWeight: '600',
          letterSpacing: '0.15px',
          [theme.breakpoints.down('md')]: {
            lineHeight: '24px',
            fontWeight: '500',
            marginBottom: '5px',
          },
        })}>
        <Trans i18nKey={translationKey}>
          {t(translationKey)}
          <Typography component="span" color="#284E84" fontWeight="500" />
        </Trans>
      </Typography>
    </Grid>
  )
}
