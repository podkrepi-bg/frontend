import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material'
import { TranslatableField, translateError } from 'common/form/validation'
import { useField } from 'formik'
import { useTranslation } from 'react-i18next'
import { CampaignState } from './helpers/campaign.enums'

export default function CampaignStateSelect({ name = 'state' }) {
  const { t } = useTranslation()
  const [field, meta] = useField(name)

  const helperText = meta.touched ? translateError(meta.error as TranslatableField, t) : ''

  return (
    <FormControl
      fullWidth
      size="small"
      variant="outlined"
      error={Boolean(meta.error) && Boolean(meta.touched)}>
      <InputLabel>{t('campaigns:campaign.state')}</InputLabel>
      <Select fullWidth defaultValue="" label={t('campaigns:campaign.state')} {...field}>
        <MenuItem value="" disabled>
          {t('campaigns:campaign.state')}
        </MenuItem>
        {Object.values(CampaignState).map((value, index) => (
          <MenuItem key={index} value={value}>
            {value}
          </MenuItem>
        ))}
      </Select>
      {helperText && <FormHelperText error>{helperText}</FormHelperText>}
    </FormControl>
  )
}
