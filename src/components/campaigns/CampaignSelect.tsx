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
  selectedCampaign: string
  handleCampaignSelected?: (campaignId: string, setFieldValue: SetFieldValueType) => void
} & TextFieldProps

export default function CampaignSelect({
  label,
  name,
  campaigns,
  selectedCampaign,
  handleCampaignSelected,
  ...textFieldProps
}: Props) {
  const { t } = useTranslation()

  const [field, meta] = useField(name)
  const { setFieldValue } = useFormikContext()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFieldValue(name, event.target.value)
    if (handleCampaignSelected) {
      handleCampaignSelected(event.target.value, setFieldValue)
    }
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
        defaultValue={selectedCampaign}
        label={t(label)}
        {...textFieldProps}
        {...field}
        onChange={handleChange}>
        {campaigns
          ?.filter((value) => {
            return value.vaults && value.vaults.length > 0
          })
          .map((value, index) => (
            //select the element that matches the selectedCampaign
            <MenuItem key={index} value={value.id} selected={value.id === selectedCampaign}>
              {value.title}
            </MenuItem>
          ))}
      </FormTextField>
    </FormControl>
  )
}
