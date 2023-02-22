import { securedAdminProps } from 'middleware/auth/securedProps'
import { endpoints } from 'service/apiEndpoints'
import ExpensesPage from 'components/admin/expenses/ExpensesPage'

export const getServerSideProps = securedAdminProps(
  ['common', 'auth', 'validation', 'admin', 'expenses'],
  () => endpoints.expenses.listExpenses.url,
)

export default ExpensesPage
