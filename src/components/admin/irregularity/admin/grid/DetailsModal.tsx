import { observer } from 'mobx-react'
import { UseQueryResult } from '@tanstack/react-query'
import { useTranslation } from 'next-i18next'

import { useIrregularity } from 'common/hooks/irregularity'

import { ModalStore } from '../IrregularityPage'
import DetailsDialog from 'components/admin/DetailsDialog'
import { IrregularityResponse } from 'components/client/irregularity/helpers/irregularity.types'

export default observer(function DetailsModal() {
  const { t } = useTranslation('irregularity')
  const { selectedRecord } = ModalStore

  const { data }: UseQueryResult<IrregularityResponse> = useIrregularity(selectedRecord.id)

  const dataConverted = [
    { name: 'ID', value: data?.id },
    { name: t('admin.fields.status'), value: t('admin.fields.status-type.' + data?.status) },
    { name: t('admin.fields.createdAt'), value: data?.createdAt.toString().slice(0, 10) },
    { name: t('admin.fields.campaign'), value: data?.campaign.title },
    { name: t('admin.fields.reason'), value: t('reason.' + data?.reason) },
    { name: t('admin.fields.description'), value: data?.description },
    {
      name: t('admin.fields.person'),
      value: `${data?.person?.firstName || ''} ${data?.person?.lastName || ''}`,
    },
    { name: t('admin.fields.type'), value: t('admin.fields.notifier-type.' + data?.notifierType) },
    { name: t('admin.fields.email'), value: data?.person.email },
    { name: t('admin.fields.phone'), value: data?.person.phone },
  ]
  return <DetailsDialog modalStore={ModalStore} data={dataConverted} />
})
