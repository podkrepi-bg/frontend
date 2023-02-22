import CountryCreatePage from 'components/admin/countries/CountryCreatePage'
import { securedPropsWithTranslation } from 'middleware/auth/securedProps'

export const getServerSideProps = securedPropsWithTranslation([
  'common',
  'auth',
  'validation',
  'countries',
])

export default CountryCreatePage
