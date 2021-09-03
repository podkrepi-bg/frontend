import { Box, Grid } from '@material-ui/core'

import CampaignCard from './CampaignCard'

export default function CampaignsList() {
  return (
    <Grid container justify="center" spacing={2}>
      {[...Array(9).keys()].map((id) => (
        <Grid key={id} item xs={12} sm={8} lg={6}>
          <Box textAlign="center">
            <CampaignCard id={id} />
          </Box>
        </Grid>
      ))}
    </Grid>
  )
}
