import { useQuery } from 'react-query'

import { endpoints } from 'common/api-endpoints'
import { AnimalResponse, BootcampStudentResponse } from 'gql/bootcamp'

export function useBootcampStudentsList() {
  return useQuery<BootcampStudentResponse[]>(endpoints.bootcampStudent.list.url)
}

export function useAnimalsList() {
  return useQuery<AnimalResponse[]>(endpoints.animals.list.url)
}
