import { endpoints } from 'service/apiEndpoints'
import { securedAdminProps } from 'middleware/auth/securedProps'
import IrregularityPage from 'components/admin/irregularity/admin/IrregularityPage'

export const getServerSideProps = securedAdminProps(
  ['common', 'auth', 'validation', 'irregularity', 'admin'],
  () => endpoints.irregularity.irregularityList.url,
)

export default IrregularityPage
