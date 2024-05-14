import React, { useState } from 'react'
import * as yup from 'yup'
import { Trans } from 'react-i18next'
import { useTranslation } from 'next-i18next'
import { useMutation } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { AxiosError, AxiosResponse } from 'axios'
import { ApiError } from 'next/dist/server/api-utils'
import { useRouter } from 'next/router'
import { AlertStore } from 'stores/AlertStore'
import { Dialog, DialogContent, DialogTitle, Grid, Typography } from '@mui/material'
import EmailIcon from '@mui/icons-material/Email'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import { styled } from '@mui/material/styles'
import CloseModalButton from 'components/common/CloseModalButton'
import GenericForm from 'components/common/form/GenericForm'
import SubmitButton from 'components/common/form/SubmitButton'
import EmailField from 'components/common/form/EmailField'
import { email } from 'common/form/validation'
import { AcceptNewsLetterField } from 'components/common/form/AcceptNewsletterField'
import { routes } from 'common/routes'

import { useSendConfirmationEmail } from 'service/notification'
import { SendConfirmationEmailResponse, SendConfirmationEmailInput } from 'gql/notification'
import theme from 'common/theme'

const PREFIX = 'GeneralSubscribeModal'

const classes = {
  subscribeBtn: `${PREFIX}-subscribe`,
}

const StyledGrid = styled(Grid)(({ theme }) => ({
  [`& .${classes.subscribeBtn}`]: {
    fontSize: theme.typography.pxToRem(16),
    background: `${theme.palette.primary}`,

    '&:hover': {
      background: theme.palette.primary.main,
    },
    '& svg': {
      color: '#ab2f26',
    },
  },
}))

interface ModalProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export type SubscribeToNotificationsInput = {
  email: string
  consent: boolean
}

const validationSchema: yup.SchemaOf<SubscribeToNotificationsInput> = yup
  .object()
  .defined()
  .shape({
    email: email.required(),
    consent: yup.bool().required().oneOf([true], 'validation:newsletter'),
  })

