import React, { Dispatch, SetStateAction } from 'react'
import { MutationFunction, useMutation, useQueryClient } from 'react-query'
import { AxiosError, AxiosResponse } from 'axios'
import { Box, Button, Modal, Typography, CSSObject } from '@mui/material'

import { DocumentResponse } from 'gql/document'
import { ApiErrors } from 'common/api-errors'
import { endpoints } from 'common/api-endpoints'
import { axios } from 'common/api-client'
import ConfirmationDialog from 'components/common/ConfirmationDialog'
import { ModalStore } from 'stores/ModalStore'
import { observer } from 'mobx-react'
import { DialogStore } from 'stores/DialogStore'

type Props = {
  id: string
}

export default observer(function DeleteModal({ id }: Props) {
  const queryClient = useQueryClient()
  const { isCfrmOpen, hideCfrm } = ModalStore
  const { clear } = DialogStore

  const deleteDocument: MutationFunction<AxiosResponse<DocumentResponse>, string> = async () => {
    return await axios.delete<DocumentResponse, AxiosResponse<DocumentResponse>>(
      endpoints.documents.deleteDocument(id).url,
    )
  }

  const deleteMutation = useMutation<
    AxiosResponse<DocumentResponse>,
    AxiosError<ApiErrors>,
    string
  >({
    mutationFn: deleteDocument,
    onSuccess: () => {
      clear()
      hideCfrm()
      queryClient.invalidateQueries('/document')
    },
  })

  function deleteHandler() {
    deleteMutation.mutate(id)
  }

  return (
    <ConfirmationDialog
      isOpen={isCfrmOpen}
      handleConfirm={deleteHandler}
      handleCancel={hideCfrm}
      title="Are you sure?"
      content="This item will be deleted permanently!"
      confirmButtonLabel="Delete"
      cancelButtonLabel="Cancel"
    />
  )
})
