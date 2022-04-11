import EditPage from 'components/campaigns/grid/EditPage'
import { securedPropsWithTranslation } from 'middleware/auth/keycloak'

export const getServerSideProps = securedPropsWithTranslation([
  'common',
  'auth',
  'campaigns',
  'validation',
])

export default EditPage
