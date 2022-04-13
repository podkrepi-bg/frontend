import CityPage from 'components/cities/CityPage'
import { securedAdminProps } from 'middleware/auth/keycloak'
import { endpoints } from 'service/apiEndpoints'

export const getServerSideProps = securedAdminProps(
  ['common', 'auth', 'validation', 'admin', 'cities'],
  () => endpoints.city.citiesList.url,
)

export default CityPage
