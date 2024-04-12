import { Grid, Typography } from '@mui/material'
import RadioButtonGroup from 'components/common/form/RadioButtonGroup'

import React, { useEffect } from 'react'
import { ids } from '../common/DonationFormSections'
import { DonationFormData, PaymentMode } from '../helpers/types'
import { useFormikContext } from 'formik'

type PaymentModeOptions = {
  label: string
  value: PaymentMode
}

export default function PaymentMode() {
  const formik = useFormikContext<DonationFormData>()
  const options: PaymentModeOptions[] = [
    {
      label: 'Еднократно',
      value: 'one-time',
    },
    {
      label: 'Ежемесечно',
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
        <Typography variant="h5">Колко често желаете да дарявате</Typography>
      </Grid>
      <Grid item md={6}>
        <RadioButtonGroup name="mode" columns={1} options={options} />
      </Grid>
    </Grid>
  )
}
