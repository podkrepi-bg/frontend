import { Button, CardActions, Container } from '@mui/material'
import { useMutation, useQueryClient } from 'react-query'
import LayoutPanel from '../navigation/LayoutPanel'
import { ModalContext } from 'context/ModalContext'
import TextField from '@mui/material/TextField'
import { CarDataType } from 'common/util/car'
import { Typography } from '@mui/material'
import { useRouter } from 'next/router'
import Box from '@mui/material/Box'
import { useContext } from 'react'
import { useState } from 'react'
import * as React from 'react'
import Link from 'next/link'
import axios from 'axios'
export default function AddForm() {
  const { setNotificationsOpen, setNotificationMessage }: any = useContext(ModalContext)
  const router = useRouter()
  const [brand, setBrand] = useState<string>('')
  const [model, setModel] = useState<string>('')
  const [year, setYear] = useState<number>(0)
  const [engine, setEngine] = useState<string>('')
  const [price, setPrice] = useState<number>(0)

  const postCar = async (car: CarDataType) => {
    return await axios.post('http://localhost:5010/api/car', car)
  }
  const queryClient = useQueryClient()
  const { mutate, isLoading } = useMutation(postCar, {
    onSuccess: () => {
      queryClient.invalidateQueries('cars')
      router.push('/admin/panel/tasks')
      setNotificationsOpen(true)
      setNotificationMessage(`${brand} ${model} добавена успешно!`)
    },
    onError: () => {
      setNotificationsOpen(true)
      setNotificationMessage('Нешо се обърка')
    },
    onMutate: () => {},
  })

  return (
    <div
      style={{
        background: '#f7f7f7',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: 'calc(100vh - 70px)',
      }}>
      <LayoutPanel />
      <Typography color="#294e85" sx={{ m: 3, fontWeight: 'bold', opacity: 0.9 }} variant="h5">
        Добави кола
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
            label="Марка"
            onChange={(e) => {
              setBrand(e.target.value)
            }}
          />
          <TextField
            required
            id="outlined-required"
            label="Модел"
            onChange={(e) => {
              setModel(e.target.value)
            }}
          />
          <TextField
            required
            id="outlined-required"
            label="Година"
            onChange={(e) => {
              setYear(Number(e.target.value))
            }}
          />
          <TextField
            required
            id="outlined-required"
            label="Двигател"
            onChange={(e) => {
              setEngine(e.target.value)
            }}
          />
          <TextField
            required
            id="outlined-required"
            label="Цена"
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
          Запази
        </Button>
        <Link href="/admin/panel/tasks">
          <Button variant="outlined" size="large">
            Отказ
          </Button>
        </Link>
      </CardActions>
    </div>
  )
}
