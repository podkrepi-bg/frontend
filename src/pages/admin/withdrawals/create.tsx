import CreatePage from 'components/admin/withdrawals/CreatePage'
import { securedPropsWithTranslation } from 'middleware/auth/securedProps'

export const getServerSideProps = securedPropsWithTranslation([
  'common',
  'auth',
  'withdrawals',
  'validation',
  'vaults',
])

export default CreatePage
