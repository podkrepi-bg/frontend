import { securedAdminProps } from 'middleware/auth/keycloak'
import { endpoints } from 'service/apiEndpoints'
import ExpensesPage from 'components/expenses/ExpensesPage'

export const getServerSideProps = securedAdminProps(
  ['common', 'auth', 'validation', 'admin', 'expenses'],
  () => endpoints.expenses.listExpenses.url,
)

export default ExpensesPage
