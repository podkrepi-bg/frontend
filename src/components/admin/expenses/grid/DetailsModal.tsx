import { UseQueryResult } from '@tanstack/react-query'
import { observer } from 'mobx-react'
import { useTranslation } from 'next-i18next'

import { ExpenseResponse } from 'gql/expenses'
import { useViewExpense } from 'common/hooks/expenses'
import { usePersonList } from 'common/hooks/person'
import DetailsDialog from 'components/admin/DetailsDialog'

import { ModalStore } from '../ExpensesPage'

export default observer(function DetailsModal() {
  const { selectedRecord } = ModalStore
  const { data }: UseQueryResult<ExpenseResponse> = useViewExpense(selectedRecord.id)
  const { data: personList } = usePersonList()
  const approvedBy = personList?.find((person) => person.id == data?.approvedById)

  const { t } = useTranslation('')

  const dataConverted = [
    { name: 'ID', value: `${data?.id}` },
    { name: t('expenses:fields.type'), value: data?.type },
    { name: t('expenses:fields.status'), value: data?.status },
    { name: t('common:fields.currency'), value: data?.currency },
    { name: t('expenses:fields.amount'), value: data?.amount },
    { name: t('expenses:fields.vaultId'), value: data?.vaultId },
    { name: t('expenses:fields.deleted'), value: data?.deleted?.toString() },
    { name: t('expenses:fields.description'), value: data?.description },
    { name: t('expenses:fields.documentId'), value: data?.documentId },
    {
      name: t('expenses:fields.approvedById'),
      value: approvedBy ? `${approvedBy.firstName} ${approvedBy.lastName} (${approvedBy.id})` : '',
    },
  ]

  return <DetailsDialog modalStore={ModalStore} data={dataConverted} />
})
