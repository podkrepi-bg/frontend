import React, { Dispatch, SetStateAction } from 'react'
import { MutationFunction, useMutation, useQueryClient } from 'react-query'
import { AxiosError, AxiosResponse } from 'axios'
import { Box, Button, Modal, Typography, CSSObject } from '@mui/material'
import { GridSelectionModel } from '@mui/x-data-grid'

import { DocumentType } from 'gql/document'
import { ApiErrors } from 'common/api-errors'
import { axios } from 'common/api-client'
import { endpoints } from 'common/api-endpoints'

const modalStyle: CSSObject = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'auto',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  p: 4,
}

type Props = {
  selectionModel: GridSelectionModel
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

export default function DeleteAllModal({ selectionModel, open, setOpen }: Props) {
  const queryClient = useQueryClient()

  const deleteDocuments: MutationFunction<AxiosResponse<DocumentType>, GridSelectionModel> =
    async () => {
      return await axios.post<DocumentType, AxiosResponse<DocumentType>>(
        endpoints.documents.deleteDocuments.url,
        selectionModel,
      )
    }

  const deleteMutation = useMutation<
    AxiosResponse<DocumentType>,
    AxiosError<ApiErrors>,
    GridSelectionModel
  >({
    mutationFn: deleteDocuments,
    onSuccess: () => {
      setOpen(false)
      queryClient.invalidateQueries('/document')
    },
  })

  function deleteHandler() {
    deleteMutation.mutate(selectionModel)
  }

  return (
    <>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={modalStyle}>
          <Typography variant="h6">Are you sure you want to delete all selected items?</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button onClick={deleteHandler} sx={{ mx: 2, color: 'red' }}>
              Delete
            </Button>
            <Button onClick={() => setOpen(false)} sx={{ mx: 2 }}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  )
}
