import CreatePage from 'components/admin/beneficiary/CreatePage'
import { securedPropsWithTranslation } from 'middleware/auth/securedProps'

export const getServerSideProps = securedPropsWithTranslation([
  'common',
  'auth',
  'beneficiary',
  'validation',
  'countries',
  'cities',
])

export default CreatePage
