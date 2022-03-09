import React from 'react'
import { UseQueryResult } from 'react-query'
import { observer } from 'mobx-react'
import { Dialog, Card, CardContent, Typography, Divider } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { CampaignTypesResponse } from 'gql/campaign-types'
import { useCampaignType } from 'service/campaignTypes'
import { ModalStore } from 'stores/campaign-types/ModalStore'

type Props = {
  id: string
}

export default observer(function DetailsModal({ id }: Props) {
  const { data }: UseQueryResult<CampaignTypesResponse> = useCampaignType(id)
  const { data: parent }: UseQueryResult<CampaignTypesResponse> = useCampaignType(
    data?.parentId || '',
  )
  const { isDetailsOpen, hideDetails } = ModalStore
  const { t } = useTranslation()

  return (
    <Dialog open={isDetailsOpen} onClose={hideDetails} sx={{ top: '-35%' }}>
      <Card>
        <CardContent>
          <Typography variant="h5" sx={{ marginBottom: '16px' }}>
            {t('campaign-types:cta:details')}
          </Typography>
          <Divider />
          <Typography variant="h5">
            <b>{t('campaign-types:grid:name')}</b>: {data?.name}
          </Typography>
          <Typography variant="h5">
            <b>{t('campaign-types:grid:category')}</b>:{' '}
            {parent?.name || t('campaign-types:grid:no-parent')}
          </Typography>
          <Typography variant="h5">
            <b>{t('campaign-types:grid:description')}</b>:{' '}
            {data?.description || t('campaign-types:grid:no-description')}
          </Typography>
        </CardContent>
      </Card>
    </Dialog>
  )
})
