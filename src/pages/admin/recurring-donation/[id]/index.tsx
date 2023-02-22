import EditPage from 'components/admin/recurring-donation/EditPage'
import { securedAdminProps } from 'middleware/auth/securedProps'
import { endpoints } from 'service/apiEndpoints'

export const getServerSideProps = securedAdminProps(
  ['common', 'auth', 'validation', 'recurring-donation', 'person'],
  (ctx) => endpoints.recurringDonation.getRecurringDonation(ctx.query.id as string).url,
)

export default EditPage
