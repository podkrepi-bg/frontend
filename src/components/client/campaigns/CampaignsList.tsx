import { useMemo, useState } from 'react'
import { CampaignResponse } from 'gql/campaigns'
import Image from 'next/image'
import { useTranslation } from 'next-i18next'

import { Box, Button, Grid } from '@mui/material'

import useMobile from 'common/hooks/useMobile'
import theme from 'common/theme'
import CampaignCard from './CampaignCard/CampaignCard'

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
        <Grid key={campaign.id} item xs={12} sm={6} lg={3}>
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
        <Box sx={{ mt: 6 }}>
          {mobile ? (
            <Image
              alt="Donation graphic mobile"
              src="/img/donation-graphic-mobile.svg"
              width={300}
              height={300}
            />
          ) : (
            <Image
              alt="Donation graphic"
              src="/img/donation-graphic.png"
              width={813}
              height={358}
            />
          )}
        </Box>
      </Grid>
    </Grid>
  )
}
