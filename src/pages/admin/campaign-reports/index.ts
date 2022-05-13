import { endpoints } from 'service/apiEndpoints'
import { securedAdminProps } from 'middleware/auth/securedProps'
import CampaignReportPage from 'components/irregularity-report/admin/CampaignReportPage'

export const getServerSideProps = securedAdminProps(
  ['common', 'auth', 'validation', 'irregularity-report', 'admin'],
  () => endpoints.campaignReport.campaignReportsList.url,
)

export default CampaignReportPage
