import React from 'react'
import { useField, useFormikContext } from 'formik'
import { useTranslation } from 'next-i18next'

import { MenuItem, TextField, TextFieldProps } from '@mui/material'

import { CampaignResponse } from 'gql/campaigns'

import { translateError } from 'common/form/useForm'
import { TranslatableField } from 'common/form/validation'

type Props = {
  label: string
  name: string
  campaigns?: CampaignResponse[]
} & TextFieldProps

export default function CampaignSelect({ label, name, campaigns, ...textFieldProps }: Props) {
  const { t } = useTranslation('transfer')

  const [field, meta] = useField(name)
  const { setFieldValue } = useFormikContext()

  const helperText = meta.touched ? translateError(meta.error as TranslatableField, t) : ''

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setFieldValue(name, event.target.value)
  }

  return (
    <TextField
      {...textFieldProps}
      {...field}
      select
      variant="outlined"
      fullWidth
      onChange={handleChange}
      label={t(label)}
      error={Boolean(meta.error) && Boolean(meta.touched)}
      helperText={helperText}>
      {[{ id: '', title: '' }, ...(campaigns || [])].map((p) => {
        return (
          <MenuItem key={p.id} value={p.id}>
            {p.title}
          </MenuItem>
        )
      })}
    </TextField>
  )
}
