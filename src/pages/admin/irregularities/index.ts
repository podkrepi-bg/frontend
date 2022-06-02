import { endpoints } from 'service/apiEndpoints'
import { securedAdminProps } from 'middleware/auth/securedProps'
import IrregularityPage from 'components/irregularity/admin/IrregularityPage'

export const getServerSideProps = securedAdminProps(
  ['common', 'auth', 'validation', 'irregularity', 'admin'],
  () => endpoints.irregularity.irregularitysList.url,
)

export default IrregularityPage
