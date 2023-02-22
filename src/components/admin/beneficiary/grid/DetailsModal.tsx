import React from 'react'
import { observer } from 'mobx-react'
import { UseQueryResult } from '@tanstack/react-query'
import { useTranslation } from 'next-i18next'

import { useViewBeneficiary } from 'service/beneficiary'
import { ViewBeneficiaryResponse } from 'gql/beneficiary'
import DetailsDialog from 'components/admin/DetailsDialog'

import { ModalStore } from '../BeneficiaryPage'

export default observer(function DetailsModal() {
  const { t } = useTranslation('beneficiary')
  const { selectedRecord } = ModalStore
  if (!selectedRecord.id) throw new Error('beneficiary not selected')
  const { data }: UseQueryResult<ViewBeneficiaryResponse> = useViewBeneficiary(selectedRecord.id)

  const companyOrIndividual =
    data?.companyId != ''
      ? { name: t('grid.company'), value: data?.company?.companyName }
      : {
          name: t('grid.individual'),
          value: `${data?.person?.firstName} ${data?.person?.lastName}`,
        }

  const dataConverted = [
    { name: 'ID', value: `${data?.id}` },
    companyOrIndividual,
    { name: t('grid.countryCode'), value: data?.countryCode },
    { name: t('grid.city'), value: data?.city?.name },
    { name: t('grid.organizerRelation'), value: data?.organizerRelation },
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

  return <DetailsDialog modalStore={ModalStore} data={dataConverted} />
})
