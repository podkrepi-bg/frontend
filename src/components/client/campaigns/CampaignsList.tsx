import Image from 'next/image'
import { Box, Button, Grid } from '@mui/material'

import { CampaignResponse } from 'gql/campaigns'
import useMobile from 'common/hooks/useMobile'

import CampaignCard from './CampaignCard'
import { useMemo, useState } from 'react'
import { useTranslation } from 'next-i18next'

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
  const { t } = useTranslation()
  const { mobile } = useMobile()
  const numberOfMinimalShownCampaigns = 12
  const [all, setAll] = useState<boolean>(false)
  const campaigns = useMemo<CampaignResponse[]>(() => {
    if (all) {
      return campaignToShow ?? []
    }
    return campaignToShow?.slice(0, numberOfMinimalShownCampaigns) ?? []
  }, [campaignToShow, all])

  return (
    <Grid
      container
      justifyContent="center"
      spacing={4}
      sx={(theme) => ({
        width: `calc(100% + ${theme.spacing(1.5)})`,
        marginLeft: `-${theme.spacing(2.75)}`,
      })}>
      {campaigns?.map((campaign, index, array) => (
        <Grid key={index} item xs={12} sm={6} lg={3}>
          <Box
            sx={(theme) => ({
              textAlign: 'center',
              [theme.breakpoints.down('lg')]: { textAlign: cardAlignment(index, array) },
              [theme.breakpoints.down('md')]: { textAlign: 'center' },
            })}>
            <CampaignCard index={index} campaign={campaign} />
          </Box>
        </Grid>
      ))}
      {campaignToShow && campaignToShow?.length > numberOfMinimalShownCampaigns && (
        <Grid container justifyContent="center">
          <Button onClick={() => setAll((prev) => !prev)} variant="outlined" sx={{ mt: 1 }}>
            {all ? t('campaigns:cta.see-less') : t('campaigns:cta.see-all')}
          </Button>
        </Grid>
      )}
      <Grid>
        <Box sx={{ my: 10 }}>
          {mobile ? (
            // A11Y TODO: Add alt text
            <Image alt="" src="/img/ArtboardMobile.svg" width={300} height={300} />
          ) : (
            // A11Y TODO: Add alt text
            <Image alt="Informatino artboard" src="/img/Artboard.png" width={813} height={358} />
          )}
        </Box>
      </Grid>
    </Grid>
  )
}
