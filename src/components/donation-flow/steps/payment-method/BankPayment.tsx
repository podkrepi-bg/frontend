import React from 'react'
import { useTranslation } from 'react-i18next'
import {
  Alert,
  AlertTitle,
  Divider,
  Hidden,
  List,
  Typography,
  Unstable_Grid2 as Grid2,
} from '@mui/material'

import { ibanNumber } from 'common/iban'
import theme from 'common/theme'
import { CopyTextButton } from 'components/common/CopyTextButton'
import { useDonationFlow } from 'components/donation-flow/DonationFlowContext'

function BankPayment() {
  const { t } = useTranslation()
  const bankAccountInfo = {
    owner: t('third-step.owner'),
    bank: t('third-step.bank'),
    iban: ibanNumber,
  }

  const { campaign } = useDonationFlow()
  return (
    <List component="div" disablePadding>
      <Typography marginTop={theme.spacing(4)} variant="h6">
        {t('third-step.bank-details')}
      </Typography>
      <Typography variant="body1" marginBottom={theme.spacing(1)}>
        {t('third-step.bank-instructions1')}
      </Typography>
      <Typography variant="body1" marginBottom={theme.spacing(1)}>
        {t('third-step.bank-instructions2')}
      </Typography>
      <Divider />
      <Grid2 container justifyContent="center">
        <Grid2 my={2} display="flex" justifyContent="space-between" xs={9}>
          <Typography>{bankAccountInfo.owner}</Typography>
          <CopyTextButton
            label={t('third-step.btn-copy')}
            text={bankAccountInfo.owner}
            variant="contained"
            size="small"
            color="info"
          />
        </Grid2>
        <Grid2 my={2} display="flex" justifyContent="space-between" xs={9}>
          <Typography>{bankAccountInfo.bank}</Typography>
          <CopyTextButton
            label={t('third-step.btn-copy')}
            text={bankAccountInfo.bank}
            variant="contained"
            size="small"
            color="info"
          />
        </Grid2>
        <Grid2 my={2} display="flex" justifyContent="space-between" xs={9}>
          <Typography>{ibanNumber}</Typography>
          <CopyTextButton
            label={t('third-step.btn-copy')}
            text={bankAccountInfo.iban.replace(/\s+/g, '')} //remove spaces in IBAN on copy
            variant="contained"
            size="small"
            color="info"
          />
        </Grid2>
      </Grid2>

      <Typography my={1} variant="h6">
        {t('third-step.reason-donation')}
      </Typography>
      <Divider />
      <Grid2 container justifyContent="center">
        <Grid2 my={2} display="flex" justifyContent="space-between" xs={9}>
          <Typography data-testid="payment-reference-field" fontWeight="bold">
            {campaign.paymentReference}
          </Typography>
          <CopyTextButton
            text={campaign.paymentReference}
            variant="contained"
            color="info"
            size="small"
            label={t('third-step.btn-copy')}
          />
        </Grid2>
      </Grid2>

      <Typography>{t('third-step.message-warning')}</Typography>
      <Hidden mdUp>
        <Alert severity="error">
          <AlertTitle>ВАЖНО!</AlertTitle>
          Моля попълнете следващата стъпка, за да се свържем с Вас, ако има проблем.
        </Alert>
      </Hidden>
    </List>
  )
}

export default BankPayment
