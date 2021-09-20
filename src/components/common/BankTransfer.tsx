import { ibanNumber } from '../../common/iban'
import React from 'react'
import { useTranslation } from 'next-i18next'
import { CopyTextButton } from './CopyTextButton'
import { Grid } from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
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
    <Grid container justify="space-between" className={classes.firstRow}>
      <Grid item xs={6} md={4}>
        <strong>{t('about-project:association-name')}</strong> ( {t('about-project:bank-name')} )
      </Grid>
      <Grid item xs={6} md={4}>
        <CopyTextButton text={ibanNumber} label="support:cta.copy-number" />
      </Grid>
      <Grid item xs={12} md={8}>
        iban: <strong>{ibanNumber}</strong>
      </Grid>
    </Grid>
  )
}
