import React from 'react'
import { UseQueryResult } from 'react-query'
import { observer } from 'mobx-react'
import { Dialog, Card, CardContent, Typography, Divider } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { WithdrawalResponse } from 'gql/withdrawals'
import { useWithdrawal } from 'common/hooks/withdrawals'
import { ModalStore } from 'stores/documents/ModalStore'

type Props = {
  id: string
}

export default observer(function DetailsModal({ id }: Props) {
  const { data }: UseQueryResult<WithdrawalResponse> = useWithdrawal(id)
  const { isDetailsOpen, hideDetails } = ModalStore
  const { t } = useTranslation()

  return (
    <Dialog open={isDetailsOpen} onClose={hideDetails} sx={{ top: '-35%' }}>
      <Card>
        <CardContent>
          <Typography variant="h5" sx={{ marginBottom: '16px' }}>
            {t('withdrawals:cta:details')}
          </Typography>
          <Divider />
          <Typography variant="body1" sx={{ fontSize: 24, marginTop: '8px' }}>
            {t('withdrawals:name')}: {data?.status}
          </Typography>
          <Typography variant="body1" sx={{ fontSize: 24 }}>
            {t('withdrawals:currency')}: {data?.currency}
          </Typography>
          <Typography variant="body1" sx={{ fontSize: 24 }}>
            {t('withdrawals:amount')}: {data?.amount}
          </Typography>
          {/* <Typography variant="body1" sx={{ fontSize: 24 }}>
            {t('Withdrawals:createdAt')}: {data?.createdAt}
          </Typography>
          <Typography variant="body1" sx={{ fontSize: 24 }}>
            {t('Withdrawals:updatedAt')}: {data?.updatedAt}
          </Typography> */}
          <Typography variant="body1" sx={{ fontSize: 24 }}>
            {t('withdrawals:reason')}: {data?.reason}
          </Typography>
          <Typography variant="body1" sx={{ fontSize: 24 }}>
            {t('withdrawals:approvedBy')}: {data?.approvedBy}
          </Typography>
          <Typography variant="body1" sx={{ fontSize: 24 }}>
            {t('withdrawals:bankAccount')}: {data?.bankAccount}
          </Typography>
          <Typography variant="body1" sx={{ fontSize: 24 }}>
            {t('withdrawals:sourceCampaign')}: {data?.sourceCampaign}
          </Typography>
          <Typography variant="body1" sx={{ fontSize: 24 }}>
            {t('withdrawals:sourceVault')}: {data?.sourceVault}
          </Typography>
        </CardContent>
      </Card>
    </Dialog>
  )
})
