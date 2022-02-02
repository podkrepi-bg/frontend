import { Button, CardActions, Container, Typography, TextField, Box } from '@mui/material'
import LayoutPanel from '../navigation/LayoutPanel'
import { MutationResultParams, useMutateCars } from 'common/hooks/cars'
import { endpoints } from 'common/api-endpoints'
import { CarDataType } from 'gql/cars'
import { UseMutateFunction, useQueryClient } from 'react-query'
import { useState } from 'react'
import { axios } from 'common/api-client'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { NotificationStore } from 'stores/cars/NotificationsStore'
import { observer } from 'mobx-react'
export default observer(function AddForm() {
  const { openNotifications, setMessage } = NotificationStore
  const queryClient = useQueryClient()
  const router = useRouter()
  const [brand, setBrand] = useState('')
  const [model, setModel] = useState('')
  const [year, setYear] = useState(0)
  const [engine, setEngine] = useState('')
  const [price, setPrice] = useState(0)

  const postCar = async (car: CarDataType) => {
    return await axios.post(endpoints.cars.postCar.url, car)
  }

  const { mutate }: { mutate: UseMutateFunction<unknown, Error, MutationResultParams, unknown> } =
    useMutateCars(postCar, queryClient, openNotifications, setMessage, null, router)

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
      <LayoutPanel>
        <Container sx={{ justifyContent: 'center', display: 'flex', flexDirection: 'column' }}>
          <Typography
            color="#294e85"
            sx={{ m: 3, fontWeight: 'bold', opacity: 0.9, textAlign: 'center' }}
            variant="h5">
            Добави кола
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
          <CardActions sx={{ m: 2, display: 'flex', justifyContent: 'center' }}>
            <Button
              onClick={() => {
                mutate({ brand, model, year, engine, price })
              }}
              variant="contained"
              size="large">
              Запази
            </Button>
            <Link href="/tasks" passHref>
              <Button variant="outlined" size="large">
                Отказ
              </Button>
            </Link>
          </CardActions>
        </Container>
      </LayoutPanel>
    </div>
  )
})
