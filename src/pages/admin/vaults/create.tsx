import CreatePage from 'components/admin/vaults/CreatePage'
import { securedPropsWithTranslation } from 'middleware/auth/securedProps'

export const getServerSideProps = securedPropsWithTranslation([
  'common',
  'auth',
  'vaults',
  'validation',
])

export default CreatePage
