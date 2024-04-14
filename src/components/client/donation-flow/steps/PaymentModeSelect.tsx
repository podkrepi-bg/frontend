import { Grid, Typography } from '@mui/material'
import RadioButtonGroup from 'components/common/form/RadioButtonGroup'

import React, { useEffect } from 'react'
import { ids } from '../common/DonationFormSections'
import { DonationFormData, PaymentMode } from '../helpers/types'
import { useFormikContext } from 'formik'
import { useTranslation } from 'next-i18next'

type PaymentModeOptions = {
  label: string
  value: PaymentMode
}

export default function PaymentMode() {
  const formik = useFormikContext<DonationFormData>()
  const { t } = useTranslation()
  const options: PaymentModeOptions[] = [
    {
      label: t('donation-flow:step.payment-mode.fields.one-time'),
      value: 'one-time',
    },
    {
      label: t('donation-flow:step.payment-mode.fields.monthly'),
      value: 'subscription',
    },
  ]
  useEffect(() => {
    if (formik.values.mode === 'subscription') {
      formik.setFieldValue('payment', 'card')
    }
  }, [formik.values.mode])
  return (
    <Grid container gap={5} id={ids['mode']}>
      <Grid item>
        <Typography variant="h5">{t('donation-flow:step.payment-mode.title')}</Typography>
      </Grid>
      <Grid item md={6}>
        <RadioButtonGroup name="mode" columns={1} options={options} />
      </Grid>
    </Grid>
  )
}
