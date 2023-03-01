import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material'
import { TranslatableField, translateError } from 'common/form/validation'
import { useOrganizersList } from 'common/hooks/organizer'
import { useField } from 'formik'
import { useTranslation } from 'react-i18next'

export default function OrganizerSelect({ name = 'organizerId', label = 'campaigns:organizer' }) {
  const { t } = useTranslation()
  const { data } = useOrganizersList()
  const [field, meta] = useField(name)

  const helperText = meta.touched ? translateError(meta.error as TranslatableField, t) : ''
  if (!data) {
    return null
  }

  return (
    <FormControl
      fullWidth
      size="small"
      variant="outlined"
      error={Boolean(meta.error) && Boolean(meta.touched)}>
      <InputLabel>{t(label)}</InputLabel>
      <Select fullWidth defaultValue="" label={t(label)} {...field}>
        <MenuItem value="" disabled>
          {t(label)}
        </MenuItem>
        {data?.map((organizer, index) => (
          <MenuItem key={index} value={organizer.id}>
            {organizer.person.firstName} {organizer.person.lastName}
          </MenuItem>
        ))}
      </Select>
      {helperText && <FormHelperText error>{helperText}</FormHelperText>}
    </FormControl>
  )
}
