import { endpoints } from 'service/apiEndpoints'
import { securedAdminProps } from 'middleware/auth/securedProps'
import OrganizerPage from 'components/organizers/OrganizerPage'

export const getServerSideProps = securedAdminProps(
  ['common', 'auth', 'validation', 'organizer', 'admin'],
  () => endpoints.organizer.listOrganizer.url,
)

export default OrganizerPage
