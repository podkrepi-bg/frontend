import React from 'react'
import { UseQueryResult } from 'react-query'
import { observer } from 'mobx-react'
import { useTranslation } from 'next-i18next'

import { BeneficiaryType } from 'gql/beneficiary'
import { useBeneficiary } from 'service/beneficiary'
import { useViewCompany } from 'service/company'
import { useViewPerson } from 'service/person'
import { useViewCoordinatorResponse } from 'common/hooks/coordinators'
import { useCity } from 'common/hooks/cities'
import { ModalStore } from 'stores/dashboard/ModalStore'
import DetailsDialog from 'components/admin/DetailsDialog'

export default observer(function DetailsModal() {
  const { selectedRecord } = ModalStore
  const { data }: UseQueryResult<BeneficiaryType> = useBeneficiary(selectedRecord.id)
  const { t } = useTranslation('beneficiary')
  const companyName = useViewCompany(data?.companyId || '').data?.companyName || ''
  const personData = useViewPerson(data?.personId || '').data || ''
  const coordinator = useViewCoordinatorResponse(data?.coordinatorId || '').data?.person
  const { data: city } = useCity(data?.cityId || '')

  const companyOrIndividual =
    companyName != ''
      ? { name: t('grid.company'), value: companyName }
      : {
          name: t('grid.individual'),
          value: personData !== '' ? personData?.firstName + ' ' + personData?.lastName : '',
        }

  const dataConverted = [
    { name: 'ID', value: `${data?.id}` },
    companyOrIndividual,
    { name: t('grid.coordinator'), value: `${coordinator?.firstName} ${coordinator?.lastName}` },
    { name: t('grid.countryCode'), value: data?.countryCode },
    { name: t('grid.city'), value: city?.name },
    { name: t('grid.coordinatorRelation'), value: data?.coordinatorRelation },
    { name: t('grid.campaigns-count'), value: data?.campaigns?.length || 0 },
  ]

  if (data?.description) {
    //adds description after city
    dataConverted.splice(5, 0, { name: t('grid.description'), value: data?.description })
  }

  if (data?.publicData) {
    dataConverted.push({ name: t('grid.public-data'), value: data?.publicData })
  }

  if (data?.privateData) {
    dataConverted.push({ name: t('grid.private-data'), value: data?.privateData })
  }

  return <DetailsDialog data={dataConverted} />
})
