import React from 'react'
import { useTranslation } from 'next-i18next'
import { Alert, AlertTitle, Divider, List, Typography, Grid2, useMediaQuery } from '@mui/material'

import { ibanNumber } from 'common/iban'
import theme from 'common/theme'
import { CopyTextButton } from 'components/common/CopyTextButton'
import { useDonationFlow } from 'components/client/donation-flow/contexts/DonationFlowProvider'

function BankPayment() {
  const { t } = useTranslation('donation-flow')
  const bankAccountInfo = {
    owner: t('step.payment-method.bank.owner'),
    bank: t('step.payment-method.bank.bank'),
    iban: ibanNumber,
  }

  const { campaign } = useDonationFlow()
  const mobile = useMediaQuery(theme.breakpoints.down('md'))
  return (
    <List component="div" disablePadding>
      <Typography marginTop={theme.spacing(4)} variant="h6">
        {t('step.payment-method.bank.bank-details')}
      </Typography>
      <Typography variant="body1" marginBottom={theme.spacing(1)}>
        {t('step.payment-method.bank.bank-instructions1')}
      </Typography>
      <Typography variant="body1" marginBottom={theme.spacing(1)}>
        {t('step.payment-method.bank.bank-instructions2')}
      </Typography>
      <Divider />
      <Grid2 rowSpacing={2} my={2} container justifyContent="center">
        <Grid2 display="flex" alignItems="center" justifyContent="space-between" size={{ xs: 12 }}>
          <Typography>{bankAccountInfo.owner}</Typography>
          <CopyTextButton
            label={t('step.payment-method.bank.btn-copy')}
            text={bankAccountInfo.owner}
            variant="contained"
            size="small"
            color="info"
          />
        </Grid2>
        <Grid2 display="flex" alignItems="center" justifyContent="space-between" size={{ xs: 12 }}>
          <Typography>{bankAccountInfo.bank}</Typography>
          <CopyTextButton
            label={t('step.payment-method.bank.btn-copy')}
            text={bankAccountInfo.bank}
            variant="contained"
            size="small"
            color="info"
          />
        </Grid2>
        <Grid2 display="flex" alignItems="center" justifyContent="space-between" size={{ xs: 12 }}>
          <Typography>{ibanNumber}</Typography>
          <CopyTextButton
            label={t('step.payment-method.bank.btn-copy')}
            text={bankAccountInfo.iban.replace(/\s+/g, '')} //remove spaces in IBAN on copy
            variant="contained"
            size="small"
            color="info"
          />
        </Grid2>
      </Grid2>
      <Typography my={1} variant="h6">
        {t('step.payment-method.bank.reason-donation')}
      </Typography>
      <Divider />
      <Grid2 my={1} container justifyContent="center">
        <Grid2 display="flex" alignItems="center" justifyContent="space-between" size={{ xs: 12 }}>
          <Typography data-testid="payment-reference-field" fontWeight="bold">
            {campaign.paymentReference}
          </Typography>
          <CopyTextButton
            text={campaign.paymentReference}
            variant="contained"
            color="info"
            size="small"
            label={t('step.payment-method.bank.btn-copy')}
          />
        </Grid2>
      </Grid2>
      <Typography>{t('step.payment-method.bank.message-warning')}</Typography>
      <Alert sx={{ mt: 2, mx: mobile ? -2 : 0 }} severity="error">
        <AlertTitle>{t('step.payment-method.bank.alert.important')}!</AlertTitle>
        {t('step.payment-method.bank.alert.authenticate')}
      </Alert>
    </List>
  );
}

export default BankPayment
