import React from 'react'
import { useTranslation } from 'next-i18next'
import { Grid, List, Typography, Divider } from '@mui/material'

import { CopyTextButton } from 'components/common/CopyTextButton'
import { ibanNumber, BIC } from 'common/iban'

import { BankDetailsLabel } from './SupportUs.styled'

export default function SupportUsForm() {
  const { t } = useTranslation('donation-flow')

  const bankAccountInfo = {
    owner: t('step.payment-method.bank.owner_value'),
    ownerValue: t('step.payment-method.bank.owner'),
    bank: t('step.payment-method.bank.bank'),
    bic: BIC,
    iban: ibanNumber,
    paymentReference: t('support_us:support-us-reference'),
  }

  return (
    <List component="div" disablePadding>
      <Typography variant="body1">{t('support_us:support-info')}</Typography>
      <Typography variant="h6" mt={4} mb={1}>
        {t('step.payment-method.bank.bank-details')}
      </Typography>
      <Divider />
      <Grid container alignItems="center" mt={2} mb={2}>
        <Grid my={1} item xs={4}>
          <BankDetailsLabel>{t('step.payment-method.bank.owner_name')}</BankDetailsLabel>
        </Grid>
        <Grid my={1} item xs={5} justifyContent="flex-start">
          <Typography>{t('step.payment-method.bank.owner')}</Typography>
        </Grid>
        <Grid my={1} item xs={3} display="flex" justifyContent="center">
          <CopyTextButton
            label={t('step.payment-method.bank.btn-copy')}
            text={bankAccountInfo.ownerValue}
            variant="contained"
            size="small"
            color="info"
            sx={{ display: 'flex', justifyContent: 'center' }}
          />
        </Grid>
        <Grid my={1} item xs={4}>
          <BankDetailsLabel>{t('step.payment-method.bank.bank_name')}</BankDetailsLabel>
        </Grid>
        <Grid my={1} item xs={5}>
          <Typography>{t('step.payment-method.bank.bank')}</Typography>
        </Grid>
        <Grid my={1} item display="flex" justifyContent="center" xs={3}>
          <CopyTextButton
            label={t('step.payment-method.bank.btn-copy')}
            text={bankAccountInfo.bank}
            variant="contained"
            size="small"
            color="info"
          />
        </Grid>
        <Grid my={1} item xs={4}>
          <BankDetailsLabel>IBAN:</BankDetailsLabel>
        </Grid>
        <Grid my={1} item xs={5}>
          <Typography>{ibanNumber}</Typography>
        </Grid>
        <Grid my={1} item display="flex" justifyContent="center" xs={3}>
          <CopyTextButton
            label={t('step.payment-method.bank.btn-copy')}
            text={bankAccountInfo.iban.replace(/\s+/g, '')} //remove spaces in IBAN on copy
            variant="contained"
            size="small"
            color="info"
          />
        </Grid>
        <Grid my={1} item xs={4}>
          <BankDetailsLabel>BIC:</BankDetailsLabel>
        </Grid>
        <Grid my={1} item xs={5}>
          <Typography>{BIC}</Typography>
        </Grid>
        <Grid my={1} item display="flex" justifyContent="center" xs={3}>
          <CopyTextButton
            label={t('step.payment-method.bank.btn-copy')}
            text={bankAccountInfo.bic}
            variant="contained"
            size="small"
            color="info"
          />
        </Grid>
        <Grid my={1} item xs={4}>
          <BankDetailsLabel my={1} pr={2}>
            {t('step.payment-method.bank.reason-donation')}
          </BankDetailsLabel>
        </Grid>
        <Grid my={1} item xs={5}>
          <Typography>{bankAccountInfo.paymentReference}</Typography>
        </Grid>
        <Grid my={1} item display="flex" justifyContent="center" xs={3}>
          <CopyTextButton
            label={t('step.payment-method.bank.btn-copy')}
            text={bankAccountInfo.paymentReference}
            variant="contained"
            size="small"
            color="info"
          />
        </Grid>
      </Grid>
      <Divider />
    </List>
  )
}
