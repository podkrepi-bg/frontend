import { Box, Button, Modal, Typography } from '@mui/material'
import React from 'react'
import notify from 'components/cars/helpers/notify'

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

export default function DeleteModal({ id, open, setOpen, cars, setCars }: any) {
  function deleteHandler() {
    fetch(`http://localhost:5010/api/document/${id}`, {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(() => {
      setOpen(false)
      setCars([...cars.filter((car: any) => car.id !== id)])
      notify('Successfully deleted item!')
    })
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
