import React from 'react'

import { Grid } from '@mui/material'

import { useViewCampaign } from 'common/hooks/campaigns'
import { campaignListPictureUrl } from 'common/util/campaignImageUrls'
import theme from 'common/theme'

import NotFoundPage from 'pages/404'
import Layout from 'components/layout/Layout'
import InlineDonation from './InlineDonation'
import CampaignDetails from './CampaignDetails'
import useMobile from 'common/hooks/useMobile'

type Props = { slug: string }

export default function ViewCampaignPage({ slug }: Props) {
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
          <Grid
            item
            sx={{
              position: 'sticky',
              top: 0,
              order: -1,
              marginTop: `-${theme.spacing(3)}`,
              minWidth: '100vw',
              zIndex: 100,
            }}>
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
            sx={{
              position: 'sticky',
              paddingLeft: theme.spacing(2),
              [theme.breakpoints.down('md')]: {
                maxWidth: 'max-content',
                flexBasis: 'fit-content',
                paddingLeft: theme.spacing(0),
                flexDirection: 'column',
              },
            }}>
            <Grid item sx={{ position: 'sticky', top: theme.spacing(12) }}>
              <InlineDonation campaign={campaign} />
            </Grid>
          </Grid>
        )}
      </Grid>
    </Layout>
  )
}
