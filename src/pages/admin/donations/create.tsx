import CreatePage from 'components/donations/CreatePage'
import { securedPropsWithTranslation } from 'middleware/auth/keycloak'

export const getServerSideProps = securedPropsWithTranslation([
  'common',
  'auth',
  'donations',
  'validation',
])
export default CreatePage
