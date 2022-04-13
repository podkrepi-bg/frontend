import CoordinatorsPage from 'components/coordinators/CoordinatorsPage'
import { endpoints } from 'service/apiEndpoints'
import { securedAdminProps } from 'middleware/auth/keycloak'

export const getServerSideProps = securedAdminProps(
  ['common', 'auth', 'validation', 'campaigns', 'coordinator', 'admin'],
  () => endpoints.coordinators.coordinatorsList.url,
)

export default CoordinatorsPage
