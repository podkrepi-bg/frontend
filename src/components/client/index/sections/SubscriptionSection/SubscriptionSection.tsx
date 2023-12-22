import React, { useState } from 'react'
import * as yup from 'yup'
import { useTranslation } from 'next-i18next'
import { useMutation } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'
import { ApiError } from 'next/dist/server/api-utils'
import { AlertStore } from 'stores/AlertStore'
import { email } from 'common/form/validation'
import { Heading } from '../../IndexPage.styled'
import { InfoText } from './SubscriptionSection.styled'
import { Grid } from '@mui/material'
import ArrowForwardSharp from '@mui/icons-material/ArrowForwardSharp'
import { useSendConfirmationEmail } from 'service/notification'
import { SendConfirmationEmailResponse, SendConfirmationEmailInput } from 'gql/notification'
import EmailIcon from '@mui/icons-material/Email'
import RenderSubscribeModal from 'components/client/notifications/GeneralSubscribeModal'
import { SectionGridWrapper, SubscribeButton, SubscribeHeading, Subtitle } from '../PlatformStatisticsSection/PlatformStatisticsSection.styled'

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
  const [subscribeIsOpen, setSubscribeOpen] = useState(false)

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
    <SectionGridWrapper sx={(theme) => ({
      marginBottom: theme.spacing(5),
    })}>
      <Grid
        sx={(theme) => ({
          margin: '0 auto',
          maxWidth: theme.spacing(95),
          textAlign: "center"
        })}>
        <Heading variant="h4">{t('index:subscription-section.heading')}</Heading>
        <InfoText maxWidth="lg">{t('index:subscription-section.content')}</InfoText>
        {subscribeIsOpen && <RenderSubscribeModal setOpen={setSubscribeOpen} />}
        <Grid item xs={12} display="flex" mb={0.5} justifyContent="center">
          <EmailIcon
            color="primary"
            fontSize="small"
            sx={{ mr: 0.5 }}
            onClick={() => setSubscribeOpen(true)}
            cursor="pointer"
          />
          <SubscribeHeading onClick={() => setSubscribeOpen(true)}>
            {t('campaigns:cta.subscribe-monthly-newsletter')}
          </SubscribeHeading>
        </Grid>
        <Subtitle>{t('campaigns:cta.subscribe-general-monthly-newsletter')}</Subtitle>
        <SubscribeButton
          onClick={() => setSubscribeOpen(true)}
          variant="contained"
          endIcon={<ArrowForwardSharp />}>
          {t('campaigns:cta.subscribe-general-newsletter-button')}
        </SubscribeButton>
      </Grid>
    </ SectionGridWrapper>
  )
}

export default SubscriptionSection
