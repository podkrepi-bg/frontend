import { GetServerSideProps } from 'next'
import HSCreateCampaignStepsPage from 'components/client/campaigns/HSCreateCampaignStepsPage'

import { securedPropsWithTranslation } from 'middleware/auth/securedProps'
import { routes } from 'common/routes'

export const getServerSideProps: GetServerSideProps = securedPropsWithTranslation(
  ['common', 'auth', 'validation', 'campaigns'],
  routes.campaigns.steps,
)

export default HSCreateCampaignStepsPage
