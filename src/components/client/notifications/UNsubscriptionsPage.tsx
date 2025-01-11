import { useTranslation } from 'next-i18next'
import Layout from '../layout/Layout'
import PodkrepiLogo from 'components/common/brand/PodkrepiLogo'
import { useRouter } from 'next/router'
import { Button, DialogContent, Grid } from '@mui/material'
import { styled } from '@mui/material/styles'
import LinkButton from 'components/common/LinkButton'
import React, { useEffect, useState } from 'react'
import { AlertStore } from 'stores/AlertStore'
import { useMutation } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'
import { UNsubscribePublicEmailInput, UNsubscribePublicEmailResponse } from 'gql/notification'
import { ApiError } from 'next/dist/server/api-utils'
import { useUNSubscribePublicEmail } from 'service/notification'

type Props = {
  email: string | null
  campaign: string | null
}

type Payload = {
  email: string
  campaignId?: string | null
}

const PREFIX = 'notification-subscribe'

const classes = {
  siteBtn: `${PREFIX}-siteBtn`,
  loader: `${PREFIX}-loader`,
}

const StyledGrid = styled(Grid)(({ theme }) => ({
  [`& .${classes.loader}`]: {
    animation: 'pulsate 1s infinite',

    '@keyframes pulsate': {
      ' 0%': {
        transform: 'scale(1)',
      },
      '50%': {
        transform: 'scale(1.14)',
      },
      '100% ': {
        transform: ' scale(1)',
      },
    },
  },

  [`& .${classes.siteBtn}`]: {
    fontSize: theme.typography.pxToRem(18),
    lineHeight: theme.spacing(3),
    letterSpacing: theme.spacing(0.05),
    color: theme.palette.common.black,
    background: `${theme.palette.secondary.main}`,
    padding: theme.spacing(1.5),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2.5),
    width: theme.spacing(60),

    '&:hover': {
      background: theme.palette.primary.main,
    },
    '& svg': {
      color: '#333232 ',
    },
  },
}))

const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  textAlign: 'center',
  fontSize: 23,
  fontWeight: 600,
  paddingBottom: theme.spacing(6),
}))

export default function UNsubscriptionPage(data: Props) {
  const { t } = useTranslation()
  const { locale } = useRouter()
  const router = useRouter()

  const [loading, setLoading] = useState(true)
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    if (!data.email) {
      router.push('/')
      return
    }
    const payload: Payload = {
      email: data.email,
    }
    if (data.campaign) payload.campaignId = data.campaign

    callUNsubscribeApiRoute(payload).catch(() => console.log())
  }, [])

  const handleError = () => {
    setLoading(false)
    setIsSuccess(false)
  }

  const mutation = useMutation<
    AxiosResponse<UNsubscribePublicEmailResponse>,
    AxiosError<ApiError>,
    UNsubscribePublicEmailInput
  >({
    mutationFn: useUNSubscribePublicEmail(),
    onError: () => handleError(),
    onSuccess: () => {
      AlertStore.show(t('common:alerts.message-sent'), 'success')
      setIsSuccess(true)
      setLoading(false)
    },
  })

  async function callUNsubscribeApiRoute(values: { email: string; campaignId?: string | null }) {
    setLoading(true)
    try {
      await mutation.mutateAsync(values)
    } finally {
      setLoading(false)
    }
  }

  // Show loader
  if (loading)
    return (
      <Layout maxWidth="xl">
        <StyledGrid display="grid" alignItems="center" justifyContent="center" mt={40}>
          <PodkrepiLogo className={classes.loader} locale={locale} size="giant" variant="fixed" />
        </StyledGrid>
      </Layout>
    )

  return (
    <Layout maxWidth="xl">
      <Grid display="grid" alignItems="center" justifyContent="center" mt={32}>
        <Grid item display="grid" alignItems="center" justifyContent="center">
          <PodkrepiLogo locale={locale} size="large" variant="fixed" />
        </Grid>
        {isSuccess ? (
          <React.Fragment>
            <Grid item mt={5}>
              <StyledDialogContent>
                {t('notifications:unsubscribe.thank-you-msg')}
              </StyledDialogContent>
            </Grid>
            <StyledGrid mt={5} display="grid" alignItems="center" justifyContent="center">
              <LinkButton className={classes.siteBtn} href="/">
                {t('notifications:unsubscribe.cta')}
              </LinkButton>
            </StyledGrid>{' '}
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Grid item mt={5}>
              <StyledDialogContent>
                {t('notifications:unsubscribe.subscription-fail')}
              </StyledDialogContent>
            </Grid>
            <StyledGrid mt={5} display="grid" alignItems="center" justifyContent="center">
              <Button className={classes.siteBtn} onClick={() => router.reload()}>
                {t('notifications:unsubscribe.cta-retry')}
              </Button>
            </StyledGrid>{' '}
          </React.Fragment>
        )}
      </Grid>
    </Layout>
  )
}
