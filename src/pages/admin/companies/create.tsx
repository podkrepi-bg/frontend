import CreatePage from 'components/companies/CreatePage'
import { securedPropsWithTranslation } from 'middleware/auth/securedProps'

export const getServerSideProps = securedPropsWithTranslation([
  'common',
  'auth',
  'validation',
  'companies',
  'admin',
  'countries',
  'cities',
])

export default CreatePage
