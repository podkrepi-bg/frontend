import CampaignTypesPage from 'components/common/campaign-types/CampaignTypesPage'
import { securedAdminProps } from 'middleware/auth/securedProps'
import { endpoints } from 'service/apiEndpoints'

export const getServerSideProps = securedAdminProps(
  ['common', 'auth', 'campaigns', 'campaign-types', 'validation', 'admin', 'documents'],
  () => endpoints.campaignTypes.listCampaignTypes.url,
)

export default CampaignTypesPage
