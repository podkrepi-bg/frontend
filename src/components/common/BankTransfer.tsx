import { ibanNumber } from '../../common/iban'
import { styled } from '@mui/material/styles'
import React from 'react'
import { useTranslation } from 'next-i18next'
import { CopyTextButton } from './CopyTextButton'
import { Grid, Typography } from '@mui/material'
const PREFIX = 'BankTransfer'

const classes = {
  firstRow: `${PREFIX}-firstRow`,
}

const StyledGrid = styled(Grid)(() => ({
  [`&.${classes.firstRow}`]: {
    lineHeight: '2rem',
    paddingTop: '1rem',
  },
}))

export const BankTransfer = () => {
  const { t } = useTranslation()

  const trimmedIban = ibanNumber.replace(/\s/g, '')

  return (
    <StyledGrid container justifyContent="space-between" className={classes.firstRow}>
      <Grid item xs={12}>
        <Typography variant="body2" style={{ fontWeight: 'bold' }}>
          {t('about-project:association-name')}
        </Typography>
        <Typography variant="body2">{t('about-project:bank-name')}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Grid container direction="row" columnSpacing={2}>
          <Grid item>
            IBAN:{' '}
            <Typography
              whiteSpace="nowrap"
              variant="body2"
              component="strong"
              style={{ fontWeight: 'bold' }}>
              {ibanNumber}
            </Typography>
          </Grid>
          <Grid item>
            <CopyTextButton text={trimmedIban} label="support:cta.copy-number" />
          </Grid>
        </Grid>
      </Grid>
    </StyledGrid>
  )
}
