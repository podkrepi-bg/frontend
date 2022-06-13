import DonationsPage from 'components/donations/DonationsPage'
import { securedAdminProps } from 'middleware/auth/securedProps'
import { endpoints } from 'service/apiEndpoints'

export const getServerSideProps = securedAdminProps(
  ['common', 'auth', 'admin', 'donations', 'validation'],
  (ctx) => endpoints.campaign.getDonations(ctx.query.id as string).url,
)

export default DonationsPage
