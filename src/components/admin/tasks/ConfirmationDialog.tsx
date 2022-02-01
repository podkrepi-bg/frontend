import DialogContentText from '@mui/material/DialogContentText'
import CircularProgress from '@mui/material/CircularProgress'
import { useQueryClient } from 'react-query'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogTitle from '@mui/material/DialogTitle'
import { ModalContext } from 'context/ModalContext'
import { useDeleteCars } from 'common/hooks/cars'
import { endpoints } from 'common/api-endpoints'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import { useContext } from 'react'
import { axios } from 'common/api-client'
import * as React from 'react'
interface Props {
  handleClose: () => void
  open: boolean
  id: string
  multipleDeleteItems: any
}

export default function AlertDialog({ handleClose, open, id, multipleDeleteItems }: Props) {
  const { setNotificationsOpen, setNotificationMessage }: any = useContext(ModalContext)
  const queryClient = useQueryClient()

  const deleteMultipleRecords = async (items: any) => {
    return await axios.post(endpoints.cars.deleteManyCars.url, items)
  }

  const deleteCar = async (id: string) => {
    return await axios.delete(endpoints.cars.deleteCar(id).url)
  }

  const { mutate: deleteSelected }: any = useDeleteCars(
    deleteMultipleRecords,
    queryClient,
    handleClose,
    setNotificationsOpen,
    setNotificationMessage,
  )

  const { mutate: deleteSingle, isLoading }: any = useDeleteCars(
    deleteCar,
    queryClient,
    handleClose,
    setNotificationsOpen,
    setNotificationMessage,
  )

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
          <Button
            disabled={isLoading}
            onClick={() => {
              multipleDeleteItems.length > 0
                ? deleteSelected(multipleDeleteItems)
                : deleteSingle(id)
            }}>
            Изтрий
          </Button>
          <Button disabled={isLoading} onClick={handleClose}>
            Отказ
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
