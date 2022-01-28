import { Modal, Box, Typography, ButtonGroup, Button } from '@mui/material'
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
    deleteBtn: {
      ':hover': {
        backgroundColor: '#bf0000',
      },
    },
  }
})

type Props = {
  open: boolean
  closeModal: () => void
  confirmHandler: () => void
}

export default function ConfirmModal({ open, closeModal, confirmHandler }: Props) {
  const classes = useStyles()
  return (
    <Modal open={open} onClose={closeModal}>
      <Box className={classes.modal}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Are you sure?
        </Typography>
        <ButtonGroup sx={{ marginTop: 1 }}>
          <Button variant="contained" size="small" onClick={confirmHandler}>
            Confirm
          </Button>
          <Button
            variant="contained"
            size="small"
            color="error"
            className={classes.deleteBtn}
            onClick={closeModal}>
            Cancel
          </Button>
        </ButtonGroup>
      </Box>
    </Modal>
  )
}
