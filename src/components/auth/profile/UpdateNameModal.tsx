import { Modal, Box, Input, Button } from '@mui/material'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles({
  modal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 650,
    backgroundColor: '#EEEEEE',
    padding: 20,
  },
})

function UpdateNameModal({
  isOpen,
  handleClose,
  currentValue,
}: {
  isOpen: boolean
  handleClose: () => void
  currentValue: { firstName: string; lastName: string }
}) {
  const classes = useStyles()

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
      <Box className={classes.modal}>
        <h2>Обнови име</h2>
        <Input value={currentValue.firstName} fullWidth />
        <Input value={currentValue.lastName} fullWidth />
        <Button>Запази</Button>
      </Box>
    </Modal>
  )
}

export default UpdateNameModal
