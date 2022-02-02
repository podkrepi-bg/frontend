import { MutateFunction, useMutation, UseMutationResult, useQuery } from 'react-query'
import { endpoints } from 'common/api-endpoints'
import { CarResponse } from 'gql/cars'
import { routes } from 'common/routes'
import { GridRowId } from '@mui/x-data-grid'
import { CarDataType } from 'gql/cars'
// GET REQUESTS

export function useCarList() {
  return useQuery<CarResponse[]>(endpoints.cars.carsList.url)
}

export function useViewCar(slug: string | number) {
  return useQuery<CarResponse>(endpoints.cars.viewCar(slug).url)
}

//MUTATE CARS (POST, PATCH, DELETE)
export type MutationResultParams = GridRowId[] | GridRowId | CarDataType
export const useMutateCars = (
  fn: any,
  queryClient: any,
  setNotificationsOpen: any,
  setNotificationMessage: any,
  handleClose: any,
  router?: any,
): UseMutationResult<MutateFunction, Error, MutationResultParams, unknown> => {
  return useMutation(fn, {
    onSuccess: () => {
      queryClient.invalidateQueries('/car')
      handleClose && handleClose()
      setNotificationsOpen()
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
