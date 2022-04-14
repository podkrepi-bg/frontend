import React from 'react'
import { useField } from 'formik'
import { useTranslation } from 'next-i18next'

import { TextField } from '@mui/material'

import { translateError } from 'common/form/useForm'
import { TranslatableField } from 'common/form/validation'

export default function SelectDate({ name = 'campaignInfo.endDate' }) {
  const { t } = useTranslation('transfer')

  const [field, meta] = useField(name)

  const helperText = meta.touched ? translateError(meta.error as TranslatableField, t) : ''

  return (
    <TextField
      {...field}
      type="date"
      variant="outlined"
      InputLabelProps={{ shrink: true }}
      error={Boolean(meta.error) && Boolean(meta.touched)}
      helperText={helperText}
    />
  )
}
