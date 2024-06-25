import { Autocomplete, Box, FormControl, FormHelperText, TextField } from '@mui/material'
import { TranslatableField, translateError } from 'common/form/validation'
import { useOrganizersList } from 'common/hooks/organizer'
import { useField } from 'formik'
import { OrganizerResponse } from 'gql/organizer'
import { useState } from 'react'
import { useTranslation } from 'next-i18next'

export default function OrganizerSelect({ name = 'organizerId', label = 'campaigns:organizer' }) {
  const { t } = useTranslation()
  const { data } = useOrganizersList()
  const [, meta, { setValue }] = useField(name)
  const [organizer, setOrganizer] = useState<OrganizerResponse>()

  const helperText = meta.touched ? translateError(meta.error as TranslatableField, t) : ''
  if (!data) {
    return null
  }

  return (
    <FormControl
      fullWidth
      size="small"
      variant="outlined"
      error={Boolean(meta.error) && Boolean(meta.touched)}>
      <Autocomplete
        value={organizer}
        size="small"
        onChange={(event, newValue: OrganizerResponse | null) => {
          if (!newValue || !newValue.id) return ''
          setOrganizer(newValue)
          setValue(newValue?.id)
        }}
        options={data || []}
        getOptionLabel={(option: OrganizerResponse) => {
          if (!option.person) return ''
          return option.person.company
            ? option.person.company.companyName
            : `${option.person.firstName} ${option.person.lastName}`
        }}
        renderInput={(params) => <TextField {...params} label={t(label)} />}
        renderOption={(params, option: OrganizerResponse) => (
          <Box component="li" {...params} key={option.id}>
            {option.person.company
              ? option.person.company.companyName
              : `${option.person.firstName} ${option.person.lastName}`}
          </Box>
        )}
        isOptionEqualToValue={(option, value) =>
          option.person.firstName === value.person.firstName ||
          option.person.lastName === value.person.lastName
        }
      />
      {helperText && <FormHelperText error>{helperText}</FormHelperText>}
    </FormControl>
  )
}
