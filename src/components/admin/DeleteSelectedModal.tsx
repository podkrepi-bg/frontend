import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Button } from '@mui/material'

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
  deleteHandler,
}: {
  isOpen: boolean
  handleDeleteModalClose: any
  deleteHandler: any
}) {
  return (
    <Modal
      open={isOpen}
      onClose={handleDeleteModalClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Delete?
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <Button variant="contained" onClick={deleteHandler}>
            Yes
          </Button>
          <Button variant="contained" onClick={handleDeleteModalClose}>
            No
          </Button>
        </Typography>
      </Box>
    </Modal>
  )
}

export default DeleteSelectedModal
