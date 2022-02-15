import { Modal, Box, Typography, Button } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'

const useStyles = makeStyles(() => {
  return {
    modal: {
      position: 'absolute',
      top: '30%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      backgroundColor: '#fff',
      border: '2px solid #000',
      padding: 16,
      textAlign: 'center',
    },
  }
})

type Props = {
  open: boolean
  closeModal: () => void
  confirmHandler: () => void
}

export default function DeleteModal({ open, closeModal, confirmHandler }: Props) {
  const classes = useStyles()

  return (
    <Modal open={open} onClose={closeModal}>
      <Box className={classes.modal}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Are you sure you want to delete this Bootcamper/s?
        </Typography>

        <Button
          variant="contained"
          color="error"
          size="small"
          sx={{ m: 1 }}
          onClick={confirmHandler}>
          Delete
        </Button>
        <Button variant="contained" size="small" sx={{ m: 1 }} onClick={closeModal}>
          Cancel
        </Button>
      </Box>
    </Modal>
  )
}
