import DonationsPage from 'components/admin/donations/DonationsPage'
import { securedAdminProps } from 'middleware/auth/securedProps'
import { endpoints } from 'service/apiEndpoints'

export const getServerSideProps = securedAdminProps(
  ['common', 'auth', 'admin', 'donations', 'validation'],
  () => endpoints.donation.donationsList(undefined, { pageIndex: 0, pageSize: 20 }).url,
)

export default DonationsPage
