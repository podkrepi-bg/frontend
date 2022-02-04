import { Box, Modal, Typography, Button } from '@mui/material'

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

function ViewModal({
  open,
  handleClose,
  deleteHandler,
}: {
  open: boolean
  handleClose: any
  deleteHandler: any
}) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
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
          <Button variant="contained" onClick={handleClose}>
            No
          </Button>
        </Typography>
      </Box>
    </Modal>
  )
}

export default ViewModal
