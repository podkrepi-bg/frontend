import React, { Dispatch, SetStateAction } from 'react'
import { MutationFunction, useMutation, useQueryClient } from 'react-query'
import { AxiosError, AxiosResponse } from 'axios'
import { Dialog, Card, CardContent, Box, Button, Modal, Typography, CSSObject } from '@mui/material'

import { DocumentResponse } from 'gql/document'
import { ApiErrors } from 'service/apiErrors'
import { apiClient } from 'service/apiClient'
import { endpoints } from 'service/apiEndpoints'
import { ModalStore } from 'stores/ModalStore'
import { observer } from 'mobx-react'
import { AlertStore } from 'stores/AlertStore'

type Props = {
  id: string
}

export default observer(function DeleteModal({ id }: Props) {
  const queryClient = useQueryClient()
  const { isDeleteOpen, hideDelete } = ModalStore

  const deleteDocument: MutationFunction<AxiosResponse<DocumentResponse>, string> = async () => {
    return await apiClient.delete<DocumentResponse, AxiosResponse<DocumentResponse>>(
      endpoints.documents.deleteDocument(id).url,
    )
  }

  const deleteMutation = useMutation<
    AxiosResponse<DocumentResponse>,
    AxiosError<ApiErrors>,
    string
  >({
    mutationFn: deleteDocument,
    onError: () => AlertStore.show('An error has occured!', 'error'),
    onSuccess: () => {
      hideDelete()
      AlertStore.show('Document has been deleted successfully!', 'success')
      queryClient.invalidateQueries('/document')
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
            Are you sure?
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: '16px', textAlign: 'center' }}>
            This action will delete this item permanently!
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button color="error" onClick={deleteHandler}>
              Delete
            </Button>
            <Button onClick={hideDelete}>Cancel</Button>
          </Box>
        </CardContent>
      </Card>
    </Dialog>
  )
})
