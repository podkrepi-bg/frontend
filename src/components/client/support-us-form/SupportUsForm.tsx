import React from 'react'

import { useTranslation } from 'next-i18next'
import { Grid, List, Typography, Divider } from '@mui/material'

import theme from 'common/theme'
import { CopyTextButton } from 'components/common/CopyTextButton'
import { ibanNumber } from 'common/iban'

export default function SupportUsForm() {
  const { t } = useTranslation('one-time-donation')

  const bankAccountInfo = {
    owner: t('third-step.owner'),
    bank: t('third-step.bank'),
    iban: ibanNumber,
  }

  return (
    <List component="div" disablePadding>
      <Typography variant="body1" marginBottom={theme.spacing(1)}>
        {t('support_us:support-info')}
      </Typography>
      <Typography variant="h6">{t('third-step.bank-details')}</Typography>
      <Divider />
      <Grid container justifyContent="center">
        <Grid my={1} item display="flex" justifyContent="space-between" xs={9}>
          <Typography>{bankAccountInfo.owner}</Typography>
          <CopyTextButton
            label={t('third-step.btn-copy')}
            text={bankAccountInfo.owner}
            variant="contained"
            size="small"
            color="info"
          />
        </Grid>
        <Grid my={1} item display="flex" justifyContent="space-between" xs={9}>
          <Typography>{bankAccountInfo.bank}</Typography>
          <CopyTextButton
            label={t('third-step.btn-copy')}
            text={bankAccountInfo.bank}
            variant="contained"
            size="small"
            color="info"
          />
        </Grid>
        <Grid my={1} item display="flex" justifyContent="space-between" xs={9}>
          <Typography>{ibanNumber}</Typography>
          <CopyTextButton
            label={t('third-step.btn-copy')}
            text={bankAccountInfo.iban.replace(/\s+/g, '')} //remove spaces in IBAN on copy
            variant="contained"
            size="small"
            color="info"
          />
        </Grid>
      </Grid>
      <Typography variant="h6">{t('third-step.reason-donation')}</Typography>
      <Divider />
      <Grid container justifyContent="center">
        <Grid my={1} item display="flex" justifyContent="space-between" xs={9}>
          <Typography>{t('support_us:support-us-reference')}</Typography>
          <CopyTextButton
            text={t('support_us:support-us-reference')}
            variant="contained"
            color="info"
            size="small"
            label={t('third-step.btn-copy')}
          />
        </Grid>
      </Grid>
    </List>
  )
}
