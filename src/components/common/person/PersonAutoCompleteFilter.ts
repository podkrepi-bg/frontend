import { PersonResponse } from 'gql/person'
import { FilterOptionsState } from '@mui/material'

/**
 * Custom function to filter person related autocomplete inputs, based on either firstname or email
 * @param options AutoComplete prop
 * @param state AutoComplete prop
 * @returns
 */
export const personFilter = (
  options: PersonResponse[],
  state: FilterOptionsState<PersonResponse>,
) => {
  const displayOptions = options.filter(
    (option) =>
      option.firstName.toLowerCase().trim().includes(state.inputValue.toLowerCase().trim()) ||
      option.email.toLowerCase().trim().includes(state.inputValue.toLowerCase().trim()),
  )

  return displayOptions
}
