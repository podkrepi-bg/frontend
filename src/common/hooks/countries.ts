import { useQuery } from '@tanstack/react-query'

import { endpoints } from 'service/apiEndpoints'
import { CountryResponse } from 'gql/countries'

export function useCountriesList() {
  return useQuery<CountryResponse[]>([endpoints.country.listCountries.url])
}

export function useCountry(id: string) {
  return useQuery<CountryResponse>([endpoints.country.viewCountry(id).url])
}
