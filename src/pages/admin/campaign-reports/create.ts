import { securedPropsWithTranslation } from 'middleware/auth/securedProps'
import CreatePage from 'components/irregularity-report/admin/CreatePage'

export const getServerSideProps = securedPropsWithTranslation([
  'common',
  'auth',
  'validation',
  'irregularity-report',
  'admin',
])

export default CreatePage
