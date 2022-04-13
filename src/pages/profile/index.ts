import ProfilePage from 'components/auth/profile/ProfilePage'
import { securedProps } from 'middleware/auth/keycloak'

export const getServerSideProps = securedProps

export default ProfilePage
