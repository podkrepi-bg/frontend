import { Container } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { UseQueryResult } from '@tanstack/react-query'

import { CampaignResponse } from 'gql/campaigns'
import { useCampaignList } from 'common/hooks/campaigns'
import AdminLayout from 'components/common/navigation/AdminLayout'
import AdminContainer from 'components/common/navigation/AdminContainer'

import CreateForm from './CreateForm'

export default function CreatePage() {
  const { t } = useTranslation('transfer')

  const { data: campaigns }: UseQueryResult<CampaignResponse[]> = useCampaignList()

  return (
    <AdminLayout>
      <AdminContainer title={t('transfers')}>
        <Container maxWidth="md" sx={{ py: 5 }}>
          <CreateForm campaigns={campaigns || []} />
        </Container>
      </AdminContainer>
    </AdminLayout>
  )
}
