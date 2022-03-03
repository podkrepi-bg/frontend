import React from 'react'
import { UseQueryResult } from 'react-query'
import { observer } from 'mobx-react'
import { Dialog, Card, CardContent, Typography, Divider } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { BeneficiaryType } from 'gql/beneficiary'
import { useBeneficiary } from 'service/beneficiary'
import { ModalStore } from 'stores/documents/ModalStore'

type Props = {
  id: string
}

export default observer(function DetailsModal({ id }: Props) {
  const { data }: UseQueryResult<BeneficiaryType> = useBeneficiary(id)
  const { isDetailsOpen, hideDetails } = ModalStore
  const { t } = useTranslation()

  return (
    <Dialog open={isDetailsOpen} onClose={hideDetails} sx={{ top: '-35%' }}>
      <Card>
        <CardContent>
          <Typography variant="h5" sx={{ marginBottom: '16px' }}>
            {t('beneficiary:cta:details')}
          </Typography>
          <Divider />
          <Typography variant="body1" sx={{ fontSize: 24 }}>
            <b>{t('beneficiary:grid:id')}</b>: {data?.id}
          </Typography>
          {data?.companyId ? (
            <Typography variant="body1" sx={{ fontSize: 24 }}>
              {t('beneficiary:grid:companyId')}: {data?.companyId}
            </Typography>
          ) : null}
          {data?.personId ? (
            <Typography variant="body1" sx={{ fontSize: 24 }}>
              <b>{t('beneficiary:grid:personId')}</b>: {data?.personId}
            </Typography>
          ) : null}
          <Typography variant="body1" sx={{ fontSize: 24 }}>
            <b>{t('beneficiary:grid:coordinatorId')}</b>: {data?.coordinatorId}
          </Typography>
          <Typography variant="body1" sx={{ fontSize: 24 }}>
            <b>{t('beneficiary:grid:countryCode')}</b>: {data?.countryCode}
          </Typography>
          <Typography variant="body1" sx={{ fontSize: 24 }}>
            <b>{t('beneficiary:grid:cityId')}</b>: {data?.cityId}
          </Typography>
          {data?.description ? (
            <Typography variant="body1" sx={{ fontSize: 24 }}>
              <b>{t('beneficiary:grid:personId')}</b>: {data?.description}
            </Typography>
          ) : null}
          {data?.publicData ? (
            <Typography variant="body1" sx={{ fontSize: 24 }}>
              <b>{t('beneficiary:grid:publicData')}</b>: {data?.publicData}
            </Typography>
          ) : null}
          {data?.privateData ? (
            <Typography variant="body1" sx={{ fontSize: 24 }}>
              <b>{t('beneficiary:grid:privateData')}</b>: {data?.privateData}
            </Typography>
          ) : null}
          <Typography variant="body1" sx={{ fontSize: 24 }}>
            <b>{t('beneficiary:grid:coordinatorRelation')}</b>: {data?.coordinatorRelation}
          </Typography>
          {data?.campaigns ? (
            <Typography variant="body1" sx={{ fontSize: 24 }}>
              <b>{t('beneficiary:grid:campaigns-count')}</b>: {data?.campaigns?.length}
            </Typography>
          ) : null}
        </CardContent>
      </Card>
    </Dialog>
  )
})
