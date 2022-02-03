import BootcampInternGrid from './BootcampInternGrid'
import { Grid } from '@mui/material'
import MyLayout from './MyLayout'
import SnackBar from '../bootcamp-interns/Snackbar'
import { DrawerContext } from 'context/SwipeableDrawerContext'
import { useContext } from 'react'

export default function BootcampInternPage() {
  const { notificationsOpen, setNotificationsOpen }: any = useContext(DrawerContext)

  let notification

  if (notificationsOpen) {
    notification = <SnackBar></SnackBar>
    setTimeout(() => {
      setNotificationsOpen(false)
    }, 3000)
  }

  return (
    <MyLayout>
      <Grid container>
        <BootcampInternGrid />
        {notification}
      </Grid>
    </MyLayout>
  )
}
