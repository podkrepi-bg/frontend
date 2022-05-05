import { securedAdminProps } from 'middleware/auth/keycloak'
import { endpoints } from 'service/apiEndpoints'
import CampaignReportPage from 'components/irregularity-report/admin/CampaignReportPage'

export const getServerSideProps = securedAdminProps(
  ['common', 'auth', 'validation', 'irregularity-report', 'admin'],
  () => endpoints.support.campaignReportsList.url,
)

export default CampaignReportPage
