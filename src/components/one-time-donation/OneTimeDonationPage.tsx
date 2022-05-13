import Image from 'next/image'
import { styled } from '@mui/material/styles'
import { Box, Grid, Typography, useMediaQuery } from '@mui/material'
import Layout from 'components/layout/Layout'
import { useViewCampaign } from 'common/hooks/campaigns'
import theme from 'common/theme'
import {
  backgroundCampaignPictureUrl,
  beneficiaryCampaignPictureUrl,
} from 'common/util/campaignImageUrls'
import NotFoundPage from 'pages/404'
import DonationStepper from './Steps'

const PREFIX = 'OneTimeDonationPage'

const classes = {
  bannerWrapper: `${PREFIX}-bannerWrapper`,
  banner: `${PREFIX}-banner`,
  beneficiaryAvatarWrapper: `${PREFIX}-beneficiaryAvatarWrapper`,
  beneficiaryAvatar: `${PREFIX}-beneficiaryAvatar`,
  stepperWrapper: `${PREFIX}-stepperWrapper`,
}

const StyledLayout = styled(Layout)(({ theme }) => ({
  [`& .${classes.bannerWrapper}`]: {
    '& span': {
      position: 'inherit !important',
    },
  },

  [`& .${classes.banner}`]: {
    zIndex: -1,
    minHeight: '350px !important',
    marginTop: `${theme.spacing(10)} !important`,
    [theme.breakpoints.up('md')]: {
      marginTop: `${theme.spacing(14)} !important`,
    },
  },

  [`& .${classes.beneficiaryAvatarWrapper}`]: {
    textAlign: 'center',
    [theme.breakpoints.up('md')]: {
      textAlign: 'center',
    },
  },

  [`& .${classes.beneficiaryAvatar}`]: {
    borderRadius: '50%',
    border: `4px solid ${theme.palette.common.white} !important`,
    textAlign: 'center',
  },

  [`& .${classes.stepperWrapper}`]: {
    gap: theme.spacing(2),
    display: 'grid',
  },
}))

export default function OneTimeDonation({ slug }: { slug: string }) {
  const { data } = useViewCampaign(slug)
  if (!data || !data.campaign) return <NotFoundPage />
  const { campaign } = data
  const matches = useMediaQuery('sm')

  const bannerSource = backgroundCampaignPictureUrl(campaign)
  const beneficiaryAvatarSource = beneficiaryCampaignPictureUrl(campaign)
  return (
    <StyledLayout maxWidth={false}>
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
    </StyledLayout>
  )
}
