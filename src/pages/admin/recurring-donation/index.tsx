import RecurringDonationPage from 'components/admin/recurring-donation/RecurringDonationPage'
import { securedAdminProps } from 'middleware/auth/securedProps'
import { endpoints } from 'service/apiEndpoints'

export const getServerSideProps = securedAdminProps(
  ['common', 'auth', 'validation', 'recurring-donation', 'admin'],
  () => endpoints.recurringDonation.list.url,
)

export default RecurringDonationPage
