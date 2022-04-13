import InfoRequestPage from 'components/admin/InfoRequestPage'
import { securedAdminProps } from 'middleware/auth/keycloak'
import { endpoints } from 'service/apiEndpoints'

export const getServerSideProps = securedAdminProps(
  ['common', 'auth', 'validation'],
  () => endpoints.support.infoRequestList.url,
)

export default InfoRequestPage
