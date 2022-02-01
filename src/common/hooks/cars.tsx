import { useMutation, UseMutationResult, useQuery } from 'react-query'
import { endpoints } from 'common/api-endpoints'
import { CarResponse } from 'gql/cars'

export function useCarList() {
  return useQuery<CarResponse[]>(endpoints.cars.carsList.url)
}

export function useViewCar(slug: string | string[] | undefined) {
  return useQuery<{ car: CarResponse }>(endpoints.cars.viewCar(slug).url)
}

export const useDeleteCars = (
  fn: any,
  queryClient: any,
  handleClose: any,
  setNotificationsOpen: any,
  setNotificationMessage: any,
): UseMutationResult<unknown, unknown, void, unknown> => {
  return useMutation(fn, {
    onSuccess: () => {
      queryClient.invalidateQueries('/car')
      handleClose()
      setNotificationsOpen(true)
      setNotificationMessage('Записите бяха изтрити.')
    },
    onError: () => {
      handleClose()
      setNotificationsOpen(true)
      setNotificationMessage('Нещо се обърка')
    },
  })
}
