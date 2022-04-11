import { securedPropsWithTranslation } from 'middleware/auth/keycloak'
import BankAccountsEditPage from 'components/bankaccounts/BankAccountsEditPage'

export const getServerSideProps = securedPropsWithTranslation([
  'common',
  'auth',
  'validation',
  'admin',
  'bankaccounts',
])

export default BankAccountsEditPage
