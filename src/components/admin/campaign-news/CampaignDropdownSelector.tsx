import {
  FormControl,
  FormHelperText,
  InputLabel,
  ListSubheader,
  MenuItem,
  Select,
  Typography,
} from '@mui/material'
import { TranslatableField, translateError } from 'common/form/validation'
import { useCampaignList } from 'common/hooks/campaigns'
import { useField } from 'formik'
import { useTranslation } from 'next-i18next'
import { CampaignTypeCategory } from 'components/common/campaign-types/categories'

type Props = {
  name?: string
  isDisabled?: boolean
}

export default function CampaignDropdownSelector({
  name = 'campaignId',
  isDisabled = false,
}: Props) {
  const { t } = useTranslation()
  const { data } = useCampaignList()
  const [field, meta] = useField(name)

  const helperText = meta.touched ? translateError(meta.error as TranslatableField, t) : ''

  const GroupCampaignsByCategory = (category: string) => {
    const items = data
      ?.filter((campaign) => campaign.campaignType.category === category)
      .map(({ id, title }) => {
        return (
          <MenuItem key={id} value={id}>
            {title}
          </MenuItem>
        )
      })
    return [
      <ListSubheader key={category}>
        <Typography fontSize={20}>{t(`campaigns:filters.${category}`)}</Typography>
      </ListSubheader>,
      items,
      <br key={category} />,
    ]
  }

  return (
    <FormControl
      fullWidth
      size="small"
      variant="outlined"
      error={Boolean(meta.error) && Boolean(meta.touched)}>
      <InputLabel>{t('Изберете кампания')}</InputLabel>
      <Select
        fullWidth
        defaultValue=""
        label={t('Изберете кампания')}
        {...field}
        disabled={isDisabled}>
        <MenuItem key="" value="" disabled>
          {t('Изберете кампания')}
        </MenuItem>
        {Object.values(CampaignTypeCategory).map((category) => GroupCampaignsByCategory(category))}
      </Select>
      {helperText && <FormHelperText error>{helperText}</FormHelperText>}
    </FormControl>
  )
}
