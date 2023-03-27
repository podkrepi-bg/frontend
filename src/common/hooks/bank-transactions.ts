import { BankTransactionsHistoryResponse } from 'gql/bank-transactions'
import { useSession } from 'next-auth/react'

import { useQuery } from '@tanstack/react-query'

import { endpoints } from 'service/apiEndpoints'
import { PaginationData, FilterData } from 'gql/types'
import { authQueryFnFactory } from 'service/restRequests'

export function useBankTransactionsList(
  paginationData?: PaginationData,
  filterData?: FilterData,
  searchData?: string,
) {
  const { data: session } = useSession()
  return useQuery<BankTransactionsHistoryResponse>(
    [endpoints.bankTransactions.transactionsList(paginationData, filterData, searchData).url],
    {
      queryFn: authQueryFnFactory(session?.accessToken),
    },
  )
}
