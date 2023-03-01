import CoordinatorAddPage from 'components/admin/coordinators/CoordinatorAddPage'
import { securedPropsWithTranslation } from 'middleware/auth/securedProps'

export const getServerSideProps = securedPropsWithTranslation([
  'common',
  'auth',
  'validation',
  'bankaccounts',
  'coordinator',
  'admin',
])

export default CoordinatorAddPage
