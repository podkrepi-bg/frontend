import CityEditPage from 'components/admin/cities/CityEditPage'
import { endpoints } from 'service/apiEndpoints'
import { securedAdminProps } from 'middleware/auth/securedProps'

export const getServerSideProps = securedAdminProps(
  ['common', 'auth', 'validation', 'campaigns', 'cities'],
  (ctx) => endpoints.city.editCity(ctx.query.id as string).url,
)

export default CityEditPage
