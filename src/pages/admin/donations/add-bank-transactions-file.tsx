import AddBankTransactionsFile from 'components/admin/donations/AddBankTransactionsFile'
import { securedPropsWithTranslation } from 'middleware/auth/securedProps'

export const getServerSideProps = securedPropsWithTranslation([
  'common',
  'auth',
  'donations',
  'validation',
])
export default AddBankTransactionsFile
