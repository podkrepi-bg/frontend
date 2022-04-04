import { useRouter } from 'next/router'
import { UseQueryResult } from 'react-query'
import { useTranslation } from 'next-i18next'

import { Container } from '@mui/material'

import { useVaultsList } from 'common/hooks/vaults'
import { usePersonList } from 'common/hooks/person'
import { useTransfer } from 'common/hooks/transfers'
import { useCampaignList } from 'common/hooks/campaigns'

import { VaultResponse } from 'gql/vault'
import { PersonResponse } from 'gql/person'
import { TransferResponse } from 'gql/transfer'
import { CampaignResponse } from 'gql/campaigns'

import EditForm from './EditForm'
import AdminLayout from 'components/admin/navigation/AdminLayout'
import AdminContainer from 'components/admin/navigation/AdminContainer'

export default function EditPage() {
  const { t } = useTranslation('transfer')

  const router = useRouter()
  const id = String(router.query.id)

  const { data: transfer }: UseQueryResult<TransferResponse> = useTransfer(id)
  const { data: vaults }: UseQueryResult<VaultResponse[]> = useVaultsList()
  const { data: people }: UseQueryResult<PersonResponse[]> = usePersonList()
  const { data: campaigns }: UseQueryResult<CampaignResponse[]> = useCampaignList()

  return (
    <AdminLayout>
      <AdminContainer title={t('transfers')}>
        <Container maxWidth="md" sx={{ py: 5 }}>
          {transfer && campaigns && vaults && people && (
            <EditForm
              transfer={transfer}
              campaigns={campaigns}
              vaults={vaults}
              people={people}
              id={id}
            />
          )}
        </Container>
      </AdminContainer>
    </AdminLayout>
  )
}
