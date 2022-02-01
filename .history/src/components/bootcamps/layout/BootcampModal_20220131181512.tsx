import { Button, DialogActions, DialogContent, DialogContentText, DialogTitle, Modal } from '@mui/material'
import { Dialog } from '@mui/material'
import { Box } from '@mui/material'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(() => {
  return {
    modal: {
      width: '400px',
      height: '200px',
    },
    field: {
      fontSize: '23px',
      textAlign: 'center',
      padding: '8px',
    },
    title: {
      fontSize: '32px',
      textAlign: 'center',
    },
    dialog: {
      color: 'orange',
    },
    // modal: {
    //   position: 'fixed',
    //   background: 'lightblue',
    //   width: '50%',
    //   height: '50%',
    //   top: '5%',
    //   left: '50%',
    //   right: 'auto',
    //   bottom: 'auto',
    // },
  }
})

export default function BootcampModal(props: any) {
  const styles = useStyles()
  const { firstName, lastName, open, setOpen } = props.modalProps
  return (
    <Modal open={open} onClose={() => setOpen(false)} className={styles.modal}>
      {/* <Dialog open={open} className={styles.modal} onClose={() => setOpen(false)}>
        <DialogTitle className={styles.title}>Info</DialogTitle>
        <Box className={styles.field}>{firstName}</Box>
        <Box className={styles.field}>{lastName}</Box>
        <Button sx={{ mb: 5 }} variant="contained" onClick={() => setOpen(false)}>
          Close
        </Button>
      </Dialog> */}
      <Dialog sx={50} open={open} onClose={() => setOpen(false)} aria-labelledby="draggable-dialog-title">
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
