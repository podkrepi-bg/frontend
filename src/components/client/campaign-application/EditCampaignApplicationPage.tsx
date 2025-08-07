import { CircularProgress, Grid2 } from '@mui/material'
import NotFoundPage from 'pages/404'
import { useViewCampaignApplicationCached } from 'service/campaign-application'
import Layout from '../layout/Layout'
import CampaignApplicationForm from './CampaignApplicationForm'

interface EditProps {
  id: string
}

export default function EditCampaignApplicationPage({ id }: EditProps) {
  const { data, isLoading, isError } = useViewCampaignApplicationCached(id)

  if (isLoading) {
    return (
      <Grid2 container justifyContent="center" alignContent="center" sx={{ height: '100vh' }}>
        <CircularProgress />
      </Grid2>
    )
  }

  if (isError) {
    return <NotFoundPage />
  }

  return (
    <Layout maxWidth="md" sx={{ paddingInline: 5 }}>
      <CampaignApplicationForm isEdit={true} campaignApplication={data} />
    </Layout>
  )
}
