import { KeycloakInstance } from 'keycloak-js'
import { useKeycloak } from '@react-keycloak/ssr'
import { QueryClient, useQuery } from 'react-query'

import { endpoints } from 'service/apiEndpoints'
import { authQueryFnFactory } from 'service/restRequests'
import { WithdrawalEditResponse, WithdrawalResponse } from 'gql/withdrawals'
import { BankAccountResponse } from 'gql/bankaccounts'
import { VaultResponse } from 'gql/vault'
import { CampaignResponse } from 'gql/campaigns'
import { PersonResponse } from 'gql/person'

export function useWithdrawalsList() {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return useQuery<WithdrawalResponse[]>(
    endpoints.withdrawals.withdrawalsList.url,
    authQueryFnFactory<WithdrawalResponse[]>(keycloak?.token),
  )
}

export function useWithdrawal(id: string) {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return useQuery<WithdrawalEditResponse>(
    endpoints.withdrawals.getWithdrawal(id).url,
    authQueryFnFactory<WithdrawalEditResponse>(keycloak?.token),
  )
}

export function useWithdrawalDetailsPage(id: string) {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return useQuery<WithdrawalResponse>(
    endpoints.withdrawals.getWithdrawal(id).url,
    authQueryFnFactory<WithdrawalResponse>(keycloak?.token),
  )
}

export function useBankAccountsForWithdrawal() {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  const bankAccounts = useQuery<BankAccountResponse[]>(endpoints.bankAccounts.bankAccountList.url, {
    queryFn: authQueryFnFactory(keycloak?.token),
  })
  return bankAccounts.data
}

export function useCampaignsForWithdrawal() {
  const campaigns = useQuery<CampaignResponse[]>(endpoints.campaign.listCampaigns.url)
  return campaigns.data
}

export function useVaultsForWithdrawal() {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  const vaults = useQuery<VaultResponse[]>(
    endpoints.vaults.vaultsList.url,
    authQueryFnFactory<VaultResponse[]>(keycloak?.token),
  )
  return vaults.data
}

export const usePersonListForWithdrawal = () => {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  const personList = useQuery<PersonResponse[]>(
    endpoints.person.list.url,
    authQueryFnFactory<PersonResponse[]>(keycloak?.token),
  )
  return personList.data
}

export async function prefetchWithdrawalsList(client: QueryClient, token?: string) {
  await client.prefetchQuery<WithdrawalResponse[]>(
    endpoints.withdrawals.withdrawalsList.url,
    authQueryFnFactory<WithdrawalResponse[]>(token),
  )
}

export async function prefetchWithdrawalById(client: QueryClient, id: string, token?: string) {
  await client.prefetchQuery<WithdrawalResponse>(
    endpoints.withdrawals.getWithdrawal(id).url,
    authQueryFnFactory<WithdrawalResponse>(token),
  )
}
