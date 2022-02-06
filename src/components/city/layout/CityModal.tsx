/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Modal,
} from '@mui/material'
import { Dialog } from '@mui/material'
import { Box } from '@mui/material'

export default function BootcampModal(props: any) {
  const { name, postalCode, open, setOpen } = props.modalProps
  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Dialog open={open} onClose={() => setOpen(false)} aria-labelledby="draggable-dialog-title">
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          Bootcamp Details
        </DialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText>
            <Box fontSize={18}>City Name:{name}</Box>
            <Box fontSize={18}>Postal Code: {postalCode}</Box>
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
