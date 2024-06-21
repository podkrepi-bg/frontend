import { GetServerSideProps } from 'next'
import { securedPropsWithTranslation } from 'middleware/auth/securedProps'
import { routes } from 'common/routes'
import CampaignApplicationPage from 'components/client/campaign-application/CampaignApplicationPage'

export const getServerSideProps: GetServerSideProps = securedPropsWithTranslation(
  ['common', 'auth', 'validation', 'campaigns', 'campaign-application'],
  routes.campaigns.application,
)

export default CampaignApplicationPage
