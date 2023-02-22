import React from 'react'
import { useField } from 'formik'
import { useTranslation } from 'next-i18next'
import { MenuItem, TextFieldProps } from '@mui/material'

import { translateError } from 'common/form/useForm'
import { TranslatableField } from 'common/form/validation'

import { TransferStatus } from './TransferTypes'
import FormTextField from 'components/common/form/FormTextField'

type Props = {
  label: string
  name: string
} & TextFieldProps

export default function TransferStatusSelect({ label, name, ...textFieldProps }: Props) {
  const { t } = useTranslation('transfer')
  const [field, meta] = useField(name)
  const helperText = meta.touched ? translateError(meta.error as TranslatableField, t) : ''

  return (
    <FormTextField
      {...textFieldProps}
      {...field}
      select
      variant="outlined"
      fullWidth
      label={t(label)}
      type="text"
      error={Boolean(meta.error) && Boolean(meta.touched)}
      helperText={helperText}>
      {Object.values(TransferStatus).map((status) => {
        return (
          <MenuItem key={status} value={status}>
            {status}
          </MenuItem>
        )
      })}
    </FormTextField>
  )
}
