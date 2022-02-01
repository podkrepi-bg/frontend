import React from 'react'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import makeStyles from '@mui/styles/makeStyles'
import createStyles from '@mui/styles/createStyles'
import { Grid, Theme, Typography } from '@mui/material'
import NotFoundPage from 'pages/404'
import { useViewCampaign } from 'common/hooks/campaigns'
import InlineDonation from './InlineDonation'
import Layout from 'components/layout/Layout'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    campaignPageWrapper: {
      maxWidth: theme.spacing(150),
      margin: '0 auto',
      [theme.breakpoints.up(1600)]: {
        height: theme.spacing(118),
      },
    },
    bannerWrapper: {
      '& span': {
        position: 'inherit !important',
      },
    },
    banner: {
      zIndex: -1,
      minHeight: '504px !important',
      marginTop: `${theme.spacing(14)} !important`,
    },
    campaignTitle: {
      padding: theme.spacing(4),
      color: theme.palette.common.white,
      height: theme.spacing(30),
    },
    beneficiaryWrapper: {
      display: 'flex',
      padding: theme.spacing(4),
      alignItems: 'end',
    },
    beneficiaryAvatar: {
      borderRadius: '50%',
      border: '4px solid #ffff !important',
    },
    beneficiaryName: {
      textAlign: 'center',
    },
    campaignInfoWrapper: {
      gap: theme.spacing(2),
      display: 'grid',
    },
    coordinatorAvatar: {
      borderRadius: '50%',
    },
  }),
)

type Props = { slug: string }
export default function ViewCampaignPage({ slug }: Props) {
  const classes = useStyles()
  const { t } = useTranslation()
  const { data } = useViewCampaign(slug)

  // const imgSource = '/img/campaign-banner.png'

  if (!data || !data.campaign) return <NotFoundPage />

  const { campaign } = data
  // const target = campaign.targetAmount
  // const summary = campaign.summary.find(() => true)
  // const reached = summary ? summary.reachedAmount : 0

  return (
    <Layout maxWidth="xl">
      <Grid container component="section" className={classes.campaignPageWrapper}>
        <Grid item xs={12} md={8}>
          <Grid className={classes.bannerWrapper}>
            <Image
              src="/img/campaign-banner.png"
              alt="Podkrepi.bg jumbotron heading"
              layout="fill"
              objectFit="cover"
              className={classes.banner}
            />
          </Grid>
          <Typography paragraph variant="h2" component="h1" className={classes.campaignTitle}>
            {campaign.title}
          </Typography>
          <Grid item justifyContent="space-between" xs={9} className={classes.beneficiaryWrapper}>
            <Image
              src="/img/support-us-image.png"
              alt={campaign.title}
              width={250}
              height={250}
              className={classes.beneficiaryAvatar}
            />
            <Typography variant="h4" component="h4" className={classes.beneficiaryName}>
              {campaign.beneficiary.person.firstName} {campaign.beneficiary.person.lastName}
            </Typography>
          </Grid>
          <Typography variant="subtitle2" component="p">
            {t('campaigns:campaign.start-date')} {campaign.startDate}
          </Typography>
          <Grid className={classes.campaignInfoWrapper}>
            <Typography variant="subtitle2" component="p">
              {t('campaigns:campaign.end-date')}
              {campaign.endDate}
            </Typography>
            <Typography variant="subtitle2" component="p">
              {campaign.description}
            </Typography>
            <Typography variant="h6" component="h6">
              {t('campaigns:campaign.coordinator.name')}
            </Typography>
            <Grid container alignItems="center" gap={4}>
              <Image
                src="/img/support-us-image.png"
                alt={campaign.title}
                width={100}
                height={100}
                className={classes.coordinatorAvatar}
              />
              <Typography variant="h6" component="h6">
                {campaign.coordinator.person.firstName}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        {/* <Grid container spacing={6} className={classes.marginTop}>
        <Grid item xs={12} md={8}>
          <Typography variant="h4" component="h4" gutterBottom>
            {money(reached)} от {money(target)}
          </Typography>
          <CampaignProgress raised={reached} target={target} />
          <Typography className={classes.marginTop}>{campaign.description}</Typography>
        </Grid>
      </Grid> */}
        <Grid item xs={12} md={4}>
          <InlineDonation campaign={campaign} />
        </Grid>
      </Grid>
    </Layout>
  )
}
