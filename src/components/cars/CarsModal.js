import { Box, Button, Modal, TextField } from '@mui/material'
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

export default function CarsModal({ props }) {
  return (
    <Modal open={props.open} onClose={() => props.setOpen(false)}>
      <Box sx={modalStyle}>
        <Box sx={{ display: 'inline', mr: 4 }}>
          <TextField
            id="brand"
            label="Brand"
            size="small"
            defaultValue={props.brand}
            InputProps={{
              readOnly: true,
            }}
            sx={{ mb: 2 }}
          />
        </Box>
        <Box sx={{ display: 'inline', mr: 4 }}>
          <TextField
            id="model"
            label="Model"
            size="small"
            defaultValue={props.model}
            InputProps={{
              readOnly: true,
            }}
            sx={{ mb: 2 }}
          />
        </Box>
        <Box sx={{ display: 'inline', mr: 4 }}>
          <TextField
            id="year"
            label="Year"
            size="small"
            defaultValue={props.year}
            InputProps={{
              readOnly: true,
            }}
            sx={{ mb: 2 }}
          />
        </Box>
        <Box sx={{ display: 'inline', mr: 4 }}>
          <TextField
            id="city"
            label="City"
            size="small"
            defaultValue={props.city}
            InputProps={{
              readOnly: true,
            }}
            sx={{ mb: 2 }}
          />
        </Box>
        <Box sx={{ display: 'inline', mr: 4 }}>
          <TextField
            id="country"
            label="Country"
            size="small"
            defaultValue={props.country}
            InputProps={{
              readOnly: true,
            }}
          />
        </Box>
      </Box>
    </Modal>
  )
}
