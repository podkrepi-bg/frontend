import { CircularProgress, Grid } from '@mui/material'
import { useSession } from 'next-auth/react'
import { useViewPersonByKeylockId } from 'common/hooks/person'
import Layout from '../layout/Layout'
import CampaignApplicationForm from './CampaignApplicationForm'

export default function CampaignApplicationPage() {
  const { data: session } = useSession()
  const { data: person, isLoading } = useViewPersonByKeylockId(session?.user?.sub as string)

  if (isLoading) {
    return (
      <Grid container justifyContent="center" alignContent="center" sx={{ height: '100vh' }}>
        <CircularProgress />
      </Grid>
    )
  }

  return (
    <Layout maxWidth="md" sx={{ paddingInline: 5 }}>
      {person && <CampaignApplicationForm person={person} />}
    </Layout>
  )
}
