import { useMutation, UseMutationResult, useQuery } from 'react-query'
import { endpoints } from 'common/api-endpoints'
import { CarResponse } from 'gql/cars'
import { routes } from 'common/routes'

// GET REQUESTS

export function useCarList() {
  return useQuery<CarResponse[]>(endpoints.cars.carsList.url)
}

export function useViewCar(slug: string | string[] | undefined) {
  return useQuery<{ car: CarResponse }>(endpoints.cars.viewCar(slug).url)
}

//MUTATE CARS (POST, PATCH, DELETE)

export const useMutateCars = (
  fn: any,
  queryClient: any,
  setNotificationsOpen: any,
  setNotificationMessage: any,
  handleClose: any,
  router?: any,
): UseMutationResult<unknown, unknown, void, unknown> => {
  return useMutation(fn, {
    onSuccess: () => {
      queryClient.invalidateQueries('/car')
      handleClose && handleClose()
      setNotificationsOpen(true)
      setNotificationMessage(handleClose ? 'Записите бяха изтрити.' : 'Колата беше обновена')
      router && router.push(routes.cars.index)
    },
    onError: () => {
      handleClose && handleClose()
      setNotificationsOpen(true)
      setNotificationMessage('Нещо се обърка')
    },
  })
}
