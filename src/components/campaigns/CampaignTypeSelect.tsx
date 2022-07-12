import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material'
import { TranslatableField, translateError } from 'common/form/validation'
import { useCampaignTypesList } from 'common/hooks/campaigns'
import { useField } from 'formik'
import { useTranslation } from 'react-i18next'

export default function CampaignTypeSelect({ name = 'campaignTypeId' }) {
  const { t } = useTranslation()
  const { data } = useCampaignTypesList()
  const [field, meta] = useField(name)

  console.log(data)

  const helperText = meta.touched ? translateError(meta.error as TranslatableField, t) : ''
  return (
    <FormControl
      fullWidth
      size="small"
      variant="outlined"
      error={Boolean(meta.error) && Boolean(meta.touched)}>
      <InputLabel>{t('campaigns:campaign.type')}</InputLabel>
      <Select fullWidth defaultValue="" label={t('campaigns:campaign.type')} {...field}>
        <MenuItem value="" disabled>
          {t('campaigns:campaign.type')}
        </MenuItem>
        {data?.map((campaignType, index) => (
          <MenuItem key={index} value={campaignType.id}>
            {t('campaigns:campaign.types.' + `${campaignType.slug}`)}
          </MenuItem>
        ))}
      </Select>
      {helperText && <FormHelperText error>{helperText}</FormHelperText>}
    </FormControl>
  )
}
