import React from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { Cookies, getCookieConsentValue } from 'react-cookie-consent'

import { useViewCampaign } from 'common/hooks/campaigns'
import useMobile from 'common/hooks/useMobile'
import theme from 'common/theme'
import { campaignListPictureUrl } from 'common/util/campaignImageUrls'
import useGTM from 'common/util/useGTM'
import CenteredSpinner from 'components/common/CenteredSpinner'
import CookieConsentPopup from 'components/common/CookieConsentPopup'
import Layout from 'components/client/layout/Layout'

import { PaymentDrawer } from './PaymentDrawer'
import CampaignDetails from './CampaignDetails'
import NotFoundPage from 'pages/404'

type Props = { slug: string }

export default function ViewCampaignPage({ slug }: Props) {
  const { data, isLoading, isError } = useViewCampaign(slug)
  const { mobile, small } = useMobile()
  const { initialize } = useGTM()
  const { i18n } = useTranslation()

  const handleAcceptCookie = () => {
    initialize({
      events: { user_lang: i18n.language },
    })
  }

  const handleDeclineCookie = () => {
    Cookies.remove('_ga')
    Cookies.remove('_gat')
    Cookies.remove('_gid')
  }

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
        {getCookieConsentValue() !== 'true' && (
          <Grid
            item
            xs={12}
            sx={{
              position: 'fixed',
              left: 0,
              right: 0,
              bottom: 100,
              zIndex: 1300,
              '@media (max-width: 522px)': {
                bottom: 115,
              },
              '@media (min-width: 901px)': {
                bottom: 0,
              },
            }}>
            <CookieConsentPopup
              handleAcceptCookie={handleAcceptCookie}
              handleDeclineCookie={handleDeclineCookie}
              styleOverride={{
                position: 'relative',
                bottom: 'auto',
                left: 'auto',
                right: 'auto',
                zIndex: 1301,
              }}
            />
          </Grid>
        )}
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
