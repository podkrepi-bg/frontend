import Image from 'next/image'
import { Box, Button, CircularProgress, Grid, Theme } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import createStyles from '@mui/styles/createStyles'
import { CampaignResponse } from 'gql/campaigns'
import useMobile from 'common/hooks/useMobile'

import CampaignCard from './CampaignCard'
import { useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    seeAllButton: {
      border: `1px solid ${theme.palette.primary.main}`,
      margin: `1em`,
    },
  }),
)

type Props = { campaignToShow: CampaignResponse[] }
export default function CampaignsList({ campaignToShow }: Props) {
  const { t } = useTranslation()
  const classes = useStyles()
  const { mobile } = useMobile()
  const numberOfMinimalShownCampaings = 6
  const [campaignsToShow, setCampaignsToShow] = useState<CampaignResponse[] | undefined>()
  const [all, setAll] = useState<boolean>(false)
  useEffect(() => {
    all
      ? setCampaignsToShow(campaignToShow)
      : setCampaignsToShow(campaignToShow?.slice(0, numberOfMinimalShownCampaings))
  }, [campaignToShow, all])
  return (
    <Grid container justifyContent="center" spacing={2}>
      <Grid container justifyContent="center" spacing={2}>
        {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
        {<CircularProgress size="large" />}
        {campaignsToShow?.map((campaign, index) => (
          <Grid key={index} item xs={12} sm={6} lg={4}>
            <Box textAlign="center">
              <CampaignCard campaign={campaign} />
            </Box>
          </Grid>
        ))}
      </Grid>
      {campaignsToShow && campaignsToShow?.length >= numberOfMinimalShownCampaings ? (
        <Grid container justifyContent="center" spacing={-10}>
          <Button onClick={() => setAll((prev) => !prev)} className={classes.seeAllButton}>
            {all ? t('campaigns:cta.see-less') : t('campaigns:cta.see-all')}
          </Button>
        </Grid>
      ) : (
        ''
      )}
      <Grid>
        <Box sx={{ my: 10 }}>
          {mobile ? (
            <Image src="/img/ArtboardRotate.png" width={250} height={400} />
          ) : (
            <Image src="/img/Artboard.png" width={813} height={358} />
          )}
        </Box>
      </Grid>
    </Grid>
  )
}
