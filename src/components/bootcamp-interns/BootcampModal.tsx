import { DialogTitle, Modal } from '@mui/material'
import { Dialog } from '@mui/material'
import { Box } from '@mui/material'

export default function BootcampModal(props: any) {
  const { firstName, lastName, email, open, setOpen } = props.modalProps
  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Details</DialogTitle>
        <Box>{firstName}</Box>
        <Box>{lastName}</Box>
        <Box>{email}</Box>
      </Dialog>
    </Modal>
  )
}
