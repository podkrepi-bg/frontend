import { useRouter } from 'next/router'
import { Container } from '@mui/material'
import { UseQueryResult } from '@tanstack/react-query'
import { useTranslation } from 'next-i18next'

import { TransferResponse } from 'gql/transfer'
import { CampaignResponse } from 'gql/campaigns'
import { useTransfer } from 'common/hooks/transfers'
import { useCampaignList } from 'common/hooks/campaigns'
import AdminLayout from 'components/common/navigation/AdminLayout'
import AdminContainer from 'components/common/navigation/AdminContainer'

import EditForm from './EditForm'

export default function EditPage() {
  const { t } = useTranslation('transfer')

  const router = useRouter()
  const id = String(router.query.id)

  const { data: transfer }: UseQueryResult<TransferResponse> = useTransfer(id)
  const { data: campaigns }: UseQueryResult<CampaignResponse[]> = useCampaignList()

  return (
    <AdminLayout>
      <AdminContainer title={t('transfers')}>
        <Container maxWidth="md" sx={{ py: 5 }}>
          {transfer && campaigns && <EditForm transfer={transfer} campaigns={campaigns} id={id} />}
        </Container>
      </AdminContainer>
    </AdminLayout>
  )
}
