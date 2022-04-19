import BankAccountsPage from 'components/bankaccounts/BankAccountsPage'
import { securedAdminProps } from 'middleware/auth/keycloak'
import { endpoints } from 'service/apiEndpoints'

export const getServerSideProps = securedAdminProps(
  ['common', 'auth', 'validation', 'admin', 'bankaccounts'],
  () => endpoints.bankAccounts.bankAccountList.url,
)
export default BankAccountsPage
