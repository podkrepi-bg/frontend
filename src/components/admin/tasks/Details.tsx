import { ModalContext } from 'context/ModalContext'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { useViewCar } from 'common/hooks/cars'
import Card from '@mui/material/Card'
import { useContext } from 'react'
import * as React from 'react'
export default function BasicCard() {
  const { carId }: any = useContext(ModalContext)
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
  const { data }: any = useViewCar(carId)
  return (
    <Card sx={containerStyles}>
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
    </Card>
  )
}
