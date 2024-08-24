import CampaignApplications from 'components/admin/campaign-applications/CampaignApplications'
import { securedAdminProps } from 'middleware/auth/securedProps'
import { GetServerSideProps } from 'next'
import { endpoints } from 'service/apiEndpoints'

export const getServerSideProps: GetServerSideProps = securedAdminProps(
  ['common', 'auth', 'validation', 'campaigns', 'campaign-application'],
  () => endpoints.campaignApplications.listAllAdmin.url,
)

export default CampaignApplications
