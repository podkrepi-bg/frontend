import { BankTransactionsHistoryResponse, BankTransactionsInput } from 'gql/bank-transactions'
import { useSession } from 'next-auth/react'

import { useQuery } from '@tanstack/react-query'

import { endpoints } from 'service/apiEndpoints'
import { PaginationData, FilterData, SortData } from 'gql/types'
import { authQueryFnFactory } from 'service/restRequests'

export function useBankTransactionsList(
  paginationData?: PaginationData,
  filterData?: FilterData,
  sort?: SortData,
  searchData?: string,
) {
  const { data: session } = useSession()
  return useQuery<BankTransactionsHistoryResponse>(
    [endpoints.bankTransactions.transactionsList(paginationData, filterData, sort, searchData).url],
    {
      queryFn: authQueryFnFactory(session?.accessToken),
    },
  )
}

export function useFindBankTransaction(id: string) {
  const { data: session } = useSession()
  return useQuery<BankTransactionsInput>(
    [endpoints.bankTransactions.getTransactionById(id).url],
    authQueryFnFactory<BankTransactionsInput>(session?.accessToken),
  )
}
