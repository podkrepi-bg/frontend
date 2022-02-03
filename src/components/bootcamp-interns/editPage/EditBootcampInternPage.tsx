import { Grid } from '@mui/material'

import MyLayout from '../MyLayout'
import BootcampInternEditForm from '../BootcampInternEditForm'

export default function EditBootcampInternPage() {
  return (
    <MyLayout>
      <Grid container>
        <BootcampInternEditForm />
      </Grid>
    </MyLayout>
  )
}
