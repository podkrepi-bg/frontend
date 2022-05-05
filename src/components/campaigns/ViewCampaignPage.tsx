import React from 'react'

import { Grid, Theme } from '@mui/material'
import { createStyles, makeStyles } from '@mui/styles'

import { useViewCampaign } from 'common/hooks/campaigns'

import NotFoundPage from 'pages/404'
import Layout from 'components/layout/Layout'
import InlineDonation from './InlineDonation'
import CampaignDetails from './CampaignDetails'
import IrregularityReport from './IrregularityReport'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    sideWrapper: {
      [theme.breakpoints.down('md')]: {
        maxWidth: 'max-content',
      },
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
    <Layout maxWidth={false}>
      <Grid container component="section" maxWidth="lg" justifyContent="center" m="0 auto">
        <CampaignDetails campaign={campaign} />
        <Grid
          container
          item
          xs={4}
          className={classes.sideWrapper}
          direction="column"
          flexWrap="nowrap">
          <Grid item>
            <InlineDonation campaign={campaign} />
          </Grid>
          <Grid item>
            <IrregularityReport campaign={campaign} />
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  )
}
