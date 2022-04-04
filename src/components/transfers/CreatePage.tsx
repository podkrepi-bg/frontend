import { useTranslation } from 'next-i18next'
import { UseQueryResult } from 'react-query'

import { Container } from '@mui/material'

import { usePersonList } from 'common/hooks/person'
import { useVaultsList } from 'common/hooks/vaults'
import { useCampaignList } from 'common/hooks/campaigns'

import { VaultResponse } from 'gql/vault'
import { PersonResponse } from 'gql/person'
import { CampaignResponse } from 'gql/campaigns'

import CreateForm from './CreateForm'
import AdminLayout from 'components/admin/navigation/AdminLayout'
import AdminContainer from 'components/admin/navigation/AdminContainer'

export default function CreatePage() {
  const { t } = useTranslation('transfer')

  const { data: vaults }: UseQueryResult<VaultResponse[]> = useVaultsList()
  const { data: people }: UseQueryResult<PersonResponse[]> = usePersonList()
  const { data: campaigns }: UseQueryResult<CampaignResponse[]> = useCampaignList()

  return (
    <AdminLayout>
      <AdminContainer title={t('transfers')}>
        <Container maxWidth="md" sx={{ py: 5 }}>
          <CreateForm campaigns={campaigns || []} vaults={vaults || []} people={people || []} />
        </Container>
      </AdminContainer>
    </AdminLayout>
  )
}
