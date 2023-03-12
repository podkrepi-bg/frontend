import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material'
import { TranslatableField, translateError } from 'common/form/validation'
import { useCoordinatorsList } from 'common/hooks/coordinators'
import { useField } from 'formik'
import { useTranslation } from 'react-i18next'

export default function CoordinatorSelect({ name = 'coordinatorId' }) {
  const { t } = useTranslation()
  const { data } = useCoordinatorsList()
  const [field, meta] = useField(name)

  const helperText = meta.touched ? translateError(meta.error as TranslatableField, t) : ''
  return (
    <FormControl
      fullWidth
      size="small"
      variant="outlined"
      error={Boolean(meta.error) && Boolean(meta.touched)}>
      <InputLabel>{t('campaigns:coordinator')}</InputLabel>
      <Select fullWidth defaultValue="" label={t('campaigns:coordinator')} {...field}>
        <MenuItem value="" disabled>
          {t('campaigns:coordinator')}
        </MenuItem>
        {data?.map((coordinator, index) => (
          <MenuItem key={index} value={coordinator.id}>
            {coordinator.person.firstName} {coordinator.person.lastName}
          </MenuItem>
        ))}
      </Select>
      {helperText && <FormHelperText error>{helperText}</FormHelperText>}
    </FormControl>
  )
}
