import { Button, DialogActions, DialogContent, DialogContentText, DialogTitle, Modal } from '@mui/material'
import { Dialog } from '@mui/material'
import { Box } from '@mui/material'
import { makeStyles } from '@mui/styles'



export default function BootcampModal(props: any) {
  const { firstName, lastName, open, setOpen } = props.modalProps
  return (
    <Modal open={open} onClose={() => setOpen(false)} >
      {/* <Dialog open={open} className={styles.modal} onClose={() => setOpen(false)}>
        <DialogTitle className={styles.title}>Info</DialogTitle>
        <Box className={styles.field}>{firstName}</Box>
        <Box className={styles.field}>{lastName}</Box>
        <Button sx={{ mb: 5 }} variant="contained" onClick={() => setOpen(false)}>
          Close
        </Button>
      </Dialog> */}
      <Dialog open={open} onClose={() => setOpen(false)} aria-labelledby="draggable-dialog-title">
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          Bootcamp Details
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Box>First Name:{firstName}</Box>
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
