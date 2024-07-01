import CampaignApplications from 'components/admin/campaign-applications/CampaignApplications'
import { securedPropsWithTranslation } from 'middleware/auth/securedProps'

export const getServerSideProps = securedPropsWithTranslation()

export default CampaignApplications
