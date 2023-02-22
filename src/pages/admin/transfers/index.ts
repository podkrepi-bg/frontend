import { securedAdminProps } from 'middleware/auth/securedProps'
import TransferPage from 'components/admin/transfers/TransferPage'
import { endpoints } from 'service/apiEndpoints'

export const getServerSideProps = securedAdminProps(
  ['common', 'auth', 'validation', 'transfer', 'admin'],
  () => endpoints.transfer.listTransfer.url,
)

export default TransferPage
