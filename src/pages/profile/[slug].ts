import { securedPropsWithTranslation } from 'middleware/auth/keycloak'
import ProfilePage from 'components/auth/profile/ProfilePage'

export const getServerSideProps = securedPropsWithTranslation(['auth', 'profile', 'common'])

export default ProfilePage
