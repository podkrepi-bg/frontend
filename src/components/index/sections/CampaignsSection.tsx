import { Grid, Box } from '@mui/material'
import CampaignCard from 'components/campaigns/CampaignCard'
import { useCampaignList } from 'common/hooks/campaigns'

export default function CampaignsSection() {
  const { data } = useCampaignList()
  console.log(data)

  return data?.map((campaign, index) => (
    <Grid key={index} item xs={12} sm={6} lg={4}>
      <Box textAlign="center">
        <CampaignCard campaign={campaign} />
      </Box>
    </Grid>
  ))
}
