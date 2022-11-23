import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'

import { endpoints } from 'service/apiEndpoints'
import { BankAccountResponse } from 'gql/bankaccounts'
import { authQueryFnFactory } from 'service/restRequests'

export function useBankAccountsList() {
  const { data: session } = useSession()
  return useQuery<BankAccountResponse[]>([endpoints.bankAccounts.bankAccountList.url], {
    queryFn: authQueryFnFactory(session?.accessToken),
  })
}

export function useViewBankAccount(slug: string) {
  const { data: session } = useSession()
  return useQuery<BankAccountResponse>([endpoints.bankAccounts.viewBankAccount(slug).url], {
    retry: 0,
    queryFn: authQueryFnFactory(session?.accessToken),
  })
}
