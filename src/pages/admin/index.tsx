import AdminPage from 'components/admin/AdminPage'
import { securedProps } from 'common/util/keycloak'

export const getServerSideProps = securedProps

export default AdminPage
