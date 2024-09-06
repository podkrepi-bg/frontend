import { Box } from '@mui/material'
import CampaignApplicationBasic from 'components/client/campaign-application/steps/CampaignApplicationBasic'
import CampaignApplicationDetails from 'components/client/campaign-application/steps/CampaignApplicationDetails'
import CampaignApplicationOrganizer from 'components/client/campaign-application/steps/CampaignApplicationOrganizer'
import GenericForm from 'components/common/form/GenericForm'
import AdminContainer from 'components/common/navigation/AdminContainer'
import AdminLayout from 'components/common/navigation/AdminLayout'
import CampaignApplicationAdminPropsEdit from './CampaignApplicationAdminPropsEdit'
import { CampaignApplicationAdminEdit } from './campaignApplicationAdmin.types'
import { useState } from 'react'

export default function EditPage() {
  const [files, setFiles] = useState<File[]>([])

  const initialValues = {
    organizer: {
      name: 'Some organizer',
      phone: '+35999999',
      email: 'aReal@Email.com',
    },

    status: 'review',
    ticketUrl: 'https://trello.com/this-campaign-application',
  } as CampaignApplicationAdminEdit

  return (
    <AdminLayout>
      <AdminContainer title={'Кандидат Кампании'}>
        <GenericForm<CampaignApplicationAdminEdit>
          onSubmit={(v) => console.log(v)}
          initialValues={initialValues}>
          <CampaignApplicationOrganizer />
          <div>.</div>
          <CampaignApplicationBasic />
          <div>.</div>
          <CampaignApplicationDetails files={files} setFiles={setFiles} />
          <div>.</div>
          <CampaignApplicationAdminPropsEdit />
        </GenericForm>
        <Box pb="5" />
      </AdminContainer>
    </AdminLayout>
  )
}
