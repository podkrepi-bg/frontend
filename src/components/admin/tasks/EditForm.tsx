import { useMutation, useQuery, useQueryClient } from 'react-query'
import { Button, CardActions, Container } from '@mui/material'
import { Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Link from 'next/link'
import * as React from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import LayoutPanel from '../navigation/LayoutPanel'
import axios from 'axios'
export default function EditForm({ car }: any) {
  const [brand, setBrand] = useState<string>(car.brand)
  const [model, setModel] = useState<string>(car.model)
  const [year, setYear] = useState<number>(car.year)
  const [engine, setEngine] = useState<string>(car.engine)
  const [price, setPrice] = useState<number>(car.price)
  console.log(price)

  const router = useRouter()
  const carId = router.query.id
  const { data }: any = useQuery(['car', carId], async () => {
    return await axios.get(`http://localhost:5010/api/car/${car.id}`), { initialData: car }
  })

  const submitCar = async (newCar: any) => {
    return await axios.patch(`http://localhost:5010/api/car/${car.id}`, newCar)
  }

  const { mutate, isLoading } = useMutation(submitCar, {
    onSuccess: (data: any) => {
      router.push('/admin/panel/tasks')
    },
  })

  return (
    <div
      style={{
        height: '100vh',
        background: '#f7f7f7',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <LayoutPanel />
      <Typography color="primary" sx={{ m: 2, fontWeight: 'bold' }} variant="h4">
        Edit your car
      </Typography>
      <Container sx={{ justifyContent: 'center', display: 'flex' }}>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': {
              m: 2,
              width: '300px',
              display: 'flex',
              flexDirection: 'column',
            },
          }}
          noValidate
          autoComplete="off">
          <TextField
            required
            id="outlined-required"
            label="Brand"
            defaultValue={car.brand}
            onChange={(e) => {
              setBrand(e.target.value)
            }}
          />
          <TextField
            required
            id="outlined-required"
            label="Model"
            defaultValue={car.model}
            onChange={(e) => {
              setModel(e.target.value)
            }}
          />
          <TextField
            required
            id="outlined-required"
            label="Year"
            defaultValue={car.year}
            onChange={(e) => {
              setYear(Number(e.target.value))
            }}
          />
          <TextField
            required
            id="outlined-required"
            label="Engine"
            defaultValue={car.engine}
            onChange={(e) => {
              setEngine(e.target.value)
            }}
          />
          <TextField
            required
            id="outlined-required"
            label="Price"
            defaultValue={car.price}
            onChange={(e) => {
              setPrice(Number(e.target.value))
            }}
          />
        </Box>
      </Container>
      <CardActions sx={{ m: 2 }}>
        <Button
          onClick={() => {
            mutate({ brand, model, year, engine, price })
          }}
          variant="contained"
          size="large">
          Save
        </Button>
        <Link href="/admin/panel/tasks">
          <Button variant="outlined" size="large">
            Cancel
          </Button>
        </Link>
      </CardActions>
    </div>
  )
}
