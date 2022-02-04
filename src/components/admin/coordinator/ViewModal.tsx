import { Box, Modal, Typography } from '@mui/material'
import { CoordinatorResponse } from 'gql/coordinator'

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
}

function ViewModal({
  open,
  handleClose,
  data,
}: {
  open: boolean
  handleClose: any
  data: CoordinatorResponse
}) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {data?.person.firstName} {data?.person.lastName}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {data?.person.company}
        </Typography>
      </Box>
    </Modal>
  )
}

export default ViewModal
