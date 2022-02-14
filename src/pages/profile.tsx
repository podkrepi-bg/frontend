import { securedProps } from 'middleware/auth/keycloak'
import ProfilePage from 'components/auth/profile/ProfilePage'

export const getServerSideProps = securedProps

export default ProfilePage
