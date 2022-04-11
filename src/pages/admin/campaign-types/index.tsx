import CampaignTypesPage from 'components/campaign-types/CampaignTypesPage'
import { securedPropsWithTranslation } from 'middleware/auth/keycloak'

export const getServerSideProps = securedPropsWithTranslation([
  'common',
  'auth',
  'campaign-types',
  'validation',
  'admin',
  'documents',
])

export default CampaignTypesPage
