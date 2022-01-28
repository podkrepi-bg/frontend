import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import { useMutation, useQueryClient } from 'react-query'
import axios from 'axios'

export default function AlertDialog({ handleClose, open, id }: any) {
  const deleteCar = (id: any) => {
    return axios.delete(`http://localhost:5010/api/car/${id}`)
  }
  const queryClient = useQueryClient()
  const { mutate, isLoading } = useMutation(deleteCar, {
    onSuccess: (data: any) => {
      queryClient.invalidateQueries('cars', data)
      handleClose()
    },
  })
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{'Delete car'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete ... ?
          </DialogContentText>
        </DialogContent>
        <Box sx={{ display: isLoading ? 'flex' : 'none', justifyContent: 'center', width: '100%' }}>
          <CircularProgress size={20} />
        </Box>
        <DialogActions sx={{ p: 2 }}>
          <Button disabled={isLoading} onClick={handleClose}>
            Cancel
          </Button>
          <Button
            disabled={isLoading}
            onClick={() => {
              mutate(id)
            }}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
