import React from 'react'
import { MutationFunction, useMutation, useQueryClient } from 'react-query'
import { AxiosError, AxiosResponse } from 'axios'
import { Dialog, Card, CardContent, Box, Button, Modal, Typography, CSSObject } from '@mui/material'
import { GridSelectionModel } from '@mui/x-data-grid'

import { DocumentResponse } from 'gql/document'
import { ApiErrors } from 'service/apiErrors'
import { apiClient } from 'service/apiClient'
import { endpoints } from 'service/apiEndpoints'
import { ModalStore } from 'stores/documents/ModalStore'
import { observer } from 'mobx-react'
import { AlertStore } from 'stores/AlertStore'
import { useDeleteManyDocuments } from 'service/restRequests'

type Props = {
  selectionModel: GridSelectionModel
}

export default observer(function DeleteAllModal({ selectionModel }: Props) {
  const queryClient = useQueryClient()
  const { isDeleteAllOpen, hideDeleteAll } = ModalStore

  const idsToDelete = selectionModel.map((x) => x.toString())
  const mutationFn = useDeleteManyDocuments(idsToDelete)

  const mutation = useMutation<
    AxiosResponse<DocumentResponse>,
    AxiosError<ApiErrors>,
    GridSelectionModel
  >({
    mutationFn,
    onError: () => AlertStore.show('An error has occured!', 'error'),
    onSuccess: () => {
      hideDeleteAll()
      AlertStore.show('Documents have been deleted successfully!', 'success')
      queryClient.invalidateQueries('/document')
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
            Сигурни ли сте?
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: '16px', textAlign: 'center' }}>
            Това действие ще изтрие избраните елементи завинаги!
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button color="error" onClick={deleteHandler}>
              Изтрий
            </Button>
            <Button onClick={hideDeleteAll}>Отмяна</Button>
          </Box>
        </CardContent>
      </Card>
    </Dialog>
  )
})
