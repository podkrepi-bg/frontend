import * as React from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import axios from 'axios'
import { useContext } from 'react'
import { ModalContext } from 'context/ModalContext'
import { useRouter } from 'next/router'
export default function CarCard({ car, setEditOpen }: any) {
  const modal: any = useContext(ModalContext)
  const router = useRouter()
  !modal.isOpen && router.push('/admin/cars')
  const deleteHandler = async () => {
    await axios.delete(`http://localhost:5010/api/car/${car.id}`).catch((err) => console.log(err))
    window.location.reload()
  }
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="170"
        image="https://cdn2.vectorstock.com/i/1000x1000/98/51/car-silhouette-vector-24399851.jpg"
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h4" component="div">
          {car?.brand}
        </Typography>
        <Typography color="text.secondary" style={{ fontWeight: 'bold' }}>
          {car?.model} ({car?.year})
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant="outlined" onClick={() => setEditOpen(true)}>
          Edit
        </Button>
        <Button size="small" variant="outlined" onClick={deleteHandler}>
          Delete
        </Button>
      </CardActions>
    </Card>
  )
}
