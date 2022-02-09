import React, { Dispatch, SetStateAction } from 'react'
import { MutationFunction, useMutation, useQueryClient } from 'react-query'
import { AxiosError, AxiosResponse } from 'axios'
import { Box, Button, Modal, Typography, CSSObject } from '@mui/material'

import { DocumentResponse } from 'gql/document'
import { ApiErrors } from 'common/api-errors'
import { endpoints } from 'common/api-endpoints'
import { axios } from 'common/api-client'

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
  id: string
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

export default function DeleteModal({ id, open, setOpen }: Props) {
  const queryClient = useQueryClient()

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
      setOpen(false)
      queryClient.invalidateQueries('/document')
    },
  })

  function deleteHandler() {
    deleteMutation.mutate(id)
  }

  return (
    <>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={modalStyle}>
          <Typography variant="h6">Are you sure you want to delete this item?</Typography>
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
