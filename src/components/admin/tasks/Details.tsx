import { useContext } from 'react'
import { ModalContext } from 'context/ModalContext'
import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import axios from 'axios'
export default function BasicCard() {
  const { carId }: any = useContext(ModalContext)
  const [car, setCar] = React.useState<Car>({
    brand: '',
    model: '',
    year: 0,
    engine: '',
    price: 0,
  })
  type Car = {
    brand: string
    model: string
    year: number
    engine: string
    price: number
  }
  const containerStyles = {
    minWidth: 275,
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  }
  React.useEffect(() => {
    const fetchCar = async () => {
      const result = await axios.get(`http://localhost:5010/api/car/${carId}`)
      setCar(result.data)
    }
    fetchCar()
  }, [])
  return (
    <Card sx={containerStyles}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          {car.model}
        </Typography>
        <Typography sx={{ fontSize: 15 }} color="text.secondary" gutterBottom>
          Brand: {car.brand}
        </Typography>
        <Typography color="text.secondary" gutterBottom>
          Year: {car.year}
        </Typography>
        <Typography variant="body2" gutterBottom>
          Engine: {car.engine}
        </Typography>
        <Typography variant="body2" gutterBottom>
          Price: {car.price}
        </Typography>
      </CardContent>
    </Card>
  )
}
