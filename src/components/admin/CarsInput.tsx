import * as React from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { Button } from '@mui/material'
import { useState } from 'react'
import axios from 'axios'
export default function CarsInput() {
  const [brand, setBrand] = useState<string>()
  const [model, setModel] = useState<string>()
  const [year, setYear] = useState<number>()

  const submitCar = async (): Promise<void> => {
    await axios
      .post('http://localhost:5010/api/car', { brand, model, year })
      .catch((err) => alert('Incorrect inputs!'))
    window.location.reload()
  }
  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off">
      <div>
        <TextField
          required
          id="outlined-required"
          label="Brand"
          onChange={(e) => {
            setBrand(e.currentTarget.value)
          }}
        />
        <TextField
          required
          id="outlined-required"
          label="Model"
          onChange={(e) => {
            setModel(e.currentTarget.value)
          }}
        />
        <TextField
          required
          id="outlined-required"
          label="Year"
          onChange={(e) => {
            setYear(Number(e.currentTarget.value))
          }}
        />
      </div>
      <Button
        onClick={submitCar}
        variant="contained"
        style={{ width: '100%', margin: '20px 0 50px 0' }}>
        Add Car
      </Button>
    </Box>
  )
}
