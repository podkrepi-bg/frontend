/* eslint-disable @typescript-eslint/no-explicit-any */
import Modal from '@mui/material/Modal'
import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material'

function DeleteSelectedModal({
  isOpen,
  handleDeleteModalClose,
  handleDelete,
}: {
  isOpen: boolean
  handleDeleteModalClose: any
  handleDelete: any
}) {
  return (
    <Modal open={isOpen} onClose={handleDeleteModalClose}>
      <Dialog open={isOpen} onClose={handleDeleteModalClose}>
        <DialogTitle>Are you sure you want to delete selected items?</DialogTitle>
        <DialogActions>
          <Button onClick={handleDelete} autoFocus>
            Yes
          </Button>
          <Button onClick={handleDeleteModalClose}>No</Button>
        </DialogActions>
      </Dialog>
    </Modal>
  )
}

export default DeleteSelectedModal
