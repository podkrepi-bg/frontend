import { securedAdminProps } from 'middleware/auth/keycloak'
import { endpoints } from 'service/apiEndpoints'
import CountryEditPage from 'components/countries/CountryEditPage'

export const getServerSideProps = securedAdminProps(
  ['common', 'validation', 'countries'],
  (ctx) => endpoints.country.editCountry(ctx.query.id as string).url,
)

export default CountryEditPage
