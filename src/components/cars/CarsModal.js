import { Box, Button, Modal, TextField } from '@mui/material'
import React from 'react'
import fetch from 'node-fetch'

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

export default function CarsModal({ props }) {
  async function onEditSubmit(e) {
    const carData = JSON.stringify({
      brand: props.editBrand,
      model: props.editModel,
    })

    fetch(`http://localhost:5010/api/car/${props.editId}`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
      },
      body: carData,
    }).then((res) => {
      props.setOpen(false)
      props.setCars([
        ...props.cars.filter((car) => car.id !== props.editId),
        { id: props.editId, brand: props.editBrand, model: props.editModel },
      ])
    })
  }

  return (
    <Modal open={props.open} onClose={() => props.setOpen(false)}>
      <Box sx={modalStyle}>
        <Box sx={{ display: 'inline', mr: 4 }}>
          <TextField
            id="brand"
            label="Brand"
            required
            size="small"
            defaultValue={props.editBrand}
            onChange={(e) => props.setEditBrand(e.target.value)}
          />
        </Box>
        <Box sx={{ display: 'inline', mr: 4 }}>
          <TextField
            id="model"
            label="Model"
            required
            size="small"
            defaultValue={props.editModel}
            onChange={(e) => props.setEditModel(e.target.value)}
          />
        </Box>
        <Box sx={{ display: 'inline' }}>
          <Button onClick={onEditSubmit} type="submit">
            Submit
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}
