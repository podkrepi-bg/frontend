import { Box, CircularProgress, Grid } from '@material-ui/core'

import useCampaignList from 'common/hooks/useCampaignList'

import CampaignCard from './CampaignCard'

export default function CampaignsList() {
  const { data, isLoading } = useCampaignList()

  return (
    <Grid container justify="center" spacing={2}>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      {isLoading && <CircularProgress size="large" />}
      {data?.map((campaign, index) => (
        <Grid key={index} item xs={12} sm={8} lg={4}>
          <Box textAlign="center">
            <CampaignCard campaign={campaign} />
          </Box>
        </Grid>
      ))}
    </Grid>
  )
}
