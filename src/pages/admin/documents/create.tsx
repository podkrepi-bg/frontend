import CreatePage from 'components/admin/documents/CreatePage'
import { securedPropsWithTranslation } from 'middleware/auth/securedProps'

export const getServerSideProps = securedPropsWithTranslation([
  'common',
  'auth',
  'documents',
  'validation',
])

export default CreatePage
