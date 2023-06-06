import { Container } from '@mui/material'
import { useRouter } from 'next/router'
import { UseQueryResult } from '@tanstack/react-query'

import AdminLayout from 'components/common/navigation/AdminLayout'
import AdminContainer from 'components/common/navigation/AdminContainer'
import { useViewArticleById } from 'common/hooks/campaign-news'
import { AdminCampaignNewsResponse } from 'gql/campaign-news'

import EditForm from './EditForm'

export default function EditPage() {
  const { query } = useRouter()
  const { data: article }: UseQueryResult<AdminCampaignNewsResponse> = useViewArticleById(
    String(query.id),
  )
  console.log(article)
  return (
    <AdminLayout>
      <AdminContainer title={'Новини за кампании'}>
        <Container maxWidth="md" sx={{ py: 5 }}>
          {article && <EditForm article={article} />}
        </Container>
      </AdminContainer>
    </AdminLayout>
  )
}
