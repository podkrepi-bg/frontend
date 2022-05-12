import CoordinatorAddPage from 'components/coordinators/CoordinatorAddPage'
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
