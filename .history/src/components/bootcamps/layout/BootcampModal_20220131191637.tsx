/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Modal,
} from '@mui/material'
import { Dialog } from '@mui/material'
import { Box } from '@mui/material'

export default function BootcampModal(props: any) {
  const { firstName, lastName, open, setOpen } = props.modalProps
  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Dialog open={open} onClose={() => setOpen(false)} aria-labelledby="draggable-dialog-title">
        <DialogTitle fontSize={45} style={{ cursor: 'move' }} id="draggable-dialog-title">
          Bootcamp Details
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Box fontSize={25}>First Name:{firstName}</Box>
            <Box>Last Name: {lastName}</Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={() => setOpen(false)}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Modal>
  )
}
