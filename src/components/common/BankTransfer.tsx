import { ibanNumber } from '../../common/iban'
import React from 'react'
import { useTranslation } from 'next-i18next'
import { CopyTextButton } from './CopyTextButton'
import { Grid, Typography } from '@mui/material'
import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

const useStyles = makeStyles(() =>
  createStyles({
    firstRow: {
      lineHeight: '2rem',
      paddingTop: '1rem',
    },
  }),
)

export const BankTransfer = () => {
  const { t } = useTranslation()
  const classes = useStyles()

  return (
    <Grid container justifyContent="space-between" className={classes.firstRow}>
      <Grid item xs={12} md={8}>
        <Typography variant="body2" style={{ fontWeight: 'bold' }}>
          {t('about-project:association-name')}
        </Typography>
        <Typography variant="body2">{t('about-project:bank-name')}</Typography>
      </Grid>
      <Grid item xs={12} md={4}>
        <CopyTextButton text={ibanNumber} label="support:cta.copy-number" />
      </Grid>
      <Grid item xs={12} md={12}>
        IBAN:{' '}
        <Typography variant="body2" component="strong" style={{ fontWeight: 'bold' }}>
          {ibanNumber}
        </Typography>
      </Grid>
    </Grid>
  )
}
