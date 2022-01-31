import { Box, Modal, Typography } from '@mui/material'
import React from 'react'
import fetch from 'node-fetch'

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'auto',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

export default function DetailsModal({ detailsOpen, setDetailsOpen, details }) {
  return (
    <Modal open={detailsOpen} onClose={() => setDetailsOpen(false)}>
      <Box sx={modalStyle}>
        <Typography sx={{ mb: 2, fontSize: 24 }}>Brand: {details.brand}</Typography>
        <Typography sx={{ mb: 2, fontSize: 24 }}>Model: {details.model}</Typography>
        <Typography sx={{ mb: 2, fontSize: 24 }}>Year: {details.year}</Typography>
        <Typography sx={{ mb: 2, fontSize: 24 }}>City: {details.city}</Typography>
        <Typography sx={{ mb: 2, fontSize: 24 }}>Country: {details.country}</Typography>
      </Box>
    </Modal>
  )
}
