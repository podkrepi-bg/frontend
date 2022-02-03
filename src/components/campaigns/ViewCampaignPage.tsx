import React from 'react'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { useViewCampaign } from 'common/hooks/campaigns'
import Layout from 'components/layout/Layout'
import InlineDonation from './InlineDonation'
import NotFoundPage from 'pages/404'
import makeStyles from '@mui/styles/makeStyles'
import createStyles from '@mui/styles/createStyles'
import { Grid, Theme, Typography } from '@mui/material'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
      height: theme.spacing(30),
      color: theme.palette.common.white,
      fontWeight: 500,
    },
    beneficiaryWrapper: {
      display: 'flex',
      alignItems: 'end',
    },
    beneficiaryAvatar: {
      borderRadius: '50%',
      border: `4px solid ${theme.palette.common.white} !important`,
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

  const bannerSource = '/img/campaign-banner.png'
  const beneficiaryAvatarSource = '/img/support-us-image.png'
  const coordinatorAvatarSource = '/img/support-us-image.png'

  if (!data || !data.campaign) return <NotFoundPage />

  const { campaign } = data

  return (
    <Layout maxWidth="xl">
      <Grid container component="section" maxWidth="lg" justifyContent="center" m="0 auto">
        <Grid item xs={12} md={8}>
          <Grid className={classes.bannerWrapper}>
            <Image
              src={bannerSource}
              alt="Campaign banner image"
              layout="fill"
              objectFit="cover"
              className={classes.banner}
            />
          </Grid>
          <Typography paragraph variant="h2" component="h1" p={4} className={classes.campaignTitle}>
            {campaign.title}
          </Typography>
          <Grid
            item
            justifyContent="space-between"
            md={9}
            p={5}
            className={classes.beneficiaryWrapper}>
            <Image
              src={beneficiaryAvatarSource}
              alt={campaign.title}
              width={250}
              height={250}
              className={classes.beneficiaryAvatar}
            />
            <Typography variant="h4" component="h4">
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
                src={coordinatorAvatarSource}
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
        <Grid item xs={12} md={4}>
          <InlineDonation campaign={campaign} />
        </Grid>
      </Grid>
    </Layout>
  )
}
