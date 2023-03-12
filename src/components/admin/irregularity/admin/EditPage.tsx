import { useRouter } from 'next/router'
import { UseQueryResult } from '@tanstack/react-query'
import { useTranslation } from 'next-i18next'

import { Container } from '@mui/material'

import { CampaignResponse } from 'gql/campaigns'
import { useCampaignList } from 'common/hooks/campaigns'
import {
  IrregularityFileResponse,
  IrregularityResponse,
} from '../../../client/irregularity/helpers/irregularity.types'
import { useIrregularity, useIrregularityFilesList } from 'common/hooks/irregularity'

import EditForm from './grid/EditForm'
import AdminLayout from 'components/common/navigation/AdminLayout'
import AdminContainer from 'components/common/navigation/AdminContainer'

export default function EditPage() {
  const { t } = useTranslation('irregularity')

  const router = useRouter()
  const id = String(router.query.id)

  const { data: campaigns }: UseQueryResult<CampaignResponse[]> = useCampaignList()
  const { data: irregularity }: UseQueryResult<IrregularityResponse> = useIrregularity(id)
  const { data: irregularityFiles }: UseQueryResult<IrregularityFileResponse[]> =
    useIrregularityFilesList(id)

  return (
    <AdminLayout>
      <AdminContainer title={t('admin.irregularities')}>
        <Container maxWidth="md" sx={{ py: 5 }}>
          {irregularity && campaigns && irregularityFiles && (
            <EditForm
              irregularity={irregularity}
              campaigns={campaigns}
              irregularityFiles={irregularityFiles}
            />
          )}
        </Container>
      </AdminContainer>
    </AdminLayout>
  )
}
