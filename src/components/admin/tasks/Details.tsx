import * as React from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useContext } from 'react'
import { ModalContext } from 'context/ModalContext'
import axios, { AxiosResponse } from 'axios'
import { useQuery, QueryClient } from 'react-query'
export default function BasicCard() {
  const [car, setCar] = React.useState<any>({
    brand: '',
    model: '',
    year: '',
    engine: '',
    price: '',
  })
  const { carId }: any = useContext(ModalContext)
  React.useEffect(() => {
    const fetchCar = async () => {
      const result = await axios.get(`http://localhost:5010/api/car/${carId}`)
      setCar(result.data)
    }
    fetchCar()
  }, [])
  const queryClient = new QueryClient()
  const cars = queryClient.getQueryData("cars")
  /*   const {
    data: { data },
  }: any = useQuery<AxiosResponse<any>>(['car', carId], async (carId) => {
    return await axios.get(`http://localhost:5010/api/car/${carId}`)
  }) */
  return (
    <Card
      sx={{
        minWidth: 275,
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
      }}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          {car?.model}
        </Typography>
        <Typography sx={{ fontSize: 15 }} color="text.secondary" gutterBottom>
          Brand: {car?.brand}
        </Typography>
        <Typography color="text.secondary" gutterBottom>
          Year: {car?.year}
        </Typography>
        <Typography variant="body2" gutterBottom>
          Engine: {car?.engine}
        </Typography>
        <Typography variant="body2" gutterBottom>
          Price: {car?.price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Edit</Button>
        <Button size="small">Delete</Button>
      </CardActions>
    </Card>
  )
}
