import { useTranslation } from 'react-i18next'
import { FormControl, MenuItem } from '@mui/material'
import { useField } from 'formik'

import FormTextField from 'components/common/form/FormTextField'
import { useBankAccountsList } from 'common/hooks/bankaccounts'

export default function BankAccountSelect({ name = 'bankAccountId', disabled = false }) {
  const { t } = useTranslation()

  const { data: values } = useBankAccountsList()
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
        label={t('withdrawals:fields.' + name)}
        {...field}
        disabled={disabled}>
        <MenuItem value="" disabled>
          {t('withdrawals:fields.' + name)}
        </MenuItem>
        {values?.map((value, index) => (
          <MenuItem key={index} value={value.id}>
            {value.accountHolderName}
          </MenuItem>
        ))}
      </FormTextField>
    </FormControl>
  )
}
