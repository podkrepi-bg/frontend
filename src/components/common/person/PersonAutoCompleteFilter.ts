import { PersonResponse } from 'gql/person'
import { FilterOptionsState } from '@mui/material'

/**
 * Custom function to filter person related autocomplete inputs, based on either firstname, lastname or email
 * @param options AutoComplete prop
 * @param state AutoComplete prop
 * @returns
 */
export const personFilter = (
  options: PersonResponse[],
  state: FilterOptionsState<PersonResponse>,
) => {
  const displayOptions = options.filter((option) => {
    const name = `${option.firstName.toLowerCase()} ${option.lastName.toLowerCase()}`
    return (
      name.includes(state.inputValue.toLowerCase()) ||
      option.email.toLowerCase().includes(state.inputValue.toLowerCase())
    )
  })

  return displayOptions
}
