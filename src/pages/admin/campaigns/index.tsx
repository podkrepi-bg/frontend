import CampaignsPage from 'components/campaigns/grid/CampaignPage'
import { securedAdminProps } from 'middleware/auth/keycloak'
import { endpoints } from 'service/apiEndpoints'

export const getServerSideProps = securedAdminProps(
  ['common', 'auth', 'validation', 'campaigns'],
  () => endpoints.campaign.listCampaigns.url,
)
export default CampaignsPage