export default function RenderSubscribeModal({ setOpen }: ModalProps) {
  const { t } = useTranslation()
  const { status, data } = useSession()

  const [loading, setLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isGuest, setIsGuest] = useState(false)
  const [email, setEmail] = useState('')
  const router = useRouter()

  const handleError = (e: AxiosError<ApiError>) => {
    const error = e.response?.data?.message
    AlertStore.show(error ? error : t('common:alerts.error'), 'error')
  }

  const mutation = useMutation<
    AxiosResponse<SendConfirmationEmailResponse>,
    AxiosError<ApiError>,
    SendConfirmationEmailInput
  >({
    mutationFn: useSendConfirmationEmail(),
    onError: (error) => handleError(error),
    onSuccess: () => {
      AlertStore.show(t('common:alerts.message-sent'), 'success')

      setIsSuccess(true)
    },
  })

  const handleClose = () => {
    setOpen(false)
  }

  async function onSubmit(values: { email: string }) {
    setLoading(true)
    setEmail(values.email)
    try {
      await mutation.mutateAsync(values)
    } finally {
      setLoading(false)
    }
  }

  const SubscribeForm = () => {
    return (
      <GenericForm
        onSubmit={onSubmit}
        initialValues={{ email: '', consent: false }}
        validationSchema={validationSchema}>
        <StyledGrid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="subtitle2">
              {t('common:notifications.subscribe-subtitle')}
            </Typography>
          </Grid>
          <Grid item xs={12} textAlign="center">
            <EmailField
              label={t('auth:fields.email-descriptive')}
              name="email"
              sx={{ width: '70%' }}
            />
          </Grid>
          <Grid item xs={12}>
            <AcceptNewsLetterField name="consent" />
          </Grid>
          <Grid item xs={12} textAlign="center">
            <SubmitButton
              sx={{ width: '40%' }}
              className={classes.subscribeBtn}
              label="common:notifications.cta.subscribe-button"
              loading={loading}
            />
          </Grid>
        </StyledGrid>
      </GenericForm>
    )
  }

  const openAsGuest = () => {
    setIsGuest(true)
  }

  const sendOnProfileEmail = (status: string) => {
    const userData = data?.user
    if (status !== 'authenticated') {
      router.push(routes.login)
    } else {
      onSubmit({ email: userData?.email || '' })
      handleClose()
    }
  }

  if (!isGuest) {
    return (
      <Dialog open onClose={handleClose} sx={{ scroll: 'none' }} fullWidth={true} maxWidth={'sm'}>
        <DialogContent
          style={{
            overflow: 'hidden',
            padding: '3rem',
            paddingTop: '1rem',
            width: '100%',
            display: 'grid',
            justifyItems: 'center',
          }}>
          <CloseModalButton onClose={handleClose} />
          <React.Fragment>
            <EmailIcon color="primary" sx={{ fontSize: theme.typography.pxToRem(64) }} />
            <DialogTitle style={{ textAlign: 'center', width: '100%' }}>
              {t('common:notifications.subscribe-title')}
            </DialogTitle>
            <Grid container direction="column" component="section">
              <StyledGrid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" textAlign="center">
                    {status !== 'authenticated'
                      ? t('common:notifications.subscribe-text-nonLoggedUser-general')
                      : t('common:notifications.subscribe-text-loggedUser')}
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-evenly',
                    flexFlow: 'column',
                    gap: theme.spacing(2),
                    alignItems: 'center',

                    [theme.breakpoints.up('sm')]: {
                      flexFlow: 'row',
                    },
                  }}>
                  <SubmitButton
                    type="button"
                    sx={{ minWidth: theme.spacing(25) }}
                    className={classes.subscribeBtn}
                    label={
                      status !== 'authenticated'
                        ? 'common:notifications.cta.login'
                        : 'common:notifications.cta.profile-button'
                    }
                    loading={loading}
                    onClick={() => sendOnProfileEmail(status)}
                  />
                  <SubmitButton
                    type="button"
                    sx={{ minWidth: theme.spacing(25) }}
                    variant="outlined"
                    className={classes.subscribeBtn}
                    label={
                      status !== 'authenticated'
                        ? 'common:notifications.cta.guest'
                        : 'common:notifications.cta.another-button'
                    }
                    loading={loading}
                    onClick={() => openAsGuest()}
                  />
                </Grid>
              </StyledGrid>
            </Grid>
          </React.Fragment>
        </DialogContent>
      </Dialog>
    )
  } else {
    return (
      <Dialog open onClose={handleClose} sx={{ scroll: 'none' }} fullWidth={true} maxWidth={'sm'}>
        <DialogContent
          style={{
            overflow: 'hidden',
            padding: '3rem',
            paddingTop: '1rem',
            width: '100%',
            display: 'grid',
            justifyItems: 'center',
          }}>
          <CloseModalButton onClose={handleClose} />
          {!isSuccess ? (
            <React.Fragment>
              <EmailIcon color="primary" sx={{ fontSize: theme.typography.pxToRem(64) }} />
              <DialogTitle style={{ textAlign: 'center', width: '100%' }}>
                {t('common:notifications.subscribe-title')}
              </DialogTitle>
              <Grid container direction="column" component="section" sx={{ textAlign: 'center' }}>
                <SubscribeForm />
              </Grid>
            </React.Fragment>
          ) : (
            <DialogContent
              style={{ textAlign: 'center', fontSize: 20, fontWeight: 600, paddingBottom: 6 }}>
              <CloseModalButton onClose={handleClose} />
              <React.Fragment>
                <ThumbUpIcon sx={{ fontSize: theme.typography.pxToRem(64), color: '#03C03C' }} />
                <DialogTitle>
                  <Typography
                    variant="h5"
                    style={{ textAlign: 'center', width: '100%', color: '#03C03C' }}>
                    {t('common:notifications.confirm-subscribe')}
                  </Typography>
                </DialogTitle>
                <Typography>
                  <Trans
                    t={t}
                    i18nKey="common:notifications.confirm-sent"
                    values={{ email: email }}
                  />
                </Typography>
              </React.Fragment>
            </DialogContent>
          )}
        </DialogContent>
      </Dialog>
    )
  }
}
