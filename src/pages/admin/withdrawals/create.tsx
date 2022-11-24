import CreatePage from 'components/withdrawals/CreatePage'
import { securedPropsWithTranslation } from 'middleware/auth/securedProps'

export const getServerSideProps = securedPropsWithTranslation([
  'common',
  'auth',
  'withdrawals',
  'validation',
  'vaults',
])

export default CreatePage
