import { useTranslation } from 'react-i18next'
import { FormControl, MenuItem } from '@mui/material'
import { useField } from 'formik'

import { useVaultsList } from 'common/hooks/vaults'
import FormTextField from 'components/common/form/FormTextField'

export default function VaultSelect({ name = 'vaultId', ...textFieldProps }) {
  const { t } = useTranslation()

  const { data: values } = useVaultsList()
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
        {...field}
        {...textFieldProps}>
        <MenuItem value="" disabled>
          {t('fields.' + name)}
        </MenuItem>
        {values?.map((value, index) => (
          <MenuItem key={index} value={value.id}>
            {value.id}
          </MenuItem>
        ))}
      </FormTextField>
    </FormControl>
  )
}
