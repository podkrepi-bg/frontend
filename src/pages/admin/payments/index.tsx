import PaymentsPage from 'components/admin/payments/PaymentsPage'
import { securedAdminProps } from 'middleware/auth/securedProps'
import { endpoints } from 'service/apiEndpoints'

export const getServerSideProps = securedAdminProps(
  ['common', 'auth', 'admin', 'donations', 'validation', 'profile'],
  () => endpoints.payments.list(undefined, undefined, { pageIndex: 0, pageSize: 20 }).url,
)

export default PaymentsPage
