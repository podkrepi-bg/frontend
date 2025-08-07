import { Dialog, DialogContent, Grid2, DialogTitle } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'
import CloseModalButton from 'components/common/CloseModalButton'
import {
  SubscribeEmailResponse,
  SubscribeEmailInput,
  UNsubscribeEmailInput,
  UNsubscribeEmailResponse,
} from 'gql/notification'
import { ApiError } from 'next/dist/server/api-utils'
import React from 'react'
import { useState } from 'react'
import { useTranslation } from 'next-i18next'
import { useSubscribeEmail, useUNsubscribeEmail } from 'service/notification'
import { AlertStore } from 'stores/AlertStore'
import { styled } from '@mui/material/styles'
import GenericForm from 'components/common/form/GenericForm'
import SubmitButton from 'components/common/form/SubmitButton'
import { useQueryClient } from '@tanstack/react-query'
import { endpoints } from 'service/apiEndpoints'

const PREFIX = 'ProfileNotificationsModal'

const classes = {
  actionBtn: `${PREFIX}-subscriptions`,
}

const StyledGrid = styled(Grid2)(({ theme }) => ({
  [`& .${classes.actionBtn}`]: {
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
  type: 'subscribe' | 'unsubscribe'
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function RenderNotificationsConfirmModal({ type, setOpen }: ModalProps) {
  const { t } = useTranslation()

  const [loading, setLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  // Get QueryClient from the context
  const queryClient = useQueryClient()

  const handleError = (e: AxiosError<ApiError>) => {
    const error = e.response?.data?.message
    AlertStore.show(error ? error : t('common:alerts.error'), 'error')
  }

  const subscribeMutation = useMutation<
    AxiosResponse<SubscribeEmailResponse>,
    AxiosError<ApiError>,
    SubscribeEmailInput
  >({
    mutationFn: useSubscribeEmail(),
    onError: (error) => handleError(error),
    onSuccess: () => {
      AlertStore.show(t('common:alerts.message-sent'), 'success')
      //   Update data
      queryClient.invalidateQueries({ queryKey: [endpoints.account.me.url] })
      setIsSuccess(true)
    },
  })
  const unSubscribeMutation = useMutation<
    AxiosResponse<UNsubscribeEmailResponse>,
    AxiosError<ApiError>,
    UNsubscribeEmailInput
  >({
    mutationFn: useUNsubscribeEmail(),
    onError: (error) => handleError(error),
    onSuccess: () => {
      AlertStore.show(t('common:alerts.message-sent'), 'success')
      //   Update data
      queryClient.invalidateQueries({ queryKey: [endpoints.account.me.url] })
      setIsSuccess(true)
    },
  })

  const handleClose = () => {
    setOpen(false)
  }

  async function onSubmit() {
    setLoading(true)
    try {
      if (type === 'subscribe') {
        await subscribeMutation.mutateAsync({ consent: true })
      } else {
        await unSubscribeMutation.mutateAsync({})
      }
    } finally {
      setLoading(false)
    }
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
        <Grid2 style={{ display: 'flex', justifyContent: 'end', marginRight: '-4rem' }}>
          <CloseModalButton onClose={handleClose} />
        </Grid2>
        {!isSuccess ? (
          <React.Fragment>
            <DialogTitle style={{ textAlign: 'center', width: '100%' }}>
              {type === 'subscribe'
                ? t('profile:myNotifications.modal.title-subscribe')
                : t('profile:myNotifications.modal.title-unsubscribe')}
            </DialogTitle>
            <Grid2 container direction="column" component="section">
              <GenericForm onSubmit={onSubmit} initialValues={{}}>
                <StyledGrid container spacing={2}>
                  <Grid2 size={12}>
                    <SubmitButton
                      fullWidth
                      className={classes.actionBtn}
                      label="profile:myNotifications.modal.cta"
                      loading={loading}
                    />
                  </Grid2>
                </StyledGrid>
              </GenericForm>
            </Grid2>
          </React.Fragment>
        ) : (
          <DialogContent
            style={{ textAlign: 'center', fontSize: 20, fontWeight: 600, paddingBottom: 6 }}>
            {type === 'subscribe'
              ? t('profile:myNotifications.modal.unsubscribe-msg')
              : t('profile:myNotifications.modal.subscribe-msg')}
          </DialogContent>
        )}
      </DialogContent>
    </Dialog>
  );
}
