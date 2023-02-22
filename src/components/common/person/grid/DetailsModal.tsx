import React from 'react'
import { UseQueryResult } from '@tanstack/react-query'
import { observer } from 'mobx-react'
import { useTranslation } from 'next-i18next'

import DetailsDialog from 'components/admin/DetailsDialog'

import { ModalStore } from '../PersonGrid'
import { usePerson } from 'common/hooks/person'
import { PersonResponse } from 'gql/person'

export default observer(function DetailsModal() {
  const { selectedRecord } = ModalStore
  const { data }: UseQueryResult<PersonResponse> = usePerson(selectedRecord.id)
  const { t } = useTranslation('person')

  const dataConverted = [
    { name: 'ID', value: `${data?.id}` },
    { name: t('admin.fields.name'), value: `${data?.firstName} + ' ' + ${data?.lastName}` },
    { name: t('admin.fields.email'), value: `${data?.email}` },
    { name: t('admin.fields.createdAt'), value: `${data?.createdAt}` },
    //{ name: t('updatedAt'), value: `${data?.updatedAt}` },
  ]

  return <DetailsDialog modalStore={ModalStore} data={dataConverted} />
})
