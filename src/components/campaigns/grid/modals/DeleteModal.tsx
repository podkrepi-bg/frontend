import React, { Dispatch, SetStateAction } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { observer } from 'mobx-react'
import { AxiosError, AxiosResponse } from 'axios'
import { Dialog, Card, CardContent, Box, Button, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { ApiErrors } from 'service/apiErrors'
import { endpoints } from 'service/apiEndpoints'
import { useDeleteCampaignById } from 'service/campaign'
import { ModalStore } from 'stores/dashboard/ModalStore'
import { AlertStore } from 'stores/AlertStore'
import { useRouter } from 'next/router'
import { routes } from 'common/routes'
import { CampaignResponse } from 'gql/campaigns'

type Props = {
  id: string
  setSelectedId: Dispatch<SetStateAction<string>>
}

export default observer(function DeleteModal({ id, setSelectedId }: Props) {
  const queryClient = useQueryClient()
  const router = useRouter()
  const { isDeleteOpen, hideDelete } = ModalStore
  const { t } = useTranslation()

  const mutationFn = useDeleteCampaignById(id)

  const deleteMutation = useMutation<
    AxiosResponse<CampaignResponse>,
    AxiosError<ApiErrors>,
    string
  >({
    mutationFn,
    onError: () => AlertStore.show(t('campaigns:alerts:error'), 'error'),
    onSuccess: () => {
      hideDelete()
      AlertStore.show(t('Кампанията беше преместена в кошчето.'), 'warning')
      queryClient.removeQueries(endpoints.campaign.viewCampaignById(id).url)
      setSelectedId('')
      router.push(routes.admin.campaigns.index)
    },
  })

  function deleteHandler() {
    deleteMutation.mutate(id)
  }

  return (
    <Dialog open={isDeleteOpen} onClose={hideDelete} sx={{ top: '-35%' }}>
      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ marginBottom: '16px', textAlign: 'center' }}>
            {t('campaigns:deleteTitle')}
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: '16px', textAlign: 'center' }}>
            {t('campaigns:deleteContent')}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button color="error" onClick={deleteHandler}>
              {t('campaigns:cta:delete')}
            </Button>
            <Button onClick={hideDelete}>{t('campaigns:cta:cancel')}</Button>
          </Box>
        </CardContent>
      </Card>
    </Dialog>
  )
})
