import { useTranslation } from 'react-i18next'
import { FormControl, MenuItem } from '@mui/material'
import { useField } from 'formik'

import { Currency } from 'gql/currency'
import FormTextField from 'components/common/form/FormTextField'

export default function CurrencySelect({
  name = 'currency',
  translationNamespace = 'common',
  disabled = false,
}) {
  const { t } = useTranslation(translationNamespace)

  const values = Object.keys(Currency)
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
        disabled={disabled}
        label={t('fields.' + name)}
        {...field}>
        <MenuItem value="" disabled>
          {t('fields.' + name)}
        </MenuItem>
        {values?.map((value, index) => (
          <MenuItem key={index} value={value}>
            {value}
          </MenuItem>
        ))}
      </FormTextField>
    </FormControl>
  )
}
