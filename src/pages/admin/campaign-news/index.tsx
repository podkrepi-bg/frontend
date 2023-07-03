import CampaignNewsPage from 'components/admin/campaign-news/CampaignNewsPage'
import { securedAdminProps } from 'middleware/auth/securedProps'
import { endpoints } from 'service/apiEndpoints'

export const getServerSideProps = securedAdminProps(
  ['common', 'auth', 'validation', 'campaigns', 'irregularity'],
  () => endpoints.campaignNews.listAdminNews.url,
)
export default CampaignNewsPage
