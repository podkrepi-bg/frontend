import { Typography, Grid2 } from '@mui/material'
import RadioButtonGroup from 'components/common/form/RadioButtonGroup'

import React, { useEffect } from 'react'
import { ids } from '../common/DonationFormSections'
import { DonationFormData, PaymentMode } from '../helpers/types'
import { useFormikContext } from 'formik'
import { useTranslation } from 'next-i18next'
import { DonationFormSectionErrorText } from '../common/DonationFormErrors'

type PaymentModeOptions = {
  label: string
  value: PaymentMode
}

type PaymentModeSelectProps = {
  error: boolean
}
export default function PaymentModeSelect({ error }: PaymentModeSelectProps) {
  const formik = useFormikContext<DonationFormData>()
  const { t } = useTranslation('donation-flow')
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
    <Grid2 container gap={5} id={ids['mode']} direction={'column'}>
      <Typography variant="h5">{t('donation-flow:step.payment-mode.title')}</Typography>
      <Grid2 container size={{ md: 6 }}>
        {error && <DonationFormSectionErrorText message={t('general.error.select-field')} />}
        <RadioButtonGroup name="mode" columns={1} options={options} error={error} />
      </Grid2>
    </Grid2>
  )
}
