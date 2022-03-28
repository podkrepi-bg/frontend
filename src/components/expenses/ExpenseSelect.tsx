import { FormControl, FormHelperText, MenuItem, TextFieldProps } from '@mui/material'
import { TranslatableField, translateError } from 'common/form/validation'
import { useField } from 'formik'
import { useTranslation } from 'react-i18next'

import FormTextField from 'components/common/form/FormTextField'
import { useDocumentsList } from 'common/hooks/documents'
import { useVaultsList } from 'common/hooks/vaults'
import { ExpenseCurrency, ExpenseStatus, ExpenseType } from 'gql/expenses'

type Props = {
  name: string
  allowEmpty: boolean
} & TextFieldProps

export default function ExpenseSelect({ name, allowEmpty, ...TextFieldProps }: Props) {
  const { t } = useTranslation('expenses')

  const validTypes = Object.keys(ExpenseType)
  const validStatuses = Object.keys(ExpenseStatus)
  const validCurrencies = Object.keys(ExpenseCurrency)

  const values =
    name == 'documentId'
      ? useDocumentsList().data?.map((record) => record.id)
      : name == 'vaultId'
      ? useVaultsList().data?.map((record) => record.id)
      : name == 'type'
      ? validTypes
      : name == 'status'
      ? validStatuses
      : name == 'currency'
      ? validCurrencies
      : ['true', 'false'] //deleted

  const [field, meta] = useField(name)

  const helperText = meta.touched ? translateError(meta.error as TranslatableField, t) : ''

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
        {...TextFieldProps}
        label={t('fields.' + name)}
        {...field}>
        <MenuItem value="" disabled>
          {t('fields.' + name)}
        </MenuItem>
        {allowEmpty && (
          <MenuItem key={'none'} value="">
            <i>{t('fields.empty')}</i>
          </MenuItem>
        )}
        {values?.map((value, index) => (
          <MenuItem key={index} value={value}>
            {value}
          </MenuItem>
        ))}
      </FormTextField>
      {helperText && <FormHelperText error>{helperText}</FormHelperText>}
    </FormControl>
  )
}
