import { useTranslation } from 'react-i18next'
import { FormControl, MenuItem } from '@mui/material'
import { useField } from 'formik'

import { ExpenseType } from 'gql/expenses'
import FormTextField from 'components/common/form/FormTextField'

export default function ExpenseTypeSelect({ name = 'type' }) {
  const { t } = useTranslation('expenses')

  const values = Object.keys(ExpenseType)
  const [field, meta] = useField(name)

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
        {values?.map((value, index) => (
          <MenuItem key={index} value={value}>
            {t('expenses:field-types.' + value)}
          </MenuItem>
        ))}
      </FormTextField>
    </FormControl>
  )
}
