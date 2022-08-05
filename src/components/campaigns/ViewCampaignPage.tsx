import React from 'react'

import { Grid, Theme } from '@mui/material'
import { createStyles, makeStyles } from '@mui/styles'

import { useViewCampaign } from 'common/hooks/campaigns'
import { campaignListPictureUrl } from 'common/util/campaignImageUrls'

import NotFoundPage from 'pages/404'
import Layout from 'components/layout/Layout'
import InlineDonation from './InlineDonation'
import CampaignDetails from './CampaignDetails'
import useMobile from 'common/hooks/useMobile'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    sideWrapper: {
      paddingLeft: theme.spacing(2),
      [theme.breakpoints.down('md')]: {
        maxWidth: 'max-content',
        flexBasis: 'fit-content',
        paddingLeft: theme.spacing(0),
        flexDirection: 'column',
      },
    },
    donationDesktopWrapper: {
      position: 'sticky',
      top: theme.spacing(12),
    },
    donationMobileWrapper: {
      position: 'sticky',
      top: 0,
      order: -1,
      marginTop: `-${theme.spacing(2)}`,
      minWidth: '100vw',
      boxShadow: '2px 4px 5px rgba(0, 0, 0, 0.25)',
    },
  }),
)

type Props = { slug: string }

export default function ViewCampaignPage({ slug }: Props) {
  const classes = useStyles()
  const { data } = useViewCampaign(slug)
  if (!data || !data.campaign) return <NotFoundPage />
  const { campaign } = data
  const { mobile, small } = useMobile()
  const ogImageUrl = campaignListPictureUrl(campaign)

  return (
    <Layout
      maxWidth={false}
      ogImage={ogImageUrl}
      metaTitle={campaign.title}
      metaDescription={campaign.title}>
      <Grid container component="section" maxWidth="lg" justifyContent="center" m="0 auto">
        <CampaignDetails campaign={campaign} />
        {mobile || small ? (
          <Grid item className={classes.donationMobileWrapper}>
            <InlineDonation campaign={campaign} />
          </Grid>
        ) : (
          <Grid
            container
            item
            xs={12}
            sm={4}
            direction="column"
            flexWrap="nowrap"
            className={classes.sideWrapper}>
            <Grid item className={classes.donationDesktopWrapper}>
              <InlineDonation campaign={campaign} />
            </Grid>
          </Grid>
        )}
      </Grid>
    </Layout>
  )
}
