import { useTranslation } from 'react-i18next'
import { useField, useFormikContext } from 'formik'

import { MenuItem, TextField } from '@mui/material'

import { useCampaignTypesList } from 'common/hooks/campaigns'

import { TranslatableField, translateError } from 'common/form/validation'

export default function CampaignTypeSelect({ name = 'campaignInfo.campaignTypeId' }) {
  const { t } = useTranslation('campaigns')
  const { data } = useCampaignTypesList()
  const [field, meta] = useField(name)
  const { setFieldValue } = useFormikContext()

  const helperText = meta.touched ? translateError(meta.error as TranslatableField, t) : ''

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setFieldValue(name, event.target.value)
  }
  if (!data) {
    return null
  }
  return (
    <TextField
      {...field}
      select
      variant="outlined"
      fullWidth
      onChange={handleChange}
      label={t('steps.info.campaign-type-select')}
      error={Boolean(meta.error) && Boolean(meta.touched)}
      helperText={helperText}>
      {[...(data || []), { name: 'Друго', id: 'else' }].map((campaignType, index) => (
        <MenuItem key={index} value={campaignType.id}>
          {campaignType.name}
        </MenuItem>
      ))}
    </TextField>
  )
}
