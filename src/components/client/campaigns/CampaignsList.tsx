import { useMemo, useState } from 'react'
import Image from 'next/image'
import { useTranslation } from 'next-i18next'
import { CampaignResponse } from 'gql/campaigns'

import { Box, Button, Grid } from '@mui/material'

import theme from 'common/theme'
import useMobile from 'common/hooks/useMobile'
<<<<<<< HEAD
import CampaignCard from './CampaignCard/CampaignCard'
=======

import CampaignCard from './CampaignCard/CampaignCard'
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
>>>>>>> dd332ce9 (Update cards on campaigns page - initial changes)

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
      {campaigns?.map((campaign, index) => (
        <Grid key={index} item xs={12} sm={6} lg={3}>
          <Box
            sx={{
              textAlign: 'center',
            }}>
            <CampaignCard index={index} campaign={campaign} />
          </Box>
        </Grid>
      ))}
      {campaignToShow && campaignToShow?.length > numberOfMinimalShownCampaigns && (
        <Grid container justifyContent="center">
          <Button
            onClick={() => setAll((prev) => !prev)}
            sx={{
              fontFamily: "'Lato', sans-serif",
              fontSize: theme.typography.pxToRem(16),
              fontWeight: 600,
              color: theme.palette.common.black,
              letterSpacing: '0.4px',
              textDecoration: 'underline',
              marginTop: 0,

              '&:hover': {
                backgroundColor: 'transparent',
                textDecoration: 'underline',
              },
            }}>
            {all ? t('campaigns:cta.see-less') : t('campaigns:cta.see-all')}
          </Button>
        </Grid>
      )}
      <Grid item xs={12} textAlign="center">
        <Box sx={{ my: 10 }}>
          {mobile ? (
            <Image
<<<<<<< HEAD
              alt="Information artboard mobile"
=======
              alt="Informatino artboard mobile"
>>>>>>> dd332ce9 (Update cards on campaigns page - initial changes)
              src="/img/ArtboardMobile.svg"
              width={300}
              height={300}
            />
          ) : (
<<<<<<< HEAD
            <Image alt="Information artboard" src="/img/Artboard.png" width={813} height={358} />
=======
            <Image alt="Informatino artboard" src="/img/Artboard.png" width={813} height={358} />
>>>>>>> dd332ce9 (Update cards on campaigns page - initial changes)
          )}
        </Box>
      </Grid>
    </Grid>
  )
}
