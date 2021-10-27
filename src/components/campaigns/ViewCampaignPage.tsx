import React from 'react'
import makeStyles from '@mui/styles/makeStyles'
import createStyles from '@mui/styles/createStyles'
import { Grid, Theme, Typography } from '@mui/material'

import NotFoundPage from 'pages/404'
import { money } from 'common/util/money'
import Layout from 'components/layout/Layout'
import { useViewCampaign } from 'common/hooks/campaigns'

import InlineDonation from './InlineDonation'
import CampaignProgress from './CampaignProgress'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    marginTop: {
      marginTop: theme.spacing(3),
    },
    progressCardWrapper: {
      backgroundColor: '#c6eed6',
      borderRadius: theme.spacing(3),
    },
  }),
)

type Props = { slug: string }
export default function ViewCampaignPage({ slug }: Props) {
  const classes = useStyles()
  const { data } = useViewCampaign(slug)

  if (!data || !data.campaign) return <NotFoundPage />

  const { campaign } = data
  const target = campaign.targetAmount
  const summary = campaign.summary.find(() => true)
  const reached = summary ? summary.reachedAmount : 0
  return (
    <Layout title={campaign.title}>
      <Grid container spacing={6} className={classes.marginTop}>
        <Grid item xs={12} md={8}>
          <Typography variant="h4" component="h4" gutterBottom>
            {money(reached)} от {money(target)}
          </Typography>
          <CampaignProgress raised={reached} target={target} />
          <Typography className={classes.marginTop}>{campaign.description}</Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <InlineDonation campaign={campaign} />
        </Grid>
      </Grid>
    </Layout>
  )
}
