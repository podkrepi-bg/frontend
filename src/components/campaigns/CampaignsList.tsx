import Image from 'next/image'
import { Box, Grid } from '@mui/material'

import { CampaignResponse } from 'gql/campaigns'
import useMobile from 'common/hooks/useMobile'

import CampaignCard from './CampaignCard'
import { useMemo } from 'react'

const cardAlignment = (index: number, array: CampaignResponse[]) => {
  if (index === array.length - 1 && array.length % 2 === 1) {
    return 'center'
  }
  if (index % 2 === 0) {
    return 'right'
  } else {
    return 'left'
  }
}

type Props = { campaignToShow: CampaignResponse[] }

export default function CampaignsList({ campaignToShow }: Props) {
  const { mobile } = useMobile()
  const campaigns = useMemo<CampaignResponse[]>(() => {
    return campaignToShow ?? []
  }, [campaignToShow])

  return (
    <Grid container justifyContent="center" spacing={2}>
      <Grid container justifyContent="center" spacing={2} ml={0}>
        {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
        {campaigns?.map((campaign, index, array) => (
          <Grid key={index} item xs={12} sm={8} md={6} lg={3}>
            <Box
              sx={(theme) => ({
                textAlign: 'center',
                [theme.breakpoints.down('lg')]: { textAlign: cardAlignment(index, array) },
                [theme.breakpoints.down('md')]: { textAlign: 'center' },
              })}>
              <CampaignCard campaign={campaign} />
            </Box>
          </Grid>
        ))}
      </Grid>
      <Grid>
        <Box sx={{ my: 10 }}>
          {mobile ? (
            <Image src="/img/ArtboardMobile.svg" width={300} height={300} />
          ) : (
            <Image src="/img/Artboard.png" width={813} height={358} />
          )}
        </Box>
      </Grid>
    </Grid>
  )
}
