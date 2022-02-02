import CardContent from '@mui/material/CardContent'
import { Typography, Card } from '@mui/material'
import { useViewCar } from 'common/hooks/cars'
import { CarResponse } from 'gql/cars'
import { UseQueryResult } from 'react-query'
import { observer } from 'mobx-react'
import { ModalStore } from 'stores/cars/ModalStore'
export default observer(function BasicCard() {
  const { carId } = ModalStore
  const containerStyles = {
    minWidth: 275,
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  }
  const { data }: UseQueryResult<CarResponse> = useViewCar(carId)
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
})
