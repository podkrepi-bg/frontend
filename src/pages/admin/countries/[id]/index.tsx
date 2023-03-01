import { securedAdminProps } from 'middleware/auth/securedProps'
import { endpoints } from 'service/apiEndpoints'
import CountryEditPage from 'components/admin/countries/CountryEditPage'

export const getServerSideProps = securedAdminProps(
  ['common', 'validation', 'countries'],
  (ctx) => endpoints.country.editCountry(ctx.query.id as string).url,
)

export default CountryEditPage
