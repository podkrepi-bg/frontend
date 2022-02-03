import { useQuery } from "react-query";

import { endpoints } from "common/api-endpoints";
import { CityResponse } from "gql/city";

export function useCityList() {
    return useQuery<CityResponse[]>(endpoints.city.listCities.url)
}

export function useViewCity(id: string) {
    return useQuery<CityResponse>(endpoints.city.viewCity(id).url)
}

export function useDeleteCity(id: string) {
    return useQuery<CityResponse>(endpoints.city.deleteCity(id).url)
}