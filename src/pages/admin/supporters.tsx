import SupportersPage from 'components/admin/SupportersPage'
import { securedAdminProps } from 'middleware/auth/securedProps'
import { endpoints } from 'service/apiEndpoints'

export const getServerSideProps = securedAdminProps(
  ['common', 'auth', 'validation'],
  () => endpoints.support.supportRequestList.url,
)

export default SupportersPage
