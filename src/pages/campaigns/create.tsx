import { GetServerSideProps } from 'next'
import CreateCampaignPage from 'components/client/campaigns/CreateCampaignPage'
import { securedPropsWithTranslation } from 'middleware/auth/securedProps'
import { routes } from 'common/routes'

export const getServerSideProps: GetServerSideProps = securedPropsWithTranslation(
  ['common', 'auth', 'validation', 'campaigns'],
  routes.campaigns.create,
)

export default CreateCampaignPage
