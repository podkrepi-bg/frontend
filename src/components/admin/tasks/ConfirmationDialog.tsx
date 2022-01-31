import DialogContentText from '@mui/material/DialogContentText'
import CircularProgress from '@mui/material/CircularProgress'
import { useMutation, useQueryClient } from 'react-query'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogTitle from '@mui/material/DialogTitle'
import { ModalContext } from 'context/ModalContext'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import { useContext } from 'react'
import * as React from 'react'
import axios from 'axios'
interface Props {
  handleClose: () => void
  open: boolean
  id: string
  multipleDeleteItems: never[]
}
export default function AlertDialog({ handleClose, open, id, multipleDeleteItems }: Props) {
  const { setNotificationsOpen, setNotificationMessage }: any = useContext(ModalContext)

  const deleteMultipleRecords = async () => {
    const res = await axios.post('http://localhost:5010/api/car/deletemany', multipleDeleteItems)
    if (res.status === 201) {
      queryClient.invalidateQueries('cars')
      handleClose()
      setNotificationsOpen(true)
      setNotificationMessage('Избраните бяха изтрити')
    }
  }

  const deleteCar = async (id: string) => {
    return await axios.delete(`http://localhost:5010/api/car/${id}`)
  }
  const queryClient = useQueryClient()
  const { mutate, isLoading } = useMutation(deleteCar, {
    onSuccess: () => {
      queryClient.invalidateQueries('cars')
      handleClose()
      setNotificationsOpen(true)
      setNotificationMessage('Колата беше изтрита')
    },
    onError: () => {
      handleClose()
      setNotificationsOpen(true)
      setNotificationMessage('Нещо се обърка')
    },
  })
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">Потвърждение</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {multipleDeleteItems.length > 0
              ? `Наистина ки искате да изтриете ${multipleDeleteItems.length} ${
                  multipleDeleteItems.length === 1 ? 'кола' : 'коли'
                } ?`
              : 'Наистина ли искате да изтриете тази кола?'}
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
              multipleDeleteItems.length > 0 ? deleteMultipleRecords() : mutate(id)
            }}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
