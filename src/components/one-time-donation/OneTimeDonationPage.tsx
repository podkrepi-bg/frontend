import { Box, Grid, Theme, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import createStyles from '@mui/styles/createStyles'
import Layout from 'components/layout/Layout'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import {} from 'path'
import { UseQueryResult } from 'react-query'
import { CampaignResponse } from 'gql/campaigns'
import { useViewCampaign } from 'common/hooks/campaigns'
import DonationStepper from './components/Steps'
import { useRouter } from 'next/router'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      fontFamily: 'Montserrat',
      fontStyle: 'normal',
      fontSize: '45px',
      lineHeight: '50px',
      textAlign: 'center',
      letterSpacing: '-1.5px',
      color: '#000000',
    },
    avatar: {
      borderRadius: '50%',
      border: `10px solid ${theme.palette.common.white} !important`,
      textAlign: 'center',
      maxWidth: '307',
    },
  }),
)

export default function OneTimeDonation() {
  const { t } = useTranslation()
  const classes = useStyles()
  const router = useRouter()
  const slug = String(router.query.slug)
  const { data }: UseQueryResult<{ campaign: CampaignResponse }> = useViewCampaign(slug)

  return (
    <>
      <Grid sx={{ pt: 10 }}>
        <Grid sx={{ minHeight: '182px' }}>
          <Image
            sizes="100%"
            objectFit="cover"
            width="1440px"
            height="320px"
            alt="The house from the offer."
            src="/img/campaign-banner.png"
          />
        </Grid>
        <Grid sx={{ maxWidth: '307px', ml: 'auto', mr: 'auto', mt: '-180px' }}>
          <Image
            width="307"
            height="307"
            className={classes.avatar}
            alt="The house from the offer."
            src="/img/campaign-banner.png"
          />
        </Grid>
        <Typography className={classes.title}>{data?.campaign.title}</Typography>
      </Grid>
      <Layout>
        <DonationStepper />
      </Layout>
    </>
  )
}
