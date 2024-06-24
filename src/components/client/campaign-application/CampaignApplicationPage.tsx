import Layout from '../layout/Layout'
import CampaignApplicationForm from './CampaignApplicationForm'

export default function CampaignApplicationPage() {
  return (
    <Layout maxWidth="md" sx={{ paddingInline: 5 }}>
      <CampaignApplicationForm />
    </Layout>
  )
}
