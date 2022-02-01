import { Button, DialogTitle, Divider, Grid, List, ListItem, ListItem, Modal, Typography } from '@mui/material'
import { Dialog } from '@mui/material'
import { Box } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { textAlign } from '@mui/system'

const useStyles = makeStyles(() => {
  return {
    modal: {
      width: '400px',
      height: '200px',
    },
    field: {
      fontSize: '22px',
      textAlign: 'center',
      padding: '8px',
    },
    title: {
      fontSize: '32px',
      textAlign: 'center',
      borderBottom: '1px solid black',
    },
  }
})

export default function BootcampModal(props: any) {
  const classes = useStyles()
  const { firstName, lastName, open, setOpen } = props.modalProps
  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle className={classes.title}>Details</DialogTitle>
        <Box className={classes.field}>{firstName}</Box>
        <Box className={classes.field}>{lastName}</Box>
        <Grid item xs={12}>
          <List>
            <ListItem>
              <Typography> Info</Typography>
            </ListItem>
            <Divider></Divider>
            <ListItem>
              <Typography>Name: {firstName}</Typography>
            </ListItem>
            <ListItem>
              <Typography>Email: {lastName}</Typography>
            </ListItem>
          </List>
        </Grid>
        <Button sx={{ mb: 5 }} variant="contained" onClick={() => setOpen(false)}>
          Close
        </Button>
      </Dialog>
    </Modal>
  )
}
