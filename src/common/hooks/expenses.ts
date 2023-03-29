import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'

import { endpoints } from 'service/apiEndpoints'
import { ExpenseFile, ExpenseResponse } from 'gql/expenses'
import { authQueryFnFactory } from 'service/restRequests'

export function useExpensesList() {
  const { data: session } = useSession()
  return useQuery<ExpenseResponse[]>([endpoints.expenses.listExpenses.url], {
    queryFn: authQueryFnFactory(session?.accessToken),
  })
}

export function useViewExpense(id: string) {
  const { data: session } = useSession()
  return useQuery<ExpenseResponse>([endpoints.expenses.viewExpense(id).url], {
    retry: 0,
    queryFn: authQueryFnFactory(session?.accessToken),
  })
}

export function useCampaignExpensesList(slug: string) {
  const { data: session } = useSession()
  return useQuery<ExpenseResponse[]>([endpoints.campaign.listCampaignExpenses(slug).url], {
    queryFn: authQueryFnFactory(session?.accessToken),
  })
}

export function useCampaignApprovedExpensesList(slug: string) {
  const { data: session } = useSession()
  return useQuery<ExpenseResponse[]>([endpoints.campaign.listCampaignApprovedExpenses(slug).url], {
    queryFn: authQueryFnFactory(session?.accessToken),
  })
}

export function useCampaignExpenseFiles(id: string) {
  const { data: session } = useSession()

  return useQuery<ExpenseFile[]>([endpoints.expenses.listExpenseFiles(id).url], {
    queryFn: authQueryFnFactory(session?.accessToken),
  })
}

export function useDeleteCampaignExpense(id: string) {
  const { data: session } = useSession()
  return useQuery<ExpenseFile[]>([endpoints.expenses.deleteExpense(id).url], {
    queryFn: authQueryFnFactory(session?.accessToken),
  })
}

export function useDeleteExpenseFile(id: string) {
  const { data: session } = useSession()
  return useQuery<null>([endpoints.expenses.deleteExpenseFile(id).url], {
    queryFn: authQueryFnFactory(session?.accessToken),
  })
}
