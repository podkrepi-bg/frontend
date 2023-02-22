import { securedAdminProps } from 'middleware/auth/securedProps'
import BankAccountsEditPage from 'components/admin/bankaccounts/BankAccountsEditPage'
import { endpoints } from 'service/apiEndpoints'

export const getServerSideProps = securedAdminProps(
  ['common', 'auth', 'validation', 'admin', 'bankaccounts'],
  (ctx) => endpoints.bankAccounts.editBankAccount(ctx.query.id as string).url,
)

export default BankAccountsEditPage
