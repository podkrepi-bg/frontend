import ExpensesCreatePage from 'components/admin/expenses/ExpensesCreatePage'
import { securedPropsWithTranslation } from 'middleware/auth/securedProps'

export const getServerSideProps = securedPropsWithTranslation([
  'common',
  'auth',
  'validation',
  'admin',
  'expenses',
  'vaults',
])

export default ExpensesCreatePage
