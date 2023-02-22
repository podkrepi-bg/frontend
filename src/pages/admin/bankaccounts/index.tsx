import BankAccountsPage from 'components/admin/bankaccounts/BankAccountsPage'
import { securedAdminProps } from 'middleware/auth/securedProps'
import { endpoints } from 'service/apiEndpoints'

export const getServerSideProps = securedAdminProps(
  ['common', 'auth', 'validation', 'admin', 'bankaccounts'],
  () => endpoints.bankAccounts.bankAccountList.url,
)
export default BankAccountsPage
