import React from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'
import { Dialog, Card, CardContent, Box, Button, Typography, DialogTitle } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { ApiErrors } from 'service/apiErrors'
import { endpoints } from 'service/apiEndpoints'
import { AlertStore } from 'stores/AlertStore'
import { useDeleteNewsArticleById } from 'common/hooks/campaign-news'

type Props = {
  id: string
  slug: string
  onDelete: () => void
  onClose: () => void
}

export default function DeleteModal({ id, slug, onClose, onDelete }: Props) {
  const queryClient = useQueryClient()
  const { t } = useTranslation()

  const mutationFn = useDeleteNewsArticleById(id)

  const deleteMutation = useMutation<AxiosResponse<null>, AxiosError<ApiErrors>, string>({
    mutationFn,
    onError: () => AlertStore.show(t('campaigns:alerts:error'), 'error'),
    onSuccess: () => {
      queryClient.invalidateQueries([endpoints.campaignNews.listAllNewsForCampaign(slug).url])
      onDelete()
      onClose()
      // router.push(routes.campaigns.news.newsAdminPanel(slug))
      AlertStore.show(t('news:article.actions.deleted-successfully'), 'success')
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
