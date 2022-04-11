import CampaignsPage from 'components/campaigns/grid/CampaignPage'
import { securedPropsWithTranslation } from 'middleware/auth/keycloak'

export const getServerSideProps = securedPropsWithTranslation([
  'common',
  'auth',
  'validation',
  'campaigns',
])
export default CampaignsPage
