import { observer } from 'mobx-react'
import { UseQueryResult } from 'react-query'
import { useTranslation } from 'next-i18next'

import {
  Dialog,
  Card,
  CardContent,
  Typography,
  Divider,
  DialogActions,
  Button,
} from '@mui/material'

import { TransferResponse } from 'gql/transfer'
import { ModalStore } from 'stores/dashboard/ModalStore'

import { useTransfer } from 'common/hooks/transfers'

type Props = {
  id: string
}

export default observer(function DetailsModal({ id }: Props) {
  const { t } = useTranslation('transfer')
  const { isDetailsOpen, hideDetails } = ModalStore

  const { data }: UseQueryResult<TransferResponse> = useTransfer(String(id))
  const approvedByFullName = `${data?.approvedBy?.firstName || ''}  ${
    data?.approvedBy?.lastName || ''
  }`

  return (
    <Dialog open={isDetailsOpen} onClose={hideDetails}>
      <Card>
        <CardContent>
          <Typography variant="h5" align="center">
            {t('transfer:cta:details')}
          </Typography>
          <Divider />
          <Typography variant="body1" sx={{ fontSize: 24, marginTop: '8px' }}>
            {t('status')}: {data?.status}
          </Typography>
          <Typography variant="body1" sx={{ fontSize: 24, marginTop: '8px' }}>
            {t('currency')}: {data?.currency}
          </Typography>
          <Typography variant="body1" sx={{ fontSize: 24, marginTop: '8px' }}>
            {t('amount')}: {data?.amount}
          </Typography>
          <Typography variant="body1" sx={{ fontSize: 24, marginTop: '8px' }}>
            {t('documentId')}: {data?.documentId}
          </Typography>
          <Typography variant="body1" sx={{ fontSize: 24, marginTop: '8px' }}>
            {t('targetDate')}: {data?.targetDate?.toString().slice(0, 10)}
          </Typography>
          <Typography variant="body1" sx={{ fontSize: 24, marginTop: '8px' }}>
            {t('sourceCampaign')}: {data?.sourceCampaign?.title}
          </Typography>
          <Typography variant="body1" sx={{ fontSize: 24, marginTop: '8px' }}>
            {t('sourceVault')}: {data?.sourceVault?.name}
          </Typography>
          <Typography variant="body1" sx={{ fontSize: 24, marginTop: '8px' }}>
            {t('reason')}: {data?.reason}
          </Typography>
          <Typography variant="body1" sx={{ fontSize: 24, marginTop: '8px' }}>
            {t('approvedBy')}: {approvedByFullName}
          </Typography>
          <Typography variant="body1" sx={{ fontSize: 24, marginTop: '8px' }}>
            {t('targetCampaign')}: {data?.targetCampaign?.title}
          </Typography>
          <Typography variant="body1" sx={{ fontSize: 24, marginTop: '8px' }}>
            {t('targetVault')}: {data?.targetVault?.name}
          </Typography>
        </CardContent>
      </Card>
      <DialogActions>
        <Button variant="contained" onClick={hideDetails}>
          {t('transfer:cta:close')}
        </Button>
      </DialogActions>
    </Dialog>
  )
})
