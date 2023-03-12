import { GetServerSideProps } from 'next'
import CreateCampaignExpensePage from 'components/client/campaign-expenses/CampaignExpenseCreate'
import { securedPropsWithTranslation } from 'middleware/auth/securedProps'
//import { routes } from 'common/routes'

export const getServerSideProps: GetServerSideProps = securedPropsWithTranslation([
  'common',
  'auth',
  'validation',
  'expenses',
])

export default CreateCampaignExpensePage
