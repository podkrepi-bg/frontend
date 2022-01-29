import { Box, Button, CardActions, Container, TextField } from '@mui/material'
import { useQueryClient, useMutation } from 'react-query'
import React, { useState } from 'react'
import axios from 'axios'
type CarDataType = {
  brand: string
  model: string
  year: number
  engine: string
  price: number
}

function AddFormSecond({ setSubmitCarForm }: any) {
  const [brand, setBrand] = useState<string>('')
  const [model, setModel] = useState<string>('')
  const [year, setYear] = useState<number>(0)
  const [engine, setEngine] = useState<string>('')
  const [price, setPrice] = useState<number>(0)

  const postCar = async (car: CarDataType) => {
    return await axios.post('http://localhost:5010/api/car', car)
  }
  const queryClient = useQueryClient()
  const { mutate } = useMutation(postCar, {
    onSuccess: (data: any) => {
      console.log('success')
      queryClient.invalidateQueries('cars', data)
      setSubmitCarForm(false)
    },
  })
  const submitCar = (carData: CarDataType) => {
    mutate(carData)
  }

  return (
    <Container
      disableGutters
      sx={{
        justifyContent: 'center',
        display: 'flex',
        alignItems: 'center',
        background: 'white',
        padding: '0 50px 10px 50px',
      }}>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': {
            m: 1,
            width: 100,
          },
        }}
        noValidate
        autoComplete="off">
        <TextField
          onChange={(e) => {
            setBrand(e.target.value)
          }}
          size="small"
          required
          id="outlined-required"
          label="Brand"
        />
        <TextField
          onChange={(e) => {
            setModel(e.target.value)
          }}
          size="small"
          required
          id="outlined-required"
          label="Model"
        />
        <TextField
          onChange={(e) => {
            setYear(Number(e.target.value))
          }}
          size="small"
          required
          id="outlined-required"
          label="Year"
        />
        <TextField
          onChange={(e) => {
            setEngine(e.target.value)
          }}
          size="small"
          required
          id="outlined-required"
          label="Engine"
        />
        <TextField
          onChange={(e) => {
            setPrice(Number(e.target.value))
          }}
          size="small"
          required
          id="outlined-required"
          label="Price"
        />
        <CardActions sx={{ width: '100%' }}>
          <Button
            onClick={() => {
              submitCar({ brand, model, year, engine, price })
            }}
            sx={{ width: '50%' }}
            variant="contained"
            size="small">
            Запази
          </Button>
          <Button
            onClick={() => {
              setSubmitCarForm(false)
            }}
            sx={{ width: '50%' }}
            variant="outlined"
            size="small">
            Отказ
          </Button>
        </CardActions>
      </Box>
    </Container>
  )
}

export default AddFormSecond
