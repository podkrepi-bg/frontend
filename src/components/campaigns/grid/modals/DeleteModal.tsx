import React from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { AxiosError, AxiosResponse } from 'axios'
import { Dialog, Card, CardContent, Box, Button, Typography, DialogTitle } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { ApiErrors } from 'service/apiErrors'
import { endpoints } from 'service/apiEndpoints'
import { useDeleteCampaignById } from 'service/campaign'
import { AlertStore } from 'stores/AlertStore'
import { useRouter } from 'next/router'
import { routes } from 'common/routes'

type Props = {
  id: string
  onDelete: () => void
  onClose: () => void
}

export default function DeleteModal({ id, onClose, onDelete }: Props) {
  const queryClient = useQueryClient()
  const router = useRouter()
  const { t } = useTranslation()

  const mutationFn = useDeleteCampaignById(id)

  const deleteMutation = useMutation<AxiosResponse<null>, AxiosError<ApiErrors>, string>({
    mutationFn,
    onError: () => AlertStore.show(t('campaigns:alerts:error'), 'error'),
    onSuccess: () => {
      AlertStore.show(t('Кампанията беше преместена в кошчето.'), 'warning')
      queryClient.removeQueries(endpoints.campaign.viewCampaignById(id).url)
      onDelete()
      router.push(routes.admin.campaigns.index)
    },
  })

  function deleteHandler() {
    deleteMutation.mutate(id)
  }

  return (
    <Dialog open onClose={onClose} sx={{ top: '-35%' }}>
      <DialogTitle>{t('campaigns:deleteTitle')}</DialogTitle>
      <Card>
        <CardContent>
          <Typography variant="body1" sx={{ marginBottom: '16px', textAlign: 'center' }}>
            {t('campaigns:deleteContent')}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button color="error" onClick={deleteHandler}>
              {t('campaigns:cta:delete')}
            </Button>
            <Button onClick={onClose}>{t('campaigns:cta:cancel')}</Button>
          </Box>
        </CardContent>
      </Card>
    </Dialog>
  )
}
