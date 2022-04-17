import CampaignTypesPage from 'components/campaign-types/CampaignTypesPage'
import { securedAdminProps } from 'middleware/auth/keycloak'
import { endpoints } from 'service/apiEndpoints'

export const getServerSideProps = securedAdminProps(
  ['common', 'auth', 'campaign-types', 'validation', 'admin', 'documents'],
  () => endpoints.campaignTypes.listCampaignTypes.url,
)

export default CampaignTypesPage
