import { useTranslation, Trans } from 'next-i18next'
import Layout from '../layout/Layout'
import PodkrepiLogo from 'components/common/brand/PodkrepiLogo'
import { useRouter } from 'next/router'
import { Button, DialogTitle, Grid2, Typography } from '@mui/material'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import AnnouncementIcon from '@mui/icons-material/Announcement'
import { styled } from '@mui/material/styles'
import LinkButton from 'components/common/LinkButton'
import React, { useEffect, useState } from 'react'
import { AlertStore } from 'stores/AlertStore'
import { useMutation } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'
import { SubscribePublicEmailInput, SubscribePublicEmailResponse } from 'gql/notification'
import { ApiError } from 'next/dist/server/api-utils'
import { useSubscribePublicEmail } from 'service/notification'

import theme from 'common/theme'

type Props = {
  hash: string | null
  email: string | null
  consent: string | null
  campaign: string | null
}

type Payload = {
  hash: string
  email: string
  consent: boolean
  campaignId?: string | null
}

const PREFIX = 'notification-subscribe'

const classes = {
  siteBtn: `${PREFIX}-siteBtn`,
  loader: `${PREFIX}-loader`,
}

const StyledGrid = styled(Grid2)(({ theme }) => ({
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
    width: '100%',
    maxWidth: theme.spacing(60),

    '&:hover': {
      background: theme.palette.primary.main,
    },
    '& svg': {
      color: '#333232 ',
    },
  },
}))

export default function SubscriptionPage(data: Props) {
  const { t } = useTranslation()
  const { locale } = useRouter()
  const router = useRouter()

  const [loading, setLoading] = useState(true)
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    if (!data.consent || !data.email || !data.hash) {
      router.push('/')
      return
    }
    const payload: Payload = {
      consent: data.consent === 'true' || false,
      hash: data.hash,
      email: data.email,
    }
    if (data.campaign) payload.campaignId = data.campaign

    callSubscribeApiRoute(payload).catch(() => console.log())
  }, [])

  const handleError = (e: AxiosError<ApiError>) => {
    const error = e.response?.data?.message
    AlertStore.show(error ? error : t('common:alerts.error'), 'error')
    setLoading(false)
    setIsSuccess(false)
  }

  const handleSuccess = () => {
    AlertStore.show(t('common:alerts.message-sent'), 'success')
    setIsSuccess(true)
    setLoading(false)
  }

  const mutation = useMutation<
    AxiosResponse<SubscribePublicEmailResponse>,
    AxiosError<ApiError>,
    SubscribePublicEmailInput
  >({
    mutationFn: useSubscribePublicEmail(),
    onError: (error) => handleError(error),
    onSuccess: () => handleSuccess(),
  })

  async function callSubscribeApiRoute(values: {
    hash: string
    email: string
    consent: boolean
    campaignId?: string | null
  }) {
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
        <StyledGrid container alignItems="center" justifyContent="center">
          <Grid2
            size={{
              xs: 10,
              md: 5,
            }}>
            <PodkrepiLogo
              className={classes.loader}
              locale={locale}
              size="giant"
              variant="adaptive"
            />
          </Grid2>
        </StyledGrid>
      </Layout>
    )

  return (
    <Layout maxWidth="xl">
      <StyledGrid container alignItems="center" justifyContent="center" direction={'column'}>
        <Grid2 alignItems="center" justifyContent="center">
          <PodkrepiLogo locale={locale} size="large" variant="adaptive" />
        </Grid2>
        {isSuccess ? (
          <React.Fragment>
            <Grid2
              container
              mt={5}
              direction="column"
              alignItems="center"
              gap={5}
              justifyContent={'center'}>
              <Grid2 container direction={'column'} justifyContent={'center'} alignItems={'center'}>
                <ThumbUpIcon sx={{ fontSize: theme.typography.pxToRem(64), color: '#03C03C' }} />
                <DialogTitle>
                  <Typography
                    variant="h5"
                    style={{
                      textAlign: 'center',
                      width: '100%',
                      color: '#03C03C',
                      wordBreak: 'break-word',
                    }}>
                    {t('notifications:subscribe.thank-you-msg-heading')}
                  </Typography>
                </DialogTitle>
                <Typography sx={{ wordBreak: 'break-word' }}>
                  <Trans
                    t={t}
                    i18nKey="notifications:subscribe.thank-you-msg-text"
                    values={{ email: data.email }}
                  />
                </Typography>
              </Grid2>
              <Grid2 container justifyContent="center" size={12}>
                <LinkButton className={classes.siteBtn} href="/" legacyBehavior>
                  {t('notifications:subscribe.cta')}
                </LinkButton>
              </Grid2>
            </Grid2>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <React.Fragment>
              <Grid2
                container
                mt={5}
                direction="column"
                alignItems="center"
                justifyContent={'center'}
                gap={2}>
                <Grid2
                  container
                  direction={'column'}
                  alignItems={'center'}
                  justifyContent={'center'}>
                  <AnnouncementIcon
                    sx={{ fontSize: theme.typography.pxToRem(64), color: '#FF007F' }}
                  />
                  <DialogTitle>
                    <Typography
                      variant="h5"
                      component={'p'}
                      style={{ textAlign: 'center', width: '100%', color: '#FF007F' }}>
                      {t('notifications:subscribe.subscription-fail-heading')}
                    </Typography>
                  </DialogTitle>
                  <Typography sx={{ textAlign: 'center' }}>
                    <Trans t={t} i18nKey="notifications:subscribe.subscription-fail-text" />
                  </Typography>
                </Grid2>
                <Grid2 container justifyContent={'center'} size={12}>
                  <Button className={classes.siteBtn} onClick={() => router.reload()}>
                    {t('notifications:subscribe.cta-retry')}
                  </Button>
                </Grid2>
              </Grid2>
            </React.Fragment>
          </React.Fragment>
        )}
      </StyledGrid>
    </Layout>
  )
}
