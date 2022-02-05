import { MutateFunction, useMutation, UseMutationResult, useQuery } from 'react-query'
import { endpoints } from 'common/api-endpoints'
import { CarResponse } from 'gql/cars'
import { routes } from 'common/routes'
import { GridRowId } from '@mui/x-data-grid'
import { CarDataType } from 'gql/cars'
/* import { BankAccountResponse, BankAccountInput } from 'gql/bankaccounts' */
// GET REQUESTS

export function useBankAccountsList() {
  return useQuery<any[]>(endpoints.bankAccounts.bankAccountList.url)
}

export function useViewBankAccount(slug: string) {
  return useQuery<any>(endpoints.bankAccounts.viewBankAccount(slug).url)
}

//MUTATE CARS (POST, PATCH, DELETE)
export type MutationResultParams = any
export const useMutateBankAccounts = (
  fn: any,
  queryClient: any,
  setNotificationsOpen: any,
  setNotificationMessage: any,
  handleClose: any,
  router?: any,
): UseMutationResult<MutateFunction, Error, any, unknown> => {
  return useMutation(fn, {
    onSuccess: () => {
      queryClient.invalidateQueries('/bankaccount')
      handleClose && handleClose()
      setNotificationsOpen()
      setNotificationMessage(handleClose ? 'Записите бяха изтрити.' : 'Колата беше обновена')
      router && router.push(routes.bankaccounts.index)
    },
    onError: () => {
      handleClose && handleClose()
      setNotificationsOpen(true)
      setNotificationMessage('Нещо се обърка')
    },
  })
}
