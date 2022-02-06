import { endpoints } from 'common/api-endpoints'
import { useQuery } from 'react-query'

export function useBankAccountsList() {
  return useQuery<any[]>(endpoints.bankAccounts.bankAccountList.url)
}

export function useViewBankAccount(slug: string) {
  return useQuery<any>(endpoints.bankAccounts.viewBankAccount(slug).url)
}
