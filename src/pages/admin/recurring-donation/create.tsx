import { securedPropsWithTranslation } from 'middleware/auth/securedProps'
import CreatePage from 'components/admin/recurring-donation/CreatePage'

export const getServerSideProps = securedPropsWithTranslation([
  'common',
  'auth',
  'validation',
  'admin',
  'recurring-donation',
  'person',
])

export default CreatePage
