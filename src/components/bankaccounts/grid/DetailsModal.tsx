import React from 'react'
import { UseQueryResult } from 'react-query'
import { observer } from 'mobx-react'
import { Dialog, Card, CardContent, Typography, SxProps, Theme } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { BankAccountResponse } from 'gql/bankaccounts'
import { useViewBankAccount } from 'common/hooks/bankaccounts'
import { ModalStore } from 'stores/dashboard/ModalStore'
import CloseModalButton from 'components/common/CloseModalButton'

const containerStyles: SxProps<Theme> = {
  position: 'absolute' as const,
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  p: 4,
}

export default observer(function DetailsModal() {
  const { isDetailsOpen, hideDetails, selectedRecord } = ModalStore
  const { data }: UseQueryResult<BankAccountResponse> = useViewBankAccount(selectedRecord.id)
  const { t } = useTranslation('bankaccounts')

  return (
    <Dialog open={isDetailsOpen} onClose={hideDetails} sx={containerStyles}>
      <Card style={{ paddingTop: '30px' }}>
        <CloseModalButton onClose={hideDetails} />
        <CardContent>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            <b>{t('status')}:</b> {data?.status}
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            <b>{t('ibanNumber')}:</b> {data?.ibanNumber}
          </Typography>
          <Typography color="text.secondary" gutterBottom>
            <b>{t('accountHolder')}:</b> {data?.accountHolderName}
          </Typography>
          <Typography variant="body2" gutterBottom>
            <b>{t('AccountHolderType')}:</b> {data?.accountHolderType}
          </Typography>
          <Typography variant="body2" gutterBottom>
            <b>{t('bankName')}:</b> {data?.bankName}
          </Typography>
          <Typography variant="body2" gutterBottom>
            <b>{t('bankIdCode')}:</b> {data?.bankIdCode}
          </Typography>
          <Typography variant="body2">
            <b>{t('fingerprint')}:</b> {data?.fingerprint}
          </Typography>
        </CardContent>
      </Card>
    </Dialog>
  )
})
