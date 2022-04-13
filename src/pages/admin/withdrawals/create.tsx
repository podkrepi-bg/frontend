import CreatePage from 'components/withdrawals/CreatePage'
import { securedPropsWithTranslation } from 'middleware/auth/keycloak'

export const getServerSideProps = securedPropsWithTranslation([
  'common',
  'auth',
  'withdrawals',
  'validation',
])

export default CreatePage
