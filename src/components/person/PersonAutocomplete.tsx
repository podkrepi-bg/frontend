import { useTranslation } from 'react-i18next'
import { Autocomplete, AutocompleteProps, TextField } from '@mui/material'
import { PersonResponse } from 'gql/person'
import { usePersonList } from 'common/hooks/person'

export type PersonAutocompleteProps = {
  onSelect: (person: PersonResponse | null) => void
  autocompleteProps?: Omit<
    AutocompleteProps<PersonResponse, undefined, undefined, undefined>,
    'renderInput' | 'options' | 'getOptionLabel' | 'onChange' | 'loading'
  >
}
export default function PersonAutocomplete({
  onSelect,
  autocompleteProps,
}: PersonAutocompleteProps) {
  const { t } = useTranslation('common')
  const {
    data: personList,
    isLoading,
    refetch,
  } = usePersonList({
    options: {
      enabled: false,
      refetchOnWindowFocus: false,
    },
  })
  return (
    <Autocomplete
      isOptionEqualToValue={(option, value) => option.firstName === value.firstName}
      options={personList || []}
      getOptionLabel={(person) => person.firstName + ' ' + person.lastName}
      onChange={(e, person) => {
        console.log(person)
        onSelect(person)
      }}
      onOpen={() => {
        refetch()
      }}
      loading={isLoading}
      renderInput={(params) => (
        <TextField {...params} type="text" fullWidth defaultValue="" label={t('fields.' + name)} />
      )}
      {...autocompleteProps}
    />
  )
}
