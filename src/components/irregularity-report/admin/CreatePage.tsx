import { UseQueryResult } from 'react-query'
import { useTranslation } from 'next-i18next'

import { Container } from '@mui/material'

import { CampaignResponse } from 'gql/campaigns'
import { useCampaignList } from 'common/hooks/campaigns'
import { useCurrentPerson } from 'common/util/useCurrentPerson'

import CreateForm from './grid/CreateForm'
import AdminLayout from 'components/admin/navigation/AdminLayout'
import AdminContainer from 'components/admin/navigation/AdminContainer'

export default function CreatePage() {
  const { t } = useTranslation('irregularity-report')

  const { data: campaigns }: UseQueryResult<CampaignResponse[]> = useCampaignList()
  const { data: userData } = useCurrentPerson()
  const person = userData?.user || undefined

  return (
    <AdminLayout>
      <AdminContainer title={t('admin.reports')}>
        <Container maxWidth="md" sx={{ py: 5 }}>
          {campaigns && person && <CreateForm campaigns={campaigns} person={person} />}
        </Container>
      </AdminContainer>
    </AdminLayout>
  )
}
