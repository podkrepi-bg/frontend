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
import HorizontalLabelPositionBelowStepper from './components/Steps'
import { useRouter } from 'next/router'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    banner: {
      position: 'absolute',
      background: 'rgba(0, 0, 0, 0.4)',
    },
    title: {
      // position: 'absolute',
      // width: '827px',
      // height: '100px',
      // right: '207px',
      // top: '492px',
      fontFamily: 'Montserrat',
      fontStyle: 'normal',
      // fontWeight: '500',
      fontSize: '45px',
      lineHeight: '50px',
      /* or 111% */
      textAlign: 'center',
      letterSpacing: '-1.5px',
      color: '#000000',
    },
    stepper: {
      position: 'absolute',
      left: '30.96%',
      right: '68.28%',
      top: '23.06%',
      bottom: '76.06%',

      fontFamily: 'Open Sans',
      fontStyle: 'normal',
      fontWeight: 600,
      fontSize: '18px',
      lineHeight: '25px',

      /* identical to box height */

      color: '#000000',
    },
    avatarWrapper: {
      position: 'absolute',
      left: '750px',
      top: '275px',
    },
    avatar: {
      borderRadius: '50%',
      border: `10px solid ${theme.palette.common.white} !important`,
      textAlign: 'center',
    },
    infoWrapper: {
      gap: theme.spacing(2),
      display: 'grid',
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
      <Grid sx={{ paddingTop: '112px' }}>
        <Image
          sizes="100%"
          objectFit="cover"
          width="1440"
          height="272"
          className={classes.banner}
          alt="The house from the offer."
          src="/img/campaign-banner.png"
        />
        <Grid className={classes.avatarWrapper}>
          <Image
            width="307"
            height="307"
            className={classes.avatar}
            alt="The house from the offer."
            src="/img/campaign-banner.png"
          />
        </Grid>
      </Grid>
      <Layout>
        <Typography className={classes.title}>{data?.campaign.title}</Typography>
        <HorizontalLabelPositionBelowStepper />
      </Layout>
    </>
  )
}
