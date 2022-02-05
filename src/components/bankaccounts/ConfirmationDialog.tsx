import {
  DialogContentText,
  DialogContent,
  DialogActions,
  DialogTitle,
  CircularProgress,
} from '@mui/material'
import { useMutateBankAccounts, MutationResultParams } from 'common/hooks/cars'
import { NotificationStore } from 'stores/cars/NotificationsStore'
import { UseMutateFunction, useQueryClient } from 'react-query'
import { Dialog, Button, Box } from '@mui/material'
import { endpoints } from 'common/api-endpoints'
import { GridRowId } from '@mui/x-data-grid'
import { axios } from 'common/api-client'
import { observer } from 'mobx-react'

interface Props {
  handleClose: () => void
  open: boolean
  id: GridRowId
  multipleDeleteItems: GridRowId[]
}

export default observer(function ConfirmationDialog({
  handleClose,
  open,
  id,
  multipleDeleteItems,
}: Props) {
  const { setMessage, openNotifications } = NotificationStore
  const queryClient = useQueryClient()
  const deleteMultipleRecords = async (items: GridRowId[]) => {
    return await axios.post(endpoints.bankAccounts.deleteManyBankAccounts.url, items)
  }
  const deleteCar = async (id: string) => {
    return await axios.delete(endpoints.bankAccounts.deleteBankAccount(id).url)
  }
  // deleteSelected - removes array with items
  const { mutate: deleteSelected }: any = useMutateBankAccounts(
    deleteMultipleRecords,
    queryClient,
    openNotifications,
    setMessage,
    handleClose,
  )
  // deleteSingle - removes 1 item
  const { mutate: deleteSingle, isLoading }: any = useMutateBankAccounts(
    deleteCar,
    queryClient,
    openNotifications,
    setMessage,
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
                  multipleDeleteItems.length === 1 ? 'запис' : 'записа'
                } ?`
              : 'Наистина ли искате да изтриете този запис?'}
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
})
