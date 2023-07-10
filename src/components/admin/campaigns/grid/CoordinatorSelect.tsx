import { Autocomplete, Box, FormControl, FormHelperText, TextField } from '@mui/material'
import { TranslatableField, translateError } from 'common/form/validation'
import { useCoordinatorsList } from 'common/hooks/coordinators'
import { useField } from 'formik'
import { CoordinatorResponse } from 'gql/coordinators'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function CoordinatorSelect({ name = 'coordinatorId' }) {
  const { t } = useTranslation()
  const { data } = useCoordinatorsList()
  const [field, meta, { setValue }] = useField(name)
  const [coordinator, setCoordinator] = useState<CoordinatorResponse>()

  const helperText = meta.touched ? translateError(meta.error as TranslatableField, t) : ''
  return (
    <FormControl
      fullWidth
      size="small"
      variant="outlined"
      error={Boolean(meta.error) && Boolean(meta.touched)}>
      <Autocomplete
        value={coordinator}
        onChange={(event, newValue: CoordinatorResponse | null) => {
          if (!newValue || !newValue.id) return ''
          setCoordinator(newValue)
          setValue(newValue?.id)
        }}
        options={data || []}
        getOptionLabel={(option: CoordinatorResponse) => {
          if (!option.person) return ''
          return `${option.person.firstName} ${option.person.lastName}`
        }}
        renderInput={(params) => <TextField {...params} label={t('campaigns:coordinator')} />}
        renderOption={(params, option: CoordinatorResponse) => (
          <Box component="li" {...params} key={option.id}>
            {`${option.person.firstName} ${option.person.lastName}`}
          </Box>
        )}
        isOptionEqualToValue={(option, value) => option.person.firstName === value.person.firstName}
      />
      {helperText && <FormHelperText error>{helperText}</FormHelperText>}
    </FormControl>
  )
}
