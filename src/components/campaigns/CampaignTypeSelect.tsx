import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material'
import { TranslatableField, translateError } from 'common/form/validation'
import { useCampaignTypesList } from 'common/hooks/campaigns'
import { useField } from 'formik'
import { useTranslation } from 'react-i18next'

export default function CampaignTypeSelect({ name = 'campaignTypeId' }) {
  const { t } = useTranslation()
  const { data } = useCampaignTypesList()
  const [field, meta] = useField(name)
  console.log(meta)
  const helperText = meta.touched ? translateError(meta.error as TranslatableField, t) : ''

  return (
    <FormControl variant="outlined" fullWidth>
      <InputLabel variant="outlined" margin="dense">
        {t('campaigns:campaign.type')}
      </InputLabel>
      <Select
        fullWidth
        defaultValue=""
        margin="dense"
        variant="outlined"
        label={t('campaigns:campaign.type')}
        error={Boolean(meta.error) && Boolean(meta.touched)}
        {...field}>
        <MenuItem value="" disabled>
          {t('campaigns:campaign.type')}
        </MenuItem>
        {data?.map((campaignType, index) => (
          <MenuItem key={index} value={campaignType.id}>
            {t(`campaigns:campaign.types.${campaignType.slug}`)}
          </MenuItem>
        ))}
      </Select>
      {helperText && <FormHelperText error>{helperText}</FormHelperText>}
    </FormControl>
  )
}
