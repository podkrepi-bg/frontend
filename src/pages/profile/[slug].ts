import { securedPropsWithTranslation } from 'middleware/auth/securedProps'
import ProfilePage from 'components/client/auth/profile/ProfilePage'

export const getServerSideProps = securedPropsWithTranslation([
  'auth',
  'profile',
  'common',
  'validation',
  'campaigns',
  'recurring-donation',
])

export default ProfilePage
