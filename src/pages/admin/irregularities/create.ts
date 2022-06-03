import { securedPropsWithTranslation } from 'middleware/auth/securedProps'
import CreatePage from 'components/irregularity/admin/CreatePage'

export const getServerSideProps = securedPropsWithTranslation([
  'common',
  'auth',
  'validation',
  'irregularity',
  'admin',
])

export default CreatePage
