import { endpoints } from 'common/api-endpoints'
import { BankAccountResponse } from 'gql/bankAccounts'
import { useQuery } from 'react-query'

export function useBankAccountsList() {
  return useQuery<BankAccountResponse[]>(endpoints.bankAccounts.bankAccountList.url)
}

export function useViewBankAccount(slug: string) {
  return useQuery<BankAccountResponse>(endpoints.bankAccounts.viewBankAccount(slug).url, {
    retry: 0,
  })
}
