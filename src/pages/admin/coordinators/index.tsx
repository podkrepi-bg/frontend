import CoordinatorsPage from 'components/admin/coordinators/CoordinatorsPage'
import { endpoints } from 'service/apiEndpoints'
import { securedAdminProps } from 'middleware/auth/securedProps'

export const getServerSideProps = securedAdminProps(
  ['common', 'auth', 'validation', 'campaigns', 'coordinator', 'admin'],
  () => endpoints.coordinators.coordinatorsList.url,
)

export default CoordinatorsPage
