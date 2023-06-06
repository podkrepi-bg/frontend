import CreateCampaignNewsPage from 'components/admin/campaign-news/CreatePage'
import { securedAdminProps } from 'middleware/auth/securedProps'
import { endpoints } from 'service/apiEndpoints'

export const getServerSideProps = securedAdminProps([
   'common',
   'auth', 
   'campaigns', 
   'news', 
   'validation'])
   
export default CreateCampaignNewsPage