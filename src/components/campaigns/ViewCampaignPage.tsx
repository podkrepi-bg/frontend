import React from 'react'
import { Grid, createStyles, makeStyles, Theme, Typography } from '@material-ui/core'

import NotFoundPage from 'pages/404'
import Layout from 'components/layout/Layout'
import { useViewCampaign } from 'common/hooks/campaigns'

import InlineDonation from './InlineDonation'

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
  return (
    <Layout title={campaign.title}>
      <Grid container spacing={6} className={classes.marginTop}>
        <Grid item xs={12} md={8}>
          <Typography variant="h4" component="h4">
            {parseInt(campaign.reachedAmount) / 100} лв. / {parseInt(campaign.targetAmount) / 100}{' '}
            лв.
          </Typography>
          <Typography className={classes.marginTop}>{campaign.description}</Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <InlineDonation campaign={campaign} />
        </Grid>
      </Grid>
    </Layout>
  )
}
