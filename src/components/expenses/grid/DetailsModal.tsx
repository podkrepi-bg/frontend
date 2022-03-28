import { UseQueryResult } from 'react-query'
import { observer } from 'mobx-react'
import { useTranslation } from 'next-i18next'

import { ExpenseResponse } from 'gql/expenses'
import { useViewExpense } from 'common/hooks/expenses'
import { usePersonList } from 'common/hooks/person'
import { ModalStore } from 'stores/dashboard/ModalStore'
import DetailsDialog from 'components/admin/DetailsDialog'

export default observer(function DetailsModal() {
  const { selectedRecord } = ModalStore
  const { data }: UseQueryResult<ExpenseResponse> = useViewExpense(selectedRecord.id)
  const { data: personList } = usePersonList()
  const approvedBy = personList?.find((person) => person.id == data?.approvedById)

  const { t } = useTranslation('expenses')

  const dataConverted = [
    { name: 'ID', value: `${data?.id}` },
    { name: t('fields.type'), value: `${data?.type}` },
    { name: t('fields.status'), value: `${data?.status}` },
    { name: t('fields.currency'), value: `${data?.currency}` },
    { name: t('fields.amount'), value: `${data?.amount}` },
    { name: t('fields.vaultId'), value: `${data?.vaultId}` },
    { name: t('fields.deleted'), value: `${data?.deleted}` },
    { name: t('fields.description'), value: `${data?.description}` },
    { name: t('fields.documentId'), value: `${data?.documentId}` },
    {
      name: t('fields.approvedBy'),
      value: approvedBy ? `${approvedBy.firstName} ${approvedBy.lastName}` : '',
    },
    { name: t('fields.approvedById'), value: `${data?.approvedById}` },
  ]

  return <DetailsDialog data={dataConverted} />
})
