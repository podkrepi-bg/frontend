import React from 'react'
import { UseQueryResult } from 'react-query'
import { observer } from 'mobx-react'
import { useTranslation } from 'next-i18next'

import { CampaignTypesResponse } from 'gql/campaign-types'
import { useCampaignType } from 'service/restRequests/campaignTypes'
import { ModalStore } from 'stores/dashboard/ModalStore'

import DetailsDialog from 'components/admin/DetailsDialog'

export default observer(function DetailsModal() {
  const { selectedRecord } = ModalStore
  const { data }: UseQueryResult<CampaignTypesResponse> = useCampaignType(selectedRecord.id)
  const { data: parent }: UseQueryResult<CampaignTypesResponse> = useCampaignType(
    data?.parentId || '',
  )
  const { t } = useTranslation('campaign-types')

  const dataConverted = [
    { name: 'ID', value: `${data?.id}` },
    { name: t('grid.name'), value: `${data?.name}` },
    { name: t('grid.category'), value: parent?.name || `${t('grid.no-parent')}` },
    {
      name: t('grid.description'),
      value: data?.description || `${t('campaign-types:grid:no-description')}`,
    },
  ]

  return <DetailsDialog data={dataConverted} />
})
