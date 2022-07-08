import CreatePage from 'components/campaign-types/CreatePage'
import { securedPropsWithTranslation } from 'middleware/auth/securedProps'

export const getServerSideProps = securedPropsWithTranslation([
  'common',
  'auth',
  'campaigns',
  'campaign-types',
  'validation',
  'documents',
])

export default CreatePage
