import React from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { observer } from 'mobx-react'
import { AxiosError, AxiosResponse } from 'axios'
import { Dialog, Card, CardContent, Box, Button, Typography } from '@mui/material'
import { GridSelectionModel } from '@mui/x-data-grid'
import { useTranslation } from 'next-i18next'

import { ApiErrors } from 'service/apiErrors'
import { endpoints } from 'service/apiEndpoints'
import { ModalStore } from 'stores/documents/ModalStore'
import { AlertStore } from 'stores/AlertStore'
import { DonationResponse } from 'gql/donations'
import { useDeleteDonation } from 'service/restRequests/donation'

type Props = {
  selectionModel: GridSelectionModel
}

export default observer(function DeleteAllModal({ selectionModel }: Props) {
  const queryClient = useQueryClient()
  const { isDeleteAllOpen, hideDeleteAll } = ModalStore
  const { t } = useTranslation()

  const idsToDelete = selectionModel.map((x) => x.toString())
  const mutationFn = useDeleteDonation(idsToDelete)

  const mutation = useMutation<
    AxiosResponse<DonationResponse>,
    AxiosError<ApiErrors>,
    GridSelectionModel
  >({
    mutationFn,
    onError: () => AlertStore.show(t('donations:alerts:error'), 'error'),
    onSuccess: () => {
      hideDeleteAll()
      AlertStore.show(t('donations:alerts:deleteAll'), 'success')
      queryClient.invalidateQueries(endpoints.donation.donationsList.url)
    },
  })

  function deleteHandler() {
    mutation.mutate(idsToDelete)
  }

  return (
    <Dialog open={isDeleteAllOpen} onClose={hideDeleteAll} sx={{ top: '-35%' }}>
      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ marginBottom: '16px', textAlign: 'center' }}>
            {t('donations:deleteTitle')}
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: '16px', textAlign: 'center' }}>
            {t('donations:deleteAllContent')}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button color="error" onClick={deleteHandler}>
              {t('donations:cta:delete')}
            </Button>
            <Button onClick={hideDeleteAll}>{t('donations:cta:cancel')}</Button>
          </Box>
        </CardContent>
      </Card>
    </Dialog>
  )
})
