import { Container } from '@mui/material'
import { useRouter } from 'next/router'
import { UseQueryResult } from 'react-query'

import { CampaignResponse } from 'gql/campaigns'
import { useViewCampaignById } from 'common/hooks/campaigns'
import AdminLayout from 'components/admin/navigation/AdminLayout'
import AdminContainer from 'components/admin/navigation/AdminContainer'
import NotFoundIllustration from 'components/errors/assets/NotFoundIllustration'

import EditForm from './EditForm'

export default function EditPage() {
  const { query } = useRouter()
  const { data: campaign }: UseQueryResult<CampaignResponse> = useViewCampaignById(String(query.id))
  return (
    <AdminLayout>
      <AdminContainer title={'Кампании'}>
        <Container maxWidth="md" sx={{ py: 5 }}>
          {campaign ? <EditForm campaign={campaign} /> : <NotFoundIllustration />}
        </Container>
      </AdminContainer>
    </AdminLayout>
  )
}
