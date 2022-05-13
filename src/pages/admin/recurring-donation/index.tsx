import RecurringDonationPage from 'components/recurring-donation/RecurringDonationPage'
import { securedAdminProps } from 'middleware/auth/securedProps'
import { endpoints } from 'service/apiEndpoints'

export const getServerSideProps = securedAdminProps(
  ['common', 'auth', 'validation', 'recurring-donation', 'admin'],
  () => endpoints.recurringDonation.recurringDonation.url,
)

export default RecurringDonationPage
