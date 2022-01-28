import * as React from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import { QueryClient } from 'react-query'
import Typography from '@mui/material/Typography'
import { useContext } from 'react'
import { ModalContext } from 'context/ModalContext'
import axios from 'axios'
import { useQuery } from 'react-query'
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


  const {
    data: { data },
  }: any = useQuery(['car', carId], async () => {
    return await axios.get(`http://localhost:5010/api/car/${carId}`)
  })
  

  console.log(car)

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
          {data?.model}
        </Typography>
        <Typography sx={{ fontSize: 15 }} color="text.secondary" gutterBottom>
          Brand: {data?.brand}
        </Typography>
        <Typography color="text.secondary" gutterBottom>
          Year: {data?.year}
        </Typography>
        <Typography variant="body2" gutterBottom>
          Engine: {data?.engine}
        </Typography>
        <Typography variant="body2" gutterBottom>
          Price: {data?.price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Edit</Button>
        <Button size="small">Delete</Button>
      </CardActions>
    </Card>
  )
}
