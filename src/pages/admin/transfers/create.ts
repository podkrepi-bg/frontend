import CreatePage from 'components/transfers/CreatePage'
import { securedPropsWithTranslation } from 'middleware/auth/securedProps'

export const getServerSideProps = securedPropsWithTranslation([
  'common',
  'auth',
  'validation',
  'transfer',
  'admin',
  'vaults',
])

export default CreatePage
