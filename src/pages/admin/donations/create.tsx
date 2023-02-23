import CreatePage from 'components/admin/donations/CreatePage'
import { securedPropsWithTranslation } from 'middleware/auth/securedProps'

export const getServerSideProps = securedPropsWithTranslation([
  'common',
  'auth',
  'donations',
  'validation',
])
export default CreatePage
