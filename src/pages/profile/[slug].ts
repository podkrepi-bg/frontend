import { securedPropsWithTranslation } from 'middleware/auth/securedProps'
import ProfilePage from 'components/auth/profile/ProfilePage'

export const getServerSideProps = securedPropsWithTranslation([
  'auth',
  'profile',
  'common',
  'validation',
])

export default ProfilePage
