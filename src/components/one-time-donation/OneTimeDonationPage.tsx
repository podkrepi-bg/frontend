import { Box, Grid, Theme, Typography, useMediaQuery } from '@mui/material'
import { makeStyles } from '@mui/styles'
import createStyles from '@mui/styles/createStyles'
import Layout from 'components/layout/Layout'
import Image from 'next/image'
import { useViewCampaign } from 'common/hooks/campaigns'
import { useRouter } from 'next/router'
import theme from 'common/theme'
import {
  backgroundCampaignPictureUrl,
  beneficiaryCampaignPictureUrl,
} from 'common/util/campaignImageUrls'
import { CampaignResponse } from 'gql/campaigns'
import DonationStepper from './components/Steps'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    bannerWrapper: {
      '& span': {
        position: 'inherit !important',
      },
    },
    banner: {
      zIndex: -1,
      minHeight: '350px !important',
      marginTop: `${theme.spacing(10)} !important`,
      [theme.breakpoints.up('md')]: {
        marginTop: `${theme.spacing(14)} !important`,
      },
    },
    beneficiaryAvatarWrapper: {
      textAlign: 'center',
      [theme.breakpoints.up('md')]: {
        textAlign: 'center',
      },
    },
    beneficiaryAvatar: {
      borderRadius: '50%',
      border: `4px solid ${theme.palette.common.white} !important`,
      textAlign: 'center',
    },
    stepperWrapper: {
      gap: theme.spacing(2),
      display: 'grid',
    },
  }),
)

export default function OneTimeDonation() {
  const classes = useStyles()
  const router = useRouter()
  const matches = useMediaQuery('sm')
  const slug = String(router.query.slug)
  const { data } = useViewCampaign(slug)
  const { campaign } = data as { campaign: CampaignResponse }
  const bannerSource = backgroundCampaignPictureUrl(campaign)
  const beneficiaryAvatarSource = beneficiaryCampaignPictureUrl(campaign)
  return (
    <Layout maxWidth={false}>
      <Grid
        container
        component="section"
        maxWidth="lg"
        justifyContent="center"
        m="0 auto"
        marginTop={theme.spacing(matches ? 20 : 25)}>
        <Box className={classes.bannerWrapper}>
          <Image
            src={bannerSource}
            alt="Campaign banner image"
            layout="fill"
            objectFit="cover"
            className={classes.banner}
          />
        </Box>

        <Grid
          item
          xs={12}
          justifyContent="center"
          p={4}
          className={classes.beneficiaryAvatarWrapper}>
          <Image
            src={beneficiaryAvatarSource}
            alt={campaign.title}
            width={250}
            height={250}
            className={classes.beneficiaryAvatar}
          />
        </Grid>
        <Grid className={classes.stepperWrapper}>
          <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: theme.spacing(4) }}>
            {campaign.title}
          </Typography>
          <DonationStepper />
        </Grid>
      </Grid>
    </Layout>
  )
}
