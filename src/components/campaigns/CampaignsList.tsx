import { Box, CircularProgress, Grid } from '@mui/material'
import { CampaignResponse } from 'gql/campaigns'

import CampaignCard from './CampaignCard'

type Props = { campaignToShow: Array<CampaignResponse> }
export default function CampaignsList({ campaignToShow }: Props) {
  return (
    <Grid container justifyContent="center" spacing={2}>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      {<CircularProgress size="large" />}
      {campaignToShow?.map((campaign, index) => (
        <Grid key={index} item xs={12} sm={6} lg={4}>
          <Box textAlign="center">
            <CampaignCard campaign={campaign} />
          </Box>
        </Grid>
      ))}
    </Grid>
  )
}
