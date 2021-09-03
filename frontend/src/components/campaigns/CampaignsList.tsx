import { useQuery } from '@apollo/client'
import { Box, CircularProgress, Grid } from '@material-ui/core'

import { ListCampaign, ListCampaigns } from 'gql/query/campaigns/ListCampaigns'

import CampaignCard from './CampaignCard'

export default function CampaignsList() {
  const { loading, data } = useQuery<ListCampaign>(ListCampaigns)
  return (
    <Grid container justify="center" spacing={2}>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      {loading && <CircularProgress size="large" />}
      {data?.campaigns?.map((campaign, index) => (
        <Grid key={index} item xs={12} sm={8} lg={4}>
          <Box textAlign="center">
            <CampaignCard campaign={campaign} />
          </Box>
        </Grid>
      ))}
    </Grid>
  )
}
