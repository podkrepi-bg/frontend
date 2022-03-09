import React from 'react'
import { UseQueryResult } from 'react-query'
import { observer } from 'mobx-react'
import { Dialog, Card, CardContent, Typography, Divider } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { BeneficiaryType } from 'gql/beneficiary'
import { useBeneficiary } from 'service/beneficiary'
import { useViewCompany } from 'service/company'
import { useViewPerson } from 'service/person'
import { useViewCoordinatorResponse } from 'common/hooks/coordinators'
import { useCity } from 'common/hooks/cities'
import { ModalStore } from 'stores/documents/ModalStore'

type Props = {
  id: string
}

export default observer(function DetailsModal({ id }: Props) {
  const { data }: UseQueryResult<BeneficiaryType> = useBeneficiary(id)
  const { isDetailsOpen, hideDetails } = ModalStore
  const { t } = useTranslation()
  const companyName = useViewCompany(data?.companyId || '').data?.companyName || ''
  const personData = useViewPerson(data?.personId || '').data || ''
  const coordinator = useViewCoordinatorResponse(data?.coordinatorId || '').data?.person
  const city = useCity(data?.cityId || '').data

  return (
    <Dialog open={isDetailsOpen} onClose={hideDetails} sx={{ top: '-35%' }}>
      <Card>
        <CardContent>
          <Typography variant="h5" sx={{ marginBottom: '16px' }}>
            {t('beneficiary:cta:details')}
          </Typography>
          <Divider />
          {companyName !== '' ? (
            <Typography variant="body1" sx={{ fontSize: 24 }}>
              {t('beneficiary:grid:company')}: {companyName}
            </Typography>
          ) : null}
          {personData !== '' ? (
            <Typography variant="body1" sx={{ fontSize: 24 }}>
              <b>{t('beneficiary:grid:individual')}</b>: {personData?.firstName}{' '}
              {personData?.lastName}
            </Typography>
          ) : null}
          <Typography variant="body1" sx={{ fontSize: 24 }}>
            <b>{t('beneficiary:grid:coordinator')}</b>: {coordinator?.firstName}{' '}
            {coordinator?.lastName}
          </Typography>
          <Typography variant="body1" sx={{ fontSize: 24 }}>
            <b>{t('beneficiary:grid:countryCode')}</b>: {data?.countryCode}
          </Typography>
          <Typography variant="body1" sx={{ fontSize: 24 }}>
            <b>{t('beneficiary:grid:city')}</b>: {city?.name}
          </Typography>
          {data?.description ? (
            <Typography variant="body1" sx={{ fontSize: 24 }}>
              <b>{t('beneficiary:grid:description')}</b>: {data?.description}
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
          <Typography variant="body1" sx={{ fontSize: 24 }}>
            <b>{t('beneficiary:grid:campaigns-count')}</b>: {data?.campaigns?.length || 0}
          </Typography>
        </CardContent>
      </Card>
    </Dialog>
  )
})
