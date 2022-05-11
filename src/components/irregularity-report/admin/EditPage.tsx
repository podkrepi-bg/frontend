import { useRouter } from 'next/router'
import { UseQueryResult } from 'react-query'
import { useTranslation } from 'next-i18next'

import { Container } from '@mui/material'

import { CampaignResponse } from 'gql/campaigns'
import { useCampaignList } from 'common/hooks/campaigns'
import { CampaignReportFile, CampaignReportResponse } from '../helpers/report.types'
import { useCampaignReport, useCampaignReportFilesList } from 'common/hooks/campaignReport'

import EditForm from './grid/EditForm'
import AdminLayout from 'components/admin/navigation/AdminLayout'
import AdminContainer from 'components/admin/navigation/AdminContainer'

export default function EditPage() {
  const { t } = useTranslation('irregularity-report')

  const router = useRouter()
  const id = String(router.query.id)

  const { data: campaigns }: UseQueryResult<CampaignResponse[]> = useCampaignList()
  const { data: report }: UseQueryResult<CampaignReportResponse> = useCampaignReport(id)
  const { data: reportFiles }: UseQueryResult<CampaignReportFile[]> = useCampaignReportFilesList(id)

  return (
    <AdminLayout>
      <AdminContainer title={t('admin.reports')}>
        <Container maxWidth="md" sx={{ py: 5 }}>
          {report && campaigns && reportFiles && (
            <EditForm report={report} campaigns={campaigns} reportFiles={reportFiles} />
          )}
        </Container>
      </AdminContainer>
    </AdminLayout>
  )
}
