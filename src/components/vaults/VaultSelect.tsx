import { useTranslation } from 'react-i18next'
import { FormControl, MenuItem, TextFieldProps } from '@mui/material'
import { useField, useFormikContext } from 'formik'

import FormTextField from 'components/common/form/FormTextField'
import { VaultResponse } from 'gql/vault'

export type SetFieldValueType = (field: string, value: unknown, shouldValidate?: boolean) => void

type Props = {
  label: string
  name: string
  vaults?: VaultResponse[]
  handleVaultSelected?: (vaultId: string, setFieldValue: SetFieldValueType) => void
} & TextFieldProps

export default function VaultSelect({
  label,
  name,
  vaults,
  handleVaultSelected,
  ...textFieldProps
}: Props) {
  const { t } = useTranslation('vaults')

  const [field, meta] = useField(name)
  const { setFieldValue } = useFormikContext()

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setFieldValue(name, event.target.value)

    if (handleVaultSelected) handleVaultSelected(event.target.value as string, setFieldValue)
  }

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
        label={t(label)}
        {...field}
        {...textFieldProps}
        onChange={handleChange}>
        <MenuItem value="" disabled>
          {t(`fields.${name}`)}
        </MenuItem>
        {vaults?.map((value, index) => (
          <MenuItem key={index} value={value.id}>
            {value.name}
          </MenuItem>
        ))}
      </FormTextField>
    </FormControl>
  )
}
