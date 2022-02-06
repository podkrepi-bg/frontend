import { useQuery } from 'react-query'

import { endpoints } from 'common/api-endpoints'
import { CityResponse } from 'gql/cities'

export function useCitiesList() {
  return useQuery<CityResponse[]>(endpoints.city.listCities.url)
}
