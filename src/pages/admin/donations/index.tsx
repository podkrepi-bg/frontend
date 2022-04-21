import DonationsPage from 'components/donations/DonationsPage'
import { securedAdminProps } from 'middleware/auth/keycloak'
import { endpoints } from 'service/apiEndpoints'

export const getServerSideProps = securedAdminProps(
  ['common', 'auth', 'admin', 'donations', 'validation'],
  () => endpoints.donation.donationsList.url,
)

export default DonationsPage
