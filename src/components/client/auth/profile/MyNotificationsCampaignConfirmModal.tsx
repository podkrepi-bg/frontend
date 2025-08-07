import { useMutation } from '@tanstack/react-query'
import { useQueryClient } from '@tanstack/react-query'
import { endpoints } from 'service/apiEndpoints'
import { styled } from '@mui/material/styles'
import { Dialog, DialogContent, DialogTitle, Grid2 } from '@mui/material'
import { AxiosError, AxiosResponse } from 'axios'
import { UNsubscribeEmailResponse, UNsubscribeEmailInput } from 'gql/notification'
import { ApiError } from 'next/dist/server/api-utils'
import { useState } from 'react'
import { useTranslation } from 'next-i18next'
import { useUNsubscribeEmail } from 'service/notification'
import { AlertStore } from 'stores/AlertStore'
import CloseModalButton from 'components/common/CloseModalButton'
import GenericForm from 'components/common/form/GenericForm'
import SubmitButton from 'components/common/form/SubmitButton'
import React from 'react'

const PREFIX = 'ProfileCampaignNotificationsModal'

const classes = {
  actionBtn: `${PREFIX}-campaign-subscriptions`,
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
  campaignId: string
  setOpen: React.Dispatch<React.SetStateAction<string>>
}

export default function RenderCampaignNotificationsConfirmModal({
  campaignId,
  setOpen,
}: ModalProps) {
  const { t } = useTranslation()

  const [loading, setLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  // Get QueryClient from the context
  const queryClient = useQueryClient()

  const handleError = (e: AxiosError<ApiError>) => {
    const error = e.response?.data?.message
    AlertStore.show(error ? error : t('common:alerts.error'), 'error')
  }

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
      queryClient.invalidateQueries({
        queryKey: [endpoints.notifications.getCampaignNotificationSubscriptions.url],
      })
      setIsSuccess(true)
    },
  })

  const handleClose = () => {
    setOpen('')
  }

  async function onSubmit() {
    setLoading(true)
    try {
      await unSubscribeMutation.mutateAsync({ campaignId })
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
              {t('profile:myNotifications.modal.campaign-title-unsubscribe')}
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
            {t('profile:myNotifications.modal.campaign-unsubscribe-msg')}
          </DialogContent>
        )}
      </DialogContent>
    </Dialog>
  )
}
