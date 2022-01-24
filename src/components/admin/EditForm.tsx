import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import * as React from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import axios from 'axios'
import CardActions from '@mui/material/CardActions'
import { useContext, useState } from 'react'
import { ModalContext } from 'context/ModalContext'
import { useRouter } from 'next/router'
export default function EditForm({ car, setEditOpen }: any) {
  const [brand, setBrand] = useState<string>()
  const [model, setModel] = useState<string>()
  const [year, setYear] = useState<number>()
  const modal: any = useContext(ModalContext)
  const router = useRouter()
  const submitCar = async (): Promise<void> => {
    await axios
      .patch(`http://localhost:5010/api/car/${car.id}`, { brand, model, year })
      .catch((err) => alert('Incorrect inputs!'))
    window.location.reload()
  }

  !modal.isOpen && router.push('/admin/cars')

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="170"
        image="https://cdn2.vectorstock.com/i/1000x1000/98/51/car-silhouette-vector-24399851.jpg"
        alt="green iguana"
      />
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off">
        {car && (
          <div>
            <TextField
              required
              id="outlined-required"
              label="Brand"
              defaultValue={car?.brand}
              onChange={(e) => {
                setBrand(e.currentTarget.value)
              }}
            />
            <TextField
              defaultValue={car?.model}
              required
              id="outlined-required"
              label="Model"
              onChange={(e) => {
                setModel(e.currentTarget.value)
              }}
            />
            <TextField
              defaultValue={car?.year}
              required
              id="outlined-required"
              label="Year"
              onChange={(e) => {
                setYear(Number(e.currentTarget.value))
              }}
            />
          </div>
        )}
        <CardActions>
          <Button size="small" variant="outlined" onClick={submitCar}>
            Save
          </Button>
          <Button
            size="small"
            variant="outlined"
            onClick={() => {
              setEditOpen(false)
            }}>
            Cancel
          </Button>
        </CardActions>
      </Box>
    </Card>
  )
}
