import React, { useState } from 'react'
import { Box, Button, TextField } from '@mui/material'
import fetch from 'node-fetch'

export default function CarsForm({ cars, setCars }) {
  const [brand, setBrand] = useState('')
  const [model, setModel] = useState('')

  function carFormHandler(e) {
    e.preventDefault()

    if (!brand || !model) {
      return
    }

    const carData = JSON.stringify({ brand, model })

    fetch('http://localhost:5010/api/car', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: carData,
    })
      .then((res) => res.json())
      .then((data) => {
        setBrand('')
        setModel('')
        setCars([...cars, { brand, model, id: data.id }])
      })
  }

  return (
    <>
      <form onSubmit={carFormHandler}>
        <Box sx={{ mt: 10, ml: 80, width: '100%' }}>
          <Box sx={{ display: 'inline', mr: 4 }}>
            <TextField
              id="brand"
              label="Brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              required
              size="small"
            />
          </Box>
          <Box sx={{ display: 'inline', mr: 4 }}>
            <TextField
              id="model"
              label="Model"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              required
              size="small"
            />
          </Box>
          <Box sx={{ display: 'inline' }}>
            <Button type="submit">Submit</Button>
          </Box>
        </Box>
      </form>
    </>
  )
}
