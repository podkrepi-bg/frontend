import React, { useState } from 'react'
import * as yup from 'yup'
import { useTranslation } from 'next-i18next'
import { Trans } from 'react-i18next'
import { useMutation } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'
import { ApiError } from 'next/dist/server/api-utils'
import { AlertStore } from 'stores/AlertStore'
import GenericForm from 'components/common/form/GenericForm'
import SubmitButton from 'components/common/form/SubmitButton'
import EmailField from 'components/common/form/EmailField'
import CloseModalButton from 'components/common/CloseModalButton'
import { email } from 'common/form/validation'
import { Heading } from '../../IndexPage.styled'
import { InfoText, SubscribeGrid } from './SubscriptionSection.styled'
import { Dialog, DialogContent, DialogTitle, Grid, Typography } from '@mui/material'
import ArrowForwardSharp from '@mui/icons-material/ArrowForwardSharp'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import { useSendConfirmationEmail } from 'service/notification'
import { SendConfirmationEmailResponse, SendConfirmationEmailInput } from 'gql/notification'

export type SubscribeToNotificationsInput = {
  email: string
}

const validationSchema: yup.SchemaOf<SubscribeToNotificationsInput> = yup.object().defined().shape({
  email: email.required(),
})

const SubscriptionSection = () => {
  const { t } = useTranslation()
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState('')

  async function onSubmit(values: { email: string }) {
    setLoading(true)
    setEmail(values.email)
    try {
      await mutation.mutateAsync(values)
      setOpen(true)
    } finally {
      setLoading(false)
    }
  }

  const onClose = () => {
    setOpen(false)
  }

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
    },
  })

  return (
    <>
      <Heading variant="h4">{t('index:subscription-section.heading')}</Heading>
      <InfoText maxWidth="lg">{t('index:subscription-section.content')}</InfoText>
      <GenericForm
        onSubmit={onSubmit}
        initialValues={{ email: '', consent: true }}
        validationSchema={validationSchema}>
        <SubscribeGrid container spacing={{ xs: 2 }}>
          <Grid
            item
            xs={12}
            sm={6}
            sx={(theme) => ({
              textAlign: 'end',
              [theme.breakpoints.down(768)]: { textAlign: 'center' },
            })}>
            <EmailField
              label={t('auth:fields.email')}
              name="email"
              sx={{ width: '70%', lineHeight: '2' }}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            sx={(theme) => ({
              textAlign: 'center',
              [theme.breakpoints.up('md')]: {
                textAlign: 'start',
              },
            })}>
            <SubmitButton
              sx={(theme) => ({
                width: '50%',
                backgroundColor: theme.palette.primary.light,
                boxShadow:
                  '0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px rgba(0, 0, 0, 0.14), 0px 1px 5px rgba(0, 0, 0, 0.12)',
              })}
              label="campaigns:subscribe.subscribe-button"
              loading={loading}
              endIcon={<ArrowForwardSharp />}
            />
          </Grid>
        </SubscribeGrid>
      </GenericForm>
      {open && (
        <Dialog
          open={open}
          onClose={onClose}
          sx={{ scroll: 'none' }}
          fullWidth={true}
          maxWidth={'sm'}>
          <DialogContent style={{ textAlign: 'center', fontSize: 20, fontWeight: 600 }}>
            <CloseModalButton onClose={onClose} />
            <>
              <ThumbUpIcon sx={{ fontSize: '64px', color: '#03C03C' }} />
              <DialogTitle>
                <Typography
                  variant="h5"
                  style={{ textAlign: 'center', width: '100%', color: '#03C03C' }}>
                  {t('campaigns:subscribe.confirm-subscribe')}
                </Typography>
              </DialogTitle>
              <Typography>
                <Trans
                  t={t}
                  i18nKey="campaigns:subscribe.confirm-sent"
                  values={{ email: email }}></Trans>
              </Typography>
            </>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}

export default SubscriptionSection
