import * as yup from 'yup'
import { email } from 'common/form/validation'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { AxiosError, AxiosResponse } from 'axios'
import { ApiError } from 'next/dist/server/api-utils'
import { AlertStore } from 'stores/AlertStore'
import { useSubscribeToCampaign } from 'service/notification'
import { CampaignResponse, CampaignSubscribeInput, CampaignSubscribeResponse } from 'gql/campaigns'
import { useMutation } from '@tanstack/react-query'
import { Dialog, DialogContent, DialogTitle, Grid } from '@mui/material'
import CloseModalButton from 'components/common/CloseModalButton'
import GenericForm from 'components/common/form/GenericForm'
import { styled } from '@mui/material/styles'
import SubmitButton from 'components/common/form/SubmitButton'
import EmailField from 'components/common/form/EmailField'
import AcceptNewsLetterField from 'components/common/form/AcceptNewsletterField'
import { useSession } from 'next-auth/react'
import { getCurrentPerson } from 'common/util/useCurrentPerson'
import React from 'react'

const PREFIX = 'CampaignSubscribeModal'

const classes = {
  subscribeBtn: `${PREFIX}-subscribe`,
}

const StyledGrid = styled(Grid)(({ theme }) => ({
  [`& .${classes.subscribeBtn}`]: {
    fontSize: theme.typography.pxToRem(16),
    background: `${theme.palette.secondary.main}`,

    '&:hover': {
      background: theme.palette.primary.main,
    },
    '& svg': {
      color: '#ab2f26',
    },
  },
}))

interface ModalProps {
  campaign: CampaignResponse
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

export default function RenderCampaignSubscribeModal({ campaign, setOpen }: ModalProps) {
  const { t } = useTranslation()
  const { status } = useSession()

  const [loading, setLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleError = (e: AxiosError<ApiError>) => {
    const error = e.response?.data?.message
    AlertStore.show(error ? error : t('common:alerts.error'), 'error')
  }

  const mutation = useMutation<
    AxiosResponse<CampaignSubscribeResponse>,
    AxiosError<ApiError>,
    CampaignSubscribeInput
  >({
    mutationFn: useSubscribeToCampaign(campaign.id),
    onError: (error) => handleError(error),
    onSuccess: (response) => {
      AlertStore.show(t('common:alerts.message-sent'), 'success')

      setIsSuccess(true)
    },
  })

  const handleClose = () => {
    setOpen(false)
  }

  async function onSubmit(values: { email: string; consent: boolean }) {
    setLoading(true)
    try {
      await mutation.mutateAsync(values)
    } finally {
      setLoading(false)
    }
  }

  function AuthenticatedForm() {
    const { data: user } = getCurrentPerson()

    return (
      <GenericForm
        onSubmit={onSubmit}
        initialValues={{ email: user?.user?.email || '', consent: user?.user?.newsletter || false }}
        validationSchema={validationSchema}>
        <StyledGrid container spacing={2}>
          {/* Show consent checkbox if user has not provided it previously */}
          {!user?.user?.newsletter && (
            <Grid item xs={12}>
              <AcceptNewsLetterField name="consent" />
            </Grid>
          )}
          <Grid item xs={12}>
            <SubmitButton
              fullWidth
              className={classes.subscribeBtn}
              label="campaigns:cta.subscribe"
              loading={loading}
            />
          </Grid>
        </StyledGrid>
      </GenericForm>
    )
  }

  function NonAuthenticatedForm() {
    return (
      <GenericForm
        onSubmit={onSubmit}
        initialValues={{ email: '', consent: false }}
        validationSchema={validationSchema}>
        <StyledGrid container spacing={2}>
          <Grid item xs={12}>
            <EmailField label="auth:fields.email" name="email" />
          </Grid>
          <Grid item xs={12}>
            <AcceptNewsLetterField name="consent" />
          </Grid>
          <Grid item xs={12}>
            <SubmitButton
              fullWidth
              className={classes.subscribeBtn}
              label="campaigns:cta.subscribe"
              loading={loading}
            />
          </Grid>
        </StyledGrid>
      </GenericForm>
    )
  }

  return (
    <Dialog open onClose={handleClose} sx={{ scroll: 'none' }} fullWidth={true} maxWidth={'sm'}>
      <DialogContent
        style={{
          overflow: 'hidden',
          padding: '4rem',
          paddingTop: '1rem',
          width: '100%',
        }}>
        <Grid style={{ display: 'flex', justifyContent: 'end', marginRight: '-4rem' }}>
          <CloseModalButton onClose={handleClose} />
        </Grid>
        {!isSuccess ? (
          <React.Fragment>
            <DialogTitle style={{ textAlign: 'center', width: '100%' }}>
              {t('campaigns:subscribe.subscribe-campaign-title')}
            </DialogTitle>
            <Grid container direction="column" component="section">
              {status === 'authenticated' ? <AuthenticatedForm /> : <NonAuthenticatedForm />}
            </Grid>
          </React.Fragment>
        ) : (
          <DialogContent
            style={{ textAlign: 'center', fontSize: 20, fontWeight: 600, paddingBottom: 6 }}>
            {status === 'authenticated'
              ? t('campaigns:subscribe.confirm-subscribe')
              : t('campaigns:subscribe.confirm-sent')}
          </DialogContent>
        )}
      </DialogContent>
    </Dialog>
  )
}
