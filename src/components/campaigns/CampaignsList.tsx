import Image from 'next/image'
import { Box, CircularProgress, Grid, useMediaQuery } from '@mui/material'

import { CampaignResponse } from 'gql/campaigns'
import { useCampaignList } from 'common/hooks/campaigns'

import CampaignCard from './CampaignCard'

type Props = { campaignToShow: CampaignResponse[] }
export default function CampaignsList({ campaignToShow }: Props) {
  const mobile = useMediaQuery('(max-width:900px)')

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
      {mobile ? (
        <Image src="/img/ArtboardRotate.png" width={250} height={400} />
      ) : (
        <Image src="/img/Artboard.png" width={813} height={358} />
      )}
    </Grid>
  )
}
