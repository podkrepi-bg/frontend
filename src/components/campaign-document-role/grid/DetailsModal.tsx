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
  const { t } = useTranslation('campaign-document-role')

  const dataConverted = [
    { name: 'ID', value: `${data?.id}` },
    { name: t('Name'), value: `${data?.name}` },
    { name: t('Description'), value: `${data?.description}` },
    { name: t('created-at'), value: `${data?.createdAt}` },
    { name: t('updated-at'), value: `${data?.updatedAt}` },
  ]

  return <DetailsDialog data={dataConverted} />
})
