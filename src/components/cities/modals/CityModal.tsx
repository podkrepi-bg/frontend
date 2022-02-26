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

export default function CityModal(props: any) {
  const { name, postalCode, open, setOpen } = props.modalProps
  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Dialog
        align="center"
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="draggable-dialog-title">
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          Детайли
        </DialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText>
            <Box fontSize={18}>Град:{name}</Box>
            <Box fontSize={18}>Пощенски код: {postalCode}</Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={() => setOpen(false)}>
            Затвори
          </Button>
        </DialogActions>
      </Dialog>
    </Modal>
  )
}
