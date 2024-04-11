import { Grid, Typography } from '@mui/material'
import RadioButtonGroup from 'components/common/form/RadioButtonGroup'

import React from 'react'
import { ids } from '../common/DonationFormSections'

export default function PaymentMode() {
  return (
    <Grid container gap={5} id={ids['isRecurring']}>
      <Grid item>
        <Typography variant="h5">Колко често желаете да дарявате</Typography>
      </Grid>
      <Grid item md={6}>
        <RadioButtonGroup
          name="isRecurring"
          columns={1}
          options={[
            { label: 'Еднократно', value: 'false' },
            { label: 'Ежемесечно', value: 'true' },
          ].map((v) => ({
            label: v.label,
            value: v.value,
          }))}
        />
      </Grid>
    </Grid>
  )
}
