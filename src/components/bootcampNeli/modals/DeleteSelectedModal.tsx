import React from 'react'
import { observer } from 'mobx-react'
import { AxiosError, AxiosResponse } from 'axios'
import { useMutation, useQueryClient } from 'react-query'

import { useTranslation } from 'next-i18next'
import { GridSelectionModel } from '@mui/x-data-grid'
import { Dialog, Card, CardContent, Box, Button, Typography } from '@mui/material'

import { ApiErrors } from 'service/apiErrors'
import { endpoints } from 'service/apiEndpoints'
import { useDeleteManyBootcampNeli } from 'service/restRequests/bootcampNeli'

import { AlertStore } from 'stores/AlertStore'
import { ModalStore } from 'stores/bootcampNeli/ModalStore'

import { BootcampNeliResponse } from 'gql/bootcampNeli'

type Props = {
  selectionModel: GridSelectionModel
}

export default observer(function DeleteAllModal({ selectionModel }: Props) {
  const queryClient = useQueryClient()
  const { isDeleteAllOpen, hideDeleteAll } = ModalStore
  const { t } = useTranslation()

  const idsToDelete = selectionModel.map((x) => x.toString())

  const mutation = useMutation<
    AxiosResponse<BootcampNeliResponse>,
    AxiosError<ApiErrors>,
    GridSelectionModel
  >({
    mutationFn: useDeleteManyBootcampNeli(idsToDelete),
    onError: () => AlertStore.show(t('bootcampNeli:alerts:error'), 'error'),
    onSuccess: () => {
      hideDeleteAll()
      AlertStore.show(t('bootcampNeli:alerts:deleteAll'), 'success')
      queryClient.invalidateQueries(endpoints.bootcampNeli.listBootcampNeli.url)
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
            {t('bootcampNeli:deleteTitle')}
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: '16px', textAlign: 'center' }}>
            {t('bootcampNeli:deleteAllContent')}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button color="error" onClick={deleteHandler}>
              {t('bootcampNeli:cta:deleteSelected')}
            </Button>
            <Button onClick={hideDeleteAll}>{t('bootcampNeli:cta:cancel')}</Button>
          </Box>
        </CardContent>
      </Card>
    </Dialog>
  )
})
