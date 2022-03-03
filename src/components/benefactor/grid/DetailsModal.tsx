import React from 'react'
import { UseQueryResult } from 'react-query'
import { observer } from 'mobx-react'
import { Dialog, Card, CardContent, Typography, Divider } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { BenefactorResponse } from 'gql/benefactor'
import { useBenefactor } from 'common/hooks/benefactor'
import { ModalStore } from 'stores/ModalStore'

type Props = {
  id: string
}

export default observer(function DetailsModal({ id }: Props) {
  const { data }: UseQueryResult<BenefactorResponse> = useBenefactor(id)
  const { isDetailsOpen, hideDetails } = ModalStore
  const { t } = useTranslation('benefactor')
  console.log(data, 'details')
  console.log(id)

  return (
    <Dialog open={isDetailsOpen} onClose={hideDetails} sx={{ top: '-35%' }}>
      <Card>
        <CardContent>
          <Typography variant="h5" sx={{ marginBottom: '16px' }}>
            {t('cta.details')}
          </Typography>
          <Divider />
          <Typography variant="body1" sx={{ fontSize: 24, marginTop: '8px' }}>
            {t('customerId')}: {data?.extCustomerId}
          </Typography>
          <Typography variant="body1" sx={{ fontSize: 24 }}>
            {t('personId')}: {data?.personId}
          </Typography>
        </CardContent>
      </Card>
    </Dialog>
  )
})
