import { CircularProgress, Grid } from '@mui/material'
import { useCurrentPerson } from 'common/util/useCurrentPerson'
import Layout from '../layout/Layout'
import CampaignApplicationForm from './CampaignApplicationForm'

export default function CampaignApplicationPage() {
  const { data: userData, isLoading } = useCurrentPerson()
  const person = userData?.user || undefined

  if (isLoading) {
    return (
      <Grid container justifyContent="center" alignContent="center" sx={{ height: '100vh' }}>
        <CircularProgress />
      </Grid>
    )
  }

  return (
    <Layout maxWidth="md" sx={{ paddingInline: 5 }}>
      <CampaignApplicationForm person={person} />
    </Layout>
  )
}
