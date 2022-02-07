import { useQuery } from 'react-query'

import { endpoints } from 'common/api-endpoints'
import { CountryResponse } from 'gql/countries'

export function useCountriesList() {
  return useQuery<CountryResponse[]>(endpoints.country.listCountries.url)
}
