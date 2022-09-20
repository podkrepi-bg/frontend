import React from 'react'
import { useField, useFormikContext } from 'formik'
import { useTranslation } from 'next-i18next'

import { FormControl, MenuItem, TextFieldProps } from '@mui/material'

import { CampaignResponse } from 'gql/campaigns'

import FormTextField from 'components/common/form/FormTextField'

export type SetFieldValueType = (field: string, value: unknown, shouldValidate?: boolean) => void

type Props = {
  label: string
  name: string
  campaigns?: CampaignResponse[]
  handleCampaignSelected?: (campaignId: string, setFieldValue: SetFieldValueType) => void
} & TextFieldProps

export default function CampaignSelect({
  label,
  name,
  campaigns,
  handleCampaignSelected,
  ...textFieldProps
}: Props) {
  const { t } = useTranslation()

  const [field, meta] = useField(name)
  const { setFieldValue } = useFormikContext()

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setFieldValue(name, event.target.value)

    if (handleCampaignSelected) handleCampaignSelected(event.target.value as string, setFieldValue)
  }

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
        {...textFieldProps}
        {...field}
        onChange={handleChange}>
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
