import CreatePage from 'components/vaults/CreatePage'
import { securedPropsWithTranslation } from 'middleware/auth/keycloak'

export const getServerSideProps = securedPropsWithTranslation([
  'common',
  'auth',
  'vaults',
  'validation',
])

export default CreatePage
