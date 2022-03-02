import React from 'react'
import { UseQueryResult } from 'react-query'
import { observer } from 'mobx-react'
import { useTranslation } from 'next-i18next'
import { Dialog, Card, CardContent, Typography, Divider } from '@mui/material'

import { VaultResponse } from 'gql/vault'
import { useVault } from 'common/hooks/vaults'
import { ModalStore } from 'stores/documents/ModalStore'

type Props = {
  id: string
}

export default observer(function DetailsModal({ id }: Props) {
  const { data }: UseQueryResult<VaultResponse> = useVault(id)
  const { isDetailsOpen, hideDetails } = ModalStore
  const { t } = useTranslation()

  return (
    <Dialog open={isDetailsOpen} onClose={hideDetails} sx={{ top: '-35%' }}>
      <Card>
        <CardContent>
          <Typography variant="h5" sx={{ marginBottom: '16px' }}>
            {t('vaults:cta:details')}
          </Typography>
          <Divider />
          <Typography variant="body1" sx={{ fontSize: 24, marginTop: '8px' }}>
            {t('vaults:name')}: {data?.name}
          </Typography>
          <Typography variant="body1" sx={{ fontSize: 24 }}>
            {t('vaults:currency')}: {data?.currency}
          </Typography>
          <Typography variant="body1" sx={{ fontSize: 24 }}>
            {t('vaults:amount')}: {data?.amount}
          </Typography>
          <Typography variant="body1" sx={{ fontSize: 24 }}>
            {t('vaults:createdAt')}: {data?.createdAt}
          </Typography>
          <Typography variant="body1" sx={{ fontSize: 24 }}>
            {t('vaults:updatedAt')}: {data?.updatedAt}
          </Typography>
          <Typography variant="body1" sx={{ fontSize: 24 }}>
            {t('vaults:campaignId')}: {data?.campaignId}
          </Typography>
        </CardContent>
      </Card>
    </Dialog>
  )
})
