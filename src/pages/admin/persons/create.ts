import CreatePage from 'components/common/person/grid/CreatePage'
import { securedPropsWithTranslation } from 'middleware/auth/securedProps'

export const getServerSideProps = securedPropsWithTranslation([
  'common',
  'auth',
  'validation',
  'person',
  'admin',
])

export default CreatePage
