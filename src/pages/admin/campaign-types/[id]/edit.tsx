import EditPage from 'components/campaign-types/EditPage'
import { securedPropsWithTranslation } from 'middleware/auth/keycloak'

export const getServerSideProps = securedPropsWithTranslation([
  'common',
  'auth',
  'campaign-types',
  'validation',
  'documents',
])

export default EditPage
