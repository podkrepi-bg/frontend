import { securedAdminProps } from 'middleware/auth/keycloak'
import { endpoints } from 'service/apiEndpoints'
import CountriesPage from 'components/countries/CountriesPage'

export const getServerSideProps = securedAdminProps(
  ['common', 'auth', 'validation', 'admin', 'countries'],
  () => endpoints.country.listCountries.url,
)

export default CountriesPage
