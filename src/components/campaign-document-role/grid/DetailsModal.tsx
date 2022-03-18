import { UseQueryResult } from 'react-query'
import { observer } from 'mobx-react'
import { useTranslation } from 'next-i18next'

import { ModalStore } from 'stores/dashboard/ModalStore'
import DetailsDialog from 'components/admin/DetailsDialog'
import { campaignDocumentRoleResponse } from 'gql/campaign-document-role'
import { useDocument } from 'common/hooks/campaignDocumentRole'

export default observer(function DetailsModal() {
  const { selectedRecord } = ModalStore
  const { data }: UseQueryResult<campaignDocumentRoleResponse> = useDocument(selectedRecord.id)
  const { t } = useTranslation('cities')

  const dataConverted = [
    { name: 'ID', value: `${data?.id}` },
    { name: t('name'), value: `${data?.name}` },
    { name: t('описание'), value: `${data?.description}` },
  ]

  return <DetailsDialog data={dataConverted} />
})
