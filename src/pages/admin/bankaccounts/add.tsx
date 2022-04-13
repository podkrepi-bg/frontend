import BankAccountsAddPage from 'components/bankaccounts/BankAccountsAddPage'
import { securedPropsWithTranslation } from 'middleware/auth/keycloak'

export const getServerSideProps = securedPropsWithTranslation([
  'common',
  'auth',
  'validation',
  'admin',
  'bankaccounts',
])

export default BankAccountsAddPage
