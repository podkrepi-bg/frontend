import { useTranslation } from 'react-i18next'
import { FormControl, MenuItem } from '@mui/material'
import { useField } from 'formik'

import { usePersonList } from 'common/hooks/person'
import FormTextField from 'components/common/form/FormTextField'

export default function PersonSelect({ name = 'personId', namespace = 'common' }) {
  const { t } = useTranslation(namespace)
  const [field, meta] = useField(name)
  const { data: personList } = usePersonList()

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
        label={t('fields.' + name)}
        {...field}>
        <MenuItem value="" disabled>
          {t('fields.' + name)}
        </MenuItem>
        <MenuItem key={'none'} value="">
          <i>{t('fields.empty')}</i>
        </MenuItem>
        {personList?.map((person, index) => (
          <MenuItem key={index} value={person.id}>
            {person.firstName} {person.lastName} (<i>{person.id}</i>)
          </MenuItem>
        ))}
      </FormTextField>
    </FormControl>
  )
}
