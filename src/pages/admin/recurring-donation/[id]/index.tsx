import EditPage from 'components/recurring-donation/EditPage'
import { securedAdminProps } from 'middleware/auth/securedProps'
import { endpoints } from 'service/apiEndpoints'

export const getServerSideProps = securedAdminProps(
  ['common', 'auth', 'validation', 'recurring-donation'],
  (ctx) => endpoints.recurringDonation.getRecurringDonation(ctx.query.id as string).url,
)

export default EditPage
