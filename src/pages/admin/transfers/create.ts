import CreatePage from 'components/transfers/CreatePage'
import { securedPropsWithTranslation } from 'middleware/auth/keycloak'

export const getServerSideProps = securedPropsWithTranslation([
  'common',
  'auth',
  'validation',
  'transfer',
  'admin',
])

export default CreatePage
