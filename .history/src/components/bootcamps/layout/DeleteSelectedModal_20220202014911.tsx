import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material'

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
}

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
        <DialogTitle>You are about to delete all selected items?</DialogTitle>
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
