import { useTranslation } from 'react-i18next'
import { useField, useFormikContext } from 'formik'

import { MenuItem, TextField, TextFieldProps } from '@mui/material'

import { TranslatableField, translateError } from 'common/form/validation'
import { BeneficiaryType } from './BeneficiaryTypes'

type Props = {
  name: string
  setBeneficiaryType: (type: string) => void
} & TextFieldProps

export default function BeneficiaryTypeSelect({
  name = 'type',
  setBeneficiaryType,
  ...textFieldProps
}: Props) {
  const { t } = useTranslation()
  const values = Object.values(BeneficiaryType)
  const [field, meta] = useField(name)
  const { setFieldValue } = useFormikContext()

  const helperText = meta.touched ? translateError(meta.error as TranslatableField, t) : ''

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setFieldValue(name, event.target.value)
    setBeneficiaryType(event.target.value as string)
  }

  return (
    <TextField
      {...textFieldProps}
      {...field}
      select
      variant="outlined"
      size="small"
      fullWidth
      onChange={handleChange}
      label={t('beneficiary:grid:type')}
      error={Boolean(meta.error) && Boolean(meta.touched)}
      helperText={helperText}>
      <MenuItem value={undefined} disabled>
        <em>None</em>
      </MenuItem>
      {values.map((type) => {
        return (
          <MenuItem key={type} value={type}>
            {t('beneficiary:grid:' + type)}
          </MenuItem>
        )
      })}
    </TextField>
  )
}
