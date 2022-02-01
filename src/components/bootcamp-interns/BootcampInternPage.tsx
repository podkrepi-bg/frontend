import BootcampInternGrid from './BootcampInternGrid'
import { Grid } from '@mui/material'
import MyLayout from './MyLayout'
import SnackBar from '../bootcamp-interns/Snackbar'

export default function BootcampInternPage() {
  return (
    <MyLayout>
      <Grid container>
        <BootcampInternGrid />
        <SnackBar></SnackBar>
      </Grid>
    </MyLayout>
  )
}
