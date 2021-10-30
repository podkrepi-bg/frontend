import { ibanNumber } from '../../common/iban'
import React from 'react'
import { useTranslation } from 'next-i18next'
import { CopyTextButton } from './CopyTextButton'
import { Grid, Typography } from '@material-ui/core'
import { createStyles, makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) =>
  createStyles({
    firstRow: {
      lineHeight: '2rem',
      paddingTop: '1rem',
    },
    copyButton: {
      [theme.breakpoints.up('sm')]: {
        textAlign: 'center',
      },
    },
    ibanText: {
      fontWeight: 'normal',
    },
  }),
)

export const BankTransfer = () => {
  const { t } = useTranslation()
  const classes = useStyles()

  return (
    <Grid container justify="space-between" className={classes.firstRow}>
      <Grid item xs={12}>
        <Typography variant="body2" style={{ fontWeight: 'bold' }}>
          {t('about-project:association-name')}
        </Typography>
        <Typography variant="body2">{t('about-project:bank-name')}</Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={9}>
        <Typography variant="body2" component="strong" style={{ fontWeight: 'bold' }}>
          <span className={classes.ibanText}>IBAN:</span> {ibanNumber}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={3} className={classes.copyButton}>
        <CopyTextButton text={ibanNumber} label="support:cta.copy-number" />
      </Grid>
    </Grid>
  )
}
