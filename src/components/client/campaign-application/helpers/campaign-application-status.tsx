import { FormControl, FormControlProps, InputLabel, MenuItem, Select } from '@mui/material'
import { useField } from 'formik'
import { useTranslation } from 'next-i18next'
import { allStates } from './campaignApplication.types'

export type Props = { name: string } & FormControlProps

export const StatusSelector = ({ name, ...control }: Props) => {
  const [field] = useField(name)
  const { t } = useTranslation('campaign-application')
  return (
    <FormControl fullWidth {...control}>
      <InputLabel id="cam-app-status-label">{t('status.selectorLabel')}</InputLabel>
      <Select
        labelId="cam-app-status-label"
        id="cam-app-status"
        label={t('status.selectorLabel')}
        {...field}>
        {allStates.map((s) => (
          <MenuItem key={s} value={s}>
            {t(`status.${s}`)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
