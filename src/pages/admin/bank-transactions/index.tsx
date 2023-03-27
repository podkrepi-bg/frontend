import BankTransactionsPage from 'components/admin/bank-transactions/BankTransactionsPage'
import { securedAdminProps } from 'middleware/auth/securedProps'
import { endpoints } from 'service/apiEndpoints'

export const getServerSideProps = securedAdminProps(
  ['common', 'auth', 'admin', 'bank-transactions', 'validation'],
  () => endpoints.bankTransactions.transactionsList({ pageIndex: 0, pageSize: 20 }).url,
)

export default BankTransactionsPage
