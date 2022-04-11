import EditPage from 'components/beneficiary/EditPage'
import { securedPropsWithTranslation } from 'middleware/auth/keycloak'

export const getServerSideProps = securedPropsWithTranslation([
  'common',
  'auth',
  'beneficiary',
  'validation',
  'documents',
])
export default EditPage
