import CityPage from 'components/admin/cities/CityPage'
import { securedAdminProps } from 'middleware/auth/securedProps'
import { endpoints } from 'service/apiEndpoints'

export const getServerSideProps = securedAdminProps(
  ['common', 'auth', 'validation', 'admin', 'cities'],
  () => endpoints.city.citiesList.url,
)

export default CityPage
