import { observer } from 'mobx-react'
import { UseQueryResult } from 'react-query'
import { useTranslation } from 'next-i18next'

import { useCampaignReport } from 'common/hooks/campaignReport'

import DetailsDialog from 'components/admin/DetailsDialog'

import { ModalStore } from '../CampaignReportPage'
import { CampaignReportResponse } from 'components/irregularity-report/helpers/report.types'

export default observer(function DetailsModal() {
  const { t } = useTranslation('irregularity-report')
  const { selectedRecord } = ModalStore

  const { data }: UseQueryResult<CampaignReportResponse> = useCampaignReport(selectedRecord.id)

  const dataConverted = [
    { name: 'ID', value: data?.id },
    { name: t('admin.fields.status'), value: data?.status },
    { name: t('admin.fields.createdAt'), value: data?.createdAt.toString().slice(0, 10) },
    { name: t('admin.fields.campaign'), value: data?.campaign.title },
    { name: t('admin.fields.reason'), value: data?.reason },
    { name: t('admin.fields.content'), value: data?.reportContent },
    {
      name: t('admin.fields.person'),
      value: `${data?.person?.firstName || ''} ${data?.person?.lastName || ''}`,
    },
    { name: t('admin.fields.type'), value: data?.notifierType },
    { name: t('admin.fields.email'), value: data?.person.email },
    { name: t('admin.fields.phone'), value: data?.person.phone },
  ]
  return <DetailsDialog modalStore={ModalStore} data={dataConverted} />
})
