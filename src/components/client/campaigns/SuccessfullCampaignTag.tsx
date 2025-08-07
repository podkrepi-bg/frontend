import React from 'react'

import Image from 'next/image'

import { Grid2 } from '@mui/material'

export default function SuccessfullCampaignTag() {
  const successfullCampaignTagSource = '/img/successfull-campaign-tag.png'

  return (
    <Grid2
      sx={{
        position: 'absolute',
        right: 5,
        top: 40,
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
    </Grid2>
  )
}
