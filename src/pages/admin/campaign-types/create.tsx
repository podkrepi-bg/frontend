import CreatePage from 'components/campaign-types/CreatePage'
import { securedPropsWithTranslation } from 'middleware/auth/keycloak'

export const getServerSideProps = securedPropsWithTranslation([
  'common',
  'auth',
  'campaign-types',
  'validation',
  'documents',
])

export default CreatePage
