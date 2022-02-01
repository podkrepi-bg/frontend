import { useMutation, useQuery, useQueryClient } from 'react-query'
import { Button, CardActions, Container } from '@mui/material'
import LayoutPanel from '../navigation/LayoutPanel'
import { ModalContext } from 'context/ModalContext'
import TextField from '@mui/material/TextField'
import { CarDataType } from 'common/util/car'
import { useState, useContext } from 'react'
import { Typography } from '@mui/material'
import { useRouter } from 'next/router'
import Box from '@mui/material/Box'
import * as React from 'react'
import Link from 'next/link'
import axios from 'axios'
export default function EditForm() {
  const { setNotificationsOpen, setNotificationMessage }: any = useContext(ModalContext)
  const router = useRouter()
  const carId = router.query.id
  const { data }: any = useQuery(['car', carId], async () => {
    return await axios.get(`http://localhost:5010/api/car/${carId}`)
  })
  const [brand, setBrand] = useState<string>(data.brand)
  const [model, setModel] = useState<string>(data.model)
  const [year, setYear] = useState<number>(data.year)
  const [engine, setEngine] = useState<string>(data.engine)
  const [price, setPrice] = useState<number>(data.price)

  const submitCar = async (newCar: CarDataType) => {
    return await axios.patch(`http://localhost:5010/api/car/${carId}`, newCar)
  }
  const queryClient = useQueryClient()
  const { mutate } = useMutation(submitCar, {
    onSuccess: () => {
      queryClient.invalidateQueries('cars')
      router.push('/tasks')
      setNotificationsOpen(true)
      setNotificationMessage(`Колата беше редактирана`)
    },
    onError: () => {
      setNotificationsOpen(true)
      setNotificationMessage('Нешо се обърка')
    },
  })

  return (
    <div
      style={{
        background: '#f7f7f7',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}>
      <LayoutPanel>
        <Container sx={{ justifyContent: 'center', display: 'flex', flexDirection: 'column' }}>
          <Typography
            color="#294e85"
            sx={{ m: 3, fontWeight: 'bold', opacity: 0.9, textAlign: 'center' }}
            variant="h5">
            Редактиране
          </Typography>
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
              label="Марка"
              defaultValue={data.brand}
              onChange={(e) => {
                setBrand(e.target.value)
              }}
            />
            <TextField
              required
              id="outlined-required"
              label="Модел"
              defaultValue={data.model}
              onChange={(e) => {
                setModel(e.target.value)
              }}
            />
            <TextField
              required
              id="outlined-required"
              label="Година"
              defaultValue={data.year}
              onChange={(e) => {
                setYear(Number(e.target.value))
              }}
            />
            <TextField
              required
              id="outlined-required"
              label="Двигател"
              defaultValue={data.engine}
              onChange={(e) => {
                setEngine(e.target.value)
              }}
            />
            <TextField
              required
              id="outlined-required"
              label="Цена"
              defaultValue={data.price}
              onChange={(e) => {
                setPrice(Number(e.target.value))
              }}
            />
          </Box>
          <CardActions sx={{ m: 2, display: 'flex', justifyContent: 'center' }}>
            <Button
              onClick={() => {
                mutate({ brand, model, year, engine, price })
              }}
              variant="contained"
              size="large">
              Запази
            </Button>
            <Link href="/tasks">
              <Button variant="outlined" size="large">
                Отказ
              </Button>
            </Link>
          </CardActions>
        </Container>
      </LayoutPanel>
    </div>
  )
}
