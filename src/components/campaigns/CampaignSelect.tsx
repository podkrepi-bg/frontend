import React from 'react'
import { useField } from 'formik'
import { useTranslation } from 'next-i18next'

import { FormControl, MenuItem, TextFieldProps } from '@mui/material'

import { CampaignResponse } from 'gql/campaigns'

import FormTextField from 'components/common/form/FormTextField'

type Props = {
  label: string
  name: string
  campaigns?: CampaignResponse[]
} & TextFieldProps

export default function CampaignSelect({ label, name, campaigns, ...textFieldProps }: Props) {
  const { t } = useTranslation()

  const [field, meta] = useField(name)

  return (
    <FormControl
      fullWidth
      size="small"
      variant="outlined"
      error={Boolean(meta.error) && Boolean(meta.touched)}>
      <FormTextField
        select
        type="text"
        fullWidth
        defaultValue=""
        label={t(label)}
        {...field}
        {...textFieldProps}>
        <MenuItem value="" disabled>
          {t(label)}
        </MenuItem>
        {campaigns?.map((value, index) => (
          <MenuItem key={index} value={value.id}>
            {value.title}
          </MenuItem>
        ))}
      </FormTextField>
    </FormControl>
  )
}
