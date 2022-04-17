import CountryCreatePage from 'components/countries/CountryCreatePage'
import { securedPropsWithTranslation } from 'middleware/auth/keycloak'

export const getServerSideProps = securedPropsWithTranslation([
  'common',
  'auth',
  'validation',
  'countries',
])

export default CountryCreatePage
