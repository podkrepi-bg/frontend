import CreatePage from 'components/beneficiary/CreatePage'
import { securedPropsWithTranslation } from 'middleware/auth/keycloak'

export const getServerSideProps = securedPropsWithTranslation([
  'common',
  'auth',
  'beneficiary',
  'validation',
  'documents',
])

export default CreatePage
