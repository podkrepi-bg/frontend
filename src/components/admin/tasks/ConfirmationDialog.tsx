import {
  DialogContentText,
  DialogContent,
  DialogActions,
  DialogTitle,
  CircularProgress,
} from '@mui/material'
import { UseMutateFunction, useQueryClient } from 'react-query'
import { ModalContext } from 'context/ModalContext'
import { useMutateCars } from 'common/hooks/cars'
import { endpoints } from 'common/api-endpoints'
import { Dialog, Button, Box } from '@mui/material'
import { useContext } from 'react'
import { axios } from 'common/api-client'
import { GridRowId } from '@mui/x-data-grid'
interface Props {
  handleClose: () => void
  open: boolean
  id: GridRowId
  multipleDeleteItems: GridRowId[]
}
export default function AlertDialog({ handleClose, open, id, multipleDeleteItems }: Props) {
  const { setNotificationsOpen, setNotificationMessage }: any = useContext(ModalContext)
  const queryClient = useQueryClient()

  const deleteMultipleRecords = async (items: GridRowId[]) => {
    return await axios.post(endpoints.cars.deleteManyCars.url, items)
  }
  const deleteCar = async (id: string) => {
    return await axios.delete(endpoints.cars.deleteCar(id).url)
  }
  // deleteSelected - removes array with items
  const { mutate: deleteSelected }: { mutate: UseMutateFunction<any, any, any, any> } =
    useMutateCars(
      deleteMultipleRecords,
      queryClient,
      setNotificationsOpen,
      setNotificationMessage,
      handleClose,
    )
  // deleteSingle - removes 1 item
  const {
    mutate: deleteSingle,
    isLoading,
  }: { mutate: UseMutateFunction<any, any, any, any>; isLoading: boolean } = useMutateCars(
    deleteCar,
    queryClient,
    setNotificationsOpen,
    setNotificationMessage,
    handleClose,
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
