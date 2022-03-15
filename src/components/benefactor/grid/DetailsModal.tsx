import { observer } from 'mobx-react'
import { UseQueryResult } from 'react-query'
import { useTranslation } from 'next-i18next'

import { BenefactorResponse } from 'gql/benefactor'
import { useBenefactor } from 'common/hooks/benefactor'
import { ModalStore } from 'stores/dashboard/ModalStore'
import DetailsDialog from 'components/admin/DetailsDialog'

export default observer(function DetailsModal() {
  const { selectedRecord } = ModalStore
  const { data }: UseQueryResult<BenefactorResponse> = useBenefactor(selectedRecord.id)
  const { t } = useTranslation('benefactor')

  const dataConverted = [
    { name: 'ID', value: `${data?.id}` },
    { name: t('customerId'), value: `${data?.extCustomerId}` },
    { name: t('personId'), value: `${data?.person}` },
  ]

  return <DetailsDialog data={dataConverted} />
})
