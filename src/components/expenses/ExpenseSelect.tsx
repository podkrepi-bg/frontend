import { useTranslation } from 'react-i18next'
import { FormControl, FormHelperText, MenuItem, TextFieldProps } from '@mui/material'
import { useField } from 'formik'

import { TranslatableField, translateError } from 'common/form/validation'
import { useDocumentsList } from 'common/hooks/documents'
import { useVaultsList } from 'common/hooks/vaults'
import { usePersonList } from 'common/hooks/person'
import { ExpenseCurrency, ExpenseStatus, ExpenseType } from 'gql/expenses'
import FormTextField from 'components/common/form/FormTextField'

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
  const { data: personList } = name == 'approvedById' ? usePersonList() : { data: undefined }

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

        {name == 'approvedById'
          ? personList?.map((person, index) => (
              <MenuItem key={index} value={person.id}>
                {person.firstName} {person.lastName}
              </MenuItem>
            ))
          : values?.map((value, index) => (
              <MenuItem key={index} value={value}>
                {value}
              </MenuItem>
            ))}
      </FormTextField>
      {helperText && <FormHelperText error>{helperText}</FormHelperText>}
    </FormControl>
  )
}
