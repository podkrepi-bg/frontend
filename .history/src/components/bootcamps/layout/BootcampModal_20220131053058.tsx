import { Button, DialogTitle, Modal } from '@mui/material'
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
      borderBottom: '1px solid black',
    },
    dialog: {
      width: '100%',
    },
  }
})

export default function BootcampModal(props: any) {
  const classes = useStyles()
  const { firstName, lastName, open, setOpen } = props.modalProps
  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Dialog open={open} className={classes.dialog} onClose={() => setOpen(false)}>
        <DialogTitle className={classes.title}>Details</DialogTitle>
        <Box className={classes.field}>{firstName}</Box>
        <Box className={classes.field}>{lastName}</Box>
        <Button sx={{ mb: 5 }} variant="contained" onClick={() => setOpen(false)}>
          Close
        </Button>
      </Dialog>
    </Modal>
  )
}
