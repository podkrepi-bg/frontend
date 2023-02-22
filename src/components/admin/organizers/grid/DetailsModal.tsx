import { observer } from 'mobx-react'
import { UseQueryResult } from '@tanstack/react-query'
import { useTranslation } from 'next-i18next'

import { ModalStore } from '../OrganizerPage'
import DetailsDialog from 'components/admin/DetailsDialog'
import { useViewOrganizer } from 'common/hooks/organizer'
import { OrganizerResponse } from 'gql/organizer'
import { formatDateString } from 'common/util/date'
import { Typography } from '@mui/material'
import { CampaignResponse } from 'gql/campaigns'

const renderCampaigns = (campaigns: Pick<CampaignResponse, 'id' | 'slug'>[]) => {
  return campaigns.map((field, index) => (
    <Typography variant="body2" key={field.id}>
      <b>{index + 1}:</b> {field?.slug}
    </Typography>
  ))
}

export default observer(function DetailsModal() {
  const { t } = useTranslation('organizer')
  const { selectedRecord } = ModalStore

  const { data }: UseQueryResult<OrganizerResponse> = useViewOrganizer(selectedRecord.id)

  const dataConverted = [
    { name: 'ID', value: data?.id },
    {
      name: t('admin.fields.name'),
      value: `${data?.person?.firstName || ''} ${data?.person?.lastName || ''}`,
    },
    { name: t('admin.fields.email'), value: data?.person.email },
    { name: t('admin.fields.phone'), value: data?.person.phone },
    { name: t('admin.fields.createdAt'), value: formatDateString(data?.createdAt || '') },
    { name: t('admin.fields.campaigns'), value: renderCampaigns(data?.campaigns || []) },
  ]
  return <DetailsDialog modalStore={ModalStore} data={dataConverted} />
})
