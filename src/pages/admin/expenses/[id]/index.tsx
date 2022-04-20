import { securedAdminProps } from 'middleware/auth/keycloak'
import { endpoints } from 'service/apiEndpoints'
import ExpensesEditPage from 'components/expenses/ExpensesEditPage'

export const getServerSideProps = securedAdminProps(
  ['common', 'auth', 'validation', 'expenses'],
  (ctx) => endpoints.expenses.editExpense(ctx.query.id as string).url,
)

export default ExpensesEditPage
