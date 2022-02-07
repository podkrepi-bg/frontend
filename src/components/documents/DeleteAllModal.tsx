import { Box, Button, Modal, Typography } from '@mui/material'
import React, { Dispatch, SetStateAction, useState } from 'react'
import notify from 'components/cars/helpers/notify'
import { GridSelectionModel } from '@mui/x-data-grid'
import { DocumentType } from 'gql/document'
import { isFlowCancellationError } from 'mobx'

const modalStyle: any = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'auto',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

type Props = {
  selectionModel: GridSelectionModel
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  cars: DocumentType[] | undefined
  setCars: Dispatch<SetStateAction<DocumentType[] | undefined>>
}

export default function DeleteAllModal({ selectionModel, open, setOpen, cars, setCars }: Props) {
  function deleteHandler() {
    fetch('http://localhost:5010/api/document', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(selectionModel),
    }).then(() => {
      if (cars) {
        setCars([...cars.filter((car) => selectionModel.every((id) => car.id != id))])
      }
      setOpen(false)
      notify('Successfully deleted selected items!')
    })
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
