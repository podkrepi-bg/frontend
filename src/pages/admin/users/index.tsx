import { securedAdminProps } from 'middleware/auth/securedProps'
import PersonGrid from 'components/common/person/PersonGrid'
import { endpoints } from 'service/apiEndpoints'

export const getServerSideProps = securedAdminProps(
  ['common', 'auth', 'person', 'admin', 'validation'],
  () => endpoints.person.list({ pageIndex: 0, pageSize: 20 }).url,
)

export default PersonGrid
