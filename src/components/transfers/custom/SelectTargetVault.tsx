import React from 'react'
import { useTranslation } from 'next-i18next'
import { useField, useFormikContext } from 'formik'

import { MenuItem, TextField, TextFieldProps } from '@mui/material'

import { VaultResponse } from 'gql/vault'
import { TransferInput } from 'gql/transfer'

import { translateError } from 'common/form/useForm'
import { TranslatableField } from 'common/form/validation'

type selectProps = {
  label: string
  name: string
  vaults: VaultResponse[]
} & TextFieldProps

export default function SelectSourceVault({ label, name, vaults, ...textFieldProps }: selectProps) {
  const { t } = useTranslation('transfer')

  const [field, meta] = useField(name)
  const { values, setFieldValue } = useFormikContext<TransferInput>()

  const helperText = meta.touched ? translateError(meta.error as TranslatableField, t) : ''

  const [filtered, setFiltered] = React.useState<VaultResponse[]>(
    (vaults || []).filter((v) => v.campaignId === values.targetCampaignId),
  )

  React.useEffect(() => {
    const selected = (vaults || []).filter((v) => v.campaignId === values.targetCampaignId)
    setFiltered(selected)
    if (selected.length === 0) {
      setFieldValue(name, '')
    }
  }, [name, values.targetCampaignId, values.targetVaultId])

  return (
    <TextField
      {...textFieldProps}
      {...field}
      select
      variant="outlined"
      fullWidth
      label={t(label)}
      error={Boolean(meta.error) && Boolean(meta.touched)}
      helperText={helperText}>
      {[{ id: '', name: '' }, ...filtered].map((p) => {
        return (
          <MenuItem key={p.id} value={p.id}>
            {p.name}
          </MenuItem>
        )
      })}
    </TextField>
  )
}
