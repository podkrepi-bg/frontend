import EditPage from 'components/admin/donations/EditPage'
import { securedAdminProps } from 'middleware/auth/securedProps'
import { endpoints } from 'service/apiEndpoints'

export const getServerSideProps = securedAdminProps(
  ['common', 'auth', 'donations', 'validation'],
  (ctx) => endpoints.donation.getDonation(ctx.query.id as string).url,
)

export default EditPage
