import { Box, Modal, Typography } from '@mui/material'

function ViewModal({ open, data, onClose }: { open: boolean; data: any; onClose: any }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Info request
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {data?.message}
        </Typography>
      </Box>
    </Modal>
  )
}

export default ViewModal
