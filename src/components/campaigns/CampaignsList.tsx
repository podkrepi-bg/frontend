import Image from 'next/image'
import { Box, Button, Grid } from '@mui/material'

import { CampaignResponse } from 'gql/campaigns'
import useMobile from 'common/hooks/useMobile'

import CampaignCard from './CampaignCard'
import { useMemo, useState } from 'react'
import { useTranslation } from 'next-i18next'

type Props = { campaignToShow: CampaignResponse[] }
export default function CampaignsList({ campaignToShow }: Props) {
  const { t } = useTranslation()
  const { mobile } = useMobile()
  const numberOfMinimalShownCampaigns = 6
  const [all, setAll] = useState<boolean>(false)
  const campaigns = useMemo<CampaignResponse[]>(() => {
    if (all) {
      return campaignToShow ?? []
    }
    return campaignToShow?.slice(0, numberOfMinimalShownCampaigns) ?? []
  }, [campaignToShow, all])
  return (
    <Grid container justifyContent="center" spacing={2}>
      <Grid container justifyContent="center" spacing={2}>
        {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
        {campaigns?.map((campaign, index) => (
          <Grid key={index} item xs={12} sm={4} lg={3}>
            <Box textAlign="center">
              <CampaignCard campaign={campaign} />
            </Box>
          </Grid>
        ))}
      </Grid>
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
            <Image src="/img/ArtboardMobile.svg" width={250} height={400} />
          ) : (
            <Image src="/img/Artboard.png" width={813} height={358} />
          )}
        </Box>
      </Grid>
    </Grid>
  )
}
