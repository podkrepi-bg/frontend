import DocumentsPage from 'components/beneficiary/BeneficiaryPage'
import { securedPropsWithTranslation } from 'middleware/auth/keycloak'

export const getServerSideProps = securedPropsWithTranslation([
  'common',
  'auth',
  'beneficiary',
  'validation',
  'admin',
  'documents',
])
export default DocumentsPage
