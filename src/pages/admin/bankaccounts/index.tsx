import BankAccountsPage from 'components/bankaccounts/BankAccountsPage'
import { securedPropsWithTranslation } from 'middleware/auth/keycloak'

export const getServerSideProps = securedPropsWithTranslation([
  'common',
  'auth',
  'validation',
  'admin',
  'bankaccounts',
])
export default BankAccountsPage
