import React from 'react'

import Image from 'next/image'

import { Grid } from '@mui/material'

export default function SuccessfullCampaignTag() {
  const successfullCampaignTagSource = '/img/successfull-campaign-tag.png'

  return (
    <Grid
      sx={{
        position: 'absolute',
        right: 15,
        bottom: 10,
        zIndex: 20,
        transform: 'rotate(335deg)',
        opacity: 0.8,
      }}>
      <Image
        alt="Successfull campaign tag"
        src={successfullCampaignTagSource}
        width={200}
        height={70}
      />
    </Grid>
  )
}
