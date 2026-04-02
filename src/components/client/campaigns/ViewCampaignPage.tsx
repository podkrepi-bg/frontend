import React from 'react'

import { Grid } from '@mui/material'

import { useViewCampaign } from 'common/hooks/campaigns'
import { campaignListPictureUrl } from 'common/util/campaignImageUrls'
import theme from 'common/theme'
import useMobile from 'common/hooks/useMobile'
import Layout from 'components/client/layout/Layout'
import CenteredSpinner from 'components/common/CenteredSpinner'

import { PaymentDrawer } from './PaymentDrawer'
import CampaignDetails from './CampaignDetails'
import NotFoundPage from 'pages/404'

type Props = { slug: string }

export default function ViewCampaignPage({ slug }: Props) {
  const { data, isLoading, isError } = useViewCampaign(slug)
  const { mobile, small } = useMobile()
  if (isLoading || !data)
    return (
      <>
        {isLoading && <CenteredSpinner size={'2rem'} />}
        {isError && <NotFoundPage />}
      </>
    )
  const { campaign } = data
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
          <PaymentDrawer campaign={campaign} />
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

              [theme.breakpoints.down('md')]: {
                maxWidth: 'max-content',
                flexBasis: 'fit-content',
                flexDirection: 'column',
              },
            }}>
            <Grid
              item
              sx={{
                position: 'sticky',
                top: theme.spacing(12),
                width: theme.spacing(48),
                paddingLeft: theme.spacing(2),

                [theme.breakpoints.down('lg')]: {
                  width: 'fit-content',
                  height: 'fit-content',
                },
              }}>
              <PaymentDrawer campaign={campaign} />
            </Grid>
          </Grid>
        )}
      </Grid>
    </Layout>
  )
}
